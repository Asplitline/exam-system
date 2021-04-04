import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@components/Login'
// admin
import Admin from '@components/Admin'
import User from '@components/admin/user/User'
import Contest from '@components/admin/contest/Contest'
import ContestDetail from '@components/admin/contest/ContestDetail'
import Subject from '@components/admin/subject/Subject'
import Problem from '@components/admin/problem/Problem'
import Correct from '@components/admin/correct/Correct'
import Discuss from '@components/admin/discuss/Discuss'
// ----
// home
import Home from '@components/Home'
import Index from '@components/home/index/Index'
import ContestIndex from '@components/home/contest/Contest'
import DiscussIndex from '@components/home/discuss/Discuss'
import InfoIndex from '@components/home/info/Info'
import ProblemIndex from '@components/home/problem/Problem'

// ----
import SProblemList from '@components/home/subject/sProblemList'
import SProblemDetail from '@components/home/subject/sProblemDetail'
import cContestDetail from '@components/home/contest/ContestDetail'

import sPostDetail from '@components/home/share/postDetail'
import sPostSubmit from '@components/home/share/sPostSubmit'
import store from '@store'
import { aMiniMenuList, hMiniMenuList } from '@static'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', name: 'index', redirect: '/index' },
    { path: '/login', component: Login },
    {
      path: '/admin',
      component: Admin,
      redirect: '/_user',
      children: [
        { path: '/_user', name: 'user', component: User },
        { path: '/_contest', name: 'contest', component: Contest },
        { path: '/_contest/:title/:id', name: 'contestDetail', component: ContestDetail, props: true },
        { path: '/_subject', name: 'subject', component: Subject },
        { path: '/_problem', name: 'problem', component: Problem },
        { path: '/_correct', name: 'correct', component: Correct },
        { path: '/_discuss', name: 'discuss', component: Discuss }
      ]
    },
    {
      path: '/home',
      redirect: '/index',
      component: Home,
      children: [
        { path: '/index', component: Index },
        { path: '/contest', component: ContestIndex },
        { path: '/problem', component: ProblemIndex },
        { path: '/discuss', component: DiscussIndex },
        { path: '/info', component: InfoIndex },
        { path: '/subject/:id/:name', component: SProblemList, props: true },
        { path: '/sProblem/:id/:name', component: SProblemDetail, props: true },
        { path: '/contest/:id/:name', component: cContestDetail, props: true },
        { path: '/share/post/:id/:uid', component: sPostDetail, props: true },
        { path: '/share/sPostSubmit', component: sPostSubmit }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const usr = store.state.currentUser
  const path = '/' + to.path.split('/')[1]
  sessionStorage.setItem('123', '123')
  if (aMiniMenuList.includes(path)) {
    window.sessionStorage.setItem('currentAIndex', path)
    store.commit('setCurrentAIndex', path)
  } else if (hMiniMenuList.includes(path)) {
    window.sessionStorage.setItem('currentHIndex', path)
    store.commit('setCurrentHIndex', path)
  }
  if (usr === null && to.path !== '/login') {
    next('/login')
  }
  else {
    next()
  }
})

export default router
