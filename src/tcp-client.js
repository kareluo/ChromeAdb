'use strict';

import Commons from './commons';
import StringBuilder from './string-builder';

function TCPClient(config) {
  this.config = config || {};
  this.config.host = this.config.host || "127.0.0.1";
  this.config.port = this.config.port || 80;

  this.socketId = null;
  this.messages = new StringBuilder(1024);
};

TCPClient.prototype._create = function (callback) {
  chrome.sockets.tcp.create({}, info => {
    if(chrome.runtime.lastError) {
      this._onError(chrome.runtime.lastError);
    } else {
      callback(info.socketId);
    }
  });
};

TCPClient.prototype._connect = function (callback) {
  chrome.sockets.tcp.connect(this.socketId, this.config.host, this.config.port, result => {
    if(chrome.runtime.lastError) {
      this._onError(chrome.runtime.lastError);
    } else if (result < 0) {
      this._onError("Unable to connect server: " + result);
    } else {
      this._onOpen();
      if(callback) callback();
    }
  });
};

TCPClient.prototype._onOpen = function() {
  chrome.sockets.tcp.onReceive.addListener(this._onReceive.bind(this));
  chrome.sockets.tcp.onReceiveError.addListener(this._onReceiveError.bind(this));
  if(this.config.onOpen) {
    this.config.onOpen();
  }
};

TCPClient.prototype._onReceive = function(info) {
  if (info.socketId === this.socketId && info.data) {
    if(this.config.onReceive) {
      this.config.onReceive(info.data);
    }
    if(this.config.onResponse) {
      Commons.abts(info.data, message => {
        this.messages.append(message);
      });
    }
  }
};

TCPClient.prototype._onReceiveError = function(info) {
  if (info.socketId === this.socketId) {
    if(info.resultCode === -100) {
      this._onClose();
    } else {
      this._onError("Unable to receive data from socket: " + info.resultCode);
    }
  }
};

TCPClient.prototype._onError = function(error) {
  if(this.config.onError) {
    this.config.onError(error);
  }
};

TCPClient.prototype._onClose = function() {
  chrome.sockets.tcp.onReceive.removeListener(this._onReceive);
  chrome.sockets.tcp.onReceiveError.removeListener(this._onReceiveError);
  this.socketId = null;
  if(this.config.onResponse) {
    console.log(this.messages.xxx());
    console.log(this.messages.toString());
    this.config.onResponse(this.messages.toString());
  }
  if(this.config.onClose) {
    this.config.onClose();
  }
};

TCPClient.prototype.connect = function(callback) {
  return this._create(socketId => {
    this.socketId = socketId;
    this._connect(callback);
  });
};

TCPClient.prototype.send = function(buffer, callback) {
  chrome.sockets.tcp.send(this.socketId, buffer, info => {
    if(callback) callback(info);
  });
};

TCPClient.prototype.sendText = function(message, callback) {
  Commons.stab(message, buffer => {
    this.send(buffer, callback);
  });
};

export default TCPClient;
