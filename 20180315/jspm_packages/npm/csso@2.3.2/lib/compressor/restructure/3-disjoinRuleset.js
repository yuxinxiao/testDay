/* */ 
(function(process) {
  var List = require('../../utils/list');
  var walkRulesRight = require('../../utils/walk').rulesRight;
  function processRuleset(node, item, list) {
    var selectors = node.selector.selectors;
    while (selectors.head !== selectors.tail) {
      var newSelectors = new List();
      newSelectors.insert(selectors.remove(selectors.head));
      list.insert(list.createItem({
        type: 'Ruleset',
        info: node.info,
        pseudoSignature: node.pseudoSignature,
        selector: {
          type: 'Selector',
          info: node.selector.info,
          selectors: newSelectors
        },
        block: {
          type: 'Block',
          info: node.block.info,
          declarations: node.block.declarations.copy()
        }
      }), item);
    }
  }
  ;
  module.exports = function disjoinRuleset(ast) {
    walkRulesRight(ast, function(node, item, list) {
      if (node.type === 'Ruleset') {
        processRuleset(node, item, list);
      }
    });
  };
})(require('process'));
