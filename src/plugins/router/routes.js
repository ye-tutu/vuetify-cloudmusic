import message from 'common/message'
import store from '../store'

const routes = [
  {
    path: '*',
    redirect: { name: 'Home' }
  },
  {
    path: '/login',
    component: () => import('views/Login'),
    // 路由独享的守卫
    beforeEnter(to, from, next) {
      if (store.state.islogin) {
        message({ text: '已经登录过了！', color: 'success' })
        history.back()
      } else {
        next()
      }
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('views/Home'),
    meta: { keepAlive: true }
  },
  {
    path: '/user',
    component: () => import('views/User')
  },
  {
    path: '/search',
    component: () => import('views/Search')
  },
  {
    path: '/playlist',
    component: () => import('views/Playlist')
  },
  {
    path: '/discover/playlist',
    component: () => import('views/Discover')
  },
  {
    path: '/about',
    component: () => import('views/About')
  },
  {
    path: '/recommend',
    component: () => import('views/Recommend'),
    meta: { requiresAuth: true, keepAlive: true }
  },
  {
    path: '/artists',
    component: () => import('views/Artists')
  }
]

export default routes
