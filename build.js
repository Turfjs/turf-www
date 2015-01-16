var Metalsmith = require('metalsmith'),
    throttle = require('lodash').throttle,
    browserify = require('browserify'),
    fs = require('fs'),
    exec = require('child_process').exec,
    chokidar = require('chokidar');

var prod = process.argv[2] === 'production';
console.log(prod ? 'Building for PRODUCTION' : 'Building for DEVELOPMENT');

var buildDocJS = throttle(function() {
    console.time('bundle js');
    exec('./node_modules/.bin/browserify ./turf-jsdoc/static/scripts/index.js > ' +
        './turf-jsdoc/static/scripts/run.js', function() {
            buildDocs();
            console.timeEnd('bundle js');
        });
}, 1000);

var buildDocs = throttle(function() {
    console.time('doc rebuild');
    var cmd = 'jsdoc ' +
    '-t ./turf-jsdoc/ ./typedefs/geojson.js ' +
    'node_modules/turf/node_modules/turf-*/index.js -c ' +
    'jsdoc.conf.json -d static/docs/';
    console.log('running', cmd);
    exec(cmd, function(err) {
        console.timeEnd('doc rebuild');
        if (err) console.error(err);
        else console.log('docs built');
        buildSite();
    });
}, 1000);

var buildDocsJSON = throttle(function(cb) {
    var cmd = 'jsdoc ' +
    '-t ./turf-jsdoc-json/ ./typedefs/geojson.js ' +
    'node_modules/turf/node_modules/turf-*/index.js -c ' +
    'jsdoc.conf.json -d console > turf-jsdoc/static/scripts/docs.json';
    console.log('building JSON', cmd);
    exec(cmd, function(err) {
        if (err) console.error(err);
        else console.log('docs built');
        if (cb) return cb();
    });
}, 1000);

var pipeline = Metalsmith(__dirname)
  .use(require('metalsmith-collections')({
    examples: { pattern: 'examples/*' }
  }))
  .source('_posts')
  .destination('_site')
  .use(require('metalsmith-markdown')())
  .use(require('metalsmith-permalinks')({
    pattern: ':path/:title'
  }))
  .use(require('metalsmith-templates')('underscore'))
  .use(require('metalsmith-assets')({
      source: 'static',
      destination: 'static'
  }))
  .use(maybeIf(!prod, require('metalsmith-serve')()))
  .use(maybeIf(!prod, require('metalsmith-watch')({
    livereload: true,
    pattern: '**/*'
  })));

var buildSite = throttle(function() {
    console.log('building site ' + new Date());
    console.time('site built');
    pipeline.build(function printError(err) {
      if (err) throw err;
        console.timeEnd('site built');
    });
}, 1000);

buildDocsJSON(function() {
    buildDocJS();
});

if (!prod) {
    chokidar.watch('./turf-jsdoc/static/scripts/index.js').on('change', throttle(buildDocJS, 100));
    chokidar.watch('./templates').on('change', throttle(buildSite, 100));
    chokidar.watch('./node_modules/turf').on('change', throttle(buildDocs, 100));
    chokidar.watch('./turf-jsdoc/').on('change', throttle(buildDocs, 100));
}

function noop(a, b, next) { next(); }
function maybeIf(condition, value) { return condition ? value : noop; }
