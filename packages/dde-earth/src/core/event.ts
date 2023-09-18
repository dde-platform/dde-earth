export class EventEmitter {
  override: EventEmitter.Override;
  constructor(override?: Partial<EventEmitter.Override>) {
    this.override = {
      ...EventEmitter.defaultOptions,
      ...override,
    };
  }

  private callbacks: { [key: string]: Function[] } = {};

  public on<T extends EventEmitter.EventTypes = EventEmitter.EventTypes>(
    event: T,
    fn: EventEmitter.EventFunc<T>,
  ): any {
    if (this.override['on'][event]) {
      this.override['on'][event](event, fn);
      return;
    }

    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    this.callbacks[event] = [...this.callbacks[event], fn];

    return this;
  }

  public emit<T extends EventEmitter.EventTypes>(
    event: T,
    ...args: EventEmitter.Events[T]
  ): any {
    if (this.override['emit'][event]) {
      this.override['emit'][event](event, ...(args as any[]));
      return;
    }

    const callbacks = this.callbacks[event];

    if (callbacks) {
      callbacks.forEach((callback) => callback.apply(this, args));
    }

    return this;
  }

  public off<T extends EventEmitter.EventTypes>(
    event: T,
    fn?: EventEmitter.EventFunc<T>,
  ): any {
    if (this.override['off'][event]) {
      this.override['off'][event](event, fn);
      return;
    }

    const callbacks = this.callbacks[event];

    if (callbacks) {
      if (fn) {
        this.callbacks[event] = callbacks.filter((callback) => callback !== fn);
      } else {
        delete this.callbacks[event];
      }
    }

    return this;
  }

  destroy(): void {
    this.callbacks = {} as any;
  }
}

export namespace EventEmitter {
  export type Override = {
    on: Record<EventTypes, (typeof EventEmitter.prototype)['on']>;
    off: Record<EventTypes, (typeof EventEmitter.prototype)['off']>;
    emit: Record<EventTypes, (typeof EventEmitter.prototype)['off']>;
  };

  export const defaultOptions: Override = {
    on: {},
    off: {},
    emit: {},
  };

  export interface Events {}

  export type EventTypes = keyof Events;

  export type EventFunc<T extends keyof Events = keyof Events> = (
    ...args: Events[T]
  ) => void;
}
