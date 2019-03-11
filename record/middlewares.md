## 第三方中间价

> koa2 原生功能只提供了 cookie 的操作，但是没有提供 session 操作。session 就只用自己实现或者通过第三方中间件实现

### ~~koa-session-minimal koa-mysql-session （项目重构，改用 JWT 鉴权）~~

- ~~`koa-session-minimal`适用于 koa2 的 session 中间件，提供存储介质的读写接口~~

- ~~`koa-mysql-session`为`koa-session-minimal`中间件提供 MySQL 数据库的 session 数据读写操作。~~

```
app.js---------------------------------------------------

const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('lyr-blog-koa2')
const bodyParser = require('koa-bodyparser')
const responseMiddleware = require('./middlewares/response')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const config = require('./config')

// 配置存储session信息的mysql
const store = new MysqlSession({
    user: config.mysql.user,
    password: config.mysql.pass,
    database: config.mysql.db,
    host: config.mysql.host,
})
// 存放sessionId的cookie配置
const cookie = {
    maxAge: '', // cookie有效时长
    expires: '', // cookie失效时间
    path: '', // 写cookie所在的路径
    domain: 'localhost', // 写cookie所在的域名
    httpOnly: 'true', // 是否只用于http请求中获取
    overwrite: 'false', // 是否允许重写
    secure: '',
    sameSite: '',
    signed: '',
}
// 使用响应处理中间件
app.use(responseMiddleware)

// 解析请求体
app.use(bodyParser())

// // 应用处理 session 的中间件
app.use(session({
    key: 'SESSION_ID', // cookie 中存储 SESSION_ID 时的键名, 默认为 koa:sess
    store: store, // 配置存储session信息的mysql
    cookie: cookie // 存放sessionId的cookie配置
}))

// 引入路由分发
const router = require('./routers')
app.use(router.routes())

app.listen(config.port, () => debug(`listening on port ${config.port}`))

```

### 使用 JWT 进行鉴权------中间件（`jsonwebtoken` ，`koa-jwt`）

> 查看文章：[Node.js 应用：Koa2 使用 JWT 进行鉴权](https://github.com/lin-xin/blog/issues/28)

- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) 使用 jsonwebtoken 的 sign() 方法来生成 token

- [koa-jwt](https://github.com/koajs/jwt)该中间件针对 Koa 对 jsonwebtoken 进行了封装，通过 koa-jwt 中间件来进行token验证
