/* */ 
'use strict';
exports.type = 'perItem';
exports.active = false;
exports.description = 'rounds list of values to the fixed precision';
exports.params = {
  floatPrecision: 3,
  leadingZero: true,
  defaultPx: true,
  convertToPx: true
};
var regNumericValues = /^([\-+]?\d*\.?\d+([eE][\-+]?\d+)?)(px|pt|pc|mm|cm|m|in|ft|em|ex|%)?$/,
    regSeparator = /\s+,?\s*|,\s*/,
    removeLeadingZero = require('../lib/svgo/tools').removeLeadingZero,
    absoluteLengths = {
      cm: 96 / 2.54,
      mm: 96 / 25.4,
      in: 96,
      pt: 4 / 3,
      pc: 16
    };
exports.fn = function(item, params) {
  if (item.hasAttr('points')) {
    roundValues(item.attrs.points);
  }
  if (item.hasAttr('enable-background')) {
    roundValues(item.attrs['enable-background']);
  }
  if (item.hasAttr('viewBox')) {
    roundValues(item.attrs.viewBox);
  }
  if (item.hasAttr('stroke-dasharray')) {
    roundValues(item.attrs['stroke-dasharray']);
  }
  if (item.hasAttr('dx')) {
    roundValues(item.attrs.dx);
  }
  if (item.hasAttr('dy')) {
    roundValues(item.attrs.dy);
  }
  if (item.hasAttr('x')) {
    roundValues(item.attrs.x);
  }
  if (item.hasAttr('y')) {
    roundValues(item.attrs.y);
  }
  function roundValues($prop) {
    var num,
        units,
        match,
        matchNew,
        lists = $prop.value,
        listsArr = lists.split(regSeparator),
        roundedListArr = [],
        roundedList;
    listsArr.forEach(function(elem) {
      match = elem.match(regNumericValues);
      matchNew = elem.match(/new/);
      if (match) {
        num = +(+match[1]).toFixed(params.floatPrecision), units = match[3] || '';
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
        roundedListArr.push(num + units);
      } else if (matchNew) {
        roundedListArr.push('new');
      }
    });
    roundedList = roundedListArr.join(' ');
    $prop.value = roundedList;
  }
};
