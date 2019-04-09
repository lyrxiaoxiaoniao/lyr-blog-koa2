const path = require('path');
const bodyParser = require('koa-bodyparser');
const staticFiles = require('koa-static');
const responseMiddleware = require('./response.js');
const resHeaderMiddleware = require('./resHeader.js');
const { historyApiFallback } = require('koa2-connect-history-api-fallback');

module.exports = app => {
  // 注册中间件
  // 使用请求头中间件
  app.use(resHeaderMiddleware);
  // 路由history模式下，制定返回index.html,配置白名单
  app.use(historyApiFallback({ whiteList: ['/api'] }));
  app.use(staticFiles(path.resolve(__dirname, '../public')));
  // 解析请求体
  app.use(bodyParser());
  // 使用响应处理中间件
  app.use(responseMiddleware);
};
