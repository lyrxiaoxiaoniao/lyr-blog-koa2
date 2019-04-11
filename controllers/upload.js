const util = require('util');
module.exports = async (ctx, next) => {
  let data = [];
  let files = ctx.request.files.file;
  // 区分是否是多文件上传
  if (files.length) {
    data = files.map(v => {
      return `${ctx.host}${v.outPath}`
    });
  } else {
    data.push(`${ctx.host}${files.outPath}`)
  }
  ctx.state.data = {
    data: ctx.host,
    files: data
  };
};
