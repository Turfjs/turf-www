<template>
    <div class="mainContentArea mainContentAreaResponsive">
      <h1>Welcome to Turf.js</h1>
      <Row>
        <Col class="selector">
            <label class="label">Choose an operation:</label>
            <div class="select">
              <Select v-model="operation" v-on:on-change="changeOperation" labe>
                  <Option v-for="item in turfOperations" :value="item" :key="item">{{ item }}</Option>
              </Select>
            </div>
        </Col>
      </Row>
      <Row class="maps">
        <Col span="9" class="leftMap mapResponsive">
            <div class="map-insert leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom" id="inMap">
              <div class="inputOutput">Input</div>
            </div>
        </Col>
    
        <Col span="9" class="rightMap">
            <div class="map-insert leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom" id="outMap">
               <div class="inputOutput">Output</div>
            </div>
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
    L.mapbox.accessToken = 'pk.eyJ1IjoidHVyZmpzIiwiYSI6ImNrZWp2ODRvNzFqMHoyeHJ6b3Jpc29iczQifQ.YdYb6a6rA5aCtkmDZ5wn_g'
    var mapOptions = { zoomControl: false }
    map1 = L.mapbox.map('inMap', null, mapOptions).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'))
    map2 = L.mapbox.map('outMap', null, mapOptions).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'))

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

  .inputOutput {
    z-index: 1;
    position: absolute;
    font-size: 16px;
    font-weight: bold;
    background: #ffffff4d;
    padding: 6px;
    border-bottom-left-radius: 2px;;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .select {
    margin-left: 20px;
    width: 100px;
  }

  .maps {
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
  }

  .selector {
    display: flex;
    margin: auto;
    width: 50%;
    margin-bottom: 20px;
    justify-content: center;
    align-items: center;
  }

  .leftMap {
    margin-right: 10px;
  }

  .rightMap {
    margin-left: 10px;
  }

  @media screen and (max-width: 900px) {
    .leftMap, .rightMap {
      width: 40%;
    }

    .label {
      font-size: 14px;
      width: 50%
    }

    .selector {
      width: 70%;
    }
  }

  @media screen and (max-width: 400px) {
    .leftMap, .rightMap {
      width: 100%;
      margin-bottom: 10px;
    }
    .maps {
      flex-direction: column;
    }
  }

</style>
