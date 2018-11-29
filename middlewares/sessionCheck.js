// session 换成 token
module.exports = {
    // 已经登录
    checkLogin: ctx => {
        if (ctx.session && ctx.session.user) {
            ctx.redirect('/demo');
            return false;
        }
        return true;
    },
    // 没有登录
    checkNotLogin: ctx => {
        if (!ctx.session || !ctx.session.user) {
            ctx.redirect('/test');
            return false;
        }
        return true;
    }
}