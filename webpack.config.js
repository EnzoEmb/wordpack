const path = require('path');
// const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ChunksWebpackPlugin = require('chunks-webpack-plugin');
// const autoprefixer = require("autoprefixer");
// const CopyPlugin = require("copy-webpack-plugin");

// const ImageminPlugin = require('imagemin-webpack-plugin').default
// const imageminMozjpeg = require('imagemin-mozjpeg')
// const imageminWebp = require('imagemin-webp');
// const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

// const imagemin = require( "imagemin" )
const webp = require("imagemin-webp")

// imagemin( ['src/img/*.{jpg,png,,svg,jpeg}'], {
//     destination: 'assets/img',
//     plugins: [
//         webp( { quality: 60 } )
//     ]
// } )

module.exports = {
    // webpack optimization mode
    mode: (process.env.NODE_ENV ? process.env.NODE_ENV : 'development'),

    // entry file(s)
    entry: {
        css: ['./src/css/app.scss'],
        app: ['./src/js/app.js'],
        page_1: ['./src/js/page_1.js'],
        page_2: ['./src/js/page_2.js'],
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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!img/**/*'],
        }),
        // new BundleAnalyzerPlugin(),
        new ChunksWebpackPlugin({
            generateChunksManifest: true,
            generateChunksFiles: false,
        }),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: "./src/img/",
        //             to: "./img",
        //         },
        //     ],
        // }),
        // new ImageminWebpWebpackPlugin({
        //     options: {
        //         quality: 1
        //     }
        // }),
        // new ImageminPlugin({
        //     test: /\.(jpe?g|png|gif|svg)$/i,
        //     onlyUseIfSmaller: true,
        //     cacheFolder: path.resolve('./cache-images'),
        //     optipng: {
        //         optimizationLevel: 9
        //     },
        //     pngquant: {
        //         quality: '70'
        //     },
        //     plugins: [
        //         imageminMozjpeg({
        //             quality: 50,
        //             progressive: true
        //         }),
        //     ]
        // }),
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