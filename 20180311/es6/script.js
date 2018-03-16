'use strict';

// if (true) {
//     let fruit = 'apple';
//     console.log(fruit)

// }
// if (true) {
//     let fruit = 'apple';
// }
// console.log(fruit)
// if (true) {
//     { let fruit = 'apple' }
// }
// console.log(fruit); { let fruit = 'apple' }
// console.log(fruit)
const fruit = []

fruit.push('orange')
console.log(fruit);
let a = 20; { let a = 20 } {
    let a = 10; {
        console.log(a);
        let a = 20;
    }
}

//zhuyi: 不知es6是做什么的， 可以先转换成ws5看看
// 1.var
// 可以重复声明
// 不能定义常量
// 没有块级作用域
//
// let 没有预解释

//以前js只有2个作用域

// 1.const

// const fruit='banban';
// console.log(fruit);
const obj = {
    name: 'zfpx'
}
obj.name = "yxx";
console.log(obj)
    //虽然常量不能在饮用别的对象了，
    // 但是他的值如果是一个饮用的，话饮用对象的属性还可以改的
    //es6中生命变了2种方式