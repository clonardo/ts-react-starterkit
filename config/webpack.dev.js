const {DIR, ENV} = require('./settings');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',

  devServer: {
    contentBase: DIR.source,
    host: 'localhost',
    port: ENV.devPort,
    disableHostCheck: true,
    historyApiFallback: true,
    open: true,
    compress: true,
    stats: common.stats,
    overlay: {
      warnings: false,
      errors: true
    }
  }
});
