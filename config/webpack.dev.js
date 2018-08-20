const {DIR} = require('./settings');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    port: 8081,
    host: 'localhost',
    contentBase: DIR.demo,
    compress: true,
    stats: common.stats,
    overlay: true,
    disableHostCheck: true,
    open: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    watchOptions: {
      poll: true
    }
  },
});
