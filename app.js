const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('lyr-blog-koa2')
const bodyParser = require('koa-bodyparser')
const responseMiddleware = require('./middlewares/response')
const koajwt = require('koa-jwt')
const config = require('./config')

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.set("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
    ctx.set('Cache-Control', 'no-cache')
    if (ctx.method === 'OPTIONS') {
        ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET')
        ctx.set('Access-Control-Max-Age', 3600 * 24)
        ctx.body = ''
    }
    await next()
})
// 使用响应处理中间件
app.use(responseMiddleware)

// 解析请求体
app.use(bodyParser())

// 验证token, unless--排除某个路径不做token鉴权
// token 在Headers中的名为Authorization的键值对中
app.use(koajwt({
    secret: config.tokenSecret
}).unless({
    path: [/\/api\/user\/register/, /\/api\/user\/login/]
}));
// 引入路由分发
const router = require('./routers')
app.use(router.routes())

app.listen(config.port, () => debug(`listening on port ${config.port}`))