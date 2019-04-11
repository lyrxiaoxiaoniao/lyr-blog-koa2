const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { tokenSecret } = require('../config');
const userModel = require('../mysql/helper');
const Models = require('../db/models/index.js');
// crypto.createHash('md5').update('password').digest('hex')
module.exports = {
  loginPOST1: async ctx => {
    const { username, password } = ctx.request.body;
    const pass = crypto
      .createHash('md5')
      .update(password)
      .digest('hex');
    const res = await Models.Users.findOne({
      where: {
        username
      }
    });
    if (res) {
      // 三种方法设置token过期时间 为 1小时过期
      // jwt.sign({
      //     exp: Math.floor(Date.now() / 1000) + (60 * 60),
      //     data: 'foobar'
      // }, 'secret');

      // jwt.sign({
      //     data: 'foobar'
      // }, 'secret', { expiresIn: 60 * 60 });

      // //or even better:

      // jwt.sign({
      //     data: 'foobar'
      // }, 'secret', { expiresIn: '1h' });

      if (res.password === pass) {
        const token = jwt.sign(
          {
            name: username,
            user_id: res.id
          },
          tokenSecret,
          {
            expiresIn: 60 * 60
          }
        );
        ctx.state.data = {
          message: '登录成功',
          data: res,
          token
        };
      } else {
        ctx.state = {
          data: { message: '密码错误！' },
          code: '1000'
        };
      }
    } else {
      ctx.state = {
        data: { message: '用户未注册！' },
        code: '1000'
      };
    }
  },
  registerPOST1: async ctx => {
    const { username, password } = ctx.request.body;
    const pass = crypto
      .createHash('md5')
      .update(password)
      .digest('hex');
    let res = await Models.Users.findOrCreate({
      where: {
        username
      },
      defaults: {
        password: pass
      }
    });
    if (res[1]) {
      ctx.state.data = {
        message: '用户注册成功！',
        userInfo: res[0]
      };
    } else {
      ctx.state = {
        data: { message: '用户已存在！' },
        code: '1000'
      };
    }
  },
  // 用户登录
  loginPOST: async ctx => {
    const { username, password } = ctx.request.body;
    console.log(username, password, '2q31312');
    const pass = crypto
      .createHash('md5')
      .update(password)
      .digest('hex');
    const res = await userModel.findUserData(username);
    if (res.length) {
      // 三种方法设置token过期时间 为 1小时过期
      // jwt.sign({
      //     exp: Math.floor(Date.now() / 1000) + (60 * 60),
      //     data: 'foobar'
      // }, 'secret');

      // jwt.sign({
      //     data: 'foobar'
      // }, 'secret', { expiresIn: 60 * 60 });

      // //or even better:

      // jwt.sign({
      //     data: 'foobar'
      // }, 'secret', { expiresIn: '1h' });
      const token = jwt.sign(
        {
          name: username,
          user_id: res.id
        },
        tokenSecret,
        {
          expiresIn: 60 * 60
        }
      );
      ctx.state.data = {
        message: 'test',
        userInfo: res[0],
        token
      };
    } else {
      ctx.state.data = {
        message: '用户不存在'
      };
    }
  },
  // 用户注册
  registerPOST: async ctx => {
    const { username, password } = ctx.request.body;
    const pass = crypto
      .createHash('md5')
      .update(password)
      .digest('hex');
    const checkusername = await userModel.findUserData(username);
    if (checkUserName.length) {
      ctx.state.data = {
        message: '用户名以重复'
      };
    } else {
      const res = await userModel.insertData([
        username,
        pass,
        '',
        moment().format('YYYY-MM-DD HH:mm:ss')
      ]);
      ctx.state.data = {
        message: '注册成功',
        user_id: res.insertId
      };
    }
  }
};
