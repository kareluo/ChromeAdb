'use strict';

import ADBClient from './adb-client';

function ChromeAdb() {
  this.adb_client = new ADBClient();
};

ChromeAdb.prototype.devices = function(callback) {
  this.adb_client.exec({
    host: "127.0.0.1",
    port: 5037,
    onResponse: function(message) {
      console.log(message);
    },
    onError: function(error) {
      console.log(error);
    }
  }, "devices-l");
};

export default ChromeAdb;
