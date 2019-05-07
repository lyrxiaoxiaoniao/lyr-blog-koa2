const Koa = require('koa');
const app = new Koa();
const debug = require('debug')('lyr-blog-koa2');
const koajwt = require('koa-jwt');
const config = require('./config');
const middlewares = require('./middlewares/index.js');

middlewares(app);
// 验证token, unless--排除某个路径不做token鉴权
// token 在Headers中的名为Authorization的键值对中
// app.use(function(ctx, next) {
//     // 自定义token失效报错 移到响应中间件了
//   return next().catch(e => {
//     if (401 == e.status) {
//       ctx.status = 200;
//       ctx.body = {
//         code: -1,
//         success: false,
//         error: e && e.message ? e.message : e.toString(),
//         message: '登录失效！'
//     }
//     } else {
//       throw e;
//     }
//   });
// });


app.use(
  koajwt({
    secret: config.tokenSecret
  }).unless({
    path: [/\/api\/user\/register/, /\/api\/user\/login/, /\/api\/upload/, /\/api\/pc\/*/]
  })
);
// 引入路由分发
const router = require('./routers');
app.use(router.routes());

app.listen(config.port, () => debug(`listening on port ${config.port}`));
