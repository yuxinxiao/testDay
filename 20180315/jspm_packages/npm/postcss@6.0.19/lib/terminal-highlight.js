/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  var _chalk = require('@empty');
  var _chalk2 = _interopRequireDefault(_chalk);
  var _tokenize = require('./tokenize');
  var _tokenize2 = _interopRequireDefault(_tokenize);
  var _input = require('./input');
  var _input2 = _interopRequireDefault(_input);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var HIGHLIGHT_THEME = {
    'brackets': _chalk2.default.cyan,
    'at-word': _chalk2.default.cyan,
    'call': _chalk2.default.cyan,
    'comment': _chalk2.default.gray,
    'string': _chalk2.default.green,
    'class': _chalk2.default.yellow,
    'hash': _chalk2.default.magenta,
    '(': _chalk2.default.cyan,
    ')': _chalk2.default.cyan,
    '{': _chalk2.default.yellow,
    '}': _chalk2.default.yellow,
    '[': _chalk2.default.yellow,
    ']': _chalk2.default.yellow,
    ':': _chalk2.default.yellow,
    ';': _chalk2.default.yellow
  };
  function getTokenType(_ref, processor) {
    var type = _ref[0],
        value = _ref[1];
    if (type === 'word') {
      if (value[0] === '.') {
        return 'class';
      }
      if (value[0] === '#') {
        return 'hash';
      }
    }
    if (!processor.endOfFile()) {
      var next = processor.nextToken();
      processor.back(next);
      if (next[0] === 'brackets' || next[0] === '(')
        return 'call';
    }
    return type;
  }
  function terminalHighlight(css) {
    var processor = (0, _tokenize2.default)(new _input2.default(css), {ignoreErrors: true});
    var result = '';
    var _loop = function _loop() {
      var token = processor.nextToken();
      var color = HIGHLIGHT_THEME[getTokenType(token, processor)];
      if (color) {
        result += token[1].split(/\r?\n/).map(function(i) {
          return color(i);
        }).join('\n');
      } else {
        result += token[1];
      }
    };
    while (!processor.endOfFile()) {
      _loop();
    }
    return result;
  }
  exports.default = terminalHighlight;
  module.exports = exports['default'];
})(require('process'));
