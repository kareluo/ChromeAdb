'use strict';

chrome.app.runtime.onLaunched.addListener(function(){
 chrome.app.window.create('./test/index.html', {
   'bounds': {
     'width': 360,
     'height': 640
    }
  });
});