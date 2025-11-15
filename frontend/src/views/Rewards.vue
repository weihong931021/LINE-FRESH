<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import BottomNav from '@/components/BottomNav.vue'
import RarityBadge from '@/components/RarityBadge.vue'

const router = useRouter()
const userStore = useUserStore()

const rewards = [
  {
    id: 1,
    title: '花園裡的幸運符號',
    points: 5,
    completedAt: '2025-11-13',
    type: 'completed',
  },
]

const totalPoints = rewards.reduce((sum, r) => sum + r.points, 0)
</script>

<template>
  <main class="min-h-screen bg-gray-50 pb-20">
    <!-- Header -->
    <header class="bg-white border-b sticky top-0 z-10">
      <div class="px-4 py-3 flex items-center gap-3">
        <button @click="router.back()" class="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-lg font-bold text-gray-900">我的獎勵</h1>
      </div>
    </header>

    <!-- Success Banner -->
    <div class="px-4 py-6 bg-linear-to-br from-[#06C755] to-[#05b04b] text-white">
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-3">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-xl font-bold mb-1">任務完成！</h2>
        <p class="text-sm text-white/90">恭喜你完成這次探索</p>
      </div>
    </div>

    <div class="px-4 py-4 space-y-3">
      <!-- Points Summary -->
      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-bold text-gray-900">LINE Points</h3>
          <span class="text-xs text-gray-500">稍後發放</span>
        </div>
        <div class="text-center py-3">
          <p class="text-4xl font-bold text-[#06C755]">{{ totalPoints }}</p>
          <p class="text-sm text-gray-600 mt-1">累積點數</p>
        </div>
      </div>

      <!-- Achievements List -->
      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-gray-900">成就徽章</h3>
          <span class="text-xs text-gray-500">
            {{ userStore.unlockedAchievements.length }}/{{ userStore.achievements.length }}
          </span>
        </div>

        <div class="space-y-3">
          <div
            v-for="ach in userStore.achievements.slice(0, 4)"
            :key="ach.id"
            :class="[
              'relative rounded-xl border p-4 transition-all',
              ach.unlocked
                ? 'bg-linear-to-br from-[#06C755]/5 to-[#06C755]/10 border-[#06C755]/30'
                : 'bg-gray-50 border-gray-200'
            ]"
          >
            <!-- Rarity Badge - 右上角 -->
            <div class="absolute top-3 right-3">
              <RarityBadge :rarity="ach.rarity" />
            </div>

            <!-- Content - 左對齊 -->
            <div class="pr-24">
              <h4 class="font-bold text-base text-gray-900 mb-1">{{ ach.name }}</h4>
              <p class="text-sm text-gray-500 mb-3">{{ ach.desc }}</p>
            </div>
              
            <!-- Progress Bar -->
            <div class="space-y-1.5">
              <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  :class="['h-full rounded-full transition-all', ach.unlocked ? 'bg-[#06C755]' : 'bg-gray-400']"
                  :style="{ width: `${Math.min(100, Math.round((ach.progress / ach.threshold) * 100))}%` }"
                />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">{{ ach.progress }}/{{ ach.threshold }}</span>
                <span class="text-sm font-bold text-amber-600">{{ ach.points }} 點</span>
              </div>
            </div>
          </div>
        </div>

        <button class="w-full mt-4 py-2.5 text-sm text-[#06C755] font-medium hover:bg-[#06C755]/5 rounded-xl transition-colors">
          查看所有成就 →
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-2 pt-2">
        <button class="w-full py-3 border-2 border-[#06C755] text-[#06C755] font-bold rounded-xl hover:bg-[#06C755]/5 transition-colors flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          分享到 LINE
        </button>

        <button
          @click="router.push('/feed')"
          class="w-full py-3 bg-[#06C755] hover:bg-[#05b04b] text-white font-bold rounded-xl transition-colors"
        >
          探索更多任務
        </button>
      </div>
    </div>

    <BottomNav />
  </main>
</template>
