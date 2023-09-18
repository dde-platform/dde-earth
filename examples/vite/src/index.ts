import { Subscriber } from '@dde-earth/recommend-plugins';
import { Earth } from 'dde-earth';

import './index.css';

const earth = new Earth('container');
earth.usePlugin(new Subscriber(), {
  pickResult: {
    enable: true,
  },
});

earth.on('LEFT_CLICK', (movement, result) => {
  console.log(movement, result);
});
