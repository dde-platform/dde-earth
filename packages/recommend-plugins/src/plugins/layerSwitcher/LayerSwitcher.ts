import {
  Cesium3DTileset,
  ImageryLayer,
  Primitive,
  PrimitiveCollection,
} from 'cesium';
import { BasePlugin } from 'dde-earth';

import type { DataSource } from 'cesium';
import type { Earth, LayerItem } from 'dde-earth';

export class LayerSwitcher extends BasePlugin {
  name = 'LayerSwitcher';

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
    } catch {
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
      let dragIndex = 0;
      let dropIndex = 0;
      for (let i = 0; i < primitives.length; i += 1) {
        const primitive = primitives.get(i);
        if (primitive === dragLayer) {
          dragIndex = i;
        }
        if (primitive === dropLayer) {
          dropIndex = i;
        }
      }
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
   * 移动不同类型的图层
   * @param targetLayer
   * @param sourceLayer
   * @returns boolean
   */
  moveLayer = (target: LayerItem, source: LayerItem) => {
    let bool = false;
    const targetLayer = target.instance,
      sourceLayer = source.instance;

    if (
      targetLayer instanceof ImageryLayer &&
      sourceLayer instanceof ImageryLayer
    ) {
      bool = this._moveImageLayer(targetLayer, sourceLayer);
    }
    if (targetLayer.entities && sourceLayer.entities) {
      bool = this._moveVectorLayer(targetLayer, sourceLayer);
    }
    if (
      [targetLayer, sourceLayer].every((layer) =>
        [Cesium3DTileset, Primitive, PrimitiveCollection].some(
          (type) => layer instanceof type,
        ),
      )
    ) {
      bool = this._movePrimitiveLayer(targetLayer, sourceLayer);
    }
    if (bool) {
      const targetIndex = this.earth.layerManager.layerList.findIndex(
        (item) => item === target,
      );
      const sourceIndex = this.earth.layerManager.layerList.findIndex(
        (item) => item === source,
      );
      if (targetIndex !== -1 && sourceIndex !== -1) {
        this.earth.layerManager.layerList[targetIndex] = source;
        this.earth.layerManager.layerList[sourceIndex] = target;
      }
      this.earth.emit('layer:move', {
        targetLayer,
        sourceLayer,
        targetIndex,
        sourceIndex,
        layerList: this.earth.layerManager.layerList,
      });
    }

    return bool;
  };
}
