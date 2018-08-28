const path = require('path');

function createHash () {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

function cssClassNameGenerator (loaderContext, localIdentName, localName) {
  const file = path.basename(loaderContext.resourcePath);
  const name = file.replace(/\.[^/.]+$/, '');
  return file.includes('.global') ? localName : `${name}_${localName}_${createHash()}`;
}

module.exports = cssClassNameGenerator;