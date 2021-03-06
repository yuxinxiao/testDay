/* */ 
'use strict';
exports.type = 'perItem';
exports.active = true;
exports.description = 'removes useless stroke and fill attributes';
exports.params = {
  stroke: true,
  fill: true
};
var shape = require('./_collections').elemsGroups.shape,
    regStrokeProps = /^stroke/,
    regFillProps = /^fill-/,
    styleOrScript = ['style', 'script'],
    hasStyleOrScript = false;
exports.fn = function(item, params) {
  if (item.isElem(styleOrScript)) {
    hasStyleOrScript = true;
  }
  if (!hasStyleOrScript && item.isElem(shape) && !item.computedAttr('id')) {
    var stroke = params.stroke && item.computedAttr('stroke'),
        fill = params.fill && !item.computedAttr('fill', 'none');
    if (params.stroke && (!stroke || stroke == 'none' || item.computedAttr('stroke-opacity', '0') || item.computedAttr('stroke-width', '0'))) {
      var parentStroke = item.parentNode.computedAttr('stroke'),
          declineStroke = parentStroke && parentStroke != 'none';
      item.eachAttr(function(attr) {
        if (regStrokeProps.test(attr.name)) {
          item.removeAttr(attr.name);
        }
      });
      if (declineStroke)
        item.addAttr({
          name: 'stroke',
          value: 'none',
          prefix: '',
          local: 'stroke'
        });
    }
    if (params.fill && (!fill || item.computedAttr('fill-opacity', '0'))) {
      item.eachAttr(function(attr) {
        if (regFillProps.test(attr.name)) {
          item.removeAttr(attr.name);
        }
      });
      if (fill) {
        if (item.hasAttr('fill'))
          item.attr('fill').value = 'none';
        else
          item.addAttr({
            name: 'fill',
            value: 'none',
            prefix: '',
            local: 'fill'
          });
      }
    }
  }
};
