<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useQuestStore } from '@/stores/quest'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const questStore = useQuestStore()

const questId = route.params.id as string
const quest = computed(() => questStore.getQuestById(questId))
</script>

<template>
  <main v-if="quest" class="min-h-screen bg-gray-50 pb-8">
    <!-- Header -->
    <header class="bg-white border-b sticky top-0 z-10">
      <div class="px-4 py-4 flex items-center gap-3">
        <button @click="router.back()" class="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-lg font-bold text-gray-900">任務詳情</h1>
      </div>
    </header>

    <!-- Hero Image -->
    <div class="relative h-64 bg-gray-200">
      <img :src="quest.image" :alt="quest.title" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div class="absolute bottom-4 left-4 right-4">
        <h2 class="text-2xl font-bold text-white mb-2">{{ quest.title }}</h2>
        <div class="flex items-center gap-4 text-white/90 text-sm">
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            {{ quest.distance }}m
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            步行 {{ quest.eta }} 分鐘
          </span>
        </div>
      </div>
    </div>

    <div class="px-4 py-6 space-y-6">
      <!-- Location -->
      <div class="bg-white rounded-2xl p-4 shadow-sm">
        <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <svg class="w-5 h-5 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
          </svg>
          任務地點
        </h3>
        <p class="text-gray-700 mb-3">{{ quest.location || '請查看地圖' }}</p>
        <router-link
          to="/map"
          class="inline-flex items-center gap-2 text-[#06C755] text-sm font-medium hover:underline"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          在地圖上查看
        </router-link>
      </div>

      <!-- AI Story -->
      <div v-if="quest.aiStory" class="bg-gradient-to-br from-[#06C755]/10 to-[#05b04b]/10 rounded-2xl p-4 border border-[#06C755]/20">
        <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <svg class="w-5 h-5 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          AI 任務劇情
        </h3>
        <p class="text-gray-700 leading-relaxed">{{ quest.aiStory }}</p>
      </div>

      <!-- Requirements -->
      <div v-if="quest.requirements" class="bg-white rounded-2xl p-4 shadow-sm">
        <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <svg class="w-5 h-5 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          任務條件
        </h3>
        <ul class="space-y-2">
          <li v-for="(req, index) in quest.requirements" :key="index" class="flex items-center gap-2 text-gray-700">
            <span class="w-1.5 h-1.5 bg-[#06C755] rounded-full"></span>
            {{ req }}
          </li>
        </ul>
      </div>

      <!-- Milestones -->
      <div v-if="quest.milestones" class="bg-white rounded-2xl p-4 shadow-sm">
        <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          任務進度
        </h3>
        <div class="space-y-4">
          <div v-for="(milestone, index) in quest.milestones" :key="index" class="flex items-center gap-3">
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                index === (quest.currentStep || 0)
                  ? 'bg-[#06C755] text-white'
                  : index < (quest.currentStep || 0)
                    ? 'bg-[#06C755]/20 text-[#06C755]'
                    : 'bg-gray-100 text-gray-400'
              ]"
            >
              <span v-if="index < (quest.currentStep || 0)">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span v-else class="text-sm font-medium">{{ index + 1 }}</span>
            </div>
            <span :class="index === (quest.currentStep || 0) ? 'text-gray-900 font-medium' : 'text-gray-500'">
              {{ milestone }}
            </span>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <button
        @click="router.push(`/scan/${quest.id}`)"
        class="w-full py-4 bg-[#06C755] hover:bg-[#05b04b] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#06C755]/20"
      >
        前往任務地點
      </button>
    </div>
  </main>
</template>
