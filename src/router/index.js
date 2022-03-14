import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'Main',
    component: () => import('../views/Main'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('@/views/goods')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user')
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('@/views/other/pageOne')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('@/views/other/pageTwo')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router