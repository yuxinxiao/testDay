/* */ 
(function(process) {
  'use strict';
  module.exports = function(data, plugins) {
    plugins.forEach(function(group) {
      switch (group[0].type) {
        case 'perItem':
          data = perItem(data, group);
          break;
        case 'perItemReverse':
          data = perItem(data, group, true);
          break;
        case 'full':
          data = full(data, group);
          break;
      }
    });
    return data;
  };
  function perItem(data, plugins, reverse) {
    function monkeys(items) {
      items.content = items.content.filter(function(item) {
        if (reverse && item.content) {
          monkeys(item);
        }
        var filter = true;
        for (var i = 0; filter && i < plugins.length; i++) {
          var plugin = plugins[i];
          if (plugin.active && plugin.fn(item, plugin.params) === false) {
            filter = false;
          }
        }
        if (!reverse && item.content) {
          monkeys(item);
        }
        return filter;
      });
      return items;
    }
    return monkeys(data);
  }
  function full(data, plugins) {
    plugins.forEach(function(plugin) {
      if (plugin.active) {
        data = plugin.fn(data, plugin.params);
      }
    });
    return data;
  }
})(require('process'));
