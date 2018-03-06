//__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
module.exports = { //注意这里是exports不是export
    entry: "./entry.js", //唯一入口文件，就像Java中的main方法
    output: { //输出目录
        path: __dirname, //打包后的js文件存放的地方
        filename: "bundle.js" //打包后的js文件名
    },

    devServer: {　　　　　　　　　　　　 //webpack-dev-server配置，与webpack-dev-server --port=3000 --inline --host 0.0.0.0 --colors --hot相辉映
        contentBase: './',
        colors: true,
        inline: true,
        historyApiFallback: true
    }
};