require('stylelint').lint({
  files: ['css', 'less', 'sass', 'scss', 'styl', 'stylus'].map(value => 'src/**/*\\.' + value),
  formatter: 'verbose'
}).then(result => {
  console.log(result.output);
});
