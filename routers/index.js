/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/api'
})
const controllers = require('../controllers')
console.log(controllers);
router.get('/demo', controllers.demo)
router.get('/test', controllers.test)
router.get('/detail', controllers.detail)
router.get('/user/login', controllers.user.login)
router.post('/user/register', controllers.user.register)
router.get('/user/userinfo', controllers.user.userinfo)

module.exports = router
