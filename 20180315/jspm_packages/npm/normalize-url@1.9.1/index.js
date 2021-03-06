/* */ 
'use strict';
var url = require('url');
var punycode = require('punycode');
var queryString = require('query-string');
var prependHttp = require('prepend-http');
var sortKeys = require('sort-keys');
var objectAssign = require('object-assign');
var DEFAULT_PORTS = {
  'http:': 80,
  'https:': 443,
  'ftp:': 21
};
var slashedProtocol = {
  'http': true,
  'https': true,
  'ftp': true,
  'gopher': true,
  'file': true,
  'http:': true,
  'https:': true,
  'ftp:': true,
  'gopher:': true,
  'file:': true
};
function testParameter(name, filters) {
  return filters.some(function(filter) {
    return filter instanceof RegExp ? filter.test(name) : filter === name;
  });
}
module.exports = function(str, opts) {
  opts = objectAssign({
    normalizeProtocol: true,
    normalizeHttps: false,
    stripFragment: true,
    stripWWW: true,
    removeQueryParameters: [/^utm_\w+/i],
    removeTrailingSlash: true,
    removeDirectoryIndex: false
  }, opts);
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  var hasRelativeProtocol = str.indexOf('//') === 0;
  str = prependHttp(str.trim()).replace(/^\/\//, 'http://');
  var urlObj = url.parse(str);
  if (opts.normalizeHttps && urlObj.protocol === 'https:') {
    urlObj.protocol = 'http:';
  }
  if (!urlObj.hostname && !urlObj.pathname) {
    throw new Error('Invalid URL');
  }
  delete urlObj.host;
  delete urlObj.query;
  if (opts.stripFragment) {
    delete urlObj.hash;
  }
  var port = DEFAULT_PORTS[urlObj.protocol];
  if (Number(urlObj.port) === port) {
    delete urlObj.port;
  }
  if (urlObj.pathname) {
    urlObj.pathname = urlObj.pathname.replace(/\/{2,}/g, '/');
  }
  if (urlObj.pathname) {
    urlObj.pathname = decodeURI(urlObj.pathname);
  }
  if (opts.removeDirectoryIndex === true) {
    opts.removeDirectoryIndex = [/^index\.[a-z]+$/];
  }
  if (Array.isArray(opts.removeDirectoryIndex) && opts.removeDirectoryIndex.length) {
    var pathComponents = urlObj.pathname.split('/');
    var lastComponent = pathComponents[pathComponents.length - 1];
    if (testParameter(lastComponent, opts.removeDirectoryIndex)) {
      pathComponents = pathComponents.slice(0, pathComponents.length - 1);
      urlObj.pathname = pathComponents.slice(1).join('/') + '/';
    }
  }
  if (slashedProtocol[urlObj.protocol]) {
    var domain = urlObj.protocol + '//' + urlObj.hostname;
    var relative = url.resolve(domain, urlObj.pathname);
    urlObj.pathname = relative.replace(domain, '');
  }
  if (urlObj.hostname) {
    urlObj.hostname = punycode.toUnicode(urlObj.hostname).toLowerCase();
    urlObj.hostname = urlObj.hostname.replace(/\.$/, '');
    if (opts.stripWWW) {
      urlObj.hostname = urlObj.hostname.replace(/^www\./, '');
    }
  }
  if (urlObj.search === '?') {
    delete urlObj.search;
  }
  var queryParameters = queryString.parse(urlObj.search);
  if (Array.isArray(opts.removeQueryParameters)) {
    for (var key in queryParameters) {
      if (testParameter(key, opts.removeQueryParameters)) {
        delete queryParameters[key];
      }
    }
  }
  urlObj.search = queryString.stringify(sortKeys(queryParameters));
  urlObj.search = decodeURIComponent(urlObj.search);
  str = url.format(urlObj);
  if (opts.removeTrailingSlash || urlObj.pathname === '/') {
    str = str.replace(/\/$/, '');
  }
  if (hasRelativeProtocol && !opts.normalizeProtocol) {
    str = str.replace(/^http:\/\//, '//');
  }
  return str;
};
