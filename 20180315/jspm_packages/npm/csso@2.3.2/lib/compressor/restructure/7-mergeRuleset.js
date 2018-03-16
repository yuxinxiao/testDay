/* */ 
(function(process) {
  var utils = require('./utils');
  var walkRules = require('../../utils/walk').rules;
  function processRuleset(node, item, list) {
    var selectors = node.selector.selectors;
    var declarations = node.block.declarations;
    var nodeCompareMarker = selectors.first().compareMarker;
    var skippedCompareMarkers = {};
    list.nextUntil(item.next, function(next, nextItem) {
      if (next.type !== 'Ruleset') {
        return utils.unsafeToSkipNode.call(selectors, next);
      }
      if (node.pseudoSignature !== next.pseudoSignature) {
        return true;
      }
      var nextFirstSelector = next.selector.selectors.head;
      var nextDeclarations = next.block.declarations;
      var nextCompareMarker = nextFirstSelector.data.compareMarker;
      if (nextCompareMarker in skippedCompareMarkers) {
        return true;
      }
      if (selectors.head === selectors.tail) {
        if (selectors.first().id === nextFirstSelector.data.id) {
          declarations.appendList(nextDeclarations);
          list.remove(nextItem);
          return;
        }
      }
      if (utils.isEqualDeclarations(declarations, nextDeclarations)) {
        var nextStr = nextFirstSelector.data.id;
        selectors.some(function(data, item) {
          var curStr = data.id;
          if (nextStr < curStr) {
            selectors.insert(nextFirstSelector, item);
            return true;
          }
          if (!item.next) {
            selectors.insert(nextFirstSelector);
            return true;
          }
        });
        list.remove(nextItem);
        return;
      }
      if (nextCompareMarker === nodeCompareMarker) {
        return true;
      }
      skippedCompareMarkers[nextCompareMarker] = true;
    });
  }
  ;
  module.exports = function mergeRuleset(ast) {
    walkRules(ast, function(node, item, list) {
      if (node.type === 'Ruleset') {
        processRuleset(node, item, list);
      }
    });
  };
})(require('process'));
