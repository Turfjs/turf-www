<template>
  <div class="modules">
    <leaflet-map ref="turfMap" id="turfMap" v-dom-portal="mapContainer"></leaflet-map>
    <module v-for="mod in modules" :key="mod.name" :module="mod" v-on:changeMap="moveMap"></module>
  </div>
</template>

<script>
import Module from '../components/Module.vue'
import leafletMap from '../components/Map.vue'
import config from '../assets/config.json'

var allMods = []
config.modules.map(function (group) {
  allMods = allMods.concat(group.modules)
})

export default {
  name: 'Docs',
  components: {
    Module,
    leafletMap
  },
  data () {
    return {
      mapContainer: '#map_along',
      modules: allMods,
      scroll: function () {
        var element = document.getElementById(window.location.hash.replace('#', ''))
        var elementPosition = element.getBoundingClientRect().top
        var offsetPosition = elementPosition + window.pageYOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'instant'
        })
      }
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
  mounted: function () {
    if (window.location.pathname === '/docs') {
      window.location.pathname = '/docs/'
    }

    if (window.location.hash !== '') {
      this.scroll()
    }
  },
  watch: {
    '$route': function () {
      if (window.location.hash !== '') {
        this.scroll()
      }
    }
  }
}
</script>

<style scoped lang="scss">
   @media screen and (max-width: 900px) {
    .modules {
      margin-top: 140px;
    }
   }
</style>