'use strict';

var assert    = require('assert'),
    encoding  = require('../encoding');

// hack the browser globals into node :(
GLOBAL.atob = require('atob');
GLOBAL.btoa = require('btoa');

describe('asciiToByteArray(ascii)', function() {
  it('should convert an ASCII string to a byte array', function() {
    // arrange
    var expected = new Uint8Array([104, 101, 108, 108, 111]);

    // act
    var actual = encoding.asciiToByteArray('hello');

    // assert
    assert.deepEqual(actual, expected);
  });
});

describe('base64ToByteArray(base64String)', function() {
  it('should convert a base64 encoded string to a byte array', function() {
    // arrange
    var expected = new Uint8Array([247, 188, 131, 244, 48, 83, 132, 36, 177, 50, 152, 230, 170, 111, 177, 67, 239, 77, 89, 161, 73, 70, 23, 89, 151, 71, 157, 188, 45, 26, 60, 216]);

    // act
    var actual = encoding.base64ToByteArray('97yD9DBThCSxMpjmqm+xQ+9NWaFJRhdZl0edvC0aPNg=');

    // assert
    assert.deepEqual(actual, expected);
  });
});

describe('base64ToHexString(base64String)', function() {
  it('should convert a base64 encoded string to a byte array', function() {
    // arrange
    var expected = 'f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8';

    // act
    var actual = encoding.base64ToHexString('97yD9DBThCSxMpjmqm+xQ+9NWaFJRhdZl0edvC0aPNg=');

    // assert
    assert.equal(actual, expected);
  });
});

describe('byteArrayToAscii(byteArray)', function() {
  it('should convert a byte array to an ASCII string', function() {
    // act
    var actual = encoding.byteArrayToAscii(new Uint8Array([104, 101, 108, 108, 111]));

    // assert
    assert.equal(actual, 'hello');
  });
});

describe('byteArrayToHexArray(byteArray)', function() {
  it('should convert a byte array to an array of hex tuples (1 byte chunks)', function() {
    // arrange
    var expected = ['d9', 'd2', 'b3', 'd6', '1f', 'fd', '97', '56', '1a', 'fc', 'db', '02', 'cf', '68', 'f4', '31'];

    // act
    var actual = encoding.byteArrayToHexArray(new Uint8Array([217, 210, 179, 214, 31, 253, 151, 86, 26, 252, 219, 2, 207, 104, 244, 49]));

    // assert
    assert.deepEqual(actual, expected);
  });
});

describe('byteArrayToHexString(byteArray)', function() {
  it('should convert a byte array to a hex string', function() {
    // arrange
    var expected = 'd9d2b3d61ffd97561afcdb02cf68f431';

    // act
    var actual = encoding.byteArrayToHexString(new Uint8Array([217, 210, 179, 214, 31, 253, 151, 86, 26, 252, 219, 2, 207, 104, 244, 49]));

    // assert
    assert.equal(actual, expected);
  });
});

describe('byteAsHex(byte)', function() {
  it('should convert a byte to it\'s hex string', function() {
    // arrange
    var expected = 'd9';

    // act
    var actual = encoding.byteAsHex(217);

    // assert
    assert.equal(actual, expected);
  });
});

describe('hexArrayToString(hexArray)', function() {
  it('should convert a hex array to a hex string', function() {
    // arrange
    var expected = 'd9d2b3d61ffd97561afcdb02cf68f431';

    // act
    var actual = encoding.hexArrayToString(['d9', 'd2', 'b3', 'd6', '1f', 'fd', '97', '56', '1a', 'fc', 'db', '02', 'cf', '68', 'f4', '31']);

    // assert
    assert.equal(actual, expected);
  });
});

describe('hexStringToBase64(hexString)', function() {
  it('should convert a hex string to a base64 encoded string', function() {
    // arrange
    var expected = '97yD9DBThCSxMpjmqm+xQ+9NWaFJRhdZl0edvC0aPNg=';

    // act
    var actual = encoding.hexStringToBase64('f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8');

    // assert
    assert.equal(actual, expected);
  });
});

describe('hexStringToByteArray(hexString)', function() {
  it('should convert a hex string to a byte array', function() {
    // arrange
    var expected = new Uint8Array([217, 210, 179, 214, 31, 253, 151, 86, 26, 252, 219, 2, 207, 104, 244, 49]);

    // act
    var actual = encoding.hexStringToByteArray('d9d2b3d61ffd97561afcdb02cf68f431');

    // assert
    assert.deepEqual(actual, expected);
  });
});

// describe('iv()', function() {
//   it('should generate a 16 byte initialization vector', function() {
//     // act
//     var actual = encoding.iv();

//     // assert
//     assert.equal(actual.length, 16);
//   });
// });

describe('xorByteArrays(array1, array2, ...)', function() {
  it('should XOR to all zeros when the byte arrays are the same', function() {
    // arrange
    var arr1 = new Uint8Array([217, 210, 179]);
    var arr2 = new Uint8Array([217, 210, 179]);
    var expected = new Uint8Array([0, 0, 0]);

    // act
    var actual = encoding.xorByteArrays(arr1, arr2);

    // assert
    assert.deepEqual(actual, expected);
  });

  it('should XOR more than two byte arrays', function() {
    // arrange
    var arr1 = new Uint8Array([217, 210, 179]);
    var arr2 = new Uint8Array([217, 210, 179]);
    var arr3 = new Uint8Array([217, 210, 179]);
    var expected = new Uint8Array([217, 210, 179]);

    // act
    var actual = encoding.xorByteArrays(arr1, arr2, arr3);

    // assert
    assert.deepEqual(actual, expected);
  });
});
