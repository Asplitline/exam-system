import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import UserList from '../components/user/User.vue'
import ContestList from '../components/contest/Contests.vue'
import SubjectList from '../components/subject/Subject.vue'
import PostList from '../components/post/Post.vue'
import CommentList from '../components/comment/Comment.vue'
import GradeList from '../components/grade/Grade.vue'
import ProblemList from '../components/problem/Problem.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/contest', component: ContestList },
        { path: '/problem', component: ProblemList },
        { path: '/subject', component: SubjectList },
        { path: '/grade', component: GradeList },
        { path: '/users', component: UserList },
        { path: '/posts', component: PostList },
        { path: '/comments', component: CommentList }
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
