import { Particle3D } from "cesium-particle";
import { LayerItem } from "dde-earth";

import { defaultRenderOptions, defaultStaticRenderOptions } from "./constant";

import type { JsonData } from "cesium-particle";
import type { LayerManager } from "dde-earth";

export class NCLayerItem extends LayerItem<
  NCLayerItem.Data,
  NCLayerItem.Instance
> {
  defaultRenderOptions = defaultRenderOptions;
  inputFile: Blob | JsonData = new Blob();

  get show() {
    //由于原包没写show的状态，所以使用第一个几何体的show属性作为判断
    return this.instance?.primitives[0]?.show ?? false;
  }

  set show(val: boolean) {
    if (this.instance) {
      if (this.instance.primitives[0]?.show !== val) {
        if (this.instance.primitives[0]?.show) {
          this.instance?.hide();
        } else this.instance?.show();
      }
    }
  }

  async _init(data: NCLayerItem.Data) {
    //如果传入的是URL，先fetch文件
    if (typeof data.url === "string") {
      const blob = await fetch(data.url).then((response) => response.blob());
      this.inputFile = blob;
      const particleObj = new Particle3D(this.earth.viewer, {
        ...data,
        input: this.inputFile,
        //引入默认渲染选项和用户的渲染选项
        ...{ ...defaultRenderOptions, ...data.renderOptions },
        userInput: { ...defaultRenderOptions, ...data.renderOptions },
      });
      await particleObj.init();
      particleObj.show();
      return particleObj;
    } else {
      this.inputFile = data.url;
      const particleObj = new Particle3D(this.earth.viewer, {
        ...data,
        input: this.inputFile,
        //引入默认渲染选项和用户的渲染选项
        ...{ ...defaultRenderOptions, ...data.renderOptions },
        userInput: { ...defaultRenderOptions, ...data.renderOptions },
      });
      await particleObj.init();
      particleObj.show();
      return particleObj;
    }
  }

  _remove() {
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

  async _render(options: NCLayerItem.RenderOptions) {
    this._renderOptions = {
      ...this._renderOptions,
      ...options,
    };
    if (
      //如果更改了静态的渲染设置，则需要重新加载整个particle对象
      Object.keys(options).some((name) =>
        Object.keys(defaultStaticRenderOptions).includes(name),
      )
    ) {
      if (this.instance) {
        this.instance.remove();
        this._instance = undefined;
        const particleObj = new Particle3D(this.earth.viewer, {
          ...this.data,
          ...this._renderOptions,
          input: this.inputFile,
          userInput: this._renderOptions,
        });
        await particleObj.init();
        particleObj.show();
        this._instance = particleObj;
      }
    } else {
      //否则，由于只加载了静态选项，所以可以直接更改渲染设置
      if (this.instance) {
        this.instance.optionsChange(this._renderOptions); // 更新粒子系统配置
      }
    }

    this.earth.viewer.scene.requestRender();
    return this.instance;
  }
}

export namespace NCLayerItem {
  export type Method = "nc";

  //补全每一项的类型
  export type Fields = {
    U?: string;
    V?: string;
    W?: string;
    H?: string;
    lon?: string;
    lat?: string;
    lev?: string;
  };
  export type NCImageryProviderOptions = {
    fileType?: "nc" | "json";
    fields?: Fields;
  };

  //静态的渲染选项，需要重新加载ParticleOBJ。
  export type NCStaticRenderOptions = {
    colorTable?: number[][];
    colour?: "speed" | "height";
    valueRange?: {
      min?: number;
      max?: number;
    };
    offset?: {
      lon?: number;
      lat?: number;
      lev?: number;
    };
  };
  //动态的渲染选项，可以直接替换。
  export type NCActiveRenderOptions = {
    maxParticles?: number;
    particleHeight?: number;
    fadeOpacity?: number;
    dropRate?: number;
    dropRateBump?: number;
    speedFactor?: number;
    lineWidth?: number;
    dynamic?: boolean;
  };

  //完整的渲染选项，对用户可见
  export type NCImageryProviderRenderOptions = {
    colorTable?: number[][];
    maxParticles?: number;
    particleHeight?: number;
    fadeOpacity?: number;
    dropRate?: number;
    dropRateBump?: number;
    speedFactor?: number;
    lineWidth?: number;
    dynamic?: boolean;
    colour?: "speed" | "height";
    valueRange?: {
      min?: number;
      max?: number;
    };
    offset?: {
      lon?: number;
      lat?: number;
      lev?: number;
    };
  };

  export type Data = LayerManager.BaseLayer<Method, RenderOptions> &
    NCImageryProviderOptions & {
      url: string | Blob | JsonData;
    };

  export type Instance = Particle3D;

  export type RenderOptions = NCImageryProviderRenderOptions;
}
