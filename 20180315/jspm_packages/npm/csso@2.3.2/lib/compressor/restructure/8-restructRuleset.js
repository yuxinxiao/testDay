/* */ 
(function(process) {
  var List = require('../../utils/list');
  var utils = require('./utils');
  var walkRulesRight = require('../../utils/walk').rulesRight;
  function calcSelectorLength(list) {
    var length = 0;
    list.each(function(data) {
      length += data.id.length + 1;
    });
    return length - 1;
  }
  function calcDeclarationsLength(tokens) {
    var length = 0;
    for (var i = 0; i < tokens.length; i++) {
      length += tokens[i].length;
    }
    return (length + tokens.length - 1);
  }
  function processRuleset(node, item, list) {
    var avoidRulesMerge = this.stylesheet.avoidRulesMerge;
    var selectors = node.selector.selectors;
    var block = node.block;
    var disallowDownMarkers = Object.create(null);
    var allowMergeUp = true;
    var allowMergeDown = true;
    list.prevUntil(item.prev, function(prev, prevItem) {
      if (prev.type !== 'Ruleset') {
        return utils.unsafeToSkipNode.call(selectors, prev);
      }
      var prevSelectors = prev.selector.selectors;
      var prevBlock = prev.block;
      if (node.pseudoSignature !== prev.pseudoSignature) {
        return true;
      }
      allowMergeDown = !prevSelectors.some(function(selector) {
        return selector.compareMarker in disallowDownMarkers;
      });
      if (!allowMergeDown && !allowMergeUp) {
        return true;
      }
      if (allowMergeUp && utils.isEqualLists(prevSelectors, selectors)) {
        prevBlock.declarations.appendList(block.declarations);
        list.remove(item);
        return true;
      }
      var diff = utils.compareDeclarations(block.declarations, prevBlock.declarations);
      if (diff.eq.length) {
        if (!diff.ne1.length && !diff.ne2.length) {
          if (allowMergeDown) {
            utils.addSelectors(selectors, prevSelectors);
            list.remove(prevItem);
          }
          return true;
        } else if (!avoidRulesMerge) {
          if (diff.ne1.length && !diff.ne2.length) {
            var selectorLength = calcSelectorLength(selectors);
            var blockLength = calcDeclarationsLength(diff.eq);
            if (allowMergeUp && selectorLength < blockLength) {
              utils.addSelectors(prevSelectors, selectors);
              block.declarations = new List(diff.ne1);
            }
          } else if (!diff.ne1.length && diff.ne2.length) {
            var selectorLength = calcSelectorLength(prevSelectors);
            var blockLength = calcDeclarationsLength(diff.eq);
            if (allowMergeDown && selectorLength < blockLength) {
              utils.addSelectors(selectors, prevSelectors);
              prevBlock.declarations = new List(diff.ne2);
            }
          } else {
            var newSelector = {
              type: 'Selector',
              info: {},
              selectors: utils.addSelectors(prevSelectors.copy(), selectors)
            };
            var newBlockLength = calcSelectorLength(newSelector.selectors) + 2;
            var blockLength = calcDeclarationsLength(diff.eq);
            if (allowMergeDown && blockLength >= newBlockLength) {
              var newRuleset = {
                type: 'Ruleset',
                info: {},
                pseudoSignature: node.pseudoSignature,
                selector: newSelector,
                block: {
                  type: 'Block',
                  info: {},
                  declarations: new List(diff.eq)
                }
              };
              block.declarations = new List(diff.ne1);
              prevBlock.declarations = new List(diff.ne2.concat(diff.ne2overrided));
              list.insert(list.createItem(newRuleset), prevItem);
              return true;
            }
          }
        }
      }
      if (allowMergeUp) {
        allowMergeUp = !prevSelectors.some(function(prevSelector) {
          return selectors.some(function(selector) {
            return selector.compareMarker === prevSelector.compareMarker;
          });
        });
      }
      prevSelectors.each(function(data) {
        disallowDownMarkers[data.compareMarker] = true;
      });
    });
  }
  ;
  module.exports = function restructRuleset(ast) {
    walkRulesRight(ast, function(node, item, list) {
      if (node.type === 'Ruleset') {
        processRuleset.call(this, node, item, list);
      }
    });
  };
})(require('process'));
