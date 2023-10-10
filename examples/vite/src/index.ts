import { TIFFLayerLoader } from '@dde-earth/plugin-tiff-loader';
import { LayerLoaders, Subscriber } from '@dde-earth/recommend-plugins';
import { ArcGisMapServerImageryProvider, ImageryLayer } from 'cesium';
import { Earth } from 'dde-earth';

import type { I18N } from 'dde-earth';

import './index.css';

const earth = new Earth('container', {
  toolOptions: {
    i18n: {},
  },
  baseLayer: ImageryLayer.fromProviderAsync(
    ArcGisMapServerImageryProvider.fromUrl(
      'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
      {
        enablePickFeatures: false,
      },
    ),
    {},
  ),
});
earth.usePlugin(new Subscriber(), {
  pickResult: {
    enable: true,
  },
});

earth.on('LEFT_CLICK', (movement, result) => {
  console.log(movement, result);
});
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

earth.usePlugin(
  new LayerLoaders({
    defaultRenderOptions: {
      wms: {
        alpha: 0.5,
      },
    },
  }),
);

earth
  .addLayer({
    layerName: 'wms',
    method: 'wms',
    url: 'https://ahocevar.com/geoserver/wms',
    layers: 'ne:ne',
    renderOptions: {
      hue: 3,
    },
  })
  .then((layer) => {
    console.log(layer);
  });

const plugin = earth.getPlugin('layer');
console.log(plugin);

earth.usePlugin(new TIFFLayerLoader());
earth
  .addLayer({
    method: 'tiff',
    url: '/cogtif.tif',
    layerName: 'cogtiff',
  })
  .then((layer) => {
    layer.render({
      alpha: 0.5,
      single: {
        colorScale: 'rainbow',
      },
    });
    console.log(layer);
  });
