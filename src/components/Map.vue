<template>
  <div id='turfMap' style="height: 400px"></div>
</template>

<script>
import L from 'mapbox.js'
L.mapbox.accessToken = 'pk.eyJ1IjoidG1jdyIsImEiOiJIZmRUQjRBIn0.lRARalfaGHnPdRcc-7QZYQ'
var turfMap = null
var fg = null

export default {
  name: 'Map',
  props: ['code'],
  watch: {
    code: function () {
      this.moveMapToExample()
    }
  },
  methods: {
    moveMapToExample () {
      fg.clearLayers()
      var zoomText = this.getLayersAndZoom(this.code)
      return eval(this.code + zoomText) //eslint-disable-line
    },
    getLayersAndZoom: function () {
      return `
      addToMap.forEach(function (geojson) {
        var geojsonLayer = L.mapbox.featureLayer(geojson);
        geojsonLayer.eachLayer(function (layer) {
          if (layer.feature.properties){
            if (Object.keys(layer.feature.properties).length > 0){
              layer.bindPopup(JSON.stringify(layer.feature.properties));
            }
          }
        });
        fg.addLayer(geojsonLayer)
      })
      turfMap.fitBounds(fg.getBounds(), {padding: [30,30]})`
    }
  },
  mounted: function () {
    turfMap = L.mapbox.map('turfMap', 'mapbox.streets')
    turfMap.scrollWheelZoom.disable()
    fg = L.featureGroup([]).addTo(turfMap)
    this.moveMapToExample()
  }
}
</script>

<style>
  #turfMap {
    margin-top: 30px;
  }
</style>
