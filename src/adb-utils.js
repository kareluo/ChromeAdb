'use strict';

function ADBUtils() {

};

ADBUtils.withShell = function (cmd) {
  return ADBUtils.withLength("shell:" + cmd);
};

ADBUtils.withHost = function (cmd) {
  return ADBUtils.withLength("host:" + cmd);
};

ADBUtils.withTransport = function(serial) {
  return ADBUtils.withHost("transport:" + serial);
};

ADBUtils.withLength = function(cmd) {
  return cmd.length.toString(16).padStart(4, '0') + cmd;
};

export default ADBUtils;
