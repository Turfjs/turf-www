var node_static = require('node-static');
var http = require('http');

module.exports = function (domain, port, document_root) {
  //create a static server with a given document_root
  var static_server = new node_static.Server(document_root, { cache: 0, indexFile: 'index.html', headers: {} });
  var server = http.createServer(function (request, response) {
    request.addListener('end', function () {
      //server out the static content
      static_server.serve(request, response, function(err, res) {
        if (err) {
          response.writeHead(err.status, err.headers);
          response.end('');
        }
      });

    }).resume();
  });
  //startup server
  server.listen(port, '0.0.0.0');

  //return server (so we can shut it down later)
  return server;
}
