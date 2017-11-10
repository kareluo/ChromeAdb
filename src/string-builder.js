'use strict';

function StringBuilder(maxLength = 1024) {
   this.maxLength = maxLength;
   this.buffers = [];
};

StringBuilder.prototype.append = function(text) {
   if(text) {
      if(this.buffers.length < this.maxLength) {
        this.buffers.push(text);
      }
   }
};

StringBuilder.prototype.clear = function() {
   this.buffers = [];
};

StringBuilder.prototype.isEmpty = function() {
   return this.buffers.length == 0;
};

StringBuilder.prototype.toString = function() {
   return this.buffers.join("");
};

StringBuilder.prototype.xxx = function() {
   return this.buffers.join("");
};

export default StringBuilder;
