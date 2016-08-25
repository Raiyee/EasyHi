import Mock from 'mockjs';
import Data from './website-edit-data';

Mock.mock(/\/get-webiste-edit$/, () => {
  return Mock.mock(Data);
});
