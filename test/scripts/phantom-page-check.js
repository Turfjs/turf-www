/*
phantomjs script with image url and image_location parameter

example: phantomjs phantom-page-check.js http://turfjs.org turf.png
*/
var system = require('system');
var url = system.args[1];
var img_loc = system.args[2];
var resource_counter = 0;
var loaded = false;
var page = require('webpage').create();
page.viewportSize = { width: 1000, height: 500 };

/*
going to keep track of resources requested and loaded so we know when other images are done loading

(basically waiting for mapbox tiles to fully load before rendering the image)
*/
page.onResourceRequested = function (request) {
  resource_counter++;
};

page.onResourceReceived = function (response) {
  if (response.stage === 'end') {
    resource_counter--;
    if (resource_counter === 0) {
      finish_up_phantom();
    }
  }
};

//if there is a resource error, log it and exit with code 1
page.onResourceError = function (response) {
  if (response.url.indexOf('google-analytics') !== -1) {
    system.stderr.write(JSON.stringify(response));
    phantom.exit(1);
  } else {
    resource_counter--;
    if (resource_counter === 0) {
      finish_up_phantom();
    }
  }
};

//if page emits a JavaScript console error, log it and exit with code 1
page.onError = function(msg, trace) {
  system.stderr.write(JSON.stringify(trace));
  phantom.exit(1);
};

//open url and exit with code 1 if it's not successful
page.open(url, function (status) {
  if (status === 'success') {
    loaded = true;
      finish_up_phantom();
  } else {
    phantom.exit(1);
  }
});

//when no more resources need to load and the page is loaded then render and exit
//set timeout to render so we can ensure all is loaded
function finish_up_phantom() {
  if (resource_counter === 0 && loaded) {
      setTimeout(function () {
        page.render(img_loc + ".png", {format: 'png'});
        phantom.exit(0);
      }, 250);
  }
}
