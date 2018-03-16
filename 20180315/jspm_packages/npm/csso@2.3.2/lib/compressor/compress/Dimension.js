/* */ 
var packNumber = require('./Number').pack;
var LENGTH_UNIT = {
  'px': true,
  'mm': true,
  'cm': true,
  'in': true,
  'pt': true,
  'pc': true,
  'em': true,
  'ex': true,
  'ch': true,
  'rem': true,
  'vh': true,
  'vw': true,
  'vmin': true,
  'vmax': true,
  'vm': true
};
module.exports = function compressDimension(node, item) {
  var value = packNumber(node.value);
  node.value = value;
  if (value === '0' && this.declaration) {
    var unit = node.unit.toLowerCase();
    if (!LENGTH_UNIT.hasOwnProperty(unit)) {
      return;
    }
    if (this.declaration.property.name === 'flex') {
      return;
    }
    if (this['function'] && this['function'].name === 'calc') {
      return;
    }
    item.data = {
      type: 'Number',
      info: node.info,
      value: value
    };
  }
};
