<template>
  <div id='turfMap' style="height: 400px"></div>
</template>

<script>
import L from 'mapbox.js'
require('leaflet-fullscreen')
L.mapbox.accessToken = 'pk.eyJ1IjoidG1jdyIsImEiOiJIZmRUQjRBIn0.lRARalfaGHnPdRcc-7QZYQ'
var turfMap = null
var fg = null
var control = null
var layerArray = null
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
      fg.eachLayer(function (layer) {
        control.removeLayer(layer)
      })
      fg.clearLayers()
      layerArray = this.code.split(/\n\/\/addToMap/)[1]
      layerArray = layerArray.match(/\[.*]/)[0]
      layerArray = layerArray.replace('[', '').replace(']', '').split(',')
      var zoomText = this.getLayersAndZoom()
      return eval(this.code + zoomText) //eslint-disable-line
    },
    getLayersAndZoom: function (layerArray) {
      return `
      addToMap.forEach(function (geojson, index) {
        var geojsonLayer = L.mapbox.featureLayer(geojson);
        geojsonLayer.eachLayer(function (layer) {
          if (layer.feature.properties){
            if (Object.keys(layer.feature.properties).length > 0){
              layer.bindPopup(JSON.stringify(layer.feature.properties));
            }
          }
        });
        control.addOverlay(geojsonLayer, layerArray[index])
        fg.addLayer(geojsonLayer)
      })
      turfMap.fitBounds(fg.getBounds(), {padding: [30,30]})`
    }
  },
  mounted: function () {
    turfMap = L.mapbox.map('turfMap', 'mapbox.streets')
    control = L.control.layers([], []).addTo(turfMap)
    turfMap.addControl(new L.Control.Fullscreen())
    fg = L.featureGroup([]).addTo(turfMap)
    this.moveMapToExample()
  }
}
</script>

<style lang="scss">
  #turfMap {
    margin-top: 30px;
  }
  .leaflet-touch .leaflet-control-fullscreen a {
  background-position: 0px 0px;
}
.leaflet-touch.leaflet-fullscreen-on .leaflet-control-fullscreen a {
  background-position: 0px -26px;
}
</style>
