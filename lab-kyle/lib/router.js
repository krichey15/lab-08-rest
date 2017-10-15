'use strict';

// let router = module.exports = exports = {};
// router.routes = {};
// let methods = ['get', 'post', 'put', 'patch', 'delete'];
//
// methods.forEach((method) => {
//   router.routes[method.toUpperCase()] = {};
//   router[method] = function(pathname, callback){
//     router.routes[method.toUpperCase()][pathname] = callback;
//   };
// });

const routeHandlers = {
  GET: {},
  POST: {},
  PUT: {},
  PATCH: {},
  DELETE: {},
};

module.exports = {
  get: (uri, callback) => {
    routeHandlers.GET[uri] = callback;
  },
  post: (uri, callback) => {
    routeHandlers.POST[uri] = callback;
  },
  put: (uri, callback) => {
    routeHandlers.PUT[uri] = callback;
  },
  patch: (uri, callback) => {
    routeHandlers.PATCH[uri] = callback;
  },
  delete: (uri, callback) => {
    routeHandlers.DELETE[uri] = callback;
  },
  route: (req, res) => {
    parser(req)
      .then((req) => {
        let handler = routeHandlers[req.method][req.url.pathname];
        if (handler) {
          return handler(req,res);
        } else {
          console.error('Not Found', req.url.pathname);
          res.writeHead(404);
          res.end();
        }
      })
      .catch((err) => {
        console.error('Invalid Request', err);
        res.writeHead(400);
        res.end();
      });
  },
};
