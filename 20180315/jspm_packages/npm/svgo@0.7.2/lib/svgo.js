/* */ 
'use strict';
var CONFIG = require('./svgo/config'),
    SVG2JS = require('./svgo/svg2js'),
    PLUGINS = require('./svgo/plugins'),
    JSAPI = require('./svgo/jsAPI'),
    JS2SVG = require('./svgo/js2svg');
var SVGO = module.exports = function(config) {
  this.config = CONFIG(config);
};
SVGO.prototype.optimize = function(svgstr, callback) {
  if (this.config.error)
    return callback(this.config);
  var _this = this,
      config = this.config,
      maxPassCount = config.multipass ? 10 : 1,
      counter = 0,
      prevResultSize = Number.POSITIVE_INFINITY,
      optimizeOnceCallback = function(svgjs) {
        if (svgjs.error) {
          callback(svgjs);
          return;
        }
        if (++counter < maxPassCount && svgjs.data.length < prevResultSize) {
          prevResultSize = svgjs.data.length;
          _this._optimizeOnce(svgjs.data, optimizeOnceCallback);
        } else {
          callback(svgjs);
        }
      };
  _this._optimizeOnce(svgstr, optimizeOnceCallback);
};
SVGO.prototype._optimizeOnce = function(svgstr, callback) {
  var config = this.config;
  SVG2JS(svgstr, function(svgjs) {
    if (svgjs.error) {
      callback(svgjs);
      return;
    }
    svgjs = PLUGINS(svgjs, config.plugins);
    callback(JS2SVG(svgjs, config.js2svg));
  });
};
SVGO.prototype.createContentItem = function(data) {
  return new JSAPI(data);
};
