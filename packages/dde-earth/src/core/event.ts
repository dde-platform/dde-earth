import type { Earth } from "./earth";

export class EventEmitter {
  public callbacks: { [key: string]: Function[] } = {} as any;

  public on<T extends Earth.EventTypes = Earth.EventTypes>(
    event: T,
    fn: Earth.EventFunc<T>,
  ): this {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    this.callbacks[event] = [...this.callbacks[event], fn];

    return this;
  }

  public emit<T extends Earth.EventTypes>(
    event: T,
    ...args: Earth.Events[T]
  ): this {
    const callbacks = this.callbacks[event];

    if (callbacks) {
      callbacks.forEach((callback) => callback.apply(this, args));
    }

    return this;
  }

  public off<T extends Earth.EventTypes>(
    event: T,
    fn?: Earth.EventFunc<T>,
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
