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
