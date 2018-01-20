import Vue from 'vue'
import Router from 'vue-router'
import flying from '@/components/Flying'
import flyingForms from '@/components/flyingForms'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'flying',
      component: flying
    },
    {
      path: '/forms',
      name: 'flyingForms',
      component: flyingForms
    }
  ]
})
