/* */ 
(function(process) {
  var pid = process && process.pid ? process.pid.toString(36) : '';
  var mac = typeof __webpack_require__ !== 'function' ? require('macaddress').one(macHandler) : null;
  var address = mac ? parseInt(mac.replace(/\:|\D+/gi, '')).toString(36) : '';
  module.exports = function(prefix) {
    return (prefix || '') + address + pid + now().toString(36);
  };
  module.exports.process = function(prefix) {
    return (prefix || '') + pid + now().toString(36);
  };
  module.exports.time = function(prefix) {
    return (prefix || '') + now().toString(36);
  };
  function now() {
    var time = Date.now();
    var last = now.last || time;
    return now.last = time > last ? time : last + 1;
  }
  function macHandler(error) {
    if (module.parent && module.parent.uniqid_debug) {
      if (error)
        console.error('Info: No mac address - uniqid() falls back to uniqid.process().', error);
      if (pid == '')
        console.error('Info: No process.pid - uniqid.process() falls back to uniqid.time().');
    }
  }
})(require('process'));
