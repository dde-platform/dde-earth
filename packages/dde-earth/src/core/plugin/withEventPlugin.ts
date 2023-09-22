import { BasePlugin } from './basePlugin';

export abstract class WithEventPlugin<
  T extends any[] = any[],
  Intl extends Record<string, any> = any,
  Events extends string = string,
  Args extends any[] = [],
> extends BasePlugin<T, Intl> {
  public readonly eventList: Events[] = [];

  constructor(options?: WithEventPlugin.Options<Intl>) {
    super(options);
  }

  abstract on(event: Events, fn: (...args: Args) => void): any;
  abstract off(event: Events, fn?: (...args: Args) => void): any;
}

export namespace WithEventPlugin {
  export interface Options<Intl = any> extends BasePlugin.Options<Intl> {}
}
