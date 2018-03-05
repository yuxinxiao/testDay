module.exports = {
    entry: './entry.js',
    output: {

        path: __dirname,

        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' } //2.0貌似不支持缩写了
        ]
    }
}