import Mock from 'mockjs';
import Data from './website-edit-data';

Mock.mock(/\/get-website-edit$/, () => {
  return Mock.mock(Data);
});
