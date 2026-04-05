<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuestStore } from '@/stores/quest'

const route = useRoute()
const router = useRouter()
const questStore = useQuestStore()

const questId = route.params.id as string
const quest = computed(() => questStore.getQuestById(questId))

const checking = ref(false)
const userLocation = ref<{ lat: number; lng: number } | null>(null)
const distance = ref<number | null>(null)
const inRange = ref(false)
const locationError = ref('')

// 計算兩點間距離（公尺）
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3 // 地球半徑（公尺）
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return Math.round(R * c) // 距離（公尺）
}

onMounted(() => {
  checkLocation()
})

const checkLocation = () => {
  checking.value = true
  locationError.value = ''

  if (!navigator.geolocation) {
    locationError.value = '您的裝置不支援定位功能'
    checking.value = false
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }

      if (quest.value?.lat && quest.value?.lng) {
        const dist = calculateDistance(
          userLocation.value.lat,
          userLocation.value.lng,
          quest.value.lat,
          quest.value.lng
        )
        distance.value = dist
        inRange.value = dist <= 1000 // 1000 公尺 (1 公里) 內
      }

      checking.value = false
    },
    (error) => {
      checking.value = false
      switch (error.code) {
        case error.PERMISSION_DENIED:
          locationError.value = '請允許使用定位權限'
          break
        case error.POSITION_UNAVAILABLE:
          locationError.value = '無法取得位置資訊'
          break
        case error.TIMEOUT:
          locationError.value = '定位請求逾時'
          break
        default:
          locationError.value = '定位發生錯誤'
      }
    }
  )
}

const handleStartActivity = () => {
  if (inRange.value) {
    router.push(`/ar?quest=${questId}`)
  }
}

const handleInviteTeam = () => {
  router.push(`/team/${questId}`)
}
</script>

<template>
  <main class="min-h-screen bg-white flex flex-col">
    <!-- Header -->
    <header class="bg-white border-b sticky top-0 z-10">
      <div class="px-4 py-4 flex items-center gap-3">
        <button @click="router.back()" class="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-lg font-bold text-gray-900">{{ quest?.title }}</h1>
      </div>
    </header>

    <div class="flex-1 flex flex-col items-center justify-center p-6">
      <div class="max-w-sm w-full space-y-6">
        <!-- Quest Story -->
        <div class="bg-gradient-to-br from-[#06C755]/10 to-[#05b04b]/10 rounded-2xl p-5 border border-[#06C755]/20">
          <div class="flex items-center gap-2 mb-3">
            <svg class="w-5 h-5 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="font-bold text-gray-900">任務說明</h3>
          </div>
          <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{{ quest?.aiStory }}</p>
        </div>

        <!-- Location Status -->
        <div class="bg-white rounded-2xl p-5 shadow-sm border-2" :class="inRange ? 'border-[#06C755]' : 'border-gray-200'">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-gray-900">位置檢測</h3>
            <button @click="checkLocation" :disabled="checking" class="text-[#06C755] text-sm font-medium hover:underline disabled:opacity-50">
              {{ checking ? '檢測中...' : '重新檢測' }}
            </button>
          </div>

          <!-- Checking State -->
          <div v-if="checking" class="flex flex-col items-center py-8">
            <div class="w-16 h-16 border-4 border-[#06C755] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-gray-600">正在取得您的位置...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="locationError" class="flex flex-col items-center py-8">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p class="text-red-600 font-medium">{{ locationError }}</p>
          </div>

          <!-- Success/Distance State -->
          <div v-else-if="distance !== null" class="space-y-4">
            <div class="flex items-center justify-center">
              <div :class="['w-24 h-24 rounded-full flex items-center justify-center', inRange ? 'bg-[#06C755]' : 'bg-gray-200']">
                <svg v-if="inRange" class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else class="w-12 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
            </div>

            <div class="text-center">
              <p class="text-3xl font-bold mb-1" :class="inRange ? 'text-[#06C755]' : 'text-gray-900'">
                {{ distance }}m
              </p>
              <p class="text-sm text-gray-600">
                {{ inRange ? '✅ 已在活動範圍內' : '❌ 請前往活動地點 1 公里內' }}
              </p>
            </div>

            <!-- Requirements -->
            <div v-if="quest?.requirements" class="pt-4 border-t">
              <p class="text-xs text-gray-500 mb-2">任務條件：</p>
              <ul class="space-y-1">
                <li v-for="(req, index) in quest.requirements" :key="index" class="text-xs text-gray-600 flex items-center gap-2">
                  <span class="w-1 h-1 bg-[#06C755] rounded-full"></span>
                  {{ req }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <!-- Start Solo -->
          <button
            @click="handleStartActivity"
            :disabled="!inRange"
            class="w-full py-4 bg-[#06C755] hover:bg-[#05b04b] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#06C755]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {{ inRange ? '開始任務' : '尚未到達活動範圍' }}
          </button>

          <!-- Invite Team -->
          <button
            @click="handleInviteTeam"
            :disabled="!inRange"
            class="w-full py-4 border-2 border-[#06C755] text-[#06C755] font-bold rounded-xl hover:bg-[#06C755]/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
          >
            邀請好友組隊
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@keyframes scanZoom {
  0%, 100% {
    transform: scale(0.95);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}

@keyframes scanLine {
  0% {
    top: 0%;
  }
  50% {
    top: 100%;
  }
  100% {
    top: 0%;
  }
}

.animate-scan-zoom {
  animation: scanZoom 2s ease-in-out infinite;
}

.animate-scan-line {
  animation: scanLine 2s ease-in-out infinite;
}
</style>
