const path = require('path');
const fs = require('fs');
// 使用koa-body代替 koa-bodyparser 与 koa-multer
const {
  checkAndMkdirsSync,
  getUploadDirName,
  getUploadFileExt,
  getUploadFileName
} = require('../utils');
const koaBody = require('koa-body');
// const bodyParser = require('koa-bodyparser');
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
  // app.use(bodyParser());
  app.use(
    koaBody({
      multipart: true, // 支持文件上传
      formidable: {
        multiples: true,
        uploadDir: path.join(__dirname, '../public/upload/'), // 设置文件上传目录
        keepExtensions: true, // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file) => {
          // 文件上传前的设置
          // 生成对应时间的文件夹
          const dirName = getUploadDirName();
          // 文件上传的位置
          const fp = path.join(__dirname, `../public/upload/${dirName}`);
          // 获文件后缀
          const ext = getUploadFileExt(file.type);
          // 获取文件名称
          checkAndMkdirsSync(fp);
          const fileName = getUploadFileName(ext);
          file.path = `${fp}/${fileName}`;
          file.outPath = `/upload/${dirName}/${fileName}`;
        }
      }
    })
  );
  // 使用响应处理中间件
  app.use(responseMiddleware);
};
