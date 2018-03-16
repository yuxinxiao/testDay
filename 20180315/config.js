System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "core-js": "npm:core-js@1.2.7",
    "css": "npm:css@2.2.1",
    "css-loader": "npm:css-loader@0.28.10",
    "react": "npm:react@16.2.0",
    "react-dom": "npm:react-dom@16.2.0",
    "react-router": "npm:react-router@4.2.0",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.1": {
      "buffer": "npm:buffer@5.1.0"
    },
    "github:jspm/nodelibs-constants@0.1.0": {
      "constants-browserify": "npm:constants-browserify@0.0.1"
    },
    "github:jspm/nodelibs-crypto@0.1.0": {
      "crypto-browserify": "npm:crypto-browserify@3.12.0"
    },
    "github:jspm/nodelibs-domain@0.1.0": {
      "domain-browser": "npm:domain-browser@1.2.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.10"
    },
    "github:jspm/nodelibs-punycode@0.1.0": {
      "punycode": "npm:punycode@1.3.2"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-string_decoder@0.1.0": {
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:jspm/nodelibs-zlib@0.1.0": {
      "browserify-zlib": "npm:browserify-zlib@0.1.4"
    },
    "npm:amdefine@1.0.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:argparse@1.0.10": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "sprintf-js": "npm:sprintf-js@1.0.3",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:asap@2.0.6": {
      "domain": "github:jspm/nodelibs-domain@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:asn1.js@4.10.1": {
      "bn.js": "npm:bn.js@4.11.8",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "inherits": "npm:inherits@2.0.3",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:atob@1.1.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:autoprefixer@6.7.7": {
      "browserslist": "npm:browserslist@1.7.7",
      "caniuse-db": "npm:caniuse-db@1.0.30000815",
      "normalize-range": "npm:normalize-range@0.1.2",
      "num2fraction": "npm:num2fraction@1.2.2",
      "postcss": "npm:postcss@5.2.18",
      "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:babel-code-frame@6.26.0": {
      "chalk": "npm:chalk@1.1.3",
      "esutils": "npm:esutils@2.0.2",
      "js-tokens": "npm:js-tokens@3.0.2"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:browserify-aes@1.1.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "buffer-xor": "npm:buffer-xor@1.0.3",
      "cipher-base": "npm:cipher-base@1.0.4",
      "create-hash": "npm:create-hash@1.1.3",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
      "inherits": "npm:inherits@2.0.1",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:browserify-cipher@1.0.0": {
      "browserify-aes": "npm:browserify-aes@1.1.1",
      "browserify-des": "npm:browserify-des@1.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.3"
    },
    "npm:browserify-des@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "cipher-base": "npm:cipher-base@1.0.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "des.js": "npm:des.js@1.0.0",
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:browserify-rsa@4.0.1": {
      "bn.js": "npm:bn.js@4.11.8",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "randombytes": "npm:randombytes@2.0.6"
    },
    "npm:browserify-sign@4.0.4": {
      "bn.js": "npm:bn.js@4.11.8",
      "browserify-rsa": "npm:browserify-rsa@4.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "create-hash": "npm:create-hash@1.1.3",
      "create-hmac": "npm:create-hmac@1.1.6",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@6.4.0",
      "inherits": "npm:inherits@2.0.1",
      "parse-asn1": "npm:parse-asn1@5.1.0",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:browserify-zlib@0.1.4": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "pako": "npm:pako@0.2.9",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "readable-stream": "npm:readable-stream@2.3.5",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:browserslist@1.7.7": {
      "caniuse-db": "npm:caniuse-db@1.0.30000815",
      "electron-to-chromium": "npm:electron-to-chromium@1.3.37",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:buffer-xor@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:buffer@5.1.0": {
      "base64-js": "npm:base64-js@1.2.3",
      "ieee754": "npm:ieee754@1.1.8"
    },
    "npm:caniuse-api@1.6.1": {
      "browserslist": "npm:browserslist@1.7.7",
      "caniuse-db": "npm:caniuse-db@1.0.30000815",
      "lodash.memoize": "npm:lodash.memoize@4.1.2",
      "lodash.uniq": "npm:lodash.uniq@4.5.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:chalk@1.1.3": {
      "ansi-styles": "npm:ansi-styles@2.2.1",
      "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
      "has-ansi": "npm:has-ansi@2.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "strip-ansi": "npm:strip-ansi@3.0.1",
      "supports-color": "npm:supports-color@2.0.0"
    },
    "npm:cipher-base@1.0.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0"
    },
    "npm:clap@1.2.3": {
      "chalk": "npm:chalk@1.1.3",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:clone@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:coa@1.0.4": {
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "q": "npm:q@1.5.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:color-convert@1.9.1": {
      "color-name": "npm:color-name@1.1.3"
    },
    "npm:color-name@1.1.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:color-string@0.3.0": {
      "color-name": "npm:color-name@1.1.3"
    },
    "npm:color@0.11.4": {
      "clone": "npm:clone@1.0.3",
      "color-convert": "npm:color-convert@1.9.1",
      "color-string": "npm:color-string@0.3.0"
    },
    "npm:colormin@1.1.2": {
      "color": "npm:color@0.11.4",
      "css-color-names": "npm:css-color-names@0.0.4",
      "has": "npm:has@1.0.1"
    },
    "npm:colors@1.1.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:constants-browserify@0.0.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-js@1.2.7": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:create-ecdh@4.0.0": {
      "bn.js": "npm:bn.js@4.11.8",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@6.4.0"
    },
    "npm:create-hash@1.1.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "cipher-base": "npm:cipher-base@1.0.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "ripemd160": "npm:ripemd160@2.0.1",
      "sha.js": "npm:sha.js@2.4.10"
    },
    "npm:create-hmac@1.1.6": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "cipher-base": "npm:cipher-base@1.0.4",
      "create-hash": "npm:create-hash@1.1.3",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "ripemd160": "npm:ripemd160@2.0.1",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "sha.js": "npm:sha.js@2.4.10"
    },
    "npm:crypto-browserify@3.12.0": {
      "browserify-cipher": "npm:browserify-cipher@1.0.0",
      "browserify-sign": "npm:browserify-sign@4.0.4",
      "create-ecdh": "npm:create-ecdh@4.0.0",
      "create-hash": "npm:create-hash@1.1.3",
      "create-hmac": "npm:create-hmac@1.1.6",
      "diffie-hellman": "npm:diffie-hellman@5.0.2",
      "inherits": "npm:inherits@2.0.1",
      "pbkdf2": "npm:pbkdf2@3.0.14",
      "public-encrypt": "npm:public-encrypt@4.0.0",
      "randombytes": "npm:randombytes@2.0.6",
      "randomfill": "npm:randomfill@1.0.4"
    },
    "npm:css-color-names@0.0.4": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:css-loader@0.28.10": {
      "babel-code-frame": "npm:babel-code-frame@6.26.0",
      "css-selector-tokenizer": "npm:css-selector-tokenizer@0.7.0",
      "cssnano": "npm:cssnano@3.10.0",
      "icss-utils": "npm:icss-utils@2.1.0",
      "loader-utils": "npm:loader-utils@1.1.0",
      "lodash.camelcase": "npm:lodash.camelcase@4.3.0",
      "object-assign": "npm:object-assign@4.1.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "postcss": "npm:postcss@5.2.18",
      "postcss-modules-extract-imports": "npm:postcss-modules-extract-imports@1.2.0",
      "postcss-modules-local-by-default": "npm:postcss-modules-local-by-default@1.2.0",
      "postcss-modules-scope": "npm:postcss-modules-scope@1.1.0",
      "postcss-modules-values": "npm:postcss-modules-values@1.3.0",
      "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-list-map": "npm:source-list-map@2.0.0"
    },
    "npm:css-selector-tokenizer@0.7.0": {
      "cssesc": "npm:cssesc@0.1.0",
      "fastparse": "npm:fastparse@1.1.1",
      "regexpu-core": "npm:regexpu-core@1.0.0"
    },
    "npm:css@2.2.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "source-map": "npm:source-map@0.1.43",
      "source-map-resolve": "npm:source-map-resolve@0.3.1",
      "urix": "npm:urix@0.1.0"
    },
    "npm:cssnano@3.10.0": {
      "autoprefixer": "npm:autoprefixer@6.7.7",
      "decamelize": "npm:decamelize@1.2.0",
      "defined": "npm:defined@1.0.0",
      "has": "npm:has@1.0.1",
      "object-assign": "npm:object-assign@4.1.1",
      "postcss": "npm:postcss@5.2.18",
      "postcss-calc": "npm:postcss-calc@5.3.1",
      "postcss-colormin": "npm:postcss-colormin@2.2.2",
      "postcss-convert-values": "npm:postcss-convert-values@2.6.1",
      "postcss-discard-comments": "npm:postcss-discard-comments@2.0.4",
      "postcss-discard-duplicates": "npm:postcss-discard-duplicates@2.1.0",
      "postcss-discard-empty": "npm:postcss-discard-empty@2.1.0",
      "postcss-discard-overridden": "npm:postcss-discard-overridden@0.1.1",
      "postcss-discard-unused": "npm:postcss-discard-unused@2.2.3",
      "postcss-filter-plugins": "npm:postcss-filter-plugins@2.0.2",
      "postcss-merge-idents": "npm:postcss-merge-idents@2.1.7",
      "postcss-merge-longhand": "npm:postcss-merge-longhand@2.0.2",
      "postcss-merge-rules": "npm:postcss-merge-rules@2.1.2",
      "postcss-minify-font-values": "npm:postcss-minify-font-values@1.0.5",
      "postcss-minify-gradients": "npm:postcss-minify-gradients@1.0.5",
      "postcss-minify-params": "npm:postcss-minify-params@1.2.2",
      "postcss-minify-selectors": "npm:postcss-minify-selectors@2.1.1",
      "postcss-normalize-charset": "npm:postcss-normalize-charset@1.1.1",
      "postcss-normalize-url": "npm:postcss-normalize-url@3.0.8",
      "postcss-ordered-values": "npm:postcss-ordered-values@2.2.3",
      "postcss-reduce-idents": "npm:postcss-reduce-idents@2.4.0",
      "postcss-reduce-initial": "npm:postcss-reduce-initial@1.0.1",
      "postcss-reduce-transforms": "npm:postcss-reduce-transforms@1.0.4",
      "postcss-svgo": "npm:postcss-svgo@2.1.6",
      "postcss-unique-selectors": "npm:postcss-unique-selectors@2.0.2",
      "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
      "postcss-zindex": "npm:postcss-zindex@2.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:csso@2.3.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "clap": "npm:clap@1.2.3",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.5.7",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:des.js@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
    },
    "npm:diffie-hellman@5.0.2": {
      "bn.js": "npm:bn.js@4.11.8",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "miller-rabin": "npm:miller-rabin@4.0.1",
      "randombytes": "npm:randombytes@2.0.6",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:domain-browser@1.2.0": {
      "events": "github:jspm/nodelibs-events@0.1.1"
    },
    "npm:elliptic@6.4.0": {
      "bn.js": "npm:bn.js@4.11.8",
      "brorand": "npm:brorand@1.1.0",
      "hash.js": "npm:hash.js@1.1.3",
      "hmac-drbg": "npm:hmac-drbg@1.0.1",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:encoding@0.1.12": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "iconv-lite": "npm:iconv-lite@0.4.19"
    },
    "npm:evp_bytestokey@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "md5.js": "npm:md5.js@1.3.4",
      "safe-buffer": "npm:safe-buffer@5.1.1"
    },
    "npm:fastparse@1.1.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:fbjs@0.8.16": {
      "core-js": "npm:core-js@1.2.7",
      "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
      "loose-envify": "npm:loose-envify@1.3.1",
      "object-assign": "npm:object-assign@4.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "promise": "npm:promise@7.3.1",
      "setimmediate": "npm:setimmediate@1.0.5",
      "ua-parser-js": "npm:ua-parser-js@0.7.17"
    },
    "npm:flatten@1.0.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:has-ansi@2.0.0": {
      "ansi-regex": "npm:ansi-regex@2.1.1"
    },
    "npm:has-flag@1.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:has@1.0.1": {
      "function-bind": "npm:function-bind@1.1.1"
    },
    "npm:hash-base@2.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "inherits": "npm:inherits@2.0.3",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:hash-base@3.0.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "inherits": "npm:inherits@2.0.3",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:hash.js@1.1.3": {
      "inherits": "npm:inherits@2.0.3",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
    },
    "npm:history@4.7.2": {
      "invariant": "npm:invariant@2.2.4",
      "loose-envify": "npm:loose-envify@1.3.1",
      "resolve-pathname": "npm:resolve-pathname@2.2.0",
      "value-equal": "npm:value-equal@0.4.0",
      "warning": "npm:warning@3.0.0"
    },
    "npm:hmac-drbg@1.0.1": {
      "hash.js": "npm:hash.js@1.1.3",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:iconv-lite@0.4.19": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:icss-utils@2.1.0": {
      "postcss": "npm:postcss@6.0.19"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:inherits@2.0.3": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:invariant@2.2.4": {
      "loose-envify": "npm:loose-envify@1.3.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:is-svg@2.1.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "html-comment-regex": "npm:html-comment-regex@1.1.1"
    },
    "npm:isomorphic-fetch@2.2.1": {
      "node-fetch": "npm:node-fetch@1.7.3",
      "whatwg-fetch": "npm:whatwg-fetch@2.0.3"
    },
    "npm:js-base64@2.4.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:js-yaml@3.7.0": {
      "argparse": "npm:argparse@1.0.10",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "esprima": "npm:esprima@2.7.3",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:json5@0.5.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:loader-utils@1.1.0": {
      "big.js": "npm:big.js@3.2.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "emojis-list": "npm:emojis-list@2.1.0",
      "json5": "npm:json5@0.5.1",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:lodash.camelcase@4.3.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.memoize@4.1.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.uniq@4.5.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:loose-envify@1.3.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "js-tokens": "npm:js-tokens@3.0.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:macaddress@0.2.8": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:md5.js@1.3.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "hash-base": "npm:hash-base@3.0.4",
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:miller-rabin@4.0.1": {
      "bn.js": "npm:bn.js@4.11.8",
      "brorand": "npm:brorand@1.1.0"
    },
    "npm:mkdirp@0.5.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "minimist": "npm:minimist@0.0.8",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:node-fetch@1.7.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "encoding": "npm:encoding@0.1.12",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "is-stream": "npm:is-stream@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "zlib": "github:jspm/nodelibs-zlib@0.1.0"
    },
    "npm:normalize-url@1.9.1": {
      "object-assign": "npm:object-assign@4.1.1",
      "prepend-http": "npm:prepend-http@1.0.4",
      "punycode": "github:jspm/nodelibs-punycode@0.1.0",
      "query-string": "npm:query-string@4.3.4",
      "sort-keys": "npm:sort-keys@1.1.2",
      "url": "github:jspm/nodelibs-url@0.1.0"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:pako@0.2.9": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:parse-asn1@5.1.0": {
      "asn1.js": "npm:asn1.js@4.10.1",
      "browserify-aes": "npm:browserify-aes@1.1.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "create-hash": "npm:create-hash@1.1.3",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
      "pbkdf2": "npm:pbkdf2@3.0.14",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-to-regexp@1.7.0": {
      "isarray": "npm:isarray@0.0.1"
    },
    "npm:pbkdf2@3.0.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "create-hash": "npm:create-hash@1.1.3",
      "create-hmac": "npm:create-hmac@1.1.6",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "ripemd160": "npm:ripemd160@2.0.1",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "sha.js": "npm:sha.js@2.4.10"
    },
    "npm:postcss-calc@5.3.1": {
      "postcss": "npm:postcss@5.2.18",
      "postcss-message-helpers": "npm:postcss-message-helpers@2.0.0",
      "reduce-css-calc": "npm:reduce-css-calc@1.3.0"
    },
    "npm:postcss-colormin@2.2.2": {
      "colormin": "npm:colormin@1.1.2",
      "postcss": "npm:postcss@5.2.18",
      "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
    },
    "npm:postcss-convert-values@2.6.1": {
      "postcss": "npm:postcss@5.2.18",
      "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
    },
    "npm:postcss-discard-comments@2.0.4": {
      "postcss": "npm:postcss@5.2.18"
    },
    "npm:postcss-discard-duplicates@2.1.0": {
      "postcss": "npm:postcss@5.2.18"
    },
    "npm:postcss-discard-empty@2.1.0": {
      "postcss": "npm:postcss@5.2.18"
    },
    "npm:postcss-discard-overridden@0.1.1": {
      "postcss": "npm:postcss@5.2.18"
    },
    "npm:postcss-discard-unused@2.2.3": {
      "postcss": "npm:postcss@5.2.18",
      "uniqs": "npm:uniqs@2.0.0"
    },
    "npm:postcss-filter-plugins@2.0.2": {
      "postcss": "npm:postcss@5.2.18",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "uniqid": "npm:uniqid@4.1.1"
    },
    "npm:postcss-merge-idents@2.1.7": {
      "has": "npm:has@1.0.1",
      "postcss": "npm:postcss@5.2.18",
      "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
    },
    "npm:postcss-merge-longhand@2.0.2": {
      "postcss": "npm:postcss@5.2.18",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:postcss-merge-rules@2.1.2": {
      "browserslist": "npm:browserslist@1.7.7",
      "caniuse-api": "npm:caniuse-api@1.6.1",
      "postcss": "npm:postcss@5.2.18",
      "postcss-selector-parser": "npm:postcss-selector-parser@2.2.3",
      "vendors": "npm:vendors@1.0.1"
    },
    "npm:postcss-minify-font-values@1.0.5": {
      "object-assign": "npm:object-assign@4.1.1",
      "postcss": "npm:postcss@5.2.18",
      "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
    },
    "npm:postcss-minify-gradients@1.0.5": {
      "postcss": "npm:postcss@5.2.18",
      "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
    },
    "npm:postcss-minify-params@1.2.2": {
      "alphanum-sort": "npm:alphanum-sort@1.0.2",
      "postcss": "npm:postcss@5.2.18",
      "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
      "uniqs": "npm:uniqs@2.0.0"
    },
    "npm:postcss-minify-selectors@2.1.1": {
      "alphanum-sort": "npm:alphanum-sort@1.0.2",
      "has": "npm:has@1.0.1",
      "postcss": "npm:postcss@5.2.18",
      "postcss-selector-parser": "npm:postcss-selector-parser@2.2.3"
    },
    "npm:postcss-modules-extract-imports@1.2.0": {
      "postcss": "npm:postcss@6.0.19",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:postcss-modules-local-by-default@1.2.0": {
      "css-selector-tokenizer": "npm:css-selector-tokenizer@0.7.0",
      "postcss": "npm:postcss@6.0.19"
    },
    "npm:postcss-modules-scope@1.1.0": {
      "css-selector-tokenizer": "npm:css-selector-tokenizer@0.7.0",
      "postcss": "npm:postcss@6.0.19",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:postcss-modules-values@1.3.0": {
      "icss-replace-symbols": "npm:icss-replace-symbols@1.1.0",
      "postcss": "npm:postcss@6.0.19"
    },
    "npm:postcss-normalize-charset@1.1.1": {
      "postcss": "npm:postcss@5.2.18"
    },
    "npm:postcss-normalize-url@3.0.8": {
      "is-absolute-url": "npm:is-absolute-url@2.1.0",
      "normalize-url": "npm:normalize-url@1.9.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "postcss": "npm:postcss@5.2.18",
      "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
    },
    "npm:postcss-ordered-values@2.2.3": {
      "postcss": "npm:postcss@5.2.18",
      "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:postcss-reduce-idents@2.4.0": {
      "postcss": "npm:postcss@5.2.18",
      "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
    },
    "npm:postcss-reduce-initial@1.0.1": {
      "postcss": "npm:postcss@5.2.18",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:postcss-reduce-transforms@1.0.4": {
      "has": "npm:has@1.0.1",
      "postcss": "npm:postcss@5.2.18",
      "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
    },
    "npm:postcss-selector-parser@2.2.3": {
      "flatten": "npm:flatten@1.0.2",
      "indexes-of": "npm:indexes-of@1.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "uniq": "npm:uniq@1.0.1"
    },
    "npm:postcss-svgo@2.1.6": {
      "is-svg": "npm:is-svg@2.1.0",
      "postcss": "npm:postcss@5.2.18",
      "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
      "svgo": "npm:svgo@0.7.2"
    },
    "npm:postcss-unique-selectors@2.0.2": {
      "alphanum-sort": "npm:alphanum-sort@1.0.2",
      "postcss": "npm:postcss@5.2.18",
      "uniqs": "npm:uniqs@2.0.0"
    },
    "npm:postcss-zindex@2.2.0": {
      "has": "npm:has@1.0.1",
      "postcss": "npm:postcss@5.2.18",
      "uniqs": "npm:uniqs@2.0.0"
    },
    "npm:postcss@5.2.18": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "chalk": "npm:chalk@1.1.3",
      "js-base64": "npm:js-base64@2.4.3",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.5.7",
      "supports-color": "npm:supports-color@3.2.3"
    },
    "npm:postcss@6.0.19": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.6.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:process-nextick-args@2.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.10": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:promise@7.3.1": {
      "asap": "npm:asap@2.0.6",
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:prop-types@15.6.1": {
      "fbjs": "npm:fbjs@0.8.16",
      "loose-envify": "npm:loose-envify@1.3.1",
      "object-assign": "npm:object-assign@4.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:public-encrypt@4.0.0": {
      "bn.js": "npm:bn.js@4.11.8",
      "browserify-rsa": "npm:browserify-rsa@4.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "create-hash": "npm:create-hash@1.1.3",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "parse-asn1": "npm:parse-asn1@5.1.0",
      "randombytes": "npm:randombytes@2.0.6"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:q@1.5.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:query-string@4.3.4": {
      "object-assign": "npm:object-assign@4.1.1",
      "strict-uri-encode": "npm:strict-uri-encode@1.1.0"
    },
    "npm:randombytes@2.0.6": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "safe-buffer": "npm:safe-buffer@5.1.1"
    },
    "npm:randomfill@1.0.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "randombytes": "npm:randombytes@2.0.6",
      "safe-buffer": "npm:safe-buffer@5.1.1"
    },
    "npm:react-dom@16.2.0": {
      "fbjs": "npm:fbjs@0.8.16",
      "loose-envify": "npm:loose-envify@1.3.1",
      "object-assign": "npm:object-assign@4.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "prop-types": "npm:prop-types@15.6.1",
      "react": "npm:react@16.2.0",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:react-router@4.2.0": {
      "history": "npm:history@4.7.2",
      "hoist-non-react-statics": "npm:hoist-non-react-statics@2.5.0",
      "invariant": "npm:invariant@2.2.4",
      "loose-envify": "npm:loose-envify@1.3.1",
      "path-to-regexp": "npm:path-to-regexp@1.7.0",
      "prop-types": "npm:prop-types@15.6.1",
      "react": "npm:react@16.2.0",
      "warning": "npm:warning@3.0.0"
    },
    "npm:react@16.2.0": {
      "fbjs": "npm:fbjs@0.8.16",
      "loose-envify": "npm:loose-envify@1.3.1",
      "object-assign": "npm:object-assign@4.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "prop-types": "npm:prop-types@15.6.1"
    },
    "npm:readable-stream@1.1.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:readable-stream@2.3.5": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.3",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "process-nextick-args": "npm:process-nextick-args@2.0.0",
      "safe-buffer": "npm:safe-buffer@5.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "npm:string_decoder@1.0.3",
      "util-deprecate": "npm:util-deprecate@1.0.2"
    },
    "npm:reduce-css-calc@1.3.0": {
      "balanced-match": "npm:balanced-match@0.4.2",
      "math-expression-evaluator": "npm:math-expression-evaluator@1.2.17",
      "reduce-function-call": "npm:reduce-function-call@1.0.2"
    },
    "npm:reduce-function-call@1.0.2": {
      "balanced-match": "npm:balanced-match@0.4.2"
    },
    "npm:regexpu-core@1.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "regenerate": "npm:regenerate@1.3.3",
      "regjsgen": "npm:regjsgen@0.2.0",
      "regjsparser": "npm:regjsparser@0.1.5",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:regjsparser@0.1.5": {
      "jsesc": "npm:jsesc@0.5.0"
    },
    "npm:ripemd160@2.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "hash-base": "npm:hash-base@2.0.2",
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:safe-buffer@5.1.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:sax@1.2.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0"
    },
    "npm:setimmediate@1.0.5": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:sha.js@2.4.10": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "safe-buffer": "npm:safe-buffer@5.1.1"
    },
    "npm:sort-keys@1.1.2": {
      "is-plain-obj": "npm:is-plain-obj@1.1.0"
    },
    "npm:source-list-map@2.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:source-map-resolve@0.3.1": {
      "atob": "npm:atob@1.1.3",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "resolve-url": "npm:resolve-url@0.2.1",
      "source-map-url": "npm:source-map-url@0.3.0",
      "urix": "npm:urix@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0"
    },
    "npm:source-map@0.1.43": {
      "amdefine": "npm:amdefine@1.0.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:source-map@0.5.7": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:source-map@0.6.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.14"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:string_decoder@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "safe-buffer": "npm:safe-buffer@5.1.1"
    },
    "npm:strip-ansi@3.0.1": {
      "ansi-regex": "npm:ansi-regex@2.1.1"
    },
    "npm:supports-color@2.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:supports-color@3.2.3": {
      "has-flag": "npm:has-flag@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:svgo@0.7.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "coa": "npm:coa@1.0.4",
      "colors": "npm:colors@1.1.2",
      "csso": "npm:csso@2.3.2",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "js-yaml": "npm:js-yaml@3.7.0",
      "mkdirp": "npm:mkdirp@0.5.1",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "sax": "npm:sax@1.2.4",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "whet.extend": "npm:whet.extend@0.9.9"
    },
    "npm:ua-parser-js@0.7.17": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:uniqid@4.1.1": {
      "macaddress": "npm:macaddress@0.2.8",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:uniqs@2.0.0": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:urix@0.1.0": {
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util-deprecate@1.0.2": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vendors@1.0.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    },
    "npm:warning@3.0.0": {
      "loose-envify": "npm:loose-envify@1.3.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
