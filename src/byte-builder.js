'use strict';

function ByteBuilder(maxLength = 1024) {
   this.maxLength = maxLength;
   this.offset = 0;
   this.buffers = new Uint8Array(new ArrayBuffer(maxLength));
};

ByteBuilder.prototype.append = function(buffer) {
   if(buffer) {
     if(this.offset + buffer.byteLength <= this.maxLength) {
       this.buffers.set(new Uint8Array(buffer), this.offset);
       this.offset += buffer.byteLength;
     }
   }
};

ByteBuilder.prototype.clear = function() {
   this.offset = 0;
};

ByteBuilder.prototype.isEmpty = function() {
   return this.offset == 0;
};

ByteBuilder.prototype.toArrayBuffer = function() {
   return this.buffers.slice(0, this.offset);
};

export default ByteBuilder;
