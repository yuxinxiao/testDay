/* */ 
var walk = require('../../utils/walk').all;
var handlers = {
  Space: require('./Space'),
  Atrule: require('./Atrule'),
  Ruleset: require('./Ruleset'),
  Declaration: require('./Declaration'),
  Identifier: require('./Identifier'),
  Comment: require('./Comment')
};
module.exports = function(ast, usageData) {
  walk(ast, function(node, item, list) {
    if (handlers.hasOwnProperty(node.type)) {
      handlers[node.type].call(this, node, item, list, usageData);
    }
  });
};
