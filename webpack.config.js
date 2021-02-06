const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ChunksWebpackPlugin = require('chunks-webpack-plugin');
const autoprefixer = require("autoprefixer");

module.exports = {
    // webpack optimization mode
    mode: (process.env.NODE_ENV ? process.env.NODE_ENV : 'development'),

    // entry file(s)
    entry: {
        // css: ['./src/css/app.scss'],
        app: ['./src/js/app.js'],
        page_1: ['./src/js/page_1.js'],
        page_2: ['./src/js/page_2.js', 'swiper'],
    },

    // output file(s) and chunks
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'js/[name].bundle.js',
        // chunkFilename: 'js/[name].common.js',
        publicPath: "./"
    },


    //plugins
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
        new ChunksWebpackPlugin({
            generateChunksManifest: true,
            generateChunksFiles: false,
        })
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
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'css/', name: '[name].min.css' }
                    },
                    "postcss-loader",
                    'sass-loader'
                ]
            }
        ]
    },



    // optimization
    optimization: {
        splitChunks: {
            // name: '[name].chunks',
            // name: false,
            chunks: 'all',
            minChunks: 1,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    // name: 'vendor',
                    // enforce: true,
                    // minChunks: 3
                }
            }
        },
    },
}