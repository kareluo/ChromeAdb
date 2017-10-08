
define(["./converter"], (converter) => {

  'use strict';

  const BUFFER_SIZE = 1024;

  function tcp(host, port) {
    this.host = host;
    this.port = port;
    this.onReceive = null;
    this.onReceiveError = null;
    this.onCallback = null;
    this.offset = 0;
    this.buffer = new Uint8Array(BUFFER_SIZE);
    this.TCP = chrome.sockets.tcp;
  };

  tcp.prototype._create = function () {
    return new Promise((resolve, reject) => {
      this.TCP.create({}, info => {
        if(chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(info.socketId);
        }
      });
    });
  };

  tcp.prototype._onReceive = function(info) {
    if (info.socketId === this.socketId && info.data) {
      if(this.offset + info.data.byteLength <= BUFFER_SIZE) {
        let array = new Uint8Array(info.data);
        this.buffer.set(array, this.offset);
        this.offset += array.length;
      }
      if(this.onReceive) {
        converter.convertArrayBufferToString(info.data, message => {
          if(this.onReceive) {
            this.onReceive(message);
          }
        });
      }
    }
  };

  tcp.prototype._onReceiveError = function(info) {
    if (info.socketId === this.socketId) {
      if(info.resultCode === -100) {
        this._onDisconnect();
      } else {
        if(this.onReceiveError) {
          this.onReceiveError("Unable to receive data from socket: " + info.resultCode);
        }
      }
    }
  };

  tcp.prototype._onDisconnect = function() {
    this.TCP.onReceive.removeListener(this._onReceive);
    this.TCP.onReceiveError.removeListener(this._onReceiveError);
    this.socketId = null;
    this.onReceive = null;
    this.onReceiveError = null;
    if(this.onCallback) {
      let buf = this.buffer.buffer.slice(0, this.offset);
      converter.convertArrayBufferToString(buf, message => {
        if(this.onCallback) {
          this.onCallback(message);
        }
      });
    }
  };

  tcp.prototype.onDisconnect = function(onDisconnect) {
    this.onCallback = onDisconnect;
  };

  tcp.prototype.onReceive = function(onReceive) {
    this.onReceive = onReceive;
  };

  tcp.prototype.onReceiveError = function(onReceiveError) {
    this.onReceiveError = onReceiveError;
  };

  tcp.prototype.connect = function() {
    return this._create()
    .then(socketId => {
      this.socketId = socketId;
      return new Promise((resolve, reject) => {
        this.TCP.connect(this.socketId, this.host, this.port, result => {
          if(chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else if (result < 0) {
            reject("Unable to connect server: " + result);
          } else {
            this.TCP.onReceive.addListener(this._onReceive.bind(this));
            this.TCP.onReceiveError.addListener(this._onReceiveError.bind(this));
            resolve();
          }
        });
      });
    });
  };

  tcp.prototype.send = function(buffer, callback) {
    this.TCP.send(this.socketId, buffer, info => {
      if(callback) callback(info);
    });
  };

  tcp.prototype.sendMessage = function(message, callback) {
    console.log(message);
    converter.convertStringToArrayBuffer(message, buffer => {
      this.TCP.send(this.socketId, buffer, info => {
        if(callback) callback(info);
      });
    });
  };

  tcp.prototype.disconnect = function() {
    this.TCP.onReceive.removeListener(this._onReceive);
    this.TCP.onReceiveError.removeListener(this._onReceiveError);
    if(this.socketId) {
      this.TCP.disconnect(this.socketId);
      this.TCP.close(this.socketId);
      this.socketId = null;
    }
    this.onReceive = null;
    this.onReceiveError = null;
    this.onDisconnect = null;
  };

  return tcp;
});
