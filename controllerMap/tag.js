const Models = require('../db/models/index.js');
// 添加标签
const tagAddPOST = async ctx => {
  const { label } = ctx.request.body;
  const res = await Models.Tag.findOrCreate({
    where: { label }
  });
  if (res[1]) {
    ctx.state.data = {
      message: '新增标签成功！',
      tag: res[0]
    };
  } else {
    ctx.state = {
      data: { message: '标签已存在！' },
      code: '1000'
    };
  }
};
// 更新标签
const tagUpdatePOST = async ctx => {
  const { id, label } = ctx.request.body;
  const res = await Models.Tag.update(
    { label },
    {
      where: { id }
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
// 删除标签
const tagDELETE = async ctx => {
  const { id } = ctx.query;
  const res = await Models.Tag.destroy({
    where: { id }
  });
  console.log(res, 'tagDeletePOST');
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
// 标签列表
const tagListGET = async ctx => {
  const res = await Models.Tag.findAll();
  ctx.state.data = {
    data: res
  };
};

module.exports = {
  'GET /tag/list': tagListGET,
  'POST /tag/add': tagAddPOST,
  'POST /tag/update': tagUpdatePOST,
  'DELETE /tag/delete': tagDELETE
};
