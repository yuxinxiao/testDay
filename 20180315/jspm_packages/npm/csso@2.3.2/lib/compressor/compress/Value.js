/* */ 
var resolveName = require('../../utils/names').property;
var handlers = {
  'font': require('./property/font'),
  'font-weight': require('./property/font-weight'),
  'background': require('./property/background')
};
module.exports = function compressValue(node) {
  if (!this.declaration) {
    return;
  }
  var property = resolveName(this.declaration.property.name);
  if (handlers.hasOwnProperty(property.name)) {
    handlers[property.name](node);
  }
};
