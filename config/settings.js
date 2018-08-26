const pkg = require('../package.json');
const path = require('path');
const root = path.resolve(__dirname, '../');

function createHash () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function cssModulesNameGenerator (loaderContext, localIdentName, localName, options) {
  const fileName = path.basename(loaderContext.resourcePath);
  if (fileName.indexOf('.global.scss') !== -1) {
    return localName;
  } else {
    const name = fileName.replace(/\.[^/.]+$/, '');
    return `${localName}__${createHash()}`;
  }
}

const DIR = {
  root,
  client     : path.join(root, 'client/'),
  source     : path.join(root, 'source/'),
  containers : path.join(root, 'source/containers/'),
  components : path.join(root, 'source/components/'),
  config     : path.join(root, 'config/'),
};

const ENV = {
  pkg,
  devPort     : 8081,
  browserlist : pkg.browserslist,
  cssModulesNameGenerator
}

module.exports = {DIR, ENV}