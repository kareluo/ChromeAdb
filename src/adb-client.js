'use strict';

import TCPClient from './tcp-client';
import ADBUtils from './adb-utils';

function ADBClient() {

};

ADBClient.prototype.exec = function (config, command) {
  let _tcp_client = new TCPClient(config);
  _tcp_client.connect(() => {
    _tcp_client.sendText(ADBUtils.withHost(command));
  });
};

export default ADBClient;
