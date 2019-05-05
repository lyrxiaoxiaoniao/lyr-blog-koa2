const debug = require('debug')('lyr-blog-koa2')

/**
 * 响应模块统一处理
 */

module.exports = async (ctx, next) => {
    try {
        //   调用下一个middleware
        await next()
        // 处理响应结果
        // 如果直接写入在 body 中，则不作处理
        // 如果写在 ctx.body 为空，则使用 state 作为响应
        // Koa2中可以通过ctx.state配置全局变量。ctx.state配置的全局变量我们不仅可以在其他的路由页面使用，我们还可以在全局模板使用.
        ctx.body = ctx.body ? ctx.body : {
            code: ctx.state.code !== undefined ? ctx.state.code : 0,
            success: ctx.state.success !== undefined ? ctx.state.success : true,
            data: ctx.state.data !== undefined ? ctx.state.data : {},
            
        }
    } catch (e) {
        debug('Catch Error: %o', e)
        // 设置状态码为 200 - 服务端错误
        // ctx.status = e.status
        if (401 == e.status) {
            ctx.status = 200;
            ctx.body = {
                code: 401,
                success: true,
                error: e && e.message ? e.message : e.toString(),
                message: '登录失效！'
            }
        }else{
            ctx.status = 200
            // 输出详细的错误信息
            ctx.body = {
                code: -1,
                success: false,
                error: e && e.message ? e.message : e.toString(),
                message: e && e.message ? e.message : e.toString()
            }
        }
    }
}