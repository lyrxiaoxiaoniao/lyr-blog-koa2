const todoGET = async ctx => {
  ctx.state = {
    data: { message: 'todo！' },
    code: '1000'
  };
};

module.exports = {
  'GET /todo/add': todoGET
};
