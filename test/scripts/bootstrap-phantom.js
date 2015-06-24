var spawn = require('child_process').spawn;

//async function that takes in page URL and a file location to save image
module.exports = function (url, img_loc, callback) {
    var bin = "phantomjs";
    var args = [__dirname + '/phantom-page-check.js', url, img_loc];
    //spawn a child process calling phantomjs with the page_url and image_location as arguments
    var phntm = spawn(bin, args);

    //we can log out what is being logged out (hopefully this will help you remove unncessary consoling)
    phntm.stdout.on("data", function (data) {
      console.log(data.toString())
    });

    //console error when phantom js writes to stderr (process will exit immediately after)
    phntm.stderr.on("data", function (data) {
      console.error(JSON.parse(data));
    });

    //pass along the exit code as the result (never fail with error -- so we can continue testing all pages)
    phntm.on('exit', function (code) {
      callback(null, code);
    });
}
