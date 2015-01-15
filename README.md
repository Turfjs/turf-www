turf-www
========

turf website

http://turfjs.org/

## Building Documentation

Documentation for turf is written using [JSDoc](http://usejsdoc.org/) comments
in individual modules. The `turf-www` project loads turf as a dependency
in its [package.json](package.json) file and looks through each turf module,
sending it to jsdoc.

* We use the [turf-jsdoc](https://github.com/turfjs/turf-jsdoc) template to style
  our docs.
* This project provides [geojson.js](geojson.js), a set of [typedef tags](http://usejsdoc.org/tags-typedef.html)
  that let all modules use shorthand like `{Point}` for [GeoJSON Point](http://geojson.org/geojson-spec.html#point)
  geometries and so on - each uppercase value of the `type` property of a GeoJSON
  type should be included.

To build & test the site:

    npm install
    npm run build

### Structure

This is all built with modules:

* turf-www is the website and the part that generates docs from turf
* turf-www **requires** turf so that it has code to generate documentation from

### Testing Documentation

To test changes to docs without re-releasing modules:

Clone this repo and then

```sh
$ npm install
$ cd node_modules/turf
$ npm install -g turf-runner
$ turf-modules-as-clones
```

Now all of your turf modules are checked out into `turf_modules` as git repos.

## Deploying Documentation

We manage **source** in the `master` branch and treat `gh-pages` as a
produced artifact _only_.

    npm install
    npm run build-production
    ./deploy.sh
