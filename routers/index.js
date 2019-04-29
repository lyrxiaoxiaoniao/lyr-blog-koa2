/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
  prefix: '/api'
});
const controllers = require('../controllers');
router.get('/test', controllers.test);
router.get('/detail', controllers.detail);
router.post('/upload', controllers.upload);
router.post('/user/login', controllers.user.loginPOST1);
router.post('/user/register', controllers.user.registerPOST1);

// 根据controller控制器里的key判断动态设置router
const controllerMap = require('../controllerMap');
// console.log(controllerMap);
addMapping(router, controllerMap);
function addMapping(router, mapping) {
  // console.log(mapping, 'mapping.............');
  for (var url in mapping) {
    if (url.startsWith('GET ')) {
      var path = url.substring(4);
      router.get(path, mapping[url]);
      // console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      var path = url.substring(5);
      router.post(path, mapping[url]);
      // console.log(`register URL mapping: POST ${path}`);
    } else if (url.startsWith('PUT ')) {
      var path = url.substring(4);
      router.put(path, mapping[url]);
      // console.log(`register URL mapping: PUT ${path}`);
    } else if (url.startsWith('DELETE ')) {
      var path = url.substring(7);
      router.del(path, mapping[url]);
      // console.log(`register URL mapping: DELETE ${path}`);
    } else {
      // console.log(`invalid URL: ${url}`);
      // 递归调用
      addMapping(router, mapping[url]);
    }
  }
}

module.exports = router;
