<template>
  <div class="sidebarContents">
      <div class="fixedContent fixedContentResponsive">
        <label for="menuToggle" class="toggleLabel">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <input type="checkbox" class="menuToggle" id='menuToggle' v-model="menu.open" />
        <div class="logo" v-on:click="goHome">
          <h1>TURF</h1>
        </div>
        <div class="menuDropDown">
          <div class="topMenu">
            <div class="links" >
              <div v-on:click="close">
                <nuxt-link to="/getting-started" tag="li" class="menuItem heading">Getting Started</nuxt-link>
              </div>
              <li class="menuItem heading githubResponsive"><a href="https://www.github.com/turfjs/turf">GitHub</a></li>
            </div>
            <input id="sidebarFilter" v-model="filter" placeholder="Search modules">
          </div>
          <ul class="turfModules turfModulesResponsive">
            <div v-for="category in displayedModules" v-bind:key="category.group">
              <li class="menuItem heading ">{{category.group}}</li>
              <a v-for="module in category.modules" :href="module.href" v-on:click="close" class="menuLink" v-bind:key="module.name">
                 <li class="menuItem">
                  {{module.name}}
                </li>
              </a>
            </div>
          </ul>
        </div>
      </div>
     
  </div>
</template>

<script>

export default {
  name: 'Sidebar',
  props: ['modules'],
  data () {
    return {
      menu: {
        open: false,
        resize: undefined
      },
      filter: ''
    }
  },
  mounted: function () {
    const menu = this.menu
    menu.resize = function () {
      // Ensure menu is closed on resize to above 900px width
      if (window.innerWidth > 900) {
        menu.open = false
        document.body.style.overflow = 'auto'
      }
    }
    window.addEventListener('resize', menu.resize)
  },
  unmounted: function () {
    window.removeEventListener('resize', this.menu.resize)
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
  watch: {
    'menu.open': function (val) {
      // Prevent scrolling of content window when menu is open
      if (val) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  },
  methods: {
    close: function () {
      this.menu.open = false
    },
    goHome: function () {
      this.$router.push('/')
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

      .topMenu {
        padding-left: 30px;
        padding-top: 20px;
      }

      .logo {
          height: 120px;
          background-color: #2ECC71;
          margin-right: 0px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          align-self: center;
          

          h1 {
            font-size: 2rem;
            color: white;
            text-align: center;
            letter-spacing: 0.4rem;
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

    .fixedContent {
      width: inherit;
      position: fixed;
      background-color: $sidebarBg;

        #sidebarFilter {
          margin: 20px 0px 20px -0px;
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
      height: calc(100vh - 250px);
      position: relative;
      overflow-y: scroll;
      width: 100%;
      bottom: 0;
      width: inherit;
      background-color: $sidebarBg;
      left: 0;
      padding-bottom: 20px;
 
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
        margin-left: 8px !important;
        margin-bottom: 16px;
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
        margin-left: 0px !important;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 10px;
        font-size: 14px;
      }

      .githubResponsive {
        display: none;
      }

      .menuToggle, label {
        display: none;
      }

      .menuToggle:checked ~ .menuDropDown {
        display: block;
      }

   

      @media screen and (max-width: 900px) {

        .links {
          margin-top: 20px;
        }

        #sidebarFilter {
          margin: 18px 0px 18px 0px !important;
        }

        .menuToggle ~ .menuDropDown {
          display: none;
        }

        .menuToggle:checked ~ .menuDropDown {
          display: block;
        }
            
        /* hide the checkbox */
        .menuToggle {
          display: none;
          position: absolute;
          height: 100%;
          height: 50px;
          width: 50px;
        }

        /* style the label to look like the hamburger menu */
        .toggleLabel {
          display: inline-block;
          cursor: pointer;
          padding: 10px;
          padding-left: 30px;
        }

        /* style the hamburger menu spans */
        .toggleLabel span {
          display: block;
          width: 30px;
          height: 4px;
          margin-bottom: 5px;
          background-color: white;
          transition: all 0.3s ease-in-out;
        }

        /* rotate the first and last span to create the X shape */
        .toggleLabel span:first-of-type {
          transform-origin: top left;
        }

        .toggleLabel span:last-of-type {
          transform-origin: bottom left;
        }

        .menuToggle:checked + .toggleLabel span:nth-of-type(1) {
          transform: rotate(45deg) translate(6px, -6px);
        }

        .menuToggle:checked + .toggleLabel span:nth-of-type(2) {
          opacity: 0;
        }

        .menuToggle:checked + .toggleLabel span:nth-of-type(3) {
          transform: rotate(-45deg) translate(6px, 6px);
        }

        .toggleLabel, .menuToggle {
          position: absolute;
          top: 36px;
        }

        .githubResponsive  {
          display: block;
        }

        .githubResponsive > a  {
          margin-left: 0px !important;
          font-weight: 700;
          text-transform: uppercase;
          margin-top: 10px;
          font-size: 14px;
          color: #656565;
          text-decoration: none;
          cursor: pointer;
          list-style-type: none;
        }

        .fixedContentResponsive {
          position: fixed;
          z-index: 10000000; /** big value required for leaflet **/
        }

        .headingResponsive {
          background: red;
          padding-top: 10px;
          margin-top: 0
        }

        .turfModulesResponsive {
          width: 100%;
          height: calc(100vh - 289px);
        }
      }
  }

</style>
