/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  var _supportsColor = require('@empty');
  var _supportsColor2 = _interopRequireDefault(_supportsColor);
  var _chalk = require('@empty');
  var _chalk2 = _interopRequireDefault(_chalk);
  var _terminalHighlight = require('./terminal-highlight');
  var _terminalHighlight2 = _interopRequireDefault(_terminalHighlight);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var CssSyntaxError = function() {
    function CssSyntaxError(message, line, column, source, file, plugin) {
      _classCallCheck(this, CssSyntaxError);
      this.name = 'CssSyntaxError';
      this.reason = message;
      if (file) {
        this.file = file;
      }
      if (source) {
        this.source = source;
      }
      if (plugin) {
        this.plugin = plugin;
      }
      if (typeof line !== 'undefined' && typeof column !== 'undefined') {
        this.line = line;
        this.column = column;
      }
      this.setMessage();
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CssSyntaxError);
      }
    }
    CssSyntaxError.prototype.setMessage = function setMessage() {
      this.message = this.plugin ? this.plugin + ': ' : '';
      this.message += this.file ? this.file : '<css input>';
      if (typeof this.line !== 'undefined') {
        this.message += ':' + this.line + ':' + this.column;
      }
      this.message += ': ' + this.reason;
    };
    CssSyntaxError.prototype.showSourceCode = function showSourceCode(color) {
      var _this = this;
      if (!this.source)
        return '';
      var css = this.source;
      if (typeof color === 'undefined')
        color = _supportsColor2.default.stdout;
      if (color)
        css = (0, _terminalHighlight2.default)(css);
      var lines = css.split(/\r?\n/);
      var start = Math.max(this.line - 3, 0);
      var end = Math.min(this.line + 2, lines.length);
      var maxWidth = String(end).length;
      function mark(text) {
        if (color && _chalk2.default.red) {
          return _chalk2.default.red.bold(text);
        } else {
          return text;
        }
      }
      function aside(text) {
        if (color && _chalk2.default.gray) {
          return _chalk2.default.gray(text);
        } else {
          return text;
        }
      }
      return lines.slice(start, end).map(function(line, index) {
        var number = start + 1 + index;
        var gutter = ' ' + (' ' + number).slice(-maxWidth) + ' | ';
        if (number === _this.line) {
          var spacing = aside(gutter.replace(/\d/g, ' ')) + line.slice(0, _this.column - 1).replace(/[^\t]/g, ' ');
          return mark('>') + aside(gutter) + line + '\n ' + spacing + mark('^');
        } else {
          return ' ' + aside(gutter) + line;
        }
      }).join('\n');
    };
    CssSyntaxError.prototype.toString = function toString() {
      var code = this.showSourceCode();
      if (code) {
        code = '\n\n' + code + '\n';
      }
      return this.name + ': ' + this.message + code;
    };
    return CssSyntaxError;
  }();
  exports.default = CssSyntaxError;
  module.exports = exports['default'];
})(require('process'));
