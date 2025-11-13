<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const handleLogin = () => {
  userStore.login()
  router.push('/feed')
}
</script>

<template>
  <main class="h-screen bg-white flex flex-col overflow-hidden">
    <div class="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <!-- LINE Logo -->
      <div class="mb-6">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-[#06C755] rounded-3xl shadow-xl">
          <svg class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-bold text-gray-900 mb-2 text-center">LINE 城市任務</h1>
      <p class="text-gray-500 text-center mb-8 max-w-sm">探索城市，收集回憶，與好友一起冒險</p>

      <!-- Features List -->
      <div class="w-full max-w-md space-y-3 mb-8">
        <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div class="w-10 h-10 bg-[#06C755] rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-semibold text-gray-900 text-sm">探索附近任務</p>
            <p class="text-xs text-gray-500">AI 生成專屬城市冒險</p>
          </div>
        </div>

        <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div class="w-10 h-10 bg-[#06C755] rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h-4.01M8 8h.01M16 8h.01M8 16h.01M16 16h.01"
              />
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-semibold text-gray-900 text-sm">AR 掃描體驗</p>
            <p class="text-xs text-gray-500">現實與虛擬的完美結合</p>
          </div>
        </div>

        <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div class="w-10 h-10 bg-[#06C755] rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-semibold text-gray-900 text-sm">豐富獎勵</p>
            <p class="text-xs text-gray-500">完成任務獲得專屬徽章</p>
          </div>
        </div>
      </div>

      <!-- Login Button -->
      <button
        @click="handleLogin"
        class="w-full max-w-md py-4 bg-[#06C755] hover:bg-[#05b04b] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#06C755]/20 active:scale-[0.98]"
      >
        使用 LINE 登入
      </button>

      <p class="text-xs text-gray-400 mt-4 text-center max-w-sm">登入即表示同意服務條款與隱私政策</p>
    </div>

    <!-- Footer -->
    <div class="px-6 py-4 text-center border-t border-gray-100">
      <p class="text-xs text-gray-400">© 2025 LINE 城市任務. All rights reserved.</p>
    </div>
  </main>
</template>
