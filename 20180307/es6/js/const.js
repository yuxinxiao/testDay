'use strict';
// const friut = 'apple';
// console.log(friut)
// const friut = 'apple';
// const friut = 'banana'
// console.log(friut)
// const friut = [];
// friut.push('orange');
// console.log(friut)

function breakfast() {
    return { desert: 'deserrt', tea: 'tea', orange: 'orange' }
}
let { desert: desert, tea: tea, orange: orange } = breakfast();
console.log(desert, tea, orange)
    //  let { desert: desert, tea: tea, orange: orange }  前面的desert是我们前面的属性，后面是自己定义变量的名字