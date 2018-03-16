/* */ 
'use strict';
exports.type = 'perItem';
exports.active = true;
exports.description = 'converts style to attributes';
var EXTEND = require('whet.extend'),
    stylingProps = require('./_collections').attrsGroups.presentation,
    rEscape = '\\\\(?:[0-9a-f]{1,6}\\s?|\\r\\n|.)',
    rAttr = '\\s*(' + g('[^:;\\\\]', rEscape) + '*?)\\s*',
    rSingleQuotes = "'(?:[^'\\n\\r\\\\]|" + rEscape + ")*?(?:'|$)",
    rQuotes = '"(?:[^"\\n\\r\\\\]|' + rEscape + ')*?(?:"|$)',
    rQuotedString = new RegExp('^' + g(rSingleQuotes, rQuotes) + '$'),
    rParenthesis = '\\(' + g('[^\'"()\\\\]+', rEscape, rSingleQuotes, rQuotes) + '*?' + '\\)',
    rValue = '\\s*(' + g('[^\'"();\\\\]+?', rEscape, rSingleQuotes, rQuotes, rParenthesis, '[^;]*?') + '*?' + ')',
    rDeclEnd = '\\s*(?:;\\s*|$)',
    regDeclarationBlock = new RegExp(rAttr + ':' + rValue + rDeclEnd, 'ig'),
    regStripComments = new RegExp(g(rEscape, rSingleQuotes, rQuotes, '/\\*[^]*?\\*/'), 'ig');
exports.fn = function(item) {
  if (item.elem && item.hasAttr('style')) {
    var styleValue = item.attr('style').value,
        styles = [],
        attrs = {};
    styleValue = styleValue.replace(regStripComments, function(match) {
      return match[0] == '/' ? '' : match[0] == '\\' && /[-g-z]/i.test(match[1]) ? match[1] : match;
    });
    regDeclarationBlock.lastIndex = 0;
    for (var rule; rule = regDeclarationBlock.exec(styleValue); ) {
      styles.push([rule[1], rule[2]]);
    }
    if (styles.length) {
      styles = styles.filter(function(style) {
        if (style[0]) {
          var prop = style[0].toLowerCase(),
              val = style[1];
          if (rQuotedString.test(val)) {
            val = val.slice(1, -1);
          }
          if (stylingProps.indexOf(prop) > -1) {
            attrs[prop] = {
              name: prop,
              value: val,
              local: prop,
              prefix: ''
            };
            return false;
          }
        }
        return true;
      });
      EXTEND(item.attrs, attrs);
      if (styles.length) {
        item.attr('style').value = styles.map(function(declaration) {
          return declaration.join(':');
        }).join(';');
      } else {
        item.removeAttr('style');
      }
    }
  }
};
function g() {
  return '(?:' + Array.prototype.join.call(arguments, '|') + ')';
}
