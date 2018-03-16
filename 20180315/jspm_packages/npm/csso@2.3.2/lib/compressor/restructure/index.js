/* */ 
var prepare = require('./prepare/index');
var initialMergeRuleset = require('./1-initialMergeRuleset');
var mergeAtrule = require('./2-mergeAtrule');
var disjoinRuleset = require('./3-disjoinRuleset');
var restructShorthand = require('./4-restructShorthand');
var restructBlock = require('./6-restructBlock');
var mergeRuleset = require('./7-mergeRuleset');
var restructRuleset = require('./8-restructRuleset');
module.exports = function(ast, usageData, debug) {
  var indexer = prepare(ast, usageData);
  debug('prepare', ast);
  initialMergeRuleset(ast);
  debug('initialMergeRuleset', ast);
  mergeAtrule(ast);
  debug('mergeAtrule', ast);
  disjoinRuleset(ast);
  debug('disjoinRuleset', ast);
  restructShorthand(ast, indexer);
  debug('restructShorthand', ast);
  restructBlock(ast);
  debug('restructBlock', ast);
  mergeRuleset(ast);
  debug('mergeRuleset', ast);
  restructRuleset(ast);
  debug('restructRuleset', ast);
};
