/* */ 
var resolveKeyword = require('../../utils/names').keyword;
var compressKeyframes = require('./atrule/keyframes');
module.exports = function(node) {
  if (resolveKeyword(node.name).name === 'keyframes') {
    compressKeyframes(node);
  }
};
