const path = require('path');

const webpack = require('webpack');


module.exports = {
    // webpack optimization mode
    mode: ( process.env.NODE_ENV ? process.env.NODE_ENV : 'development' ),

    // entry file(s)
    entry: './src/js/index.js',

    // output file(s) and chunks
    output: {
        path: path.resolve(__dirname, 'assets/js'),
        filename: 'main.js',
        chunkFilename: '[name].js'
    },
}