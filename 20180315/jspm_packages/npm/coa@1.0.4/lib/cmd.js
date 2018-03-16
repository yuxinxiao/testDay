/* */ 
(function(process) {
  var Cmd,
      Color,
      PATH,
      Q,
      UTIL,
      __slice = [].slice;
  UTIL = require('util');
  PATH = require('path');
  Color = require('./color').Color;
  Q = require('q');
  exports.Cmd = Cmd = (function() {
    function Cmd(cmd) {
      if (!(this instanceof Cmd)) {
        return new Cmd(cmd);
      }
      this._parent(cmd);
      this._cmds = [];
      this._cmdsByName = {};
      this._opts = [];
      this._optsByKey = {};
      this._args = [];
      this._ext = false;
    }
    Cmd.get = function(propertyName, func) {
      return Object.defineProperty(this.prototype, propertyName, {
        configurable: true,
        enumerable: true,
        get: func
      });
    };
    Cmd.get('api', function() {
      var c,
          _fn,
          _this = this;
      if (!this._api) {
        this._api = function() {
          return _this.invoke.apply(_this, arguments);
        };
      }
      _fn = function(c) {
        return _this._api[c] = _this._cmdsByName[c].api;
      };
      for (c in this._cmdsByName) {
        _fn(c);
      }
      return this._api;
    });
    Cmd.prototype._parent = function(cmd) {
      this._cmd = cmd || this;
      if (cmd) {
        cmd._cmds.push(this);
        if (this._name) {
          this._cmd._cmdsByName[this._name] = this;
        }
      }
      return this;
    };
    Cmd.prototype.name = function(_name) {
      this._name = _name;
      if (this._cmd !== this) {
        this._cmd._cmdsByName[_name] = this;
      }
      return this;
    };
    Cmd.prototype.title = function(_title) {
      this._title = _title;
      return this;
    };
    Cmd.prototype.cmd = function(cmd) {
      if (cmd) {
        return cmd._parent(this);
      } else {
        return new Cmd(this);
      }
    };
    Cmd.prototype.opt = function() {
      return new (require('./opt').Opt)(this);
    };
    Cmd.prototype.arg = function() {
      return new (require('./arg').Arg)(this);
    };
    Cmd.prototype.act = function(act, force) {
      if (!act) {
        return this;
      }
      if (!force && this._act) {
        this._act.push(act);
      } else {
        this._act = [act];
      }
      return this;
    };
    Cmd.prototype.comp = function(_comp) {
      this._comp = _comp;
      return this;
    };
    Cmd.prototype.apply = function() {
      var args,
          fn;
      fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      fn.apply(this, args);
      return this;
    };
    Cmd.prototype.helpful = function() {
      return this.opt().name('help').title('Help').short('h').long('help').flag().only().act(function() {
        return this.usage();
      }).end();
    };
    Cmd.prototype.completable = function() {
      return this.cmd().name('completion').apply(require('./completion')).end();
    };
    Cmd.prototype.extendable = function(pattern) {
      this._ext = pattern || true;
      return this;
    };
    Cmd.prototype._exit = function(msg, code) {
      return process.once('exit', function() {
        if (msg) {
          console.error(msg);
        }
        return process.exit(code || 0);
      });
    };
    Cmd.prototype.usage = function() {
      var res;
      res = [];
      if (this._title) {
        res.push(this._fullTitle());
      }
      res.push('', 'Usage:');
      if (this._cmds.length) {
        res.push(['', '', Color('lred', this._fullName()), Color('lblue', 'COMMAND'), Color('lgreen', '[OPTIONS]'), Color('lpurple', '[ARGS]')].join(' '));
      }
      if (this._opts.length + this._args.length) {
        res.push(['', '', Color('lred', this._fullName()), Color('lgreen', '[OPTIONS]'), Color('lpurple', '[ARGS]')].join(' '));
      }
      res.push(this._usages(this._cmds, 'Commands'), this._usages(this._opts, 'Options'), this._usages(this._args, 'Arguments'));
      return res.join('\n');
    };
    Cmd.prototype._usage = function() {
      return Color('lblue', this._name) + ' : ' + this._title;
    };
    Cmd.prototype._usages = function(os, title) {
      var o,
          res,
          _i,
          _len;
      if (!os.length) {
        return;
      }
      res = ['', title + ':'];
      for (_i = 0, _len = os.length; _i < _len; _i++) {
        o = os[_i];
        res.push('  ' + o._usage());
      }
      return res.join('\n');
    };
    Cmd.prototype._fullTitle = function() {
      return (this._cmd === this ? '' : this._cmd._fullTitle() + '\n') + this._title;
    };
    Cmd.prototype._fullName = function() {
      return (this._cmd === this ? '' : this._cmd._fullName() + ' ') + PATH.basename(this._name);
    };
    Cmd.prototype._ejectOpt = function(opts, opt) {
      var pos;
      if ((pos = opts.indexOf(opt)) >= 0) {
        if (opts[pos]._arr) {
          return opts[pos];
        } else {
          return opts.splice(pos, 1)[0];
        }
      }
    };
    Cmd.prototype._checkRequired = function(opts, args) {
      var all,
          i;
      if (!(this._opts.filter(function(o) {
        return o._only && o._name in opts;
      })).length) {
        all = this._opts.concat(this._args);
        while (i = all.shift()) {
          if (i._req && i._checkParsed(opts, args)) {
            return this.reject(i._requiredText());
          }
        }
      }
    };
    Cmd.prototype._parseCmd = function(argv, unparsed) {
      var c,
          cmd,
          cmdDesc,
          e,
          i,
          optSeen,
          pkg;
      if (unparsed == null) {
        unparsed = [];
      }
      argv = argv.concat();
      optSeen = false;
      while (i = argv.shift()) {
        if (!i.indexOf('-')) {
          optSeen = true;
        }
        if (!optSeen && /^\w[\w-_]*$/.test(i)) {
          cmd = this._cmdsByName[i];
          if (!cmd && this._ext) {
            if (typeof this._ext === 'string') {
              if (~this._ext.indexOf('%s')) {
                pkg = UTIL.format(this._ext, i);
              } else {
                pkg = this._ext + i;
              }
            } else if (this._ext === true) {
              pkg = i;
              c = this;
              while (true) {
                pkg = c._name + '-' + pkg;
                if (c._cmd === c) {
                  break;
                }
                c = c._cmd;
              }
            }
            try {
              cmdDesc = require(pkg);
            } catch (_error) {
              e = _error;
            }
            if (cmdDesc) {
              if (typeof cmdDesc === 'function') {
                this.cmd().name(i).apply(cmdDesc).end();
              } else if (typeof cmdDesc === 'object') {
                this.cmd(cmdDesc);
                cmdDesc.name(i);
              } else {
                throw new Error('Error: Unsupported command declaration type, ' + 'should be function or COA.Cmd() object');
              }
              cmd = this._cmdsByName[i];
            }
          }
          if (cmd) {
            return cmd._parseCmd(argv, unparsed);
          }
        }
        unparsed.push(i);
      }
      return {
        cmd: this,
        argv: unparsed
      };
    };
    Cmd.prototype._parseOptsAndArgs = function(argv) {
      var a,
          arg,
          args,
          i,
          m,
          nonParsedArgs,
          nonParsedOpts,
          opt,
          opts,
          res;
      opts = {};
      args = {};
      nonParsedOpts = this._opts.concat();
      nonParsedArgs = this._args.concat();
      while (i = argv.shift()) {
        if (i !== '--' && !i.indexOf('-')) {
          if (m = i.match(/^(--\w[\w-_]*)=(.*)$/)) {
            i = m[1];
            if (!this._optsByKey[i]._flag) {
              argv.unshift(m[2]);
            }
          }
          if (opt = this._ejectOpt(nonParsedOpts, this._optsByKey[i])) {
            if (Q.isRejected(res = opt._parse(argv, opts))) {
              return res;
            }
          } else {
            return this.reject("Unknown option: " + i);
          }
        } else {
          if (i === '--') {
            i = argv.splice(0);
          }
          i = Array.isArray(i) ? i : [i];
          while (a = i.shift()) {
            if (arg = nonParsedArgs.shift()) {
              if (arg._arr) {
                nonParsedArgs.unshift(arg);
              }
              if (Q.isRejected(res = arg._parse(a, args))) {
                return res;
              }
            } else {
              return this.reject("Unknown argument: " + a);
            }
          }
        }
      }
      return {
        opts: this._setDefaults(opts, nonParsedOpts),
        args: this._setDefaults(args, nonParsedArgs)
      };
    };
    Cmd.prototype._setDefaults = function(params, desc) {
      var i,
          _i,
          _len;
      for (_i = 0, _len = desc.length; _i < _len; _i++) {
        i = desc[_i];
        if (!(i._name in params) && '_def' in i) {
          i._saveVal(params, i._def);
        }
      }
      return params;
    };
    Cmd.prototype._processParams = function(params, desc) {
      var i,
          n,
          notExists,
          res,
          v,
          vals,
          _i,
          _j,
          _len,
          _len1;
      notExists = [];
      for (_i = 0, _len = desc.length; _i < _len; _i++) {
        i = desc[_i];
        n = i._name;
        if (!(n in params)) {
          notExists.push(i);
          continue;
        }
        vals = params[n];
        delete params[n];
        if (!Array.isArray(vals)) {
          vals = [vals];
        }
        for (_j = 0, _len1 = vals.length; _j < _len1; _j++) {
          v = vals[_j];
          if (Q.isRejected(res = i._saveVal(params, v))) {
            return res;
          }
        }
      }
      return this._setDefaults(params, notExists);
    };
    Cmd.prototype._parseArr = function(argv) {
      return Q.when(this._parseCmd(argv), function(p) {
        return Q.when(p.cmd._parseOptsAndArgs(p.argv), function(r) {
          return {
            cmd: p.cmd,
            opts: r.opts,
            args: r.args
          };
        });
      });
    };
    Cmd.prototype._do = function(input) {
      var _this = this;
      return Q.when(input, function(input) {
        var cmd;
        cmd = input.cmd;
        return [_this._checkRequired].concat(cmd._act || []).reduce(function(res, act) {
          return Q.when(res, function(res) {
            return act.call(cmd, input.opts, input.args, res);
          });
        }, void 0);
      });
    };
    Cmd.prototype.run = function(argv) {
      var cb,
          _this = this;
      if (argv == null) {
        argv = process.argv.slice(2);
      }
      cb = function(code) {
        return function(res) {
          var _ref,
              _ref1;
          if (res) {
            return _this._exit((_ref = res.stack) != null ? _ref : res.toString(), (_ref1 = res.exitCode) != null ? _ref1 : code);
          } else {
            return _this._exit();
          }
        };
      };
      Q.when(this["do"](argv), cb(0), cb(1)).done();
      return this;
    };
    Cmd.prototype["do"] = function(argv) {
      return this._do(this._parseArr(argv || []));
    };
    Cmd.prototype.invoke = function(cmds, opts, args) {
      var _this = this;
      if (cmds == null) {
        cmds = [];
      }
      if (opts == null) {
        opts = {};
      }
      if (args == null) {
        args = {};
      }
      if (typeof cmds === 'string') {
        cmds = cmds.split(' ');
      }
      if (arguments.length < 3) {
        if (!Array.isArray(cmds)) {
          args = opts;
          opts = cmds;
          cmds = [];
        }
      }
      return Q.when(this._parseCmd(cmds), function(p) {
        if (p.argv.length) {
          return _this.reject("Unknown command: " + cmds.join(' '));
        }
        return Q.all([_this._processParams(opts, _this._opts), _this._processParams(args, _this._args)]).spread(function(opts, args) {
          return _this._do({
            cmd: p.cmd,
            opts: opts,
            args: args
          }).fail(function(res) {
            if (res && res.exitCode === 0) {
              return res.toString();
            } else {
              return _this.reject(res);
            }
          });
        });
      });
    };
    Cmd.prototype.reject = function(reason) {
      return Q.reject(reason);
    };
    Cmd.prototype.end = function() {
      return this._cmd;
    };
    return Cmd;
  })();
})(require('process'));
