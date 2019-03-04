const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const moment = require('moment');
const {
    tokenSecret
} = require('../config')
const userModel = require('../mysql/helper')
// crypto.createHash('md5').update('password').digest('hex')
module.exports = {
    // 用户登录
    loginPOST: async ctx => {
        const {
            userName,
            password
        } = ctx.request.body
        const pass = crypto.createHash('md5').update(password).digest('hex')
        const res = await userModel.findUserData(userName)
        if (res.length) {
            const token = jwt.sign({
                name: userName,
                user_id: res.id
            }, tokenSecret, {
                expiresIn: 60 * 60
            });
            ctx.state.data = {
                msg: 'test',
                userInfo: res[0],
                token
            }
        } else {
            ctx.state.data = {
                msg: '用户不存在'
            }
        }
    },
    // 用户注册
    registerPOST: async ctx => {
        const {
            userName,
            password
        } = ctx.request.body
        const pass = crypto.createHash('md5').update(password).digest('hex')
        const checkUserName = await userModel.findUserData(userName)
        if (checkUserName.length) {
            ctx.state.data = {
                msg: '用户名以重复'
            }
        } else {
            const res = await userModel.insertData([userName, pass, '', moment().format('YYYY-MM-DD HH:mm:ss')])
            ctx.state.data = {
                msg: '注册成功',
                user_id: res.insertId
            }
        }
    }
}