/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
  prefix: '/api'
});
const controllers = require('../controllers');
console.log(controllers)
router.get('/tag', controllers.tag);
router.get('/test', controllers.test);
router.get('/detail', controllers.detail);
router.post('/upload', controllers.upload);
router.post('/user/login', controllers.user.loginPOST1);
router.post('/user/register', controllers.user.registerPOST1);
router.get('/tagarticle', controllers.artical.getTagArticle);

module.exports = router;
