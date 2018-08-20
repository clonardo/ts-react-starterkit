
const pkg = require('../package.json');
const path = require('path');
const root = path.resolve(__dirname, '../');

const DIR = {
  root,
  elements        : path.join(root, 'elements/'),
  collection      : path.join(root, 'collection/'),
  config          : path.join(root, 'config/'),
  demo            : path.join(root, 'demo/'),
  helpers         : path.join(root, 'abstract/helpers/')
};

const ENV = {
  browserlist     : pkg.browserslist
}

module.exports = {DIR, ENV}