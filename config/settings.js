
const pkg = require('../package.json');
const path = require('path');
const root = path.resolve(__dirname, '../');

function cssModulesNameGenerator(loaderContext, localIdentName, localName, options) {
  const fileName = path.basename(loaderContext.resourcePath);

  if (fileName.indexOf('.global.scss') !== -1) {
    return localName;
  } else {
    const name = fileName.replace(/\.[^/.]+$/, '');
    const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return `${localName}__${hash}`;
  }
}

const DIR = {
  root,
  client     : path.join(root, 'client/'),
  source     : path.join(root, 'source/'),
  components : path.join(root, 'source/components/'),
  config     : path.join(root, 'config/'),
};

const ENV = {
  devPort     : 8081,
  browserlist : pkg.browserslist,
  cssModulesNameGenerator
}

module.exports = {DIR, ENV}