import { createRouter, createWebHistory } from 'vue-router'
// import BasicLayout from
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/user/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/item',
      name: 'item',
      component: () => import('../views/Item.vue')
    },
    {
      path: '/item/create',
      name: 'createItem',
      component: () => import('../views/CreateItem.vue')
    },
    {
      path: '/item/add-type',
      name: 'add type',
      component: () => import('../views/CreateType.vue')
    },
    {
      path: '/so',
      name: 'so',
      component: () => import('../views/So.vue')
    }
  ]
})

export default router
