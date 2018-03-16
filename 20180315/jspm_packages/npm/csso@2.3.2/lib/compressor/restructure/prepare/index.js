/* */ 
(function(process) {
  var resolveKeyword = require('../../../utils/names').keyword;
  var walkRules = require('../../../utils/walk').rules;
  var translate = require('../../../utils/translate');
  var createDeclarationIndexer = require('./createDeclarationIndexer');
  var processSelector = require('./processSelector');
  function walk(node, markDeclaration, usageData) {
    switch (node.type) {
      case 'Ruleset':
        node.block.declarations.each(markDeclaration);
        processSelector(node, usageData);
        break;
      case 'Atrule':
        if (node.expression) {
          node.expression.id = translate(node.expression);
        }
        if (resolveKeyword(node.name).name === 'keyframes') {
          node.block.avoidRulesMerge = true;
          node.block.rules.each(function(ruleset) {
            ruleset.selector.selectors.each(function(simpleselector) {
              simpleselector.compareMarker = simpleselector.id;
            });
          });
        }
        break;
    }
  }
  ;
  module.exports = function prepare(ast, usageData) {
    var markDeclaration = createDeclarationIndexer();
    walkRules(ast, function(node) {
      walk(node, markDeclaration, usageData);
    });
    return {declaration: markDeclaration};
  };
})(require('process'));
