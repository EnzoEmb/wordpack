let mix = require('laravel-mix');
let webpack = require('webpack');
// const ChunksWebpackPlugin = require('chunks-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

mix.js('src/js/homepage.js', 'js')
// mix.js('src/js/page_1.js', 'js')
mix.js('src/js/page_2.js', 'js')

mix.sass('src/sass/app.scss', 'css');


mix.setPublicPath('assets')

mix.webpackConfig({
  plugins: [

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!img/**'],
    }),
    //     new ChunksWebpackPlugin({
    //       generateChunksManifest: true,
    //       generateChunksFiles: false,
    //     }),
  ],
  //   optimization: {
  //     splitChunks: {
  //       chunks: 'all',
  //       minChunks: 1,
  //       minSize: 0,
  //       cacheGroups: {
  //         vendor: {
  //           test: /[\\/]node_modules[\\/]/,
  //           chunks: 'all',
  //         }
  //       }
  //     },
  //   },
});

mix.disableSuccessNotifications();
