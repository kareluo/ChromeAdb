
define(() => {
  'use strict';

  function convertArrayBufferToString(buf, callback) {
    var fr = new FileReader();
    fr.onload = function(e) {
      callback(e.target.result);
    };
    var blob=new Blob([ buf ], { type: 'application/octet-stream' });
    fr.readAsText(blob);
  };

  /**
   * Converts a string to an ArrayBuffer
   *
   * @param {String} str The string to convert
   * @param {Function} callback The function to call when conversion is complete
   */
  function convertStringToArrayBuffer(str, callback) {
    var bb = new Blob([str]);
    var fr = new FileReader();
    fr.onload = function(e) {
       callback(e.target.result);
    };
    fr.readAsArrayBuffer(bb);
  };

  return {
    convertArrayBufferToString: convertArrayBufferToString,
    convertStringToArrayBuffer: convertStringToArrayBuffer
  };
});
