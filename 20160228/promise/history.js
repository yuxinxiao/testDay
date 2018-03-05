let p = new Promise(function(resolve, reject) {
    resolve('123')

})
p.then(function(data) {
    return new Promise(function(resolve, reject) {
        console.log(33)

    })

    console.log(data)
}, function(err) {
    console.log(err)
})

function Promise(executer) {
    let self = this;
    self.status = 'pending';
    self.value = undefined;
    self.reason = undefined;
    self.onResolvedCallBacks = [];
    self.onRejectedCallBacks = [];

    function resolve(value) {
        if (self.status == 'pending') {
            self.value = value;
            self.status = 'resolved'
            self.onResolvedCallBacks.forEach(item => item(self.value));

        }

    }

    function reject(reason) {
        if (self.status == 'pending') {
            self.value = reason;
            self.status = 'rejected'
            self.onResolvedCallBacks.forEach(item => item(self.reason))

        }

    }
    try {
        executer(resolve, reject)

    } catch (e) { //有错误会走向失败
        reject(e)

    }


}
Promise.prototype.then = function(onFulfilled, onRejected) {
    let self = this;
    let promosi2;

    if (self.status == 'resolved') {
        return promise2 = new Promise(function(resolve, reject) {

            let x = onFulfilled(self.value);
            resolve(x)
        })

    }
    if (self.status == 'rejected') {
        onRejected(self.reason)

    }
    if (self.status == 'pending') {
        self.onResolvedCallBacks.push(onFulfilled)
        self.onRejectedCallbacks.push(onRejected)

    }


}
module.exports = Promise65432