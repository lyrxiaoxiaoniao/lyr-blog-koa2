const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { tokenSecret } = require('../config')
// crypto.createHash('md5').update('password').digest('hex')
module.exports = {
    // 用户登录
    login: async ctx => {
        const token = jwt.sign({
            name: 'name',
            _id: '12345'
        }, tokenSecret, {
            expiresIn: 60 * 60
        });
        ctx.state.data = {
            msg: 'test',
            token
        }
    },
    // 用户注册
    register: async ctx => {
        ctx.state.data = {
            msg: 'register'
        }
    },
    // 获取用户信息
    userinfo: async ctx => {
        ctx.state.data = {
            name: 'xiaoliu'
        }
    }
}