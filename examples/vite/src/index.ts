import { LayerLoaders, Subscriber } from '@dde-earth/recommend-plugins';
import { ArcGisMapServerImageryProvider, ImageryLayer } from 'cesium';
import { Earth } from 'dde-earth';

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
const str = earth.i18n.getT<typeof msg>('dde-earth')('test');
console.log(str);

earth.usePlugin(new LayerLoaders());

const layer = await earth.addLayer(
  {
    layerName: 'wms',
    method: 'wms',
    url: 'https://ahocevar.com/geoserver/wms',
    layers: 'ne:ne',
    renderOptions: {
      hue: 3,
    },
  },
  {
    zoom: true,
  },
);

console.log(layer);
layer.render({
  alpha: 0.5,
});
console.log(earth.isSubscriberEnabled());
