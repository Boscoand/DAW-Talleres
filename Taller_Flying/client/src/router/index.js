import Vue from 'vue'
import Router from 'vue-router'
import flying from '@/components/Flying'
import register from '@/components/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'flying',
      component: flying
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})
