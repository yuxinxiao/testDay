/* */ 
var walk = require('../../utils/walk').all;
var handlers = {
  Atrule: require('./Atrule'),
  Attribute: require('./Attribute'),
  Value: require('./Value'),
  Dimension: require('./Dimension'),
  Percentage: require('./Number'),
  Number: require('./Number'),
  String: require('./String'),
  Url: require('./Url'),
  Hash: require('./color').compressHex,
  Identifier: require('./color').compressIdent,
  Function: require('./color').compressFunction
};
module.exports = function(ast) {
  walk(ast, function(node, item, list) {
    if (handlers.hasOwnProperty(node.type)) {
      handlers[node.type].call(this, node, item, list);
    }
  });
};
