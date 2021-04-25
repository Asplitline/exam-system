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
import CorrectDetail from '@components/admin/correct/CorrectDetail'
import Discuss from '@components/admin/discuss/Discuss'
// ----
// home
import Home from '@components/Home'
import Index from '@components/home/index/Index'
import ContestIndex from '@components/home/contest/Contest'
import ProblemIndex from '@components/home/problem/Problem'
import ProblemListIndex from '@components/home/problem/ProblemList'
import ProblemDetailIndex from '@components/home/problem/ProblemDetail'
import DiscussIndex from '@components/home/discuss/Discuss'
import PostDetailIndex from '@components/home/discuss/PostDetail'
import AddPostIndex from '@components/home/discuss/AddPost'
import InfoIndex from '@components/home/info/Info'

// ----

import cContestDetail from '@components/home/contest/ContestDetail'

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
        { path: '/_correct/:id/:flag', name: 'correctDetail', component: CorrectDetail, props: true },
        { path: '/_discuss', name: 'discuss', component: Discuss }
      ]
    },
    {
      path: '/home',
      redirect: '/index',
      component: Home,
      children: [
        { path: '/index', component: Index },
        { path: '/contest', name: 'iContest', component: ContestIndex },
        { path: '/problem', name: 'iProblem', component: ProblemIndex },
        { path: '/problem/:id', name: 'iProblemList', component: ProblemListIndex, props: true },
        { path: '/problemDetail/:id', name: 'iProblemDetail', component: ProblemDetailIndex, props: true },
        { path: '/discuss', name: 'iDiscuss', component: DiscussIndex },
        { path: '/discuss/:id', name: 'iPostDetail', component: PostDetailIndex, props: true },
        { path: '/addPost', name: 'iAddPost', component: AddPostIndex },
        { path: '/info', component: InfoIndex },
        { path: '/contest/:id', component: cContestDetail, props: true }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const usr = store.state.currentUser
  const path = '/' + to.path.split('/')[1]
  if (aMiniMenuList.includes(path)) {
    window.sessionStorage.setItem('currentAIndex', path)
    store.commit('setCurrentAIndex', path)
  } else if (hMiniMenuList.includes(path)) {
    window.sessionStorage.setItem('currentHIndex', path)
    store.commit('setCurrentHIndex', path)
  }
  if (usr === null && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
