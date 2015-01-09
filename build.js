var metalsmith = require('metalsmith');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

metalsmith(__dirname)
  .use(watch())
  .use(serve())
  .build();
