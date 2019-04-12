const Models = require('../db/models')

module.exports = async ctx => {
    let res = await Models.Article.findAndCountAll({
        limit: 5,
        offset: 0,
        include: {
            model: Models.User
        }
    })
    ctx.state.data = {
        count: res.count,
        data: res.rows
    }
}