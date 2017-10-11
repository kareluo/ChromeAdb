
define(() => {
  'use strict';

  function adbCommandWithLength(command) {
    return command.length.toString(16).padStart(4, '0') + command;
  }

  function convertArrayBufferToString(buf, callback) {
    var fr = new FileReader();
    fr.onload = function(e) {
      callback(e.target.result);
    };
    var blob=new Blob([ buf ], { type: 'application/octet-stream' });
    fr.readAsText(blob);
  };

  function convertStringToArrayBuffer(str, callback) {
    var bb = new Blob([str]);
    var fr = new FileReader();
    fr.onload = function(e) {
       callback(e.target.result);
    };
    fr.readAsArrayBuffer(bb);
  };

  return {
    adbCmdWithLength: adbCommandWithLength,
    AB2String: convertArrayBufferToString,
    string2AB: convertStringToArrayBuffer
  };
});
