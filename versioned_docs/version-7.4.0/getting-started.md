---
sidebar_position: 2
---

# Getting started

How you add Turf to your project will depend on your environment and tooling but here are some guidelines to get you started.

The source of truth for published versions of Turf is [NPM](https://www.npmjs.com/package/@turf/turf?activeTab=versions).  You are welcome to use other providers that republish these packages.

## Installation

### In Node.js

```bash
# get all of turf
npm install @turf/turf

# or get individual packages
npm install @turf/helpers
npm install @turf/buffer
```

As of v7, both CommonJS and ESM bundles are included.

### In browser

Whether downloading locally, or including a 3rd party version of turf directly, there are multiple CDN's to choose from and each has a URL scheme that allows you to specify what version you want, with some flexibility.  Structure your URL as appropriate for your needs:

- [jsdelivr](https://www.jsdelivr.com/)
  - browse: https://www.jsdelivr.com/package/npm/@turf/turf
  - latest within major version: https://cdn.jsdelivr.net/npm/@turf/turf@7/turf.min.js
  - latest within minor version: https://cdn.jsdelivr.net/npm/@turf/turf@7.0/turf.min.js
  - specific version: https://cdn.jsdelivr.net/npm/@turf/turf@7.0.0/turf.min.js
- [unpkg](https://www.unpkg.com/)
  - browse: https://unpkg.com/browse/@turf/turf@7.0.0/
  - latest within major version: https://unpkg.com/@turf/turf@^7/turf.min.js
  - latest within minor version: https://unpkg.com/@turf/turf@^7.0/turf.min.js
  - specific version: https://unpkg.com/@turf/turf@7.0.0/turf.min.js

For example, download the [latest minified version 7](https://cdn.jsdelivr.net/npm/@turf/turf@7/turf.min.js), and include it in a script tag. This will expose a global variable named `turf`.

```html
<script src="turf.min.js" charset="utf-8"></script>
```

You can also include it directly from a CDN.  This example specifies the latest version within v7.

```html
<script src="https://cdn.jsdelivr.net/npm/@turf/turf@7/turf.min.js"></script>
```

It is not recommended to use a CDN URL that gives you the `latest` bleeding edge version of Turf, especially in a production app.  There are breaking changes to turf functions between major versions that can leave your app in a broken state because it always gives your browser users the latest version.

## TypeScript

TypeScript definitions are included and exported by each Turf module, except for GeoJSON type definitions (e.g. `Polygon`, `FeatureCollection`) which are provided by the [@types/geojson](https://www.npmjs.com/package/@types/geojson) package.  Turf does not re-export these type definitionas.  If you need them, you can import and use them directly, e.g. `import { Polygon, FeatureCollection } from 'geojson'`.  You may need to install the `@types/geojson` package first.

## Other languages

Ports of Turf.js are available in:

- [Java](https://github.com/mapbox/mapbox-java/tree/master/services-turf/src/main/java/com/mapbox/turf) (Android, Java SE)
  - > [The current to-do list for porting to Java](https://github.com/mapbox/mapbox-java/blob/master/docs/turf-port.md)
- [Swift](https://github.com/mapbox/turf-swift/) (iOS, macOS, tvOS, watchOS, Linux)
  - > Turf for Swift is **experimental** and its public API is subject to change. Please use with care.
- [Dart/Flutter](https://github.com/dartclub/turf_dart) (Dart Web, Dart Native; Flutter for iOS, Android, macOS, Windows, Linux, Web)
  - > The Turf for Dart port is still in progress, the implementation status can be found in the [README](https://github.com/dartclub/turf_dart#components).

---

## Data in Turf

Turf uses <a href='https://geojson.org/'>GeoJSON</a> for all geographic data. Turf expects the data to be standard <a href='https://en.wikipedia.org/wiki/World_Geodetic_System'>WGS84</a> longitude, latitude coordinates. Check out <a href='https://geojson.io/#id=gist:anonymous/844f013aae8354eb889c&map=12/38.8955/-77.0135'>geojson.io</a> for a tool to easily create this data.

> **NOTE:** Turf expects data in (longitude, latitude) order per the GeoJSON standard.

Most Turf functions work with GeoJSON features. These are pieces of data that represent a collection of properties (ie: population, elevation, zipcode, etc.) along with a geometry. GeoJSON has several geometry types such as:

- Point
- LineString
- Polygon

Turf provides a few geometry functions of its own. These are nothing more than simple (and optional) wrappers that output plain old GeoJSON. For example, these two methods of creating a point are functionally equivalent:

```js
// Note order: longitude, latitude.
var point1 = turf.point([-73.988214, 40.749128]);

var point2 = {
  type: "Feature",
  geometry: {
    type: "Point",
    // Note order: longitude, latitude.
    coordinates: [-73.988214, 40.749128],
  },
  properties: {},
};
```

## Browser support

Turf packages are compiled to target ES2017. However, the browser version of @turf/turf is transpiled to also include support for IE11. If you are using these packages and need to target IE11, please transpile the following packages as part of your build:

```
@turf/*
robust-predicates
rbush
tinyqueue
```
