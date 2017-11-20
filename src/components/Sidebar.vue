<template>
    <div class="sidebarContents">
        <div class="fixedContent">
          <div class="logo" v-on:click="goHome">
            <h1>TURF</h1>
          </div>
          <router-link to="/getting-started" tag="li" class="menuItem heading">Getting Started</router-link>
          <input id="sidebarFilter" v-model="filter" placeholder="Search modules">
        </div>
        <ul class="turfModules">
          <div v-for="(category, name) in displayedModules">
          <li class="menuItem heading">{{name}}</li>
          <li v-for="module in category"
            class="menuItem"
            v-on:click="clickModule"
            >{{module.name}}</li>
            </div>
        </ul>
    </div>
</template>

<script>
import {Col} from 'iview/src/components/grid'

export default {
  name: 'Sidebar',
  props: ['modules'],
    data () {
      return {
        filter: ""
      }
    },
  components: {
    Col
  },
  computed: {
    displayedModules: function () {
      let temp = {};
      for (let i=0;i<this.modules.length;i++) {
        let m = this.modules[i];
          if (this.filter == "" || m.name.toUpperCase().indexOf(this.filter.toUpperCase()) >= 0) {
          if (!(m.category in temp)) {
             temp[m.category] = [];
          }
          temp[m.category].push(m);
        }
      }
      /* sorting modules per category (could be put in a vue-filter)*/
      for (let t in temp) {
        temp[t].sort(function(a, b){
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });
      }
      return temp;
    }
  },
  methods: {
    goHome: function () {
      this.$router.push('/')
    },
    clickModule (e) {
      if (e.target.classList.value.includes('heading')) return
      this.$router.push('docs')
      window.scrollTo(0, 0)
      this.$emit('changeModule', e.target.innerText)
    },
  }
}
</script>

<style lang="scss">
  @import "../styles/variables.scss";
  $sidebarBg: #fcfcfc;
  .sidebarContents {
    top: 0;
    bottom: 0;
    width: inherit;

    .fixedContent {
      width: inherit;
      position: fixed;
      padding-left: 30px;
      background-color: $sidebarBg;
        .logo {
        height: 120px;
        background-color: #2ECC71;
        margin-bottom: 30px;
        margin-left: -35px;
        margin-right: 0px;
        cursor: pointer;
          h1 {
            font-size: 2rem;
            color: white;
            text-align: center;
            letter-spacing: 0.4rem;
            padding-top: 30px;
            font-weight: 600;
             &:before {
              content: '<';
              opacity: 0;
              transition: 0.3s;
            }
            &:after {
              content: '>';
              transition: 0.3s;
              opacity: 0;
            }
            &:hover {
              &:before {
                opacity: 1;
              }
              &:after {
                opacity: 1;
              }
            }
          }
        }

        #sidebarFilter {
          margin: 30px 0px 30px -10px;
          font-size: 0.9rem;
          width: 80%;
          padding: 5px;
          border: solid 3px #efefef;
          color: #656565;
          transition: 0.3s;
          &:focus {
            outline: none;
            border: solid 3px #cccccc;
          }
        }
    }

    .turfModules {
      position: fixed;
      overflow-y: scroll;
      top: 260px;
      bottom: 0;
      width: inherit;
      background-color: $sidebarBg;
      padding-left: 30px;
        &::-webkit-scrollbar-track{
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
          background-color: transparentize($blue, 0.98);
        }

        &::-webkit-scrollbar{
          width: 6px;
          background-color: transparentize($blue, 0.98);
        }

        &::-webkit-scrollbar-thumb{
          background-color: transparentize($blue, 0.7);
        }
      }

    .menuItem {
      margin: 2px 0px;
      font-size: 0.9rem;
      color: #656565;
      text-decoration: none;
      cursor: pointer;
      list-style-type: none;
    }
    .heading {
      font-weight: 700;
      text-transform: uppercase;
      margin-top: 10px;
      font-size: 14px;
      margin-left: -8px;
    }
  }

</style>
