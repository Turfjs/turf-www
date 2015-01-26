## What is Turf?

[Turf](https://turfjs.org) is a [JavaScript library](https://en.wikipedia.org/wiki/JavaScript_library) for [spatial analysis](http://en.wikipedia.org/wiki/Spatial_analysis). It includes traditional spatial operations, helper functions for creating [GeoJSON](http://geojson.org) data, and data classification and statistics tools. Turf can be added to your website as a client-side plugin, or you can [run Turf server-side](https://www.npmjs.com/package/turf) with [Node.js](http://nodejs.org/). You can find the source code on [GitHub](http://github.com/turfjs/turf).

## Data in Turf

Turf uses <a href='http://geojson.org/'>GeoJSON</a> for all geographic data. Turf expects the data to be standard <a href='http://en.wikipedia.org/wiki/World_Geodetic_System'>WGS84</a> longitude, latitude coordinates. Check out <a href='http://geojson.io/#id=gist:anonymous/844f013aae8354eb889c&map=12/38.8955/-77.0135'>geojson.io</a> for a tool to easily create this data.

Most Turf functions work with GeoJSON features. These are are pieces of data that represent a collection of properties (ie: population, elevation, zipcode, etc.) along with a geometry. GeoJSON has several geometry types such as:

* Point
* LineString
* Polygon

Turf provides a few geometry functions of its own. These are nothing more than simple (and optional) wrappers that output plain old GeoJSON. For example, these two methods of creating a point are functionally equivalent:

```
var point1 = turf.point(0,0);

var point2 = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [0, 0]
  },
  properties: {}
};
```
