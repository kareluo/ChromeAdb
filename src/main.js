'use strict';

import _ from 'lodash';
import ChromeAdb from './chrome-adb';

function component() {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ',,,');
  var adb = new ChromeAdb();
  adb.devices(devices => {
    console.log(devices);
  })

  return element;
}

document.body.appendChild(component());
