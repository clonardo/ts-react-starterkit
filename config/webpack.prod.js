/* eslint key-spacing: ["error", {"align": {"beforeColon": true, "afterColon": true, "on": "colon"}}] */

const {DIR} = require('./settings');
const commonConfig = require('./webpack.common');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'production',

  performance: {
    maxAssetSize      : 512000,
    maxEntrypointSize : 512000
  },

  plugins: [
    new CleanWebpackPlugin(
      ['client'], {
        root          : DIR.root,
        verbose       : false,
        dry           : false,
        watch         : true,
        allowExternal : false,
        beforeEmit    : true
      }
    )
  ]
});
