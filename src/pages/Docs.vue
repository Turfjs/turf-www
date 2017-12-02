<template>
  <div>
    <leaflet-map ref="turfMap" id="turfMap" v-dom-portal="mapContainer"></leaflet-map>
    <module v-for="mod in modules" :key="mod.name" :module="mod" v-on:changeMap="moveMap"></module>
  </div>
</template>

<script>
import Module from '../components/Module.vue'
import leafletMap from '../components/Map.vue'
import config from '../assets/config.json'

export default {
  name: 'Docs',
  components: {
    Module,
    leafletMap
  },
  data () {
    return {
      mapContainer: '#map_along',
      modules: []
    }
  },

  methods: {
    moveMap (moduleName) {
      this.mapContainer = '#map_' + moduleName
      this.modules.forEach(function (mod) {
        if (mod.name === moduleName) {
          this.$refs.turfMap.moveMapToExample(mod)
        }
      }, this)
    }
  },
  created: function () {
    var allMods = []
    config.modules.map(function (group) {
      allMods = allMods.concat(group.modules)
    })
    this.modules = allMods
  },
  mounted: function () {
    if (window.location.hash === '') {
    } else {
      document.getElementById(window.location.hash.replace('#', '')).scrollIntoView()
    }
  }
}
</script>