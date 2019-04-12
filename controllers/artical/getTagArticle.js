const Models = require('../../db/models/index.js');
const moment = require('moment');
module.exports = async ctx => {
  const res = await Models.Tag.findAndCountAll({
    // where: {
    //   id: 1
    // },
    limit: 5,
    offset: 0,
    include: {
      model: Models.Article
    }
  });
  ctx.state.data = {
    count: res.count,
    data: res.rows
  };
};
