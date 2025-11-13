<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import BottomNav from '@/components/BottomNav.vue'
import RarityBadge from '@/components/RarityBadge.vue'

const router = useRouter()
const userStore = useUserStore()
const showAchievements = ref(false)

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<template>
  <main class="min-h-screen bg-gray-50 pb-20">
    <!-- Header -->
    <header class="bg-gradient-to-br from-[#06C755] to-[#05b04b] text-white">
      <div class="px-4 py-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold">{{ userStore.userName }}</h1>
            <p class="text-white/80 text-sm">LINE 城市任務玩家</p>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-center">
            <p class="text-2xl font-bold">{{ userStore.completedQuests }}</p>
            <p class="text-sm text-white/80">完成任務</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold">{{ userStore.steps.toLocaleString() }}</p>
            <p class="text-sm text-white/80">今日步數</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold">{{ userStore.totalPoints }}</p>
            <p class="text-sm text-white/80">獲得點數</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Menu Items -->
    <div class="px-4 py-6 space-y-3">
      <div class="bg-white rounded-2xl overflow-hidden shadow-sm">
        <router-link to="/rewards" class="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-[#06C755]/10 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
            </div>
            <span class="font-medium text-gray-900">我的獎勵</span>
          </div>
          <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>

        <router-link
          to="/feed"
          class="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-t"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-[#06C755]/10 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span class="font-medium text-gray-900">任務歷史</span>
          </div>
          <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>

        <button
          @click="showAchievements = true"
          class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-t text-left"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-[#06C755]/10 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <div>
              <span class="font-medium text-gray-900">成就徽章</span>
              <p class="text-xs text-gray-500">
                {{ userStore.unlockedAchievements.length }}/{{ userStore.achievements.length }} 已解鎖
              </p>
            </div>
          </div>
          <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Settings -->
      <div class="bg-white rounded-2xl overflow-hidden shadow-sm">
        <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-900">定位權限</p>
              <p class="text-xs text-gray-500">已開啟</p>
            </div>
          </div>
          <div class="w-12 h-7 bg-[#06C755] rounded-full relative">
            <div class="absolute right-1 top-1 w-5 h-5 bg-white rounded-full"></div>
          </div>
        </button>

        <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-t text-left">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-900">相機權限</p>
              <p class="text-xs text-gray-500">已開啟</p>
            </div>
          </div>
          <div class="w-12 h-7 bg-[#06C755] rounded-full relative">
            <div class="absolute right-1 top-1 w-5 h-5 bg-white rounded-full"></div>
          </div>
        </button>
      </div>

      <!-- Logout -->
      <button
        @click="handleLogout"
        class="w-full py-4 bg-white text-red-600 font-medium rounded-2xl shadow-sm hover:bg-red-50 transition-colors"
      >
        登出
      </button>
    </div>

    <!-- Achievements Modal -->
    <div
      v-if="showAchievements"
      class="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center"
      @click.self="showAchievements = false"
    >
      <div class="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-3xl max-h-[85vh] overflow-hidden flex flex-col animate-slide-up">
        <!-- Modal Header -->
        <div class="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 class="text-xl font-bold text-gray-900">成就徽章</h2>
          <button
            @click="showAchievements = false"
            class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="flex-1 overflow-y-auto p-6">
          <div class="mb-4 text-center">
            <p class="text-sm text-gray-600">
              已解鎖 <span class="font-bold text-[#06C755]">{{ userStore.unlockedAchievements.length }}</span> / {{ userStore.achievements.length }} 個成就
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <div
              v-for="ach in userStore.achievements"
              :key="ach.id"
              :class="[
                'relative rounded-2xl border-2 p-5 transition-all',
                ach.unlocked
                  ? 'bg-gradient-to-br from-[#06C755]/5 to-[#06C755]/10 border-[#06C755]/30'
                  : 'bg-gray-50 border-gray-200'
              ]"
            >
              <div class="flex items-start gap-4">
                <!-- Icon -->
                <div class="flex-shrink-0">
                  <div
                    :class="[
                      'w-16 h-16 rounded-2xl flex items-center justify-center',
                      ach.unlocked ? 'bg-[#06C755]' : 'bg-gray-300'
                    ]"
                  >
                    <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 class="font-bold text-gray-900 text-lg">{{ ach.name }}</h3>
                      <p class="text-sm text-gray-600 mt-1">{{ ach.desc }}</p>
                    </div>
                    <RarityBadge :rarity="ach.rarity" />
                  </div>

                  <!-- Progress Bar -->
                  <div class="space-y-2 mt-3">
                    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        :class="['h-full rounded-full transition-all', ach.unlocked ? 'bg-[#06C755]' : 'bg-gray-400']"
                        :style="{ width: `${Math.min(100, Math.round((ach.progress / ach.threshold) * 100))}%` }"
                      />
                    </div>
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-gray-500">{{ ach.progress }}/{{ ach.threshold }}</span>
                      <span v-if="ach.unlocked" class="text-[#06C755] font-medium flex items-center gap-1">
                        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        已解鎖
                      </span>
                      <span v-else class="text-amber-600 font-medium flex items-center gap-1">
                        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                        {{ ach.points }} pts
                      </span>
                    </div>
                  </div>

                  <p v-if="ach.unlocked_on" class="text-xs text-gray-400 mt-2">解鎖於 {{ ach.unlocked_on }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BottomNav />
  </main>
</template>
