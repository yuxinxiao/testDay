var HtmlwebpackPlugin = require('./node_modules/html-webpack-plugin');
var OpenBrowserPlugin = require('./node_modules/open-browser-webpack-plugin');

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'Webpack-demos',
            filename: 'index.html'
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        })
    ]
};