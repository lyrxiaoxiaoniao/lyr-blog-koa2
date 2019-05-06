const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../config');
// 从token中获取用户信息
module.exports = ctx => {
  const token = ctx.header.authorization;
  const payload = jwt.verify(token.split(' ')[1], tokenSecret);
  return payload
};
