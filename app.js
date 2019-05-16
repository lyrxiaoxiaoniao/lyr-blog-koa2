const Koa = require('koa');
const app = new Koa();
const debug = require('debug')('lyr-blog-koa2');
const koajwt = require('koa-jwt');
const config = require('./config');
const middlewares = require('./middlewares/index.js');
const onerror = require('koa-onerror')
onerror(app)
middlewares(app);
// 验证token, unless--排除某个路径不做token鉴权
// token 在Headers中的名为Authorization的键值对中
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

// app.listen(config.port, () => debug(`listening on port ${config.port}`));
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
