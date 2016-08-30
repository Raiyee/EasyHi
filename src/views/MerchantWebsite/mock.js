import Mock from 'mockjs';

Mock.mock(/\/get-website-edit$/, () => {
  return require('./edit-data');
});
