const pkg = require('../package.json');
const path = require('path');
const root = path.resolve(__dirname, '../');

const DIR = {
  root,
  client     : path.join(root, 'client/'),
  source     : path.join(root, 'source/'),
  containers : path.join(root, 'source/containers/'),
  components : path.join(root, 'source/components/'),
  config     : path.join(root, 'config/')
};

const ENV = {
  devPort     : 8081,
  browserlist : pkg.browserslist,
}

module.exports = {DIR, ENV}
