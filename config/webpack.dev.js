const {DIR, ENV} = require('./settings');
const commonConfig = require('./webpack.common');
const pkg = require('../package.json');

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PROCESS_MODE = process.env.TARGET_ENV || 'development';

module.exports = merge(commonConfig, {
  mode: 'development',

  devServer: {
    compress: true,
    contentBase: DIR.source,
    disableHostCheck: true,
    historyApiFallback: true,
    host: 'localhost',
    open: true,
    port: ENV.devPort,
    publicPath: '/',
    stats: commonConfig.stats,
    overlay: {
      warnings: false,
      errors: true
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: DIR.source + 'index.ejs',
      filename: 'index.html',
      inject: true,
      hash: true,
      config: {
        title: pkg.title,
        isProd: false
      }
    })
  ]
});
