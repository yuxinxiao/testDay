var p1 = new Promise(function(resolve, reject) {
    resolve('ok')

})
p1.then(function(data) {
    console.log(data)
}, function(err) {
    console.log(err)
})
console.log(2)