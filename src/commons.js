'use strict';

function _ArrayBufferToString(buf, callback) {
  var fr = new FileReader();
  fr.onload = function(e) {
    callback(e.target.result);
  };
  var blob=new Blob([ buf ], { type: 'application/octet-stream' });
  fr.readAsText(blob);
};

function _StringToArrayBuffer(str, callback) {
  var bb = new Blob([str]);
  var fr = new FileReader();
  fr.onload = function(e) {
     callback(e.target.result);
  };
  fr.readAsArrayBuffer(bb);
};

function _AdbCommandWithLength(command) {
  return command.length.toString(16).padStart(4, '0') + command;
};

function Commons() {

};
Commons.stab = _StringToArrayBuffer;
Commons.acwl = _AdbCommandWithLength;
Commons.abts = _ArrayBufferToString;

export default Commons;
