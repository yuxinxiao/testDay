/* */ 
'use strict';
exports.type = 'perItem';
exports.active = true;
exports.description = 'merges multiple paths in one if possible';
exports.params = {
  collapseRepeated: true,
  leadingZero: true,
  negativeExtraSpace: true
};
var path2js = require('./_path').path2js,
    js2path = require('./_path').js2path,
    intersects = require('./_path').intersects;
exports.fn = function(item, params) {
  if (!item.isElem() || item.isEmpty())
    return;
  var prevContentItem = null,
      prevContentItemKeys = null;
  item.content = item.content.filter(function(contentItem) {
    if (prevContentItem && prevContentItem.isElem('path') && prevContentItem.isEmpty() && prevContentItem.hasAttr('d') && contentItem.isElem('path') && contentItem.isEmpty() && contentItem.hasAttr('d')) {
      if (!prevContentItemKeys) {
        prevContentItemKeys = Object.keys(prevContentItem.attrs);
      }
      var contentItemAttrs = Object.keys(contentItem.attrs),
          equalData = prevContentItemKeys.length == contentItemAttrs.length && contentItemAttrs.every(function(key) {
            return key == 'd' || prevContentItem.hasAttr(key) && prevContentItem.attr(key).value == contentItem.attr(key).value;
          }),
          prevPathJS = path2js(prevContentItem),
          curPathJS = path2js(contentItem);
      if (equalData && !intersects(prevPathJS, curPathJS)) {
        js2path(prevContentItem, prevPathJS.concat(curPathJS), params);
        return false;
      }
    }
    prevContentItem = contentItem;
    prevContentItemKeys = null;
    return true;
  });
};
