---
sidebar_position: 2
---

# Getting started

## Installation

### In Node.js

```bash
# get all of turf
npm install @turf/turf

# or get individual packages
npm install @turf/helpers
npm install @turf/buffer
```

### In browser

Download the [minified file](https://npmcdn.com/@turf/turf/turf.min.js), and include it in a script tag. This will expose a global variable named `turf`.

```html
<script src="turf.min.js" charset="utf-8"></script>
```

You can also include it directly from a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js"></script>
```

### TypeScript

TypeScript definitions are packaged with each module. No DefinitelyTyped packages required.

### Other languages

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
