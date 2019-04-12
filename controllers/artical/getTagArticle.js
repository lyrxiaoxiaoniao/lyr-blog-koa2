const Models = require('../../db/models/index.js');
const moment = require('moment');
module.exports = async ctx => {
  const res = await Models.Article.findAndCountAll({
    limit: 5,
    offset: 0,
    include: {
      model: Models.Tag
    }
  });
  ctx.state.data = {
    count: res.count,
    data: res.rows
  };
};
