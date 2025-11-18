<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const nearbyPlayers = [
  { id: 1, name: '小明', distance: 120, avatar: '👤' },
  { id: 2, name: '小華', distance: 250, avatar: '👤' },
  { id: 3, name: '小美', distance: 380, avatar: '👤' },
]
</script>

<template>
  <main class="min-h-screen bg-gray-50 pb-8">
    <!-- Header -->
    <header class="bg-white border-b sticky top-0 z-10">
      <div class="px-4 py-4 flex items-center gap-3">
        <button @click="router.back()" class="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-lg font-bold text-gray-900">組隊大廳</h1>
      </div>
    </header>

    <div class="px-4 py-6 space-y-6">
      <!-- Info Banner -->
      <div class="bg-gradient-to-br from-[#06C755]/10 to-[#05b04b]/10 border border-[#06C755]/20 rounded-2xl p-4">
        <p class="text-sm text-gray-700">
          <span class="font-medium">提示：</span>
          找到附近的玩家一起完成任務，獲得更多獎勵！
        </p>
      </div>

      <!-- Nearby Players -->
      <div>
        <h2 class="font-bold text-gray-900 mb-4">附近玩家</h2>
        <div class="space-y-3">
          <div v-for="player in nearbyPlayers" :key="player.id" class="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-[#06C755]/20">
                <svg class="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ player.name }}</p>
                <p class="text-sm text-gray-500">{{ player.distance }}m 外</p>
              </div>
            </div>
            <button class="px-4 py-2 bg-[#06C755] text-white font-medium rounded-lg hover:bg-[#05b04b] transition-colors">
              邀請
            </button>
          </div>
        </div>
      </div>

      <!-- Create Team -->
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <h3 class="font-bold text-gray-900 mb-3">創建隊伍</h3>
        <p class="text-sm text-gray-600 mb-4">開啟公開房間讓其他玩家加入</p>
        <button class="w-full py-3 bg-[#06C755] hover:bg-[#05b04b] text-white font-medium rounded-xl transition-colors">
          開啟公開房間
        </button>
      </div>

      <!-- Invite via LINE -->
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <h3 class="font-bold text-gray-900 mb-3">邀請好友</h3>
        <p class="text-sm text-gray-600 mb-4">分享連結到 LINE 邀請朋友一起玩</p>
        <button class="w-full py-3 bg-[#06C755] hover:bg-[#05b04b] text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
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
      </div>

      <!-- Solo Option -->
      <button
        @click="router.push(`/quest/${route.params.id}`)"
        class="w-full py-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
      >
        單獨開始任務
      </button>
    </div>
  </main>
</template>
