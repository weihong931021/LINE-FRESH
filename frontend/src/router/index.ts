import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（例如使用瀏覽器的前進/後退按鈕），則返回到該位置
    if (savedPosition) {
      return savedPosition
    } else {
      // 否則滾動到頂部
      return { top: 0, behavior: 'smooth' }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/feed',
      name: 'feed',
      component: () => import('@/views/Feed.vue'),
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/views/Map.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue'),
    },
    {
      path: '/rewards',
      name: 'rewards',
      component: () => import('@/views/Rewards.vue'),
    },
    {
      path: '/quest/:id',
      name: 'quest',
      component: () => import('@/views/Quest.vue'),
    },
    {
      path: '/scan/:id',
      name: 'scan',
      component: () => import('@/views/Scan.vue'),
    },
    {
      path: '/team/:id',
      name: 'team',
      component: () => import('@/views/Team.vue'),
    },
    {
      path: '/ar',
      name: 'ar',
      component: () => import('@/views/AR.vue'),
    },
  ],
})

export default router
