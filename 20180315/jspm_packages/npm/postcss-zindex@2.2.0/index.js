/* */ 
'use strict';
var postcss = require('postcss');
module.exports = postcss.plugin('postcss-zindex', function(opts) {
  opts = opts || {};
  return function(css) {
    var cache = require('./lib/layerCache')(opts);
    var nodes = [];
    var abort = false;
    css.walkDecls('z-index', function(decl) {
      if (decl.value[0] === '-') {
        abort = true;
        return false;
      }
      nodes.push(decl);
      cache.addValue(decl.value);
    });
    if (abort || !nodes.length) {
      return;
    }
    cache.optimizeValues();
    nodes.forEach(function(decl) {
      decl.value = cache.getValue(decl.value).toString();
    });
  };
});
