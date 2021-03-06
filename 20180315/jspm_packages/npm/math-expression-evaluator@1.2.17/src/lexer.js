/* */ 
var Mexp = require('./math_function');
function inc(arr, val) {
  for (var i = 0; i < arr.length; i++)
    arr[i] += val;
  return arr;
}
var token = ['sin', 'cos', 'tan', 'pi', '(', ')', 'P', 'C', 'asin', 'acos', 'atan', '7', '8', '9', 'int', 'cosh', 'acosh', 'ln', '^', 'root', '4', '5', '6', '/', '!', 'tanh', 'atanh', 'Mod', '1', '2', '3', '*', 'sinh', 'asinh', 'e', 'log', '0', '.', '+', '-', ',', 'Sigma', 'n', 'Pi', 'pow'];
var show = ['sin', 'cos', 'tan', '&pi;', '(', ')', 'P', 'C', 'asin', 'acos', 'atan', '7', '8', '9', 'Int', 'cosh', 'acosh', ' ln', '^', 'root', '4', '5', '6', '&divide;', '!', 'tanh', 'atanh', ' Mod ', '1', '2', '3', '&times;', 'sinh', 'asinh', 'e', ' log', '0', '.', '+', '-', ',', '&Sigma;', 'n', '&Pi;', 'pow'];
var eva = [Mexp.math.sin, Mexp.math.cos, Mexp.math.tan, 'PI', '(', ')', Mexp.math.P, Mexp.math.C, Mexp.math.asin, Mexp.math.acos, Mexp.math.atan, '7', '8', '9', Math.floor, Mexp.math.cosh, Mexp.math.acosh, Math.log, Math.pow, Math.sqrt, '4', '5', '6', Mexp.math.div, Mexp.math.fact, Mexp.math.tanh, Mexp.math.atanh, Mexp.math.mod, '1', '2', '3', Mexp.math.mul, Mexp.math.sinh, Mexp.math.asinh, 'E', Mexp.math.log, '0', '.', Mexp.math.add, Mexp.math.sub, ',', Mexp.math.sigma, 'n', Mexp.math.Pi, Math.pow];
var preced = {
  0: 11,
  1: 0,
  2: 3,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 11,
  8: 11,
  9: 1,
  10: 10,
  11: 0,
  12: 11,
  13: 0
};
var type = [0, 0, 0, 3, 4, 5, 10, 10, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 10, 0, 1, 1, 1, 2, 7, 0, 0, 2, 1, 1, 1, 2, 0, 0, 3, 0, 1, 6, 9, 9, 11, 12, 13, 12, 8];
var type0 = {
  0: true,
  1: true,
  3: true,
  4: true,
  6: true,
  8: true,
  9: true,
  12: true,
  13: true
},
    type1 = {
      0: true,
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
      10: true,
      11: true,
      12: true,
      13: true
    },
    type_1 = {
      0: true,
      3: true,
      4: true,
      8: true,
      12: true,
      13: true
    },
    empty = {},
    type_3 = {
      0: true,
      1: true,
      3: true,
      4: true,
      6: true,
      8: true,
      12: true,
      13: true
    },
    type6 = {1: true},
    newAr = [[], ["1", "2", "3", "7", "8", "9", "4", "5", "6", "+", "-", "*", "/", "(", ")", "^", "!", "P", "C", "e", "0", ".", ",", "n"], ["pi", "ln", "Pi"], ["sin", "cos", "tan", "Del", "int", "Mod", "log", "pow"], ["asin", "acos", "atan", "cosh", "root", "tanh", "sinh"], ["acosh", "atanh", "asinh", "Sigma"]];
function match(str1, str2, i, x) {
  for (var f = 0; f < x; f++) {
    if (str1[i + f] !== str2[f])
      return false;
  }
  return true;
}
Mexp.addToken = function(tokens) {
  for (i = 0; i < tokens.length; i++) {
    x = tokens[i].token.length;
    var temp = -1;
    if (x < newAr.length)
      for (y = 0; y < newAr[x].length; y++) {
        if (tokens[i].token === newAr[x][y]) {
          temp = token.indexOf(newAr[x][y]);
          break;
        }
      }
    if (temp === -1) {
      token.push(tokens[i].token);
      type.push(tokens[i].type);
      if (newAr.length <= tokens[i].token.length)
        newAr[tokens[i].token.length] = [];
      newAr[tokens[i].token.length].push(tokens[i].token);
      eva.push(tokens[i].value);
      show.push(tokens[i].show);
    } else {
      token[temp] = tokens[i].token;
      type[temp] = tokens[i].type;
      eva[temp] = tokens[i].value;
      show[temp] = tokens[i].show;
    }
  }
};
Mexp.lex = function(inp, tokens) {
  'use strict';
  var str = [{
    type: 4,
    value: "(",
    show: "(",
    pre: 0
  }];
  var ptc = [];
  var inpStr = inp;
  var key;
  var pcounter = 0;
  var allowed = type0;
  var bracToClose = 0;
  var asterick = empty;
  var prevKey = '';
  var i,
      x,
      y;
  if (typeof tokens !== "undefined")
    Mexp.addToken(tokens);
  var obj = {};
  for (i = 0; i < inpStr.length; i++) {
    if (inpStr[i] == ' ') {
      continue;
    }
    key = '';
    sec: for (x = (inpStr.length - i > (newAr.length - 2) ? newAr.length - 1 : inpStr.length - i); x > 0; x--) {
      for (y = 0; y < newAr[x].length; y++) {
        if (match(inpStr, newAr[x][y], i, x)) {
          key = newAr[x][y];
          break sec;
        }
      }
    }
    i += key.length - 1;
    if (key === '') {
      throw (new Mexp.exception("Can't understand after " + inpStr.slice(i)));
    }
    var index = token.indexOf(key);
    var cToken = key;
    var cType = type[index];
    var cEv = eva[index];
    var cPre = preced[cType];
    var cShow = show[index];
    var pre = str[str.length - 1];
    for (j = ptc.length; j--; ) {
      if (ptc[j] === 0) {
        if ([0, 2, 3, 5, 9, 11, 12, 13].indexOf(cType) !== -1) {
          if (allowed[cType] !== true) {
            throw (new Mexp.exception(key + " is not allowed after " + prevKey));
          }
          str.push({
            value: ")",
            type: 5,
            pre: 0,
            show: ")"
          });
          allowed = type1;
          asterick = type_3;
          inc(ptc, -1).pop();
        }
      }
    }
    if (allowed[cType] !== true) {
      throw (new Mexp.exception(key + " is not allowed after " + prevKey));
    }
    if (asterick[cType] === true) {
      cType = 2;
      cEv = Mexp.math.mul;
      cShow = "&times;";
      cPre = 3;
      i = i - key.length;
    }
    obj = {
      value: cEv,
      type: cType,
      pre: cPre,
      show: cShow
    };
    if (cType === 0) {
      allowed = type0;
      asterick = empty;
      inc(ptc, 2).push(2);
      str.push(obj);
      str.push({
        value: "(",
        type: 4,
        pre: 0,
        show: "("
      });
    } else if (cType === 1) {
      if (pre.type === 1) {
        pre.value += cEv;
        inc(ptc, 1);
      } else {
        str.push(obj);
      }
      allowed = type1;
      asterick = type_1;
    } else if (cType === 2) {
      allowed = type0;
      asterick = empty;
      inc(ptc, 2);
      str.push(obj);
    } else if (cType === 3) {
      str.push(obj);
      allowed = type1;
      asterick = type_3;
    } else if (cType === 4) {
      pcounter += ptc.length;
      ptc = [];
      bracToClose++;
      allowed = type0;
      asterick = empty;
      str.push(obj);
    } else if (cType === 5) {
      if (!bracToClose) {
        throw (new Mexp.exception("Closing parenthesis are more than opening one, wait What!!!"));
      }
      while (pcounter--) {
        str.push({
          value: ")",
          type: 5,
          pre: 0,
          show: ")"
        });
      }
      pcounter = 0;
      bracToClose--;
      allowed = type1;
      asterick = type_3;
      str.push(obj);
    } else if (cType === 6) {
      if (pre.hasDec) {
        throw (new Mexp.exception("Two decimals are not allowed in one number"));
      }
      if (pre.type !== 1) {
        pre = {
          value: 0,
          type: 1,
          pre: 0
        };
        str.push(pre);
        inc(ptc, -1);
      }
      allowed = type6;
      inc(ptc, 1);
      asterick = empty;
      pre.value += cEv;
      pre.hasDec = true;
    } else if (cType === 7) {
      allowed = type1;
      asterick = type_3;
      inc(ptc, 1);
      str.push(obj);
    }
    if (cType === 8) {
      allowed = type0;
      asterick = empty;
      inc(ptc, 4).push(4);
      str.push(obj);
      str.push({
        value: "(",
        type: 4,
        pre: 0,
        show: "("
      });
    } else if (cType === 9) {
      if (pre.type === 9) {
        if (pre.value === Mexp.math.add) {
          pre.value = cEv;
          pre.show = cShow;
          inc(ptc, 1);
        } else if (pre.value === Mexp.math.sub && cShow === '-') {
          pre.value = Mexp.math.add;
          pre.show = '+';
          inc(ptc, 1);
        }
      } else if (pre.type !== 5 && pre.type !== 7 && pre.type !== 1 && pre.type !== 3 && pre.type !== 13) {
        if (cToken === '-') {
          allowed = type0;
          asterick = empty;
          inc(ptc, 2).push(2);
          str.push({
            value: Mexp.math.changeSign,
            type: 0,
            pre: 21,
            show: "-"
          });
          str.push({
            value: "(",
            type: 4,
            pre: 0,
            show: "("
          });
        }
      } else {
        str.push(obj);
        inc(ptc, 2);
      }
      allowed = type0;
      asterick = empty;
    } else if (cType === 10) {
      allowed = type0;
      asterick = empty;
      inc(ptc, 2);
      str.push(obj);
    } else if (cType === 11) {
      allowed = type0;
      asterick = empty;
      str.push(obj);
    } else if (cType === 12) {
      allowed = type0;
      asterick = empty;
      inc(ptc, 6).push(6);
      str.push(obj);
      str.push({
        value: "(",
        type: 4,
        pre: 0
      });
    } else if (cType === 13) {
      allowed = type1;
      asterick = type_3;
      str.push(obj);
    }
    inc(ptc, -1);
    prevKey = key;
  }
  for (var j = ptc.length; j--; ) {
    if (ptc[j] === 0) {
      str.push({
        value: ")",
        show: ")",
        type: 5,
        pre: 3
      });
      inc(ptc, -1).pop();
    }
  }
  if (allowed[5] !== true) {
    throw (new Mexp.exception("complete the expression"));
  }
  while (bracToClose--)
    str.push({
      value: ")",
      show: ")",
      type: 5,
      pre: 3
    });
  str.push({
    type: 5,
    value: ")",
    show: ")",
    pre: 0
  });
  return new Mexp(str);
};
module.exports = Mexp;
