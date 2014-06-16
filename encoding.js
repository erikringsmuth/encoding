// Copyright (C) 2014 Erik Ringsmuth - MIT license
(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.encoding = factory();
  }
}(this, function() {
  'use strict';

  var encoding = {
    asciiToByteArray: function (ascii) {
      var result = new Uint8Array(ascii.length);
      for (var i = 0; i < ascii.length; i++) {
        result[i] = ascii.charCodeAt(i);
      }
      return result;
    },
    base64ToByteArray: function (base64) {
      return encoding.asciiToByteArray(atob(base64));
    },
    base64ToHex: function (base64) {
      return encoding.byteArrayToHex(encoding.base64ToByteArray(base64));
    },
    byteArrayToAscii: function (byteArray) {
      var result = new Array(byteArray.length);
      for (var i = 0; i < byteArray.length; i++) {
        result[i] = String.fromCharCode(byteArray[i]);
      }
      return result.join('');
    },
    byteArrayToBase64: function (byteArray) {
      return btoa(encoding.byteArrayToAscii(byteArray));
    },
    byteArrayToHex: function (byteArray) {
      return Array.prototype.map.call(byteArray, encoding.byteAsHex).join('');
    },
    byteAsHex: function (byte) {
      return ('0' + byte.toString(16)).substr(-2);
    },
    hexToBase64: function (hex) {
      return encoding.byteArrayToBase64(encoding.hexToByteArray(hex));
    },
    hexToByteArray: function (hex) {
      var result = new Uint8Array(hex.length / 2);
      for (var i = 0; i < hex.length / 2; i++) {
        result[i] = parseInt(hex.substr(i * 2, 2), 16);
      }
      return result;
    },
    iv: function (length) {
      return window.crypto.getRandomValues(new Uint8Array(length / 8 || 16));
    },
    xorByteArrays: function () {
      var byteArrays = Array.prototype.slice.call(arguments, 0);
      var result = new Uint8Array(Math.max.apply(null, byteArrays.map(function (arr) { return arr.length; })));
      byteArrays.forEach(function (array) {
        for (var i = 0; i < array.length; i++) {
          result[i] = result[i] ^ array[i];
        }
      });
      return result;
    }
  };

  return encoding;
}));
