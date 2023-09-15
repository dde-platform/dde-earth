import { Subscriber } from '../plugins/Subscriber';

export class EventEmitter {
  public callbacks: { [key in EventEmitter.EventTypes]: Function[] } =
    {} as any;

  public on<T extends EventEmitter.EventTypes = EventEmitter.EventTypes>(
    event: T,
    fn: EventEmitter.EventFunc<T>,
  ): this {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    this.callbacks[event] = [...this.callbacks[event], fn];

    return this;
  }

  public emit<T extends EventEmitter.EventTypes>(
    event: T,
    ...args: EventEmitter.Events[T]
  ): this {
    const callbacks = this.callbacks[event];

    if (callbacks) {
      callbacks.forEach((callback) => callback.apply(this, args));
    }

    return this;
  }

  public off<T extends EventEmitter.EventTypes>(
    event: T,
    fn?: EventEmitter.EventFunc<T>,
  ): this {
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
  export interface Events
    extends Record<Subscriber.EventType, Subscriber.Args> {}

  export type EventTypes = keyof Events;

  export type EventFunc<T extends keyof Events = keyof Events> = (
    event: T,
    args: Events[T],
  ) => void;
}
