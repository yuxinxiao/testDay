/* */ 
(function(Buffer) {
  'use strict';
  exports.encodeSVGDatauri = function(str, type) {
    var prefix = 'data:image/svg+xml';
    if (!type || type === 'base64') {
      prefix += ';base64,';
      str = prefix + new Buffer(str).toString('base64');
    } else if (type === 'enc') {
      str = prefix + ',' + encodeURIComponent(str);
    } else if (type === 'unenc') {
      str = prefix + ',' + str;
    }
    return str;
  };
  exports.decodeSVGDatauri = function(str) {
    var regexp = /data:image\/svg\+xml(;charset=[^;,]*)?(;base64)?,(.*)/;
    var match = regexp.exec(str);
    if (!match)
      return str;
    var data = match[3];
    if (match[2]) {
      str = new Buffer(data, 'base64').toString('utf8');
    } else if (data.charAt(0) === '%') {
      str = decodeURIComponent(data);
    } else if (data.charAt(0) === '<') {
      str = data;
    }
    return str;
  };
  exports.intersectArrays = function(a, b) {
    return a.filter(function(n) {
      return b.indexOf(n) > -1;
    });
  };
  exports.cleanupOutData = function(data, params) {
    var str = '',
        delimiter,
        prev;
    data.forEach(function(item, i) {
      delimiter = ' ';
      if (i === 0) {
        delimiter = '';
      }
      if (params.leadingZero) {
        item = removeLeadingZero(item);
      }
      if (params.negativeExtraSpace && (item < 0 || (String(item).charCodeAt(0) == 46 && prev % 1 !== 0))) {
        delimiter = '';
      }
      prev = item;
      str += delimiter + item;
    });
    return str;
  };
  var removeLeadingZero = exports.removeLeadingZero = function(num) {
    var strNum = num.toString();
    if (0 < num && num < 1 && strNum.charCodeAt(0) == 48) {
      strNum = strNum.slice(1);
    } else if (-1 < num && num < 0 && strNum.charCodeAt(1) == 48) {
      strNum = strNum.charAt(0) + strNum.slice(2);
    }
    return strNum;
  };
})(require('buffer').Buffer);
