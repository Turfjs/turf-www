<template>
  <div class="sidebarContents">
      <div class="fixedContent">
        <div class="logo" v-on:click="goHome">
          <h1>TURF</h1>
        </div>
        <nuxt-link to="/getting-started" tag="li" class="menuItem heading">Getting Started</nuxt-link>
        <input id="sidebarFilter" v-model="filter" placeholder="Search modules">
      </div>
      <ul class="turfModules">
        <div v-for="category in displayedModules">
          <li class="menuItem heading">{{category.group}}</li>
          <a :href="module.href" v-for="module in category.modules" class="menuLink">
            <li class="menuItem">
              {{module.name}}
            </li>
          </a>
        </div>
      </ul>
  </div>
</template>

<script>

export default {
  name: 'Sidebar',
  props: ['modules'],
  data () {
    return {
      filter: ''
    }
  },
  computed: {
    displayedModules: function () {
      var out = []
      this.modules.forEach(function (module) {
        var matches = module.modules.filter(function (mod) {
          return mod.name.toUpperCase().indexOf(this.filter.toUpperCase()) !== -1
        }, this).map((mod) => {
          // Create the link to be used for this module
          mod.href = '/docs/#' + mod.name
          return mod
        })
        if (matches.length > 0) out.push({group: module.group, modules: matches})
      }, this)
      return out
    }
  },
  methods: {
    goHome: function () {
      this.$router.push('/')
    },
    clickModule (e) {
      const moduleName = e.target.innerText
      if (e.target.className.indexOf('heading') !== -1) return
      if (this.$route.path === '/docs/') {
        document.getElementById(moduleName).scrollIntoView()
        window.location.hash = moduleName
      } else {
        this.$router.push('docs/#' + moduleName)
      }
    }
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

    .menuLink {
      text-decoration: none;
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
