import { Particle3D } from 'cesium-particle';
import { LayerItem } from 'dde-earth';

import { basicRenderOptions, defaultRenderOptions } from './constant';

import type { JsonData, UserInput } from 'cesium-particle';
import type { LayerManager } from 'dde-earth';

export class NCLayerItem extends LayerItem<
  NCLayerItem.Data,
  NCLayerItem.Instance
> {
  defaultRenderOptions = defaultRenderOptions;

  get show() {
    //由于原包没写show的状态，所以使用第一个几何体的show属性作为判断
    return this.instance?.primitives[0]?.show ?? false;
  }

  set show(val: boolean) {
    if (this.instance) {
      if (this.instance.primitives[0]?.show) {
        this.instance?.hide();
      } else this.instance?.show();
    }
  }

  async init(data: NCLayerItem.Data) {
    const particleObj = await new Particle3D(this.earth.viewer, {
      ...data,
      //使用basicRenderOptions替换原cesium-particle包的默认渲染选项
      ...basicRenderOptions,
      //引入用户输入的渲染选项
      ...data.renderOptions,
    });
    particleObj
      .init()
      .then(() => {
        particleObj.show();
      })
      .catch((e) => {
        particleObj.remove();
        this._instance = undefined;
        window.alert(e);
      });
    NCLayerItem.basicRender(particleObj, data.renderOptions);
    return particleObj;
  }

  remove() {
    if (this.instance) {
      this.instance.remove();
      this._instance = undefined;
      return true;
    }
    return false;
  }

  zoomTo() {
    if (this.instance) {
      this.earth.viewer.flyTo(this.instance.primitives, {
        duration: 1,
      });
    }
  }

  static basicRender(
    layer: Particle3D | undefined,
    options: NCLayerItem.RenderOptions = {},
  ) {
    if (layer) {
      Object.entries(options).map(([name, value]) => {
        if (
          Object.keys(basicRenderOptions).includes(name) &&
          Object.prototype.hasOwnProperty.call(layer, name)
        ) {
          (layer as any)[name] = value;
        }
      });
    }
  }

  async render(options: NCLayerItem.RenderOptions) {
    if (
      Object.keys(options).some(
        (name) => !Object.keys(basicRenderOptions).includes(name),
      )
    ) {
      this._renderOptions = {
        ...this._renderOptions,
        ...options,
      };

      if (this.instance) {
        this.instance.remove();
        this._instance = undefined;
        const particleObj = await new Particle3D(this.earth.viewer, {
          ...this.data,
          ...this._renderOptions,
        });
        particleObj
          .init()
          .then(() => {
            particleObj.show();
          })
          .catch((e) => {
            particleObj.remove();
            this._instance = undefined;
            window.alert(e);
          });
        this._instance = particleObj;
      }

      NCLayerItem.basicRender(this.instance, this._renderOptions);

      this.earth.viewer.scene.requestRender();
    }
  }
}

export namespace NCLayerItem {
  export type Method = 'nc';

  //Define the type of the Options
  export type FileType = 'nc' | 'json';
  export type Fields = {
    U?: string;
    V?: string;
    W?: string;
    H?: string;
    lon?: string;
    lat?: string;
    lev?: string;
  };
  export type ValueRange = {
    min?: number;
    max?: number;
  };
  export type Offset = {
    lon?: number;
    lat?: number;
    lev?: number;
  };
  export type ColorTable = number[][];
  export type Colour = 'speed' | 'height';

  export type NCImageryProviderOptions = {
    fileType?: FileType;
    fields?: Fields;
  };
  export type NCImageryProviderRenderOptions = {
    valueRange?: ValueRange;
    offset?: Offset;
    userInput?: UserInput;
    colorTable?: ColorTable;
    colour?: Colour;
  };

  export type Data = LayerManager.BaseLayer<Method, RenderOptions> &
    NCImageryProviderOptions & {
      input: Blob | JsonData;
    };

  export type Instance = Particle3D;

  export type RenderOptions = NCImageryProviderRenderOptions;
}
