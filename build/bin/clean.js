require('babel-register');

const debug = require('debug')('koa:bin:clean');

debug('Clean files...');

require('rimraf')(require('../config').paths.dist('**'), err => {
  if (err) {
    debug(err);
  } else {
    debug('Files cleaned.');
  }
});
