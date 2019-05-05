const Models = require('../db/models/index.js');
// 文章列表
const articleListGET = async ctx => {
  let res = await Models.Article.findAndCountAll({
    limit: 10,
    offset: 0,
    include: [
      {
        model: Models.User
      }
    ]
  });
  ctx.state.data = {
    count: res.count,
    data: res.rows
  };
};
// 添加文章
const articleAddPOST = async ctx => {
  ctx.state.data = {
    count: 1,
    data: 1
  };
};
// 更新文章
const articleUpdatePOST = async ctx => {
  ctx.state.data = {
    count: 1,
    data: 1
  };
};
// 删除文章
const articleDELETE = async ctx => {
  ctx.state.data = {
    count: 1,
    data: 1
  };
};
module.exports = {
  'GET /article/list': articleListGET,
  'POST /article/add': articleAddPOST,
  'POST /article/update': articleUpdatePOST,
  'DELETE /article/delete': articleDELETE
};
