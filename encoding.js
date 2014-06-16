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
    byteArrayToAscii: function (byteArray) {
      var result = new Array(byteArray.length);
      for (var i = 0; i < byteArray.length; i++) {
        result[i] = String.fromCharCode(byteArray[i]);
      }
      return result.join('');
    },
    byteArrayToHexArray: function (byteArray) {
      return Array.prototype.map.call(byteArray, encoding.byteAsHex);
    },
    byteArrayToHexString: function (byteArray) {
      return encoding.hexArrayToString(encoding.byteArrayToHexArray(byteArray));
    },
    byteAsHex: function (byte) {
      return ('0' + byte.toString(16)).substr(-2);
    },
    hexArrayToString: function (hexArray) {
      return hexArray.join('');
    },
    hexStringToByteArray: function (hexString) {
      var result = new Uint8Array(hexString.length / 2);
      for (var i = 0; i < hexString.length / 2; i++) {
        result[i] = parseInt(hexString.substr(i * 2, 2), 16);
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
