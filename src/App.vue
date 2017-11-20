<template>
  <Row id="app">
    <Col span="4">
      <sidebar :modules="modulesList" v-on:changeModule="setModule"></sidebar>
    </Col>
    <Col span="20" class="mainContent">
      <content-area :selectedModule="selectedModule"></content-area>
    </Col>
  </Row>
</template>

<script>
import config from './config.json'
import Sidebar from './components/Sidebar.vue'
import ContentArea from './components/ContentArea.vue'
import {Row, Col} from 'iview/src/components/grid'

export default {
  name: 'app',
  components: {
    Sidebar,
    ContentArea,
    Row,
    Col
  },
  data () {
    return {
      selectedModuleName: 'along',
      modulesList: {},
      modules: config.modules
    }
  },
  computed: {
    selectedModule: function () {
      var match = config.modules.filter(function (mod) {
        return mod.name === this.selectedModuleName
      }, this)
      return match[0]
    }
  },
  methods: {
    setModule: function (newName) {
      location.hash = newName
      this.selectedModuleName = newName
    }
  },
  created () {
    this.modulesList = config.modules;
      /*
    var potentialMod = location.hash.replace('#', '')
    config.sidebar.forEach(function (module) {
      if (potentialMod === module.name) this.selectedModuleName = potentialMod
    }, this)
    */
  }
}
</script>

<style lang="scss">
  @import "./../node_modules/mapbox.js/theme/style.css";
  @import './../node_modules/leaflet-fullscreen/dist/leaflet.fullscreen.css';
  @import './../node_modules/iview/dist/styles/iview.css';

  @import url('https://fonts.googleapis.com/css?family=Montserrat:200,600');
  @import url('https://fonts.googleapis.com/css?family=Istok+Web');
  @import "./styles/variables.scss";

  html {
    width: 100%;
    height: 100%;
  }

  body{
    font-family: 'Istok Web', sans-serif;
    color: #444444;
    font-size: 1rem;
    min-height: 100%;
    background: transparentize($grey, 0.45);
  }

  h1, h2, h3, h4 {
    font-family: 'Montserrat', serif;
    color: #5a5a5a;
  }

  h3 {
    font-size: 1.3rem;
    margin-top: 5px;
  }

  h4 {
    font-weight: 600;
    margin: 20px 0px 10px;
  }

  a {
    color: $blue;
    text-underline-position: under;
    text-decoration-style: solid;
    text-decoration: underline;
  }

  .mainContent {
    float: right;
    pre {
      background-color: $lightGrey;
      padding: 20px 20px 0px;
      border: 2px solid $grey;
      overflow-x: auto;
    }
  }

</style>
