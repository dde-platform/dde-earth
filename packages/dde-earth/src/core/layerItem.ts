import { generateUUID } from '../utils';
import { LayerManager } from './layerManager';
import { LayerPlugin } from './plugin';

export class LayerItem<
  Lyr extends LayerManager.Layer = LayerManager.Layer,
  Loader extends LayerPlugin<Lyr> = LayerPlugin<Lyr>,
  Instance = Lyr['instance'],
> {
  readonly metaData: Lyr['metaData'];
  readonly instance: Instance;
  readonly id: string;

  get show(): boolean {
    return this.loader.getShow(this.instance);
  }

  set show(value: boolean) {
    this.loader.setShow(this.instance, value);
  }

  constructor(
    readonly loader: Loader,
    options: LayerItem.Options<Lyr>,
  ) {
    const { id = generateUUID(), metaData, instance } = options;
    this.id = id;
    this.metaData = metaData;
    this.instance = instance;
  }

  async render(renderOptions: Lyr['metaData']['renderOptions']) {
    return this.loader.render(this.instance, renderOptions);
  }

  zoomTo() {
    this.loader.zoomTo(this.instance);
  }

  async remove() {
    return this.loader.remove(this.instance);
  }

  destroy() {
    this.remove();
  }
}

export namespace LayerItem {
  export interface Options<
    Lyr extends LayerManager.Layer = LayerManager.Layer,
  > {
    id?: string;
    metaData: Lyr['metaData'];
    instance: Lyr['instance'];
  }
}
