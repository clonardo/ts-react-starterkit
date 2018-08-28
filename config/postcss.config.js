/* eslint key-spacing: ["error", {"align": {"beforeColon": true, "afterColon": true, "on": "colon"}}] */

const {ENV} = require('./settings');

const postcssMixins = require('postcss-mixins')();

module.exports = ctx => ({
  sourceMap : ctx.env === 'development',
  plugins   : {
    'postcss-import'     : {},
    'postcss-preset-env' : {
      browsers     : ENV.browserlist,
      stage        : 0,
      autoprefixer : {grid: true},
      insertBefore : {'nesting-rules': postcssMixins}
    },
    cssnano: {
      preset: [
        'advanced', {
          reduceIdents    : false,
          discardComments : {removeAll: true}
        }
      ]
    },
    'postcss-reporter': {clearReportedMessages: true}
  }
});
