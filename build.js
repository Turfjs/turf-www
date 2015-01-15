var Metalsmith = require('metalsmith'),
    debounce = require('lodash').debounce,
    exec = require('child_process').exec,
    chokidar = require('chokidar');

var prod = process.argv[2] === 'production';
console.log(prod ? 'Building for PRODUCTION' : 'Building for DEVELOPMENT');

function buildDocs() {
    console.log('rebuilding docs');
    console.time('doc rebuild');
    exec('jsdoc ' +
    '-t ./node_modules/turf-jsdoc/ ./typedefs/geojson.js ' +
    'node_modules/turf/node_modules/turf-*/index.js -c ' +
    'jsdoc.conf.json -d static/docs/', function(err) {
        console.timeEnd('doc rebuild');
        if (err) console.error(err);
        else console.log('docs built');
        buildSite();
    });
}

if (!prod) {
    chokidar.watch('./templates').on('change', debounce(buildSite, 100));
    chokidar.watch('./node_modules/turf').on('change', debounce(buildDocs, 100));
}

function noop(a, b, next) { next(); }
function maybeIf(condition, value) { return condition ? value : noop; }

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

buildDocs();
buildSite();

function buildSite() {
    console.time('site built');
    pipeline.build(function printError(err) {
      if (err) throw err;
        console.timeEnd('site built');
    });
}
