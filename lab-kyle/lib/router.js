'use strict';

let router = module.exports = exports = {};
router.routes = {};
let methods = ['get', 'post', 'put', 'patch', 'delete'];

methods.forEach((method) => {
  router.routes[method.toUpperCase()] = {};
  router[method] = function(pathname, callback){
    router.routes[method.toUpperCase()][pathname] = callback;
  };
});
