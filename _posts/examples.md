---
template: example_index.html
title: Turf.js
permalink: false
---

## Data

Turf uses [GeoJSON](http://geojson.org/) for all geographic data. Turf expects
the data to be standard WGS84 longitude, latitude coordinates. Check out
[geojson.io](http://geojson.io/) for a tool to easily create this data.

Most Turf functions work with GeoJSON features. These are are pieces of data
that represent a collection of properties (e.g., population, elevation, zipcode)
along with a geometry. GeoJSON has several geometry types such as: 
`Point`, `LineString` `Polygon`.
Turf provides a few geometry functions of its own. These are nothing more than
simple (and optional) wrappers that output plain old GeoJSON. For example,
these two methods of creating a point are functionally equivalent:

```js
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
