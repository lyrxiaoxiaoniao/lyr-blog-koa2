/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/api'
})
const controllers = require('../controllers')
router.get('/demo', controllers.demo)
router.get('/test', controllers.test)
router.get('/detail', controllers.detail)
router.post('/user/login', controllers.user.loginPOST1)
router.post('/user/register', controllers.user.registerPOST1)

module.exports = router
