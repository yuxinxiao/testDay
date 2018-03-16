/* */ 
(function(process) {
  var Cmd,
      Color,
      Opt,
      Q,
      fs;
  fs = require('fs');
  Q = require('q');
  Color = require('./color').Color;
  Cmd = require('./cmd').Cmd;
  exports.Opt = Opt = (function() {
    function Opt(_cmd) {
      this._cmd = _cmd;
      this._cmd._opts.push(this);
    }
    Opt.prototype.name = function(_name) {
      this._name = _name;
      return this;
    };
    Opt.prototype.title = Cmd.prototype.title;
    Opt.prototype.short = function(_short) {
      this._short = _short;
      return this._cmd._optsByKey['-' + _short] = this;
    };
    Opt.prototype.long = function(_long) {
      this._long = _long;
      return this._cmd._optsByKey['--' + _long] = this;
    };
    Opt.prototype.flag = function() {
      this._flag = true;
      return this;
    };
    Opt.prototype.arr = function() {
      this._arr = true;
      return this;
    };
    Opt.prototype.req = function() {
      this._req = true;
      return this;
    };
    Opt.prototype.only = function() {
      this._only = true;
      return this;
    };
    Opt.prototype.val = function(_val) {
      this._val = _val;
      return this;
    };
    Opt.prototype.def = function(_def) {
      this._def = _def;
      return this;
    };
    Opt.prototype.input = function() {
      process.stdin.pause();
      return this.def(process.stdin).val(function(v) {
        var s;
        if (typeof v === 'string') {
          if (v === '-') {
            return process.stdin;
          } else {
            s = fs.createReadStream(v, {encoding: 'utf8'});
            s.pause();
            return s;
          }
        } else {
          return v;
        }
      });
    };
    Opt.prototype.output = function() {
      return this.def(process.stdout).val(function(v) {
        if (typeof v === 'string') {
          if (v === '-') {
            return process.stdout;
          } else {
            return fs.createWriteStream(v, {encoding: 'utf8'});
          }
        } else {
          return v;
        }
      });
    };
    Opt.prototype.act = function(act) {
      var name,
          opt;
      opt = this;
      name = this._name;
      this._cmd.act(function(opts) {
        var res,
            _this = this;
        if (name in opts) {
          res = act.apply(this, arguments);
          if (opt._only) {
            return Q.when(res, function(res) {
              return _this.reject({
                toString: function() {
                  return res.toString();
                },
                exitCode: 0
              });
            });
          } else {
            return res;
          }
        }
      });
      return this;
    };
    Opt.prototype.comp = Cmd.prototype.comp;
    Opt.prototype._saveVal = function(opts, val) {
      var _name;
      if (this._val) {
        val = this._val(val);
      }
      if (this._arr) {
        (opts[_name = this._name] || (opts[_name] = [])).push(val);
      } else {
        opts[this._name] = val;
      }
      return val;
    };
    Opt.prototype._parse = function(argv, opts) {
      return this._saveVal(opts, this._flag ? true : argv.shift());
    };
    Opt.prototype._checkParsed = function(opts, args) {
      return !opts.hasOwnProperty(this._name);
    };
    Opt.prototype._usage = function() {
      var nameStr,
          res;
      res = [];
      nameStr = this._name.toUpperCase();
      if (this._short) {
        res.push('-', Color('lgreen', this._short));
        if (!this._flag) {
          res.push(' ' + nameStr);
        }
        res.push(', ');
      }
      if (this._long) {
        res.push('--', Color('green', this._long));
        if (!this._flag) {
          res.push('=' + nameStr);
        }
      }
      res.push(' : ', this._title);
      if (this._req) {
        res.push(' ', Color('lred', '(required)'));
      }
      return res.join('');
    };
    Opt.prototype._requiredText = function() {
      return 'Missing required option:\n  ' + this._usage();
    };
    Opt.prototype.reject = Cmd.prototype.reject;
    Opt.prototype.end = Cmd.prototype.end;
    Opt.prototype.apply = Cmd.prototype.apply;
    return Opt;
  })();
})(require('process'));
