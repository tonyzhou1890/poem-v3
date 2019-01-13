import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/index'),
      redirect: 'home',
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/home/index')
        },
        {
          path: 'article',
          name: 'Article',
          component: () => import('@/views/article/index')
        },
        {
          path: 'authorList',
          name: 'AuthorList',
          component: () => import('@/views/authorList/index')
        },
        {
          path: 'poemList',
          name: 'PoemList',
          component: () => import('@/views/poemList/index')
        },
        {
          path: 'author',
          name: 'Author',
          component: () => import('@/views/author/index')
        },
        {
          path: 'search',
          name: 'Search',
          component: () => import('@/views/search/index')
        }
      ]
    }
  ]
})
