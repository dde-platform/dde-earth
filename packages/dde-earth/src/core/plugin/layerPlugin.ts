import { LayerManager } from '../layerManager';
import { BasePlugin } from './basePlugin';

export abstract class LayerPlugin<
  Lyr extends LayerManager.Layer = LayerManager.Layer,
  Method = Lyr['metaData']['method'],
  Instance = Lyr['instance'],
> extends BasePlugin {
  public abstract readonly methodList: Method[];

  constructor(options?: LayerPlugin.Options) {
    super(options);
  }

  abstract add(layer: Lyr['metaData']): Instance | Promise<Instance>;
  abstract zoomTo(instance: Instance): void;
  abstract remove(instance: Instance): boolean | Promise<boolean>;
  abstract getShow(instance: Instance): boolean;
  abstract setShow(instance: Instance, show: boolean): boolean;
  abstract render: (
    instance: Instance,
    renderOptions: Lyr['metaData']['renderOptions'],
  ) => boolean | Promise<boolean>;

  public destroy(): boolean {
    super.destroy();
    return true;
  }
}

export namespace LayerPlugin {
  export interface Options extends BasePlugin.Options {}
}
