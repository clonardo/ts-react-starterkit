const {ENV} = require('./settings');

module.exports = ctx => ({
  sourceMap: ctx.env === 'development',
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      browsers     : ENV.browserlist,
      stage        : 0,
      autoprefixer : {grid: true},
      insertBefore : {'nesting-rules': require('postcss-mixins')()}
    },
    'cssnano': {
      preset: ['advanced', {reduceIdents: false}]
    },
    'postcss-reporter': {clearReportedMessages: true}
  }
});
