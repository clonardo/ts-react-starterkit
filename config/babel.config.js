const {ENV} = require('./settings');

module.exports = {
  presets: [
    ['env', {
      targets      : {browsers: ENV.browserlist},
      modules      : false,
      useBuiltIns  : true
    }],
    'react'
  ]
};
