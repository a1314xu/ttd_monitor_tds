import Vue from 'vue'
import Router from 'vue-router'
import dataSource from '@/pages/dataSource'
import graphy from '@/pages/graphy'
import  warnRule from '@/pages/warnRule'
import board from '@/pages/board'
import cat from '@/pages/cat'
import dashboard from '@/pages/dashboard'
import listPage from '@/pages/listPage'
import home from '@/pages/home'
import apiProperty from '@/pages/apiProperty'
import pageProperty from '@/pages/pageProperty'
import loopRatioApi from '@/pages/loopRatioApi'
import sameRatioApi from '@/pages/sameRatioApi'
import loopRatioPage from '@/pages/loopRatioPage'
import sameRatioPage from '@/pages/sameRatioPage'
import locationDailyReport from '@/pages/locationDailyReport'
import qualifyDailyReport from '@/pages/qualifyDailyReport'
import reportPlatform from '@/pages/reportPlatform'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/reportPlatform',
      name: 'reportPlatform',
      component: reportPlatform,
      children: [
        {
          path: '/apiProperty',
          name: 'apiProperty',
          component: apiProperty,
        },{
          path: '/pageProperty',
          name: 'pageProperty',
          component: pageProperty,
        },
        {
          path: '/qualifyDailyReport',
          name: 'qualifyDailyReport',
          component: qualifyDailyReport,
        },
        {
          path: '/locationDailyReport',
          name: 'locationDailyReport',
          component: locationDailyReport,
        },
        ]
    },

    {
      path: '/dataSource',
      name: 'dataSource',
      component: dataSource,
    },
    {
      path: '/graphy',
      name: 'graphy',
      component: graphy
    },
    {
      path: '/board',
      name: 'board',
      component: board
    },
    {
      path: '/warnRule',
      name: 'warnRule',
      component: warnRule
    },
    {
      path: '/CAT',
      name: 'cat',
      component: cat
    },
    {
      path: '/Dashboard',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/listPage',
      name: 'listPage',
      component: listPage
    },
    {
      path: '/loopRatioApi',
      name: 'loopRatioApi',
      component: loopRatioApi
    },
    {
      path: '/sameRatioApi',
      name: 'sameRatioApi',
      component: sameRatioApi
    },
    {
      path: '/loopRatioPage',
      name: 'loopRatioPage',
      component: loopRatioPage
    },
    {
      path: '/sameRatioPage',
      name: 'sameRatioPage',
      component: sameRatioPage
    },

  ]
})
