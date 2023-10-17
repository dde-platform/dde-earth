import { TIFFLayerLoader } from '@dde-earth/plugin-tiff-loader';
import {
  LayerLoaders,
  LayerSwitcher,
  Subscriber,
} from '@dde-earth/recommend-plugins';
import { ArcGisMapServerImageryProvider, ImageryLayer } from 'cesium';
import { Earth } from 'dde-earth';

import type { I18N } from 'dde-earth';

import './index.css';

import { NCLayerLoader } from '@dde-earth/plugin-nc-loader';

// Earth initialization
const earth = new Earth('container', {
  baseLayer: ImageryLayer.fromProviderAsync(
    ArcGisMapServerImageryProvider.fromUrl(
      'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
      {
        enablePickFeatures: false,
      },
    ),
    {},
  ),
  toolOptions: {
    i18n: {},
  },
});

// use earth subscriber plugin
earth.usePlugin(new Subscriber(), {
  pickResult: {
    enable: true,
  },
});

earth.on('LEFT_CLICK', (movement, result) => {
  console.log(movement, result);
});

// Globalization test
const msg = {
  'dde-earth': {
    home: 'test',
    test: 'test',
  },
};
earth.i18n.extend({
  'de-DE': {
    'dde-earth': {
      home: 'Geh nach Hause',
    },
  },
  'en-US': msg,
});

earth.i18n.locale = 'de-DE' as any;
const str = (earth.i18n.getT as I18N.TranslateFunc<typeof msg>)('dde-earth')(
  'test',
);
console.log(str);

setTimeout(async () => {
  // use basic layer loader
  earth.usePlugin(
    new LayerLoaders({
      defaultRenderOptions: {
        wms: {
          alpha: 0.5,
        },
      },
    }),
  );

  const wmsLayer = await earth.addLayer({
    layerName: 'wms',
    method: 'wms',
    url: 'https://ahocevar.com/geoserver/wms',
    layers: 'ne:ne',
    renderOptions: {
      hue: 3,
    },
  });
  console.log(wmsLayer);

  const plugin = earth.getPlugin('layer');
  console.log(plugin);

  // use tiff layer loader plugin
  earth.usePlugin(new TIFFLayerLoader());
  const tiffLayer = await earth.addLayer({
    method: 'tiff',
    url: '/cogtif.tif',
    layerName: 'cogtiff',
    renderOptions: {
      alpha: 0.5,
    },
  });
  tiffLayer.render({
    alpha: 1,
    single: {
      colorScale: 'rainbow',
    },
  });
  console.log(tiffLayer);

  // use LayerSwither plugin
  earth.usePlugin(new LayerSwitcher());
  earth.on('layer:move', (info) => console.log('layer:move', info));
  earth.moveLayer(wmsLayer, tiffLayer);
}, 0);

//NC图层加载测试
const defaultValueRange = { min: -100, max: 100 };
const defaultOffset = { lon: 0, lat: 0, lev: 0 };
// 默认的粒子运行参数
const defaultParticleSystemOptions = {
  maxParticles: 500 * 500, // 最大粒子数(会自动取平方数)
  particleHeight: 1000.0, // 粒子高度
  fadeOpacity: 0.95, // 拖尾透明度
  dropRate: 0.003, // 粒子重置率
  dropRateBump: 0.01, // 随速度增加的粒子重置率百分比，速度越快越密集，
  // 最终的粒子重置率particleDropRate = dropRate + dropRateBump * speedNorm;
  speedFactor: 0.5, // 粒子速度
  lineWidth: 4.0, // 线宽
  dynamic: true, // 是否动态运行
};
// 默认的颜色配置
// colorTalbe默认为白色，传入的数组为``[[r, g , b], [r, g, b], ...]``格式
// 例：[[234 / 255, 0, 0], [0, 123 / 255, 0]]，对应粒子colour字段值从低到高
const defaultColorTable = [
  [0.015686, 0.054902, 0.847059],
  [0.12549, 0.313725, 1.0],
  [0.254902, 0.588235, 1.0],
  [0.427451, 0.756863, 1.0],
  [0.52549, 0.85098, 1.0],
  [0.611765, 0.933333, 1.0],
  [0.686275, 0.960784, 1.0],
  [0.807843, 1.0, 1.0],
  [1.0, 0.996078, 0.278431],
  [1.0, 0.921569, 0.0],
  [1.0, 0.768627, 0.0],
  [1.0, 0.564706, 0.0],
  [1.0, 0.282353, 0.0],
  [1.0, 0.0, 0.0],
  [0.835294, 0.0, 0.0],
  [0.619608, 0.0, 0.0],
];
const defaultColour = 'speed';

const basicRenderOptions: any = {
  valueRange: defaultValueRange,
  offset: defaultOffset,
  userInput: defaultParticleSystemOptions,
  colorTable: defaultColorTable,
  colour: defaultColour,
};

const file: Blob[] | undefined = [];
const fileInput: any = document.getElementById('fileInput');
fileInput.onchange = function () {
  file[0] = fileInput.files[0];
  console.log(file[0]);
};

const loadButton = document.getElementById('load');
loadButton.addEventListener('click', () => {
  earth.usePlugin(new NCLayerLoader());
  earth
    .addLayer({
      layerName: 'nc-demo',
      method: 'nc',
      input: file[0],
      //renderOptions: basicRenderOptions,
    })
    .then((layer) => {
      layer.render({
        layer: layer.instance,
        ...basicRenderOptions,
      });
      console.log(layer);
    });
});
