const path = require('path');

function createHash () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function cssModulesNameGenerator (loaderContext, localIdentName, localName, options) {
  const fileName = path.basename(loaderContext.resourcePath);
  return fileName.indexOf('.global.scss') !== -1 ? localName : `${localName}__${createHash()}`;
}

module.exports = cssModulesNameGenerator;