/* */ 
(function(process) {
  var utils = require('./utils');
  var walkRules = require('../../utils/walk').rules;
  function processRuleset(node, item, list) {
    var selectors = node.selector.selectors;
    var declarations = node.block.declarations;
    list.prevUntil(item.prev, function(prev) {
      if (prev.type !== 'Ruleset') {
        return utils.unsafeToSkipNode.call(selectors, prev);
      }
      var prevSelectors = prev.selector.selectors;
      var prevDeclarations = prev.block.declarations;
      if (node.pseudoSignature === prev.pseudoSignature) {
        if (utils.isEqualLists(prevSelectors, selectors)) {
          prevDeclarations.appendList(declarations);
          list.remove(item);
          return true;
        }
        if (utils.isEqualDeclarations(declarations, prevDeclarations)) {
          utils.addSelectors(prevSelectors, selectors);
          list.remove(item);
          return true;
        }
      }
      return utils.hasSimilarSelectors(selectors, prevSelectors);
    });
  }
  ;
  module.exports = function initialMergeRuleset(ast) {
    walkRules(ast, function(node, item, list) {
      if (node.type === 'Ruleset') {
        processRuleset(node, item, list);
      }
    });
  };
})(require('process'));
