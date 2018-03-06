var webpack = require('./node_modules/webpack');
var UglifyPlugin = require('./node_modules/uglifyjs-webpack-plugin');
var webpack = require('webpack');
var UglifyJsPlugin = require('./node_modules/uglifyjs-webpack-plugin');

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new UglifyJsPlugin()
    ]
};