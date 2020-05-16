import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/index')
    },
    {
      path: '/article',
      name: 'Article',
      component: () => import('@/views/article/index')
    },
    {
      path: '/authorList',
      name: 'AuthorList',
      component: () => import('@/views/authorList/index')
    },
    {
      path: '/poemList',
      name: 'PoemList',
      component: () => import('@/views/poemList/index')
    },
    {
      path: '/author',
      name: 'Author',
      component: () => import('@/views/author/index')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('@/views/search/index')
    },
    {
      path: '/subject',
      name: 'Subject',
      component: () => import('@/views/subject/index')
    },
    {
      path: '/subjectPoem',
      name: 'SubjectPoem',
      component: () => import('@/views/subjectPoem/index')
    },
    {
      path: '/collection',
      name: 'Collection',
      component: () => import('@/views/collection/index')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/404/index')
    }
  ]
})
