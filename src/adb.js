
define("adb", ["./commons", "./tcp"], (commons, tcp) => {
  'use strict';

  function adb() {
    this.exec("devices-l")
  };

  adb.prototype.exec = function (command) {
    let client = new tcp("127.0.0.1", 5037);

    client.onDisconnect(message => {
      console.log(message);
    });

    client.connect()
    .then(() => {
      client.sendMessage(adb.getWithHost(command), info => {
        console.log(info);
      });
    })
    .catch(error => {
      console.error(error);
    });
  };

  adb.getWithShell = function (command) {
    return commons.adbCmdWithLength("shell:" + command);
  };

  adb.getWithHost = function (command) {
    return commons.adbCmdWithLength("host:" + command);
  };

  adb.getWithTransport = function(serial) {
    return adb.getWithHost("transport:" + serial);
  };

  return adb;
});
