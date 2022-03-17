import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router