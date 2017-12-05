<template>
  <Row id="app">
    <Col span="4" class="sideCol">
      <sidebar :modules="modules" v-on:changeModule="setModule"></sidebar>
    </Col>
    <Col span="18" offset="1" v-bind:class="{ mainContentArea: !isDocsPage }">
        <github></github>
        <nuxt/>
    </Col>
  </Row>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import Github from '../components/Github.vue'
import config from '../assets/config.json'

export default {
  name: 'app',
  components: {
    Sidebar,
    Github
  },
  data () {
    return {
      selectedModuleName: 'along',
      modules: config.modules
    }
  },
  computed: {
    selectedModule: function () {
      return {}
    },
    isDocsPage: function () {
      return this.$route.name === 'Docs'
    }
    //   var match = config.modules.filter(function (mod) {
    //     return mod.name === this.selectedModuleName
    //   }, this)
    //   return match[0]
    // }
  },
  methods: {
    setModule: function (newName) {
      location.hash = newName
      this.selectedModuleName = newName
    }
  }
}
</script>

<style lang="scss">

  @import "../styles/variables.scss";

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
    font-size: 3rem;
    font-weight: 200;
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

  .mainContentArea {
    pre {
      background-color: $lightGrey;
      border: 2px solid $grey;
      overflow-x: auto;
    }
  }
  .hljs {
    background: none!important;
    padding: 20px!important;
  }
  .sideCol{
    min-height: fill;
  }
  .mainContentArea{
    background-color: #f6f6f6;
    padding: 40px;
    margin-top: 60px;
    margin-bottom: 40px;
    border: 2px solid transparentize($blue, 0.9);

    h3 {
      font-weight: 200;
      font-size:3rem;
      margin-bottom: 10px;
      margin-top: 0px;
    }
  }
</style>