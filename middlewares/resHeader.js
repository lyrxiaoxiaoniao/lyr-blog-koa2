module.exports = async (ctx, next) => {
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
}