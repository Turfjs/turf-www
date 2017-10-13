import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Module from '@/components/Module'
import GettingStarted from '@/components/GettingStarted'

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
      path: '/docs',
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
