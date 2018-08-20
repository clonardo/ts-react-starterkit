const {DIR} = require('./settings');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new CleanWebpackPlugin(
      ['client'], {
        root: DIR.root,
        verbose: false,
        dry: false,
        watch: true,
        allowExternal: false,
        beforeEmit: true
      }
    ),

    new UglifyJSPlugin({
      parallel: true,
      exclude: /node_modules/,
      uglifyOptions: {
        compress: {drop_console: true}
      }
    })
  ]
});
