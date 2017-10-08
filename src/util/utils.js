
define(() => {
  'use strict';

  function getWithLength(command) {
    return command.length.toString(16).padStart(4, '0') + command;
  };
  
  return {
    getWithLength: getWithLength
  };
});
