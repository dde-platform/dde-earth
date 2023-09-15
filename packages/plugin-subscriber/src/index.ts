import {
  Cartesian2,
  Entity,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Viewer,
} from 'cesium';
import { BasePlugin, Earth, UUID } from 'dde-earth';

import './api';

export class Subscriber extends BasePlugin<Subscriber.Args> {
  public readonly name = 'Subscriber';
  private _viewer!: Viewer;

  private _handler!: ScreenSpaceEventHandler;

  private _eventCollection: Subscriber.EventCollection = Object.create(null);

  private _externalEventCollection: Subscriber.ExternalEventCollection =
    Object.create({});

  private readonly _eventTypeList: Subscriber.EventType[] = [
    'LEFT_DOWN',
    'LEFT_UP',
    'LEFT_CLICK',
    'LEFT_DOUBLE_CLICK',
    'RIGHT_DOWN',
    'RIGHT_UP',
    'RIGHT_CLICK',
    'MIDDLE_DOWN',
    'MIDDLE_UP',
    'MIDDLE_CLICK',
    'MOUSE_MOVE',
    'WHEEL',
    'PINCH_START',
    'PINCH_MOVE',
    'PINCH_END',
  ];
  private _moveDebounce: number | undefined;
  private _lastTime: number = new Date().getTime();
  private _enablePickResult: boolean = false;
  private _lastResult: any;

  constructor(options?: BasePlugin.Options) {
    super(options);
  }

  public init(earth: Earth, options: Subscriber.SubscriberOptions = {}) {
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
    this._eventTypeList.forEach((type) => {
      this._eventCollection[type] = new Map();
      this._externalEventCollection[type] = new Map();
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

  private _eventRegister(eventType: Subscriber.EventType): void {
    if (this._destroyed) return;
    const eventCollection = this._eventCollection[eventType];
    const externalEventCollection = this._externalEventCollection[eventType];
    this._handler.setInputAction((movement: Subscriber.EventArgs) => {
      if (
        this._destroyed ||
        !this._enable ||
        (eventType === 'MOUSE_MOVE' && !this._shouldUpdate())
      )
        return;

      if (this._enablePickResult) {
        if (eventType === 'MOUSE_MOVE' && movement.endPosition) {
          this._lastResult = this._viewer.scene.pick(movement.endPosition);
        } else if (movement.position) {
          this._lastResult = this._viewer.scene.pick(movement.position);
        }
      }

      if (externalEventCollection.size > 0) {
        const iterator = externalEventCollection.values();
        let val = iterator.next();
        while (!val.done) {
          val.value(movement, this._lastResult);
          val = iterator.next();
        }
      }

      if (movement.position || movement.endPosition) {
        const entity: Entity | undefined = this._lastResult?.id;
        if (
          entity &&
          eventCollection.has(entity.id) &&
          typeof eventCollection.get(entity.id) === 'function'
        ) {
          const func = eventCollection.get(entity.id);
          if (func) func(movement, entity);
        }
      }
    }, ScreenSpaceEventType[eventType]);
  }

  /**
   * @description 添加特定事件，与add不同在于该事件不会过滤Entity
   * @param callback 事件处理函数
   * @param eventType 事件类型
   * @return {string} Event Id  事件移除时需要提供事件ID
   */
  addExternal(
    callback: Subscriber.ExternalListenCallback,
    eventType: Subscriber.EventType,
  ): string {
    if (this._destroyed) return '';

    if (
      this._eventCollection[eventType].size === 0 &&
      this._externalEventCollection[eventType].size === 0
    )
      this._eventRegister(eventType);

    const eId = UUID();
    this._externalEventCollection[eventType].set(eId, callback);
    return eId;
  }

  /**
   *@description 移除指定Substance的相应事件
   * @param substances 需要移除事件的Substance
   * @param eventType 需要移除的时间类型
   */
  remove<T extends Entity>(
    substances: T | T[],
    eventType: Subscriber.EventType,
  ): void {
    if (this._destroyed) return;

    const substancesArray = Array.isArray(substances)
      ? substances
      : [substances];
    for (const substance of substancesArray) {
      if (this._eventCollection[eventType].has(substance.id)) {
        this._eventCollection[eventType].delete(substance.id);
      }
    }
  }

  removeExternal(
    ids: string | string[],
    eventType?: Subscriber.EventType,
  ): void {
    if (this._destroyed) return;

    const idsArray = Array.isArray(ids) ? ids : [ids];

    for (const id of idsArray) {
      const type = eventType || this._searchExternal(id);
      if (type && this._externalEventCollection[type]?.has(id)) {
        this._externalEventCollection[type].delete(id);
      }
    }
  }

  private _searchExternal(id: string): Subscriber.EventType | undefined {
    if (this._destroyed) return;

    const types: Subscriber.EventType[] = Object.keys(
      this._externalEventCollection,
    ) as any;

    for (const type of types) {
      const events = this._externalEventCollection[type];
      if (events.has(id)) return type;
    }
    return;
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

  destroy(): void {
    this._destroyed = true;
    this._handler.destroy();
  }
}

export namespace Subscriber {
  export interface SubscriberOptions {
    element?: HTMLCanvasElement;
    pickResult?: {
      enable: boolean;
      moveDebounce?: number;
    };
  }

  export type Args = [options: Subscriber.SubscriberOptions];

  export interface EventArgs {
    position?: Cartesian2;
    endPosition?: Cartesian2;
    startPosition?: Cartesian2;
    [name: string]: any;
  }
  export type ListenCallback<T> = (movement: EventArgs, substance: T) => void;

  export type ExternalListenCallback = (
    movement: EventArgs,
    result: any,
  ) => void;

  export type EventType = keyof typeof ScreenSpaceEventType;

  export type EventCollection = Record<
    EventType,
    Map<string, ListenCallback<Entity>>
  >;

  export type ExternalEventCollection = Record<
    EventType,
    Map<string, ListenCallback<Entity>>
  >;
}
