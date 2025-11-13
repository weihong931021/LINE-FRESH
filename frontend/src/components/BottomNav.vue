<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const navItems = [
  {
    name: 'feed',
    path: '/feed',
    label: '首頁',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    name: 'map',
    path: '/map',
    label: '地圖',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  },
  {
    name: 'rewards',
    path: '/rewards',
    label: '獎勵',
    icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7',
  },
  {
    name: 'profile',
    path: '/profile',
    label: '我的',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  },
]

const isActive = (path: string) => route.path === path
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
    <div class="flex items-center justify-around py-3">
      <button
        v-for="item in navItems"
        :key="item.name"
        @click="router.push(item.path)"
        class="flex flex-col items-center gap-1 transition-colors"
        :class="isActive(item.path) ? 'text-[#06C755]' : 'text-gray-400'"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
        </svg>
        <span class="text-xs" :class="isActive(item.path) ? 'font-medium' : ''">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>
