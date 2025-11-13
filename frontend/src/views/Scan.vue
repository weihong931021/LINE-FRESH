<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const scanning = ref(false)
const progress = ref(0)

let interval: number | null = null

watch(scanning, (newVal) => {
  if (newVal) {
    interval = window.setInterval(() => {
      progress.value += 2
      if (progress.value >= 100) {
        if (interval) clearInterval(interval)
        setTimeout(() => {
          router.push(`/ar?quest=${route.params.id}`)
        }, 500)
      }
    }, 50)
  }
})

const handleStartScan = () => {
  scanning.value = true
  progress.value = 0
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
        <h1 class="text-lg font-bold text-gray-900">AR 掃描</h1>
      </div>
    </header>

    <div class="flex-1 flex flex-col items-center justify-center p-6">
      <div class="max-w-sm w-full space-y-6">
        <!-- Instruction -->
        <div v-if="!scanning" class="text-center space-y-3">
          <h2 class="text-2xl font-bold text-gray-900">對準目標掃描</h2>
          <p class="text-gray-600">把鏡頭對準黑色框框內的標記，保持穩定</p>
        </div>

        <!-- QR Code Display -->
        <div class="relative bg-gray-50 p-4 rounded-3xl border-2 border-gray-200">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adobe%20Express%20QR%20Code-9juzqpkAaU6m9xFC3lLuRyAQDTfBE7.png"
            alt="Scan Target"
            class="w-full h-auto rounded-xl"
          />

          <!-- Scanning Overlay -->
          <template v-if="scanning">
            <!-- Scanning Frame -->
            <div class="absolute inset-0 flex items-center justify-center p-6">
              <div class="relative w-full aspect-square rounded-2xl">
                <!-- Corner Decorations -->
                <div class="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-[#06C755] rounded-tl-lg"></div>
                <div class="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-[#06C755] rounded-tr-lg"></div>
                <div class="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-[#06C755] rounded-bl-lg"></div>
                <div class="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-[#06C755] rounded-br-lg"></div>

                <!-- Scan Line -->
                <div class="absolute left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#06C755] to-transparent animate-scan-line"></div>
              </div>
            </div>

            <!-- Progress Circle -->
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
              <div class="relative w-20 h-20 bg-white rounded-full shadow-lg">
                <svg class="w-20 h-20 -rotate-90">
                  <circle cx="40" cy="40" r="32" stroke="#E5E7EB" stroke-width="4" fill="none" />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#06C755"
                    stroke-width="4"
                    fill="none"
                    :stroke-dasharray="2 * Math.PI * 32"
                    :stroke-dashoffset="2 * Math.PI * 32 * (1 - progress / 100)"
                    class="transition-all duration-300"
                    stroke-linecap="round"
                  />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-sm font-bold text-gray-900">{{ progress }}%</span>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Status Message -->
        <div v-if="scanning" class="text-center">
          <p class="text-[#06C755] font-medium text-lg">掃描中請勿移動</p>
        </div>

        <!-- Action Button -->
        <button
          v-if="!scanning"
          @click="handleStartScan"
          class="w-full py-4 bg-[#06C755] hover:bg-[#05b04b] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#06C755]/20"
        >
          開始掃描
        </button>
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
