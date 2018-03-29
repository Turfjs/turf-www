<template>
    <div class="mainContentArea">
      <h1>Welcome to Turf.js</h1>
      <Row>
        <Col span="7" offset="3">
            <div class="map-insert leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom" id="inMap"></div>
        </Col>
        <Col span="2" offset="1" class="selector">
            <Select v-model="operation" v-on:on-change="changeOperation">
                <Option v-for="item in turfOperations" :value="item" :key="item">{{ item }}</Option>
            </Select>
        </Col>
        <Col span="7" offset="1">
            <div class="map-insert leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom" id="outMap"></div>
        </Col>
      </Row>
      <h2>Advanced geospatial analysis for browsers and Node.js</h2>
      <Row>
        <Col span="7">
          <h3>Simple</h3>
          <p>Modular, simple-to-understand JavaScript functions that speak GeoJSON</p>
        </Col>
        <Col span="7" offset="1">
          <h3>Modular</h3>
          <p>Turf is a collection of small modules, you only need to take what you want to use</p>
        </Col>
        <Col span="7" offset="1">
          <h3>Fast</h3>
          <p>Takes advantage of the newest algorithms and doesn't require you to send data to a server</p>
        </Col>
      </Row>
    </div>
</template>

<script>

var map1 = null
var map2 = null
var outLayer = null

var points = null

export default {
  name: 'Home',
  data: function () {
    return {
      operation: 'tin',
      turfOperations: ['tin', 'buffer', 'centroid', 'voronoi']
    }
  },
  methods: {
    changeOperation (e) {
      outLayer.clearLayers()
      var geojson = null
      if (e === 'tin') geojson = turf.tin(points, 'price')
      else if (e === 'buffer') geojson = turf.buffer(points, 200, {units: 'meters'})
      else if (e === 'centroid') geojson = turf.centroid(points)
      else if (e === 'voronoi') geojson = turf.voronoi(points, {bbox: turf.bbox(points)})
      outLayer = L.geoJson(geojson, geojsonOptions).addTo(map2)
    }
  },
  mounted: function () {
    points = turf.featureCollection([
      turf.point([-74.000, 40.739], {price: 8}),
      turf.point([-73.992, 40.742], {price: 12}),
      turf.point([-73.997, 40.732], {price: 7}),
      turf.point([-73.994, 40.737], {price: 13}),
      turf.point([-73.989, 40.741], {price: 21}),
      turf.point([-73.993, 40.734], {price: 14}),
      turf.point([-73.988, 40.739], {price: 9})
    ])
    L.mapbox.accessToken = 'pk.eyJ1Ijoicm93YW53aW5zIiwiYSI6ImNqYnpsMmVlNjNsdmozM3BwcHZvbWxkb2cifQ.ZIjythJhZLCV939atjDG4w'
    var mapOptions = { attributionControl: false, zoomControl: false }
    map1 = L.mapbox.map('inMap', 'tmcw.kncfa9dj', mapOptions)
    map2 = L.mapbox.map('outMap', 'tmcw.kncfa9dj', mapOptions)

    var pointsLayer1 = L.geoJson(points, geojsonOptions).addTo(map1)
    outLayer = L.geoJson(turf.tin(points, 'price'), geojsonOptions).addTo(map2)
    map1.fitBounds(pointsLayer1.getBounds())
    map2.fitBounds(outLayer.getBounds())
  }
}

function pointToLayer (feature, latlng) {
  return L.circleMarker(latlng, {
    color: '#0C3952',
    fillOpacity: 0.8
  })
}

// function valueSum (obj) {
//   var sum = 0
//   for (var k in obj) sum += obj[k]
//   return sum
// }

var geojsonOptions = {
  pointToLayer: pointToLayer,
  style: function (feature) {
    if (feature.geometry.type === 'Polygon') {
      var sum = Math.random() * 0.3 + 0.2
      return {
        weight: 1,
        fillOpacity: sum,
        color: '#0C3952'
      }
    } else {
      return {
        radius: 6,
        stroke: false,
        color: '#0C3952',
        fillOpacity: 1
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/variables.scss";

  h1 {
    font-weight: 200;
    font-size: 3rem;
    margin-bottom: 30px;
    margin-top: 0px;
    text-align: center;
  }

  h2 {
    text-align: center;
    margin: 20px 0px;
    font-weight: 600;
  }

  h3 {
    font-size: 1.1rem;
    text-align: center;
  }

  p {
    text-align: center;
  }
  .map-insert {
    height: 300px;
    min-width: 150px;
  }
  .selector {
    margin-top: 100px;
  }

</style>