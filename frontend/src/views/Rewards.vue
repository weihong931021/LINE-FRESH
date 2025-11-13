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
      <div class="px-4 py-4 flex items-center gap-3">
        <button @click="router.back()" class="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-lg font-bold text-gray-900">我的獎勵</h1>
      </div>
    </header>

    <!-- Success Banner -->
    <div class="px-4 py-8 bg-gradient-to-br from-[#06C755] to-[#05b04b] text-white">
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
          <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold mb-2">任務完成！</h2>
        <p class="text-white/90">恭喜你完成這次探索</p>
      </div>
    </div>

    <div class="px-4 py-6 space-y-4">
      <!-- Points Summary -->
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-gray-900">LINE Points</h3>
          <span class="text-xs text-gray-500">稍後由官方發放</span>
        </div>
        <div class="text-center py-4">
          <p class="text-5xl font-bold text-[#06C755]">{{ totalPoints }}</p>
          <p class="text-gray-600 mt-2">累積點數</p>
        </div>
      </div>

      <!-- Completed Badges -->
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <h3 class="font-bold text-gray-900 mb-4">完成徽章</h3>
        <div v-for="reward in rewards" :key="reward.id" class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div class="w-12 h-12 bg-[#06C755] rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
              />
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-medium text-gray-900">{{ reward.title }}</p>
            <p class="text-sm text-gray-500">{{ reward.completedAt }}</p>
          </div>
          <p class="text-[#06C755] font-bold">+{{ reward.points }}</p>
        </div>
      </div>

      <!-- Streak -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#06C755]/20">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-[#06C755] rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-900">連續完成</h3>
              <p class="text-xs text-gray-500 mt-0.5">保持每日任務不中斷</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-3xl font-bold text-[#06C755]">1</p>
            <p class="text-xs text-gray-500">天</p>
          </div>
        </div>
        <div class="bg-gray-50 rounded-xl p-3">
          <p class="text-sm text-gray-600 text-center">繼續保持，解鎖更多獎勵！🎉</p>
        </div>
      </div>

      <!-- Achievements Grid -->
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-5">
          <h3 class="font-bold text-gray-900">成就徽章</h3>
          <span class="text-xs text-gray-500">
            {{ userStore.unlockedAchievements.length }}/{{ userStore.achievements.length }}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-3 mb-4">
          <div
            v-for="ach in userStore.achievements"
            :key="ach.id"
            :class="[
              'relative rounded-xl border-2 p-4 transition-all',
              ach.unlocked
                ? 'bg-gradient-to-br from-[#06C755]/5 to-[#06C755]/10 border-[#06C755]/30'
                : 'bg-gray-50 border-gray-200'
            ]"
          >
            <!-- Rarity Badge -->
            <div class="absolute top-2 right-2">
              <RarityBadge :rarity="ach.rarity" />
            </div>

            <!-- Content -->
            <div class="text-center mb-3">
              <h4 class="font-bold text-sm text-gray-900 mb-1 mt-4">{{ ach.name }}</h4>
              <p class="text-xs text-gray-500 line-clamp-2">{{ ach.desc }}</p>
            </div>

            <!-- Progress Bar -->
            <div class="space-y-1">
              <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  :class="['h-full rounded-full transition-all', ach.unlocked ? 'bg-[#06C755]' : 'bg-gray-400']"
                  :style="{ width: `${Math.min(100, Math.round((ach.progress / ach.threshold) * 100))}%` }"
                />
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-500">{{ ach.progress }}/{{ ach.threshold }}</span>
                <span v-if="ach.unlocked" class="text-[#06C755] font-medium">✓ 已解鎖</span>
              </div>
            </div>

            <!-- Points Badge -->
            <div class="mt-3 text-center">
              <span class="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                {{ ach.points }} pts
              </span>
            </div>
          </div>
        </div>

        <button class="w-full py-3 text-sm text-[#06C755] font-medium hover:bg-[#06C755]/5 rounded-xl transition-colors">
          查看所有成就 →
        </button>
      </div>

      <!-- Share Button -->
      <button class="w-full py-4 border-2 border-[#06C755] text-[#06C755] font-bold rounded-xl hover:bg-[#06C755]/5 transition-colors flex items-center justify-center gap-2">
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

      <!-- Back to Feed -->
      <button
        @click="router.push('/feed')"
        class="w-full py-4 bg-[#06C755] hover:bg-[#05b04b] text-white font-bold rounded-xl transition-colors"
      >
        探索更多任務
      </button>
    </div>

    <BottomNav />
  </main>
</template>
