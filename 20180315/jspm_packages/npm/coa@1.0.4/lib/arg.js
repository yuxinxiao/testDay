/* */ 
var Arg,
    Cmd,
    Color,
    Opt;
Color = require('./color').Color;
Cmd = require('./cmd').Cmd;
Opt = require('./opt').Opt;
exports.Arg = Arg = (function() {
  function Arg(_cmd) {
    this._cmd = _cmd;
    this._cmd._args.push(this);
  }
  Arg.prototype.name = Opt.prototype.name;
  Arg.prototype.title = Cmd.prototype.title;
  Arg.prototype.arr = Opt.prototype.arr;
  Arg.prototype.req = Opt.prototype.req;
  Arg.prototype.val = Opt.prototype.val;
  Arg.prototype.def = Opt.prototype.def;
  Arg.prototype.comp = Cmd.prototype.comp;
  Arg.prototype.input = Opt.prototype.input;
  Arg.prototype.output = Opt.prototype.output;
  Arg.prototype._parse = function(arg, args) {
    return this._saveVal(args, arg);
  };
  Arg.prototype._saveVal = Opt.prototype._saveVal;
  Arg.prototype._checkParsed = function(opts, args) {
    return !args.hasOwnProperty(this._name);
  };
  Arg.prototype._usage = function() {
    var res;
    res = [];
    res.push(Color('lpurple', this._name.toUpperCase()), ' : ', this._title);
    if (this._req) {
      res.push(' ', Color('lred', '(required)'));
    }
    return res.join('');
  };
  Arg.prototype._requiredText = function() {
    return 'Missing required argument:\n  ' + this._usage();
  };
  Arg.prototype.reject = Cmd.prototype.reject;
  Arg.prototype.end = Cmd.prototype.end;
  Arg.prototype.apply = Cmd.prototype.apply;
  return Arg;
})();
