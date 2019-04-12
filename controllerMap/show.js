const loginGET = async ctx => {
  ctx.state = {
    data: { message: '用户登陆！' },
    code: '1000'
  };
};
const registerGET = async ctx => {
  ctx.state = {
    data: { message: '用户注册！' },
    code: '1000'
  };
};

module.exports = {
  'GET /show/login': loginGET,
  'GET /show/register': registerGET
};
