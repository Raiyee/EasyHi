const debug = require('debug')('koa:stylelint');

require('stylelint').lint({
  files: ['css', 'less', 'sass', 'scss', 'styl', 'stylus'].map(value => 'src/**/*\\.' + value),
  formatter: 'verbose'
}).then(result => result.errored && (debug('there are some errors occurred!%s', result.output) || process.exit(1)));
