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
router.post('/user/login', controllers.user.loginPOST)
router.post('/user/register', controllers.user.registerPOST)
router.get('/user/userinfo', controllers.user.userinfoGET)
router.get('/activity/msg', controllers.activity.msg)

module.exports = router
