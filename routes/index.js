'use strict';

module.exports = function(router) {

  router.get('/', function(req, res, next) {
    var body;

    body = '======== API ========\n\n' +
           'GET /message\n\n' +
           'GET /message/:id\n\n' +
           'POST /message\n\n' +
           'PUT /message/:id\n\n' +
           'DELETE /message/:id\n\n';

    res.writeHead(200, {
      'Content-Length': body.length,
      'Content-Type': 'text/plain'
    });

    res.end(body);
  });

}
