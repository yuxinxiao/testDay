/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, '__esModule', {value: true});
  var _slicedToArray = (function() {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;
      try {
        for (var _i = arr[Symbol.iterator](),
            _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i['return'])
            _i['return']();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    return function(arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
      }
    };
  })();
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _postcss = require('postcss');
  var _postcss2 = _interopRequireDefault(_postcss);
  var _topologicalSort = require('./topologicalSort');
  var _topologicalSort2 = _interopRequireDefault(_topologicalSort);
  var declWhitelist = ['composes'];
  var declFilter = new RegExp('^(' + declWhitelist.join('|') + ')$');
  var matchImports = /^(.+?)\s+from\s+(?:"([^"]+)"|'([^']+)'|(global))$/;
  var icssImport = /^:import\((?:"([^"]+)"|'([^']+)')\)/;
  var VISITED_MARKER = 1;
  function createParentName(rule, root) {
    return '__' + root.index(rule.parent) + '_' + rule.selector;
  }
  function serializeImports(imports) {
    return imports.map(function(importPath) {
      return '`' + importPath + '`';
    }).join(', ');
  }
  function addImportToGraph(importId, parentId, graph, visited) {
    var siblingsId = parentId + '_' + 'siblings';
    var visitedId = parentId + '_' + importId;
    if (visited[visitedId] !== VISITED_MARKER) {
      if (!Array.isArray(visited[siblingsId]))
        visited[siblingsId] = [];
      var siblings = visited[siblingsId];
      if (Array.isArray(graph[importId]))
        graph[importId] = graph[importId].concat(siblings);
      else
        graph[importId] = siblings.slice();
      visited[visitedId] = VISITED_MARKER;
      siblings.push(importId);
    }
  }
  var processor = _postcss2['default'].plugin('modules-extract-imports', function() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var failOnWrongOrder = options.failOnWrongOrder;
    return function(css) {
      var graph = {};
      var visited = {};
      var existingImports = {};
      var importDecls = {};
      var imports = {};
      var importIndex = 0;
      var createImportedName = typeof options.createImportedName !== 'function' ? function(importName) {
        return 'i__imported_' + importName.replace(/\W/g, '_') + '_' + importIndex++;
      } : options.createImportedName;
      css.walkRules(function(rule) {
        var matches = icssImport.exec(rule.selector);
        if (matches) {
          var _matches = _slicedToArray(matches, 3);
          var doubleQuotePath = _matches[1];
          var singleQuotePath = _matches[2];
          var importPath = doubleQuotePath || singleQuotePath;
          addImportToGraph(importPath, 'root', graph, visited);
          existingImports[importPath] = rule;
        }
      });
      css.walkDecls(declFilter, function(decl) {
        var matches = decl.value.match(matchImports);
        var tmpSymbols = undefined;
        if (matches) {
          var _matches2 = _slicedToArray(matches, 5);
          var symbols = _matches2[1];
          var doubleQuotePath = _matches2[2];
          var singleQuotePath = _matches2[3];
          var _global = _matches2[4];
          if (_global) {
            tmpSymbols = symbols.split(/\s+/).map(function(s) {
              return 'global(' + s + ')';
            });
          } else {
            (function() {
              var importPath = doubleQuotePath || singleQuotePath;
              var parentRule = createParentName(decl.parent, css);
              addImportToGraph(importPath, parentRule, graph, visited);
              importDecls[importPath] = decl;
              imports[importPath] = imports[importPath] || {};
              tmpSymbols = symbols.split(/\s+/).map(function(s) {
                if (!imports[importPath][s]) {
                  imports[importPath][s] = createImportedName(s, importPath);
                }
                return imports[importPath][s];
              });
            })();
          }
          decl.value = tmpSymbols.join(' ');
        }
      });
      var importsOrder = (0, _topologicalSort2['default'])(graph, failOnWrongOrder);
      if (importsOrder instanceof Error) {
        var importPath = importsOrder.nodes.find(function(importPath) {
          return importDecls.hasOwnProperty(importPath);
        });
        var decl = importDecls[importPath];
        var errMsg = 'Failed to resolve order of composed modules ' + serializeImports(importsOrder.nodes) + '.';
        throw decl.error(errMsg, {
          plugin: 'modules-extract-imports',
          word: 'composes'
        });
      }
      var lastImportRule = undefined;
      importsOrder.forEach(function(path) {
        var importedSymbols = imports[path];
        var rule = existingImports[path];
        if (!rule && importedSymbols) {
          rule = _postcss2['default'].rule({
            selector: ':import("' + path + '")',
            raws: {after: '\n'}
          });
          if (lastImportRule)
            css.insertAfter(lastImportRule, rule);
          else
            css.prepend(rule);
        }
        lastImportRule = rule;
        if (!importedSymbols)
          return;
        Object.keys(importedSymbols).forEach(function(importedSymbol) {
          rule.append(_postcss2['default'].decl({
            value: importedSymbol,
            prop: importedSymbols[importedSymbol],
            raws: {before: '\n  '}
          }));
        });
      });
    };
  });
  exports['default'] = processor;
  module.exports = exports['default'];
})(require('process'));
