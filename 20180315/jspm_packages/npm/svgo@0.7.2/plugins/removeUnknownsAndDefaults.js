/* */ 
'use strict';
exports.type = 'perItem';
exports.active = true;
exports.description = 'removes unknown elements content and attributes, removes attrs with default values';
exports.params = {
  unknownContent: true,
  unknownAttrs: true,
  defaultAttrs: true,
  uselessOverrides: true,
  keepDataAttrs: true
};
var collections = require('./_collections'),
    elems = collections.elems,
    attrsGroups = collections.attrsGroups,
    elemsGroups = collections.elemsGroups,
    attrsGroupsDefaults = collections.attrsGroupsDefaults,
    attrsInheritable = collections.inheritableAttrs;
for (var elem in elems) {
  elem = elems[elem];
  if (elem.attrsGroups) {
    elem.attrs = elem.attrs || [];
    elem.attrsGroups.forEach(function(attrsGroupName) {
      elem.attrs = elem.attrs.concat(attrsGroups[attrsGroupName]);
      var groupDefaults = attrsGroupsDefaults[attrsGroupName];
      if (groupDefaults) {
        elem.defaults = elem.defaults || {};
        for (var attrName in groupDefaults) {
          elem.defaults[attrName] = groupDefaults[attrName];
        }
      }
    });
  }
  if (elem.contentGroups) {
    elem.content = elem.content || [];
    elem.contentGroups.forEach(function(contentGroupName) {
      elem.content = elem.content.concat(elemsGroups[contentGroupName]);
    });
  }
}
exports.fn = function(item, params) {
  if (item.isElem() && !item.prefix) {
    var elem = item.elem;
    if (params.unknownContent && !item.isEmpty() && elems[elem] && elem !== 'foreignObject') {
      item.content.forEach(function(content, i) {
        if (content.isElem() && !content.prefix && ((elems[elem].content && elems[elem].content.indexOf(content.elem) === -1) || (!elems[elem].content && !elems[content.elem]))) {
          item.content.splice(i, 1);
        }
      });
    }
    if (elems[elem] && elems[elem].attrs) {
      item.eachAttr(function(attr) {
        if (attr.name !== 'xmlns' && (attr.prefix === 'xml' || !attr.prefix) && (!params.keepDataAttrs || attr.name.indexOf('data-') != 0)) {
          if ((params.unknownAttrs && elems[elem].attrs.indexOf(attr.name) === -1) || (params.defaultAttrs && elems[elem].defaults && elems[elem].defaults[attr.name] === attr.value && (attrsInheritable.indexOf(attr.name) < 0 || !item.parentNode.computedAttr(attr.name))) || (params.uselessOverrides && attr.name !== 'transform' && attrsInheritable.indexOf(attr.name) > -1 && item.parentNode.computedAttr(attr.name, attr.value))) {
            item.removeAttr(attr.name);
          }
        }
      });
    }
  }
};
