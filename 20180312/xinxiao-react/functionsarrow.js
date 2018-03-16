import { DESTRUCTION } from "dns";

// var f = v => v;
// var f = function(v) {
//     return f
// }
// 2. 如果箭头函数不需要参数或者需要多个参数， 就用一个圆括号代表参数部分。
// var f = () => v;
// var f = function() {
//     return v
// };
// var f = (num1, num2) => num1 + num2;
// var f = function(bum1, num2) {
//     return num1 + num2;
// }
// 3. 如果尖头函数代码部分多余一条语句， 就要用大括号把他们括起来， 并使用return语句返回， 
// var num1 = (num1 + num2) => ({ return num1 + num2 });


// 4.如果返回是一个对象， 就要用（） 括起来
// let getTempItem=id=
// 5. 直有一行语句且不需要返回值
// let fn = () => void doseNoReturn();
// var fn = function fn() {
//     return void doseNoReturn();
// }
// 函数可以与解构一起用
// const full = ({ first, last }) => first + ' ' + last;

// // 等同于
// function full(person) {
//     return person.first + ' ' + person.last;
// }
// const isEven = n => n % 2 == 0;
// const square = n => n * n;

// function square(n) {
//     return n % 2 === 0

// }

// function isEven(n) {
//     return n * n

// }
// const full = ({ first, last }) => first + ' ' + last;

// function full(person) {
//     return person, firset + person.last;

// }
// var arr = [1, 2, 3]
// arr.map(function(x) {
//     return x * x;
// });
// console.log(arr.map)

// [1, 2, 4].map(x => x * 2);
// //在严格模式下面，将this忽略
// //es6中没有严格的arguments的其实就是参数的arguments
// //箭头函数的优先级高于其他，但写法上要注意



// //lei
// 1. ES5 的构造函数Point， 对应 ES6 的Point类的构造方法。
// 2， 类定义的构造方法不需要加function
// 3. 类还有一个tostring方法， 方法之间不需要逗号分隔， 加了会报错。
// 4. ES6中所有的方法其实都是定义在es5的原型上的
// 4. 在类的实🍐 上调用方法， 实际上就是调用diao用原型的方法
// class B {}
// let b = new B();
// b.constructor === B.prototype.constructor // true
// 5. Object.assign() 方法可以向一个类的原型上一次性添加多个方法
// class Point {
//     constructor() {
//         // ...
//     }
// }
// Object.assign(Point.prototype, {
//     toString() {},
//     toValue() {}
// });
// 6. prototype对象的constructor属性， 直接指向“ 类” 的本身
// Point.prototype.constructor === Point // true
// 7. 类的内部所有定义的方法， 都是不可枚举的（ non - enumerable）;
// 原型伤的可以枚举
// 8. 类的属性名可以采用表达式
// 9. constructor是类得默认方法， 通过new 命令生成对象实例时， 自动调用该方法。 如果没有显示添加， 会隐式自动添加
// 10. constructor方法默认返回实例对象， 即this, 完全可以指定返回令挖一个对象
// 11. 返回新的对象， 导致返回的对象不是foo的shili， 类必须使用new调用， 否则会报错
// 12. 类的所有实例共享一个原型对象。
// var p1 = new Point(2, 3);
// var p2 = new Point(3, 2);

// p1.__proto__ === p2.__proto__
//     //true
// 13.
// class Foo {
//     constructor() {
//         return Object.create(null);
//     }
// }

// new Foo() instanceof Foo
// Foo()
//     // TypeError: Class constructor Foo cannot be invoked without 'new'






// 1. class， 这个类的名字是MyClass而不是Me， Me只在 Class 的内部代码可用， 指代当前类。
// 如果类的内部没用到的话， 可以省略Me， 也就是可以写成下面的形式。
// const MyClass = class Me {
//     getClassName() {
//         return Me.name;
//     }
// };
// 2.不存在变量提升类的方法内部如果含有this，它默认指向类的实例
// 3.
// 3.


// "\u{20BB7}"
// “、u{20BB7}∏∏