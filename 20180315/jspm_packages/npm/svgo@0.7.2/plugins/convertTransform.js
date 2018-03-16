/* */ 
'use strict';
exports.type = 'perItem';
exports.active = true;
exports.description = 'collapses multiple transformations and optimizes it';
exports.params = {
  convertToShorts: true,
  floatPrecision: 3,
  transformPrecision: 5,
  matrixToTransform: true,
  shortTranslate: true,
  shortScale: true,
  shortRotate: true,
  removeUseless: true,
  collapseIntoOne: true,
  leadingZero: true,
  negativeExtraSpace: false
};
var cleanupOutData = require('../lib/svgo/tools').cleanupOutData,
    EXTEND = require('whet.extend'),
    transform2js = require('./_transforms').transform2js,
    transformsMultiply = require('./_transforms').transformsMultiply,
    matrixToTransform = require('./_transforms').matrixToTransform,
    degRound,
    floatRound,
    transformRound;
exports.fn = function(item, params) {
  if (item.elem) {
    if (item.hasAttr('transform')) {
      convertTransform(item, 'transform', params);
    }
    if (item.hasAttr('gradientTransform')) {
      convertTransform(item, 'gradientTransform', params);
    }
    if (item.hasAttr('patternTransform')) {
      convertTransform(item, 'patternTransform', params);
    }
  }
};
function convertTransform(item, attrName, params) {
  var data = transform2js(item.attr(attrName).value);
  params = definePrecision(data, params);
  if (params.collapseIntoOne && data.length > 1) {
    data = [transformsMultiply(data)];
  }
  if (params.convertToShorts) {
    data = convertToShorts(data, params);
  } else {
    data.forEach(roundTransform);
  }
  if (params.removeUseless) {
    data = removeUseless(data);
  }
  if (data.length) {
    item.attr(attrName).value = js2transform(data, params);
  } else {
    item.removeAttr(attrName);
  }
}
function definePrecision(data, params) {
  var matrixData = data.reduce(getMatrixData, []),
      significantDigits = params.transformPrecision;
  params = EXTEND({}, params);
  if (matrixData.length) {
    params.transformPrecision = Math.min(params.transformPrecision, Math.max.apply(Math, matrixData.map(floatDigits)) || params.transformPrecision);
    significantDigits = Math.max.apply(Math, matrixData.map(function(n) {
      return String(n).replace(/\D+/g, '').length;
    }));
  }
  if (!('degPrecision' in params)) {
    params.degPrecision = Math.max(0, Math.min(params.floatPrecision, significantDigits - 2));
  }
  floatRound = params.floatPrecision >= 1 && params.floatPrecision < 20 ? smartRound.bind(this, params.floatPrecision) : round;
  degRound = params.degPrecision >= 1 && params.floatPrecision < 20 ? smartRound.bind(this, params.degPrecision) : round;
  transformRound = params.transformPrecision >= 1 && params.floatPrecision < 20 ? smartRound.bind(this, params.transformPrecision) : round;
  return params;
}
function getMatrixData(a, b) {
  return b.name == 'matrix' ? a.concat(b.data.slice(0, 4)) : a;
}
function floatDigits(n) {
  return (n = String(n)).slice(n.indexOf('.')).length - 1;
}
function convertToShorts(transforms, params) {
  for (var i = 0; i < transforms.length; i++) {
    var transform = transforms[i];
    if (params.matrixToTransform && transform.name === 'matrix') {
      var decomposed = matrixToTransform(transform, params);
      if (decomposed != transform && js2transform(decomposed, params).length <= js2transform([transform], params).length) {
        transforms.splice.apply(transforms, [i, 1].concat(decomposed));
      }
      transform = transforms[i];
    }
    roundTransform(transform);
    if (params.shortTranslate && transform.name === 'translate' && transform.data.length === 2 && !transform.data[1]) {
      transform.data.pop();
    }
    if (params.shortScale && transform.name === 'scale' && transform.data.length === 2 && transform.data[0] === transform.data[1]) {
      transform.data.pop();
    }
    if (params.shortRotate && transforms[i - 2] && transforms[i - 2].name === 'translate' && transforms[i - 1].name === 'rotate' && transforms[i].name === 'translate' && transforms[i - 2].data[0] === -transforms[i].data[0] && transforms[i - 2].data[1] === -transforms[i].data[1]) {
      transforms.splice(i - 2, 3, {
        name: 'rotate',
        data: [transforms[i - 1].data[0], transforms[i - 2].data[0], transforms[i - 2].data[1]]
      });
      i -= 2;
      transform = transforms[i];
    }
  }
  return transforms;
}
function removeUseless(transforms) {
  return transforms.filter(function(transform) {
    if (['translate', 'rotate', 'skewX', 'skewY'].indexOf(transform.name) > -1 && (transform.data.length == 1 || transform.name == 'rotate') && !transform.data[0] || transform.name == 'translate' && !transform.data[0] && !transform.data[1] || transform.name == 'scale' && transform.data[0] == 1 && (transform.data.length < 2 || transform.data[1] == 1) || transform.name == 'matrix' && transform.data[0] == 1 && transform.data[3] == 1 && !(transform.data[1] || transform.data[2] || transform.data[4] || transform.data[5])) {
      return false;
    }
    return true;
  });
}
function js2transform(transformJS, params) {
  var transformString = '';
  transformJS.forEach(function(transform) {
    roundTransform(transform);
    transformString += (transformString && ' ') + transform.name + '(' + cleanupOutData(transform.data, params) + ')';
  });
  return transformString;
}
function roundTransform(transform) {
  switch (transform.name) {
    case 'translate':
      transform.data = floatRound(transform.data);
      break;
    case 'rotate':
      transform.data = degRound(transform.data.slice(0, 1)).concat(floatRound(transform.data.slice(1)));
      break;
    case 'skewX':
    case 'skewY':
      transform.data = degRound(transform.data);
      break;
    case 'scale':
      transform.data = transformRound(transform.data);
      break;
    case 'matrix':
      transform.data = transformRound(transform.data.slice(0, 4)).concat(floatRound(transform.data.slice(4)));
      break;
  }
  return transform;
}
function round(data) {
  return data.map(Math.round);
}
function smartRound(precision, data) {
  for (var i = data.length,
      tolerance = +Math.pow(.1, precision).toFixed(precision); i--; ) {
    if (data[i].toFixed(precision) != data[i]) {
      var rounded = +data[i].toFixed(precision - 1);
      data[i] = +Math.abs(rounded - data[i]).toFixed(precision + 1) >= tolerance ? +data[i].toFixed(precision) : rounded;
    }
  }
  return data;
}
