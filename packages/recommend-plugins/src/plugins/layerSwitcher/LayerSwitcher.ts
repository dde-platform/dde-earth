import {
  Cesium3DTileset,
  ImageryLayer,
  Primitive,
  PrimitiveCollection,
} from "cesium";
import { DataSource } from "cesium";
import { BasePlugin, Debug } from "dde-earth";

import type { Earth, LayerItem } from "dde-earth";

export class LayerSwitcher extends BasePlugin {
  name = "LayerSwitcher";

  constructor() {
    super();
  }

  init(earth: Earth) {
    this._init(earth);
    return this;
  }

  /**
   * 将栅格图层拖拽到目标位置
   * @param dragLayer 拖拽图层
   * @param dropLayer 目标图层
   * @returns boolean
   */
  private _moveImageLayer(dragLayer: ImageryLayer, dropLayer: ImageryLayer) {
    if (!dragLayer || !dropLayer) {
      return false;
    }
    try {
      const { imageryLayers } = this.viewer;
      const dragIndex = imageryLayers.indexOf(dragLayer);
      const dropIndex = imageryLayers.indexOf(dropLayer);

      if (dragIndex == -1 || dropIndex == -1) return false;
      const num = dropIndex - dragIndex;

      if (num <= 0) {
        for (let i = num; i < 0; i += 1) {
          imageryLayers.lower(dragLayer);
        }
      } else {
        for (let i = 0; i < num; i += 1) {
          imageryLayers.raise(dragLayer);
        }
      }
      this.viewer.scene.requestRender();
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 将矢量图层拖拽到目标位置
   * @param dragLayer 拖拽图层
   * @param dropLayer 目标图层
   * @returns boolean
   */
  private _moveVectorLayer(dragLayer: DataSource, dropLayer: DataSource) {
    if (!dragLayer || !dropLayer) {
      return false;
    }
    try {
      const { dataSources } = this.viewer;
      const dragIndex = dataSources.indexOf(dragLayer);
      const dropIndex = dataSources.indexOf(dropLayer);
      if (dragIndex == -1 || dropIndex == -1) return false;

      const num = dropIndex - dragIndex;
      if (num <= 0) {
        for (let i = num; i < 0; i += 1) {
          dataSources.lower(dragLayer);
        }
      } else {
        for (let i = 0; i < num; i += 1) {
          dataSources.raise(dragLayer);
        }
      }
      this.viewer.scene.requestRender();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 将primitive图层拖拽到目标位置
   * @param dragLayer 拖拽图层
   * @param dropLayer 目标图层
   * @returns boolean
   */
  private _movePrimitiveLayer(dragLayer: any, dropLayer: any) {
    if (!dragLayer || !dropLayer) {
      return false;
    }
    try {
      const { primitives } = this.viewer.scene;
      let dragIndex = -1;
      let dropIndex = -1;
      for (let i = 0; i < primitives.length; i += 1) {
        const primitive = primitives.get(i);
        if (primitive === dragLayer) {
          dragIndex = i;
        }
        if (primitive === dropLayer) {
          dropIndex = i;
        }
      }
      if (dragIndex == -1 || dropIndex == -1) return false;

      const num = dropIndex - dragIndex;
      if (num <= 0) {
        for (let i = num; i < 0; i += 1) {
          primitives.lower(dragLayer);
        }
      } else {
        for (let i = 0; i < num; i += 1) {
          primitives.raise(dragLayer);
        }
      }
      this.viewer.scene.requestRender();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * move source layer upper to target layer
   * @param sourceLayer
   * @param targetLayer
   * @returns boolean
   */
  moveLayer(source: LayerItem, target: LayerItem) {
    let bool = false,
      avaliable = false;
    const sourceLayer = source.instance,
      targetLayer = target.instance;

    if (
      sourceLayer instanceof ImageryLayer &&
      targetLayer instanceof ImageryLayer
    ) {
      avaliable = true;
      bool = this._moveImageLayer(sourceLayer, targetLayer);
    }
    if (
      sourceLayer instanceof DataSource &&
      targetLayer instanceof DataSource
    ) {
      avaliable = true;
      bool = this._moveVectorLayer(sourceLayer, targetLayer);
    }
    if (
      [sourceLayer, targetLayer].every((layer) =>
        [Cesium3DTileset, Primitive, PrimitiveCollection].some(
          (type) => layer instanceof type,
        ),
      )
    ) {
      avaliable = true;
      bool = this._movePrimitiveLayer(sourceLayer, targetLayer);
    }
    if (bool) {
      const sourceIndex = this.earth.layerManager.layerList.findIndex(
        (item) => item === source,
      );
      const targetIndex = this.earth.layerManager.layerList.findIndex(
        (item) => item === target,
      );
      if (sourceIndex !== -1 && targetIndex !== -1) {
        this.earth.layerManager.layerList.splice(targetIndex + 1, 0, source);
        this.earth.layerManager.layerList.splice(sourceIndex, 1);
      }
      this.earth.emit("layer:move", {
        sourceLayer,
        targetLayer,
        sourceIndex,
        targetIndex,
        layerList: this.earth.layerManager.layerList,
      });
    } else {
      if (avaliable) {
        Debug.warn(
          `Move layer avaliable, but failed, please check if the input layer has been loaded`,
        );
      }
    }

    return bool;
  }
}
