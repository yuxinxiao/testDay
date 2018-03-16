'use strict';
let desert = 'canke';
let drink = 'coffee';
let breakfast = kitchen `今天的早餐是${desert}和${drink}`;

function kitchen(strings, ...values) {
    console.log(strings);
    console.log(values);
    let result = '';
    for (var i = 0; i < values.length; i++) {
        //result += strings[i];
        //result += values[i];

    }
    result += strings[strings.length - 1];
    return result;

}
console.log(breakfast);
// 模版字符串
// 1.字符串里面可以欠套变量
// 2.