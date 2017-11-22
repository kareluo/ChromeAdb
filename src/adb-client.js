'use strict';

import TCPClient from './tcp-client';
import ADBUtils from './adb-utils';

function ADBClient() {
  this.exec("devices-l");
};

ADBClient.prototype.exec = function (command) {
  let client = new TCPClient({
    host: "127.0.0.1",
    port: 5037,
    onOpen: function() {
      console.log("onOpen");
    },
    onMessage: function(message) {
      console.log("onMessage");
    },
    onResponse: function(response) {
      console.log(response);
    },
    onError: function(error) {
      console.log(error);
    }
  });

  client.connect(() => {
    client.sendText(ADBUtils.withHost(command));
  });
};

export default ADBClient;
