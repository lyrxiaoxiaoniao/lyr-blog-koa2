const util = require('util');
module.exports = async (ctx, next) => {
  let data = [];
  let files = ctx.request.files.file;
  const ispro = process.env.NODE_ENV === 'production'
  const host = ispro ? 'www.liuyouren.top' : ctx.host
  // 区分是否是多文件上传
  if (files.length) {
    data = files.map(v => {
      return `${host}${v.outPath}`
    });
  } else {
    data.push(`http://${host}${files.outPath}`)
  }
  ctx.state.data = {
    files: data
  };
};
