/* */ 
'use strict';
exports.type = 'perItem';
exports.active = true;
exports.description = 'rounds numeric values to the fixed precision, removes default ‘px’ units';
exports.params = {
  floatPrecision: 3,
  leadingZero: true,
  defaultPx: true,
  convertToPx: true
};
var regNumericValues = /^([\-+]?\d*\.?\d+([eE][\-+]?\d+)?)(px|pt|pc|mm|cm|m|in|ft|em|ex|%)?$/,
    removeLeadingZero = require('../lib/svgo/tools').removeLeadingZero,
    absoluteLengths = {
      cm: 96 / 2.54,
      mm: 96 / 25.4,
      in: 96,
      pt: 4 / 3,
      pc: 16
    };
exports.fn = function(item, params) {
  if (item.isElem()) {
    var match;
    item.eachAttr(function(attr) {
      match = attr.value.match(regNumericValues);
      if (match) {
        var num = +(+match[1]).toFixed(params.floatPrecision),
            units = match[3] || '';
        if (params.convertToPx && units && (units in absoluteLengths)) {
          var pxNum = +(absoluteLengths[units] * match[1]).toFixed(params.floatPrecision);
          if (String(pxNum).length < match[0].length)
            num = pxNum, units = 'px';
        }
        if (params.leadingZero) {
          num = removeLeadingZero(num);
        }
        if (params.defaultPx && units === 'px') {
          units = '';
        }
        attr.value = num + units;
      }
    });
  }
};
