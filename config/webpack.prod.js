const {DIR} = require('./settings');
const commonConfig = require('./webpack.common');

const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'production',

  plugins: [
    new CleanWebpackPlugin(
      ['client'], {
        root           : DIR.root,
        verbose        : false,
        dry            : false,
        watch          : true,
        allowExternal  : false,
        beforeEmit     : true
      }
    ),

    new UglifyJSPlugin({
      parallel       : true,
      exclude        : /node_modules/,
      uglifyOptions  : {compress: {drop_console: true}}
    })
  ]
});
