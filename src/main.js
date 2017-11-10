'use strict';

import _ from 'lodash';
import ADBClient from './adb-client';

function component() {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ',,,');
  var adb = new ADBClient();

  return element;
}

document.body.appendChild(component());
