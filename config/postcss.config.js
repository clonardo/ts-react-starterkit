const {ENV} = require('./settings');
const postcssMixins = require('postcss-mixins')();

module.exports = ctx => ({
  sourceMap: ctx.env === 'development',
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      browsers     : ENV.browserlist,
      stage        : 0,
      autoprefixer : {grid: true},
      insertBefore : {'nesting-rules': postcssMixins}
    },
    cssnano: {
      preset: ['advanced', {reduceIdents: false}]
    },
    'postcss-reporter': {clearReportedMessages: true}
  }
});
