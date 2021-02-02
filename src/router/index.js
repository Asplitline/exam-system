import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
// 后台
import Admin from '../components/Admin'
import UserList from '../components/admin/user/User'
import ContestList from '../components/admin/contest/Contests'
import SubjectList from '../components/admin/subject/Subject'
import PostList from '../components/admin/post/Post'
import CommentList from '../components/admin/comment/Comment'
import GradeList from '../components/admin/grade/Grade'
import ProblemList from '../components/admin/problem/Problem'

import CProblemList from '../components/admin/contest/CProblems'
// 前台
import Home from '../components/Home'
import Index from '../components/home/index/Index'
import ContestIndex from '../components/home/contest/Contest'
import ShareIndex from '../components/home/share/Share'
import SubjectIndex from '../components/home/subject/Subject'
import UserIndex from '../components/home/user/User'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/login', component: Login },
    {
      path: '/admin',
      component: Admin,
      redirect: '/_contest',
      children: [
        { path: '/_contest', component: ContestList },
        { path: '/_problem', component: ProblemList },
        { path: '/_subject', component: SubjectList },
        { path: '/_grade', component: GradeList },
        { path: '/_users', component: UserList },
        { path: '/_posts', component: PostList },
        { path: '/_comments', component: CommentList },
        { path: '/_contest/problems/:id/:title', component: CProblemList, props: true }
      ]
    },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/index', component: Index },
        { path: '/contest', component: ContestIndex },
        { path: '/share', component: ShareIndex },
        { path: '/subject', component: SubjectIndex },
        { path: '/user', component: UserIndex }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') next()
  const token = window.sessionStorage.getItem('token')
  if (!token) {
    next('/login')
  }
  next()
})

export default router
