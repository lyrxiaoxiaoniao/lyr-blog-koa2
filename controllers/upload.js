module.exports = async ctx => {
  console.log(ctx.uploadpath, 1111111111);
  ctx.state.data = {
    data: ctx.host,
    files: 123
  };
};
