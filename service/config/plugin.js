'use strict';

/** @type Egg.EggPlugin */
// 使用mysql
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
// 解决跨域
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
