import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/FormView.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../views/TableView.vue')
    },
    {
      path: '/table-plus',
      name: 'table-plus',
      component: () => import('../views/TablePlusView.vue')
    },
    {
      path: '/table-tabs',
      name: 'table-tabs',
      component: () => import('../views/TableTabsView.vue')
    },
  ]
})

export default router
