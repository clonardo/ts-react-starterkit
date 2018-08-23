const {DIR, ENV} = require('./settings');

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'development',

  devServer: {
    contentBase         : DIR.source,
    host                : 'localhost',
    port                : ENV.devPort,
    disableHostCheck    : true,
    historyApiFallback  : true,
    open                : true,
    compress            : true,
    stats               : commonConfig.stats,
    overlay: {
      warnings  : false,
      errors    : true
    }
  }
});
