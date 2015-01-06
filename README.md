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

To build docs:

    npm install
    npm run build

This will build docs to the `/docs` directory in this website. Docs _do not use Jekyll_:
they're just static files once baked.

### Testing Documentation

To test changes to docs without re-releasing modules, use [`npm link`](https://docs.npmjs.com/cli/link):

* In a separate directory, clone the main [turfjs/turf](https://github.com/Turfjs/turf) repo
  * Run `npm install` in that cloned repo
  * Run `npm link .` in that repo
* In a separate directory, clone the module you're documenting, like [turfjs/turf-average](https://github.com/Turfjs/turf-average)
  * Run `npm install` in that repo
  * Run `npm link .` in that repo
* Go back to your `turf` checkout
  * Run `npm link turf-average` (or whatever turf module you cloned instead of turf-average)
* Go to your `turf-www` checkout
  * Run `npm link turf`

Now you should be able to run & re-run the `npm run build` command that builds
documentation and your changes to `turf-average` (or whatever repo you cloned)
will be immediately available as documentation fuel.
