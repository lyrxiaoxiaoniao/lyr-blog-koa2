const Models = require('../db/models')

module.exports = async ctx => {
    let res = await Models.Articles.findAndCountAll({
        limit: 5,
        offset: 0,
        include: {
            model: Models.Users
        }
    })
    ctx.state.data = {
        count: res.count,
        data: res.rows
    }
}