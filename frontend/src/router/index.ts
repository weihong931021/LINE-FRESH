import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
