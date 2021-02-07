const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ChunksWebpackPlugin = require('chunks-webpack-plugin');

module.exports = {
    // webpack optimization mode
    mode: (process.env.NODE_ENV ? process.env.NODE_ENV : 'development'),

    // entry file(s)
    entry: {
        // css: [ path.resolve(__dirname, '../src/css/app.scss')],
        homepage: [ path.resolve(__dirname, '../src/js/homepage.js')],
        page_1: [ path.resolve(__dirname, '../src/js/page_1.js')],
        page_2: [ path.resolve(__dirname, '../src/js/page_2.js')],
    },

    // output file(s) and chunks
    output: {
        path: path.resolve(__dirname, '../assets'),
        filename: 'js/[name].bundle.js',
        // chunkFilename: 'js/[name].common.js',
        publicPath: "../"
    },


    //plugins
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!img'],
        }),
        // new BundleAnalyzerPlugin(),
        new ChunksWebpackPlugin({
            generateChunksManifest: true,
            generateChunksFiles: false,
        }),
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
            },
            // {
            //     test: /\.scss$/,
            //     exclude: /node_modules/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: { outputPath: 'css/', name: '[name].min.css' }
            //         },
            //         "postcss-loader",
            //         'sass-loader'
            //     ]
            // }
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