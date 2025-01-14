import { ScreenSpaceEventHandler, ScreenSpaceEventType, defined } from "cesium";
import { Math as CMath, Cartesian2 } from "cesium";
import { WithEventPlugin } from "dde-earth";

import type { Cartesian3, Viewer } from "cesium";
import type { Earth } from "dde-earth";

export class Subscriber extends WithEventPlugin<
  Subscriber.Args,
  Subscriber.Intl
> {
  name = "Subscriber";

  public readonly eventList: Subscriber.EventType[] = [
    "LEFT_DOWN",
    "LEFT_UP",
    "LEFT_CLICK",
    "LEFT_DOUBLE_CLICK",
    "RIGHT_DOWN",
    "RIGHT_UP",
    "RIGHT_CLICK",
    "MIDDLE_DOWN",
    "MIDDLE_UP",
    "MIDDLE_CLICK",
    "MOUSE_MOVE",
    "WHEEL",
    "PINCH_START",
    "PINCH_MOVE",
    "PINCH_END",
  ];
  private _viewer!: Viewer;

  private _handler!: ScreenSpaceEventHandler;

  private _callbacks: Subscriber.ExternalEventCollection = Object.create({});

  private _moveDebounce: number | undefined;
  private _lastTime: number = new Date().getTime();
  private _enablePickResult: boolean = false;
  private _lastResult: any;

  constructor(options?: WithEventPlugin.Options<Subscriber.Intl>) {
    super(options);
  }

  public init(earth: Earth, options: Subscriber.SubscriberOptions = {}) {
    this._init(earth);
    this._viewer = earth.viewer;
    this._handler = new ScreenSpaceEventHandler(
      options.element || this._viewer.canvas,
    );
    this._moveDebounce = options.pickResult?.moveDebounce;
    this._enablePickResult = options.pickResult?.enable ?? false;
    this._initListener();
    return this;
  }

  private _initListener(): void {
    this.eventList.forEach((type) => {
      this._callbacks[type] = [];
    });
  }

  private _shouldUpdate(update = true) {
    if (!this._moveDebounce) return true;

    const timeNow = new Date().getTime();
    if (timeNow - this._lastTime < this._moveDebounce) {
      return false;
    } else {
      if (update) this._lastTime = timeNow;
      return true;
    }
  }

  private _eventRegister(event: Subscriber.EventType): void {
    if (this._isDestroyed) return;
    this._handler.setInputAction((movement: Subscriber.EventArgs) => {
      if (
        this._isDestroyed ||
        !this._enable ||
        (event === "MOUSE_MOVE" && !this._shouldUpdate())
      )
        return;

      if (this._enablePickResult) {
        if (event === "MOUSE_MOVE" && movement.endPosition) {
          this._lastResult = this._viewer.scene.pick(movement.endPosition);
        } else if (movement.position) {
          this._lastResult = this._viewer.scene.pick(movement.position);
        }
      }

      const callbacks = this._callbacks[event];

      if (callbacks) {
        if (movement.position) {
          movement.lonLat = this.cartesiantoLonlat(movement.position);
        }
        callbacks.forEach((callback) =>
          callback.apply(this, [movement, this._lastResult]),
        );
      }
    }, ScreenSpaceEventType[event]);
  }

  on(event: Subscriber.EventType, fn: Subscriber.ExternalListenCallback): any {
    if (this._callbacks[event].length === 0) this._eventRegister(event);

    this._callbacks[event].push(fn);
    return this;
  }

  off(
    event: Subscriber.EventType,
    fn?: Subscriber.ExternalListenCallback,
  ): any {
    const callbacks = this._callbacks[event];
    if (callbacks) {
      if (fn) {
        this._callbacks[event] = callbacks.filter(
          (callback) => callback !== callback,
        );
      } else {
        delete this._callbacks[event];
      }
    }

    return this;
  }

  removeNative(viewer: Viewer, eventType: Subscriber.EventType): void {
    viewer.screenSpaceEventHandler.removeInputAction(
      this.convertCesiumEventType(eventType),
    );
  }

  private convertCesiumEventType(
    subscriberEventType: Subscriber.EventType,
  ): ScreenSpaceEventType {
    return ScreenSpaceEventType[subscriberEventType];
  }

  cartesiantoLonlat(
    cartesian: Cartesian2 | Cartesian3 | undefined,
    height?: number,
  ) {
    const viewer = this.viewer;
    const scene = viewer.scene;
    let pos = undefined;
    let cartesian3: Cartesian3 | undefined;

    if (cartesian instanceof Cartesian2) {
      const pickedObject = scene.pick(cartesian);
      if (scene.pickPositionSupported && defined(pickedObject)) {
        cartesian3 = viewer.scene.pickPosition(cartesian);
      } else {
        cartesian3 = viewer.camera.pickEllipsoid(cartesian);
      }
    } else {
      cartesian3 = cartesian;
    }

    if (cartesian3) {
      const cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(
        cartesian3 as Cartesian3,
      );
      // 将弧度转为度的十进制度表示
      const lon = +CMath.toDegrees(cartographic.longitude);
      const lat = +CMath.toDegrees(cartographic.latitude);
      pos = [lon, lat, height ?? cartographic.height];
    }
    return pos;
  }

  destroy(): void {
    super.destroy();
    this._handler.destroy();
  }
}

export namespace Subscriber {
  export interface Options extends WithEventPlugin.Options<Subscriber.Intl> {}

  export interface SubscriberOptions {
    element?: HTMLCanvasElement;
    pickResult?: {
      enable: boolean;
      moveDebounce?: number;
    };
  }

  export type Intl = {};

  export type Args = [options: Subscriber.SubscriberOptions];

  export interface EventArgs {
    position?: Cartesian2;
    lonLat?: number[];
    endPosition?: Cartesian2;
    startPosition?: Cartesian2;
    [name: string]: any;
  }
  export type ListenCallback<T> = (movement: EventArgs, instance: T) => void;

  export type ExternalListenCallback = (
    movement: EventArgs,
    result: any,
  ) => void;

  export type EventType = keyof typeof ScreenSpaceEventType;

  export type EventCollection = Record<EventType, Function[]>;

  export type ExternalEventCollection = Record<EventType, Function[]>;
}
