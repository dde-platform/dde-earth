import { Subscriber } from '@dde-earth/recommend-plugins';
import { Earth } from 'dde-earth';

import './index.css';

const earth = new Earth('container', {
  toolOptions: {
    i18n: {},
  },
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
