const {DIR} = require('./settings');
const commonConfig = require('./webpack.common');
const pkg = require('../package.json');

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'production',

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          test: /\.pcss$/,
          name: 'styles',
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  performance: {
    maxAssetSize: 512000,
    maxEntrypointSize: 512000
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      allChunks: true
    }),

    new CleanWebpackPlugin(
      ['client', 'source/**/*.pcss.d.ts'],
      {
        beforeEmit: true,
        root: DIR.root,
        verbose: false
      }
    ),

    new UglifyJSPlugin({
      exclude: /node_modules/,
      parallel: true,
      uglifyOptions: {
        beautify: false,
        ecma: 6,
        comments: false,
        mangle: false
      }
    }),

    new HtmlWebpackPlugin({
      template: DIR.source + 'index.ejs',
      filename: 'index.html',
      inject: false,
      hash: true,
      config: {
        title: pkg.title,
        isProd: true
      },
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ]
});
