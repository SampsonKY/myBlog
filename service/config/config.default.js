/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1590470532665_7178';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mysql = {
    // database configuration
    client: {
      // host
      host: '0.0.0.0',
      // host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'e80d6a5511f9cabb',
      // password: '0305kk..',
      // database
      database: 'react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.session = {
    key:"SESSION_ID",
    maxAge:86400,
    renew: true,
    httpOnly: true,
    encrypt:true
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    // origin: 'http://localhost:3001',
    credentials: true, // 允许cookis跨域
    allowMethods: 'GET,POST',
  };

  return {
    ...config,
    ...userConfig,
  };
};
