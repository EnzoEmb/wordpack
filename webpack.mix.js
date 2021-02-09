let mix = require('laravel-mix');
let webpack = require('webpack');
const ChunksWebpackPlugin = require('chunks-webpack-plugin');

mix.js('dev/app.js', 'dist')
mix.js('dev/page2.js', 'dist')
// mix.extract();
// mix.version();
// mix.publicPath: 'dist/',
mix.setPublicPath('dist')

mix.webpackConfig({
  plugins: [
    
    new ChunksWebpackPlugin({
      generateChunksManifest: true,
      generateChunksFiles: false,
  }),
  ],
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
});

// mix.disableSuccessNotifications();
