import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import LawCasesPage from '../components/law-cases-page'
import LoginPage from '../components/login-page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LawCasesPage',
      component: LawCasesPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },

  ]
})
