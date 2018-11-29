module.exports = async ctx => {
    const token = ctx.header.authorization
    console.log(token)
    ctx.status = 401
    ctx.body = {
        code: 1,
        detail: 'detail'
    }
}