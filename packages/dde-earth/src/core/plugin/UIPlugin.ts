import { BasePlugin } from './basePlugin';

export abstract class UIPlugin<
  InitOptions extends any[] = any[],
  Intl extends Record<string, any> = any,
> extends BasePlugin<InitOptions, Intl> {
  constructor(options?: UIPlugin.Options<Intl>) {
    super(options);
  }
}

export namespace UIPlugin {
  export interface Options<Intl = any> extends BasePlugin.Options<Intl> {}
}
