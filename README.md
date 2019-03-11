## 开始使用

> 根据小程序后台模板修改

#### 安装依赖

```bash
# 安装全局依赖
npm i nodemon -g

# 安装项目依赖
npm i
```

#### 启动项目

```bash
# 开发环境，监听文件变化自动重启，并会输出 debug 信息
npm run start
```

## 项目结构

```
lyr-blog-koa2
├── README.md                     
├── app.js                       // 入口文件
├── db                           // sequelize
│   ├── config                   // 包含配置文件，它告诉CLI如何连接数据库
│   ├── models                   // 包含您的项目的所有模型
│   ├── migrations               // 包含所有迁移文件
│   ├── seeders                  // 包含所有种子文件
├── controllers                  // 控制器
│   ├── index.js                 // 控制器输出文件
│   ├── demo.js
├── middlewares                  // 中间件
│   └── response.js
├── mysql                        // mysql 辅助
├── record                       // 文档
├── config.js                    // 配置
└── routes                       // 路由
    └── index.js
├── package.json
├── nodemon.json
├── .sequelizerc                // 如果不配置.sequelizerc 的话，sequelize init 初始化的文件夹会出现在项目目录下面，如果配置了.sequelizerc 就可以指定到相应的目录
```
`app.js` 是 Demo 的主入口文件，Demo 使用 Koa 框架，在 `app.js` 创建一个 Koa 实例并响应请求。

`routes/index.js` 是 Demo 的路由定义文件

`controllers` 存放 Demo 所有业务逻辑的目录，`index.js` 不需要修改，他会动态的将 `controllers` 文件夹下的目录结构映射成 modules 的 Object，例如 Demo 中的目录将会被映射成如下的结构：

```javascript
// index.js 输出
{
  demo: require('demo'),
  test: require('test')
}
```

