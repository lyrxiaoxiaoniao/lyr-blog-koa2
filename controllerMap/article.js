const Models = require('../db/models/index.js');
const getToken = require('../utils/getToken');
// 文章列表
const articleListGET = async ctx => {
  let res = await Models.Article.findAndCountAll({
    limit: 10,
    offset: 0,
    include: [
      {
        model: Models.User,
        attributes: ['username']
      },
      {
        model: Models.Tag,
        attributes: ['label'],
        through: {attributes: []}
      }
    ],
    order:[['updatedAt', 'DESC']]
  });
  ctx.state.data = {
    count: res.count,
    data: res.rows
  };
};
// 添加文章
const articleAddPOST = async ctx => {
  const userinfo = getToken(ctx);
  const resdata = ctx.request.body;
  const res = await Models.Article.create({
    ...resdata,
    user_id: userinfo.user_id
  });
  ctx.state.data = {
    message: '新增成功！'
  };
};
// 更新文章
const articleUpdatePOST = async ctx => {
  const resdata = ctx.request.body;
  const res = await Models.Article.update(
    {
      // title: resdata.title,
      // head_url: resdata.head_url,
      // content: resdata.content
      ...resdata
    },
    {
      where: { id: resdata.id }
    }
  );
  if (res[0]) {
    ctx.state.data = { message: '更新成功！' };
  } else {
    ctx.state = {
      data: { message: '更新失败！' },
      code: '1000'
    };
  }
};
// 删除文章
const articleDELETE = async ctx => {
  const { id } = ctx.query;
  const res = await Models.Article.destroy({
    where: { id }
  });
  if (res) {
    ctx.state.data = {
      message: '删除成功！'
    };
  } else {
    ctx.state = {
      data: { message: '删除失败！' },
      code: '1000'
    };
  }
};
// 查询文章
const articleFindGET = async ctx => {
  const { id } = ctx.query;
  const res = await Models.Article.findOne({
    where: { id }
  });
  if (res) {
    ctx.state.data = {
      data: res,
      message: '查找成功！'
    };
  } else {
    ctx.state = {
      data: { message: '查找失败！' },
      code: '1000'
    };
  }
};
module.exports = {
  'GET /pc/article/list': articleListGET,
  'GET /pc/article/find': articleFindGET,
  'GET /article/list': articleListGET,
  'GET /article/find': articleFindGET,
  'POST /article/add': articleAddPOST,
  'POST /article/update': articleUpdatePOST,
  'DELETE /article/delete': articleDELETE
};
