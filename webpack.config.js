const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');


module.exports = {
    // webpack optimization mode
    mode: (process.env.NODE_ENV ? process.env.NODE_ENV : 'development'),

    // entry file(s)
    entry: {
        css: ['./src/css/app.scss'],
        app: ['./src/js/app.js'],
        page_1: ['./src/js/page2.js'],
    },

    // output file(s) and chunks
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].common.js',
        // publicPath: "./"
    },


    //plugins
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackAssetsManifest(),
    ],



    // module/loaders configuration
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },  {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'css/', name: '[name].min.css'}
                    },
                    'sass-loader'
                ]
            }
        ]
    },



    // optimization
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 2
        },
    },
}