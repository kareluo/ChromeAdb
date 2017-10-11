'use strict';

chrome.app.runtime.onLaunched.addListener(function(){
 chrome.app.window.create('./chrome-extensions/index.html', {
   'bounds': {
     'width': 360,
     'height': 640
    }
  });
});
