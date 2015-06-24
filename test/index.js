var test = require('tape');
var path = require('path');
var queue = require('queue-async');
var glob = require('glob');
var startup_server = require('./scripts/startup-server');
var bootstrap_phantom = require('./scripts/bootstrap-phantom');
var domain = 'localhost';
var port = '9982';
var base_url = 'http://' + domain + ':' + port;
var document_root = path.resolve(__dirname, '../_site');

test("testing turf examples", function (t) {
  var test_server = startup_server(domain, port, document_root);

  var q = queue(1);

  //get all html files in static/docs of the document root (_site)
  glob(document_root + '/static/docs/*.html', function (err, files) {
    files.forEach(function (file) {
      //the node_modules_turf ** files are just static exmple code -- ignore (for now)
      if (file.indexOf('node_modules_turf') === -1) {
        q.defer(function (callback) {
          t.test('testing: ' + file.replace(document_root, ''), function (st) {
            st.plan(1);
            bootstrap_phantom(file.replace(document_root, base_url), __dirname + '/img/' + file.replace(/^.*[\\\/]/, ''), function (err, res) {
              //check the exit code of the phantom process (res from callback)...hopefully it's '0'
              st.equal(res, 0);
              callback(null, null);
            });
          })
        });
      }
    });
    q.awaitAll(function (err, res) {
      //shut down server
      test_server.close();
      //we're done here
      t.end();
    });
  });
});
