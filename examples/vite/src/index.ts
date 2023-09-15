import { Earth } from 'dde-earth';

import './index.css';

const earth = new Earth('container');

earth.on('LEFT_CLICK', (event) => {
  console.log(event);
});
