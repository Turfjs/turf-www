import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Module from '../components/Module.vue'
import GettingStarted from '../components/GettingStarted.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/docs/',
      name: 'Docs',
      component: Module
    },
    {
      path: '/getting-started',
      name: 'GettingStarted',
      component: GettingStarted
    }
  ]
})
