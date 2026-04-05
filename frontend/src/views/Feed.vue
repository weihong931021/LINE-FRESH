<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestStore } from '@/stores/quest'
import BottomNav from '@/components/BottomNav.vue'

const router = useRouter()
const questStore = useQuestStore()

const searchQuery = ref('')
const distanceFilter = ref('2000')
</script>

<template>
  <main class="min-h-screen bg-gray-50 pb-20">
    <!-- Header -->
    <header class="bg-white border-b sticky top-0 z-10">
      <div class="px-4 py-3">
        <div class="flex items-center justify-between mb-3">
          <h1 class="text-xl font-bold text-gray-900">任務</h1>
          <router-link to="/profile">
            <div class="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </router-link>
        </div>

        <!-- Search Bar -->
        <div class="relative mb-3">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜尋地點或任務"
            class="w-full py-2.5 pl-10 pr-4 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#06C755]"
          />
          <svg
            class="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <!-- Filter Bar -->
        <div class="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <select
            v-model="distanceFilter"
            class="px-3 py-1.5 bg-white border border-[#06C755] text-[#06C755] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#06C755] font-medium"
          >
            <option value="500">500m 內</option>
            <option value="1000">1km 內</option>
            <option value="2000">2km 內</option>
            <option value="5000">5km 內</option>
          </select>
          <button class="px-3 py-1.5 bg-gray-100 rounded-full text-sm whitespace-nowrap">全部難度</button>
          <button class="px-3 py-1.5 bg-gray-100 rounded-full text-sm whitespace-nowrap">單人/多人</button>
        </div>
      </div>
    </header>

    <!-- Stats Banner -->
    <div class="px-4 py-3 bg-linear-to-r from-[#06C755] to-[#05b04b] text-white">
      <p class="text-sm opacity-90">今天附近有 {{ questStore.quests.length }} 個任務</p>
      <p class="text-base font-bold mt-0.5">出門走走吧 ✨</p>
    </div>

    <!-- Quest Cards -->
    <div class="px-4 py-4 space-y-4">
      <div
        v-for="quest in questStore.quests"
        :key="quest.id"
        class="bg-white rounded-2xl overflow-hidden shadow-sm"
      >
        <!-- Quest Image -->
        <div class="relative h-40 bg-gray-200">
          <img :src="quest.image" :alt="quest.title" class="w-full h-full object-cover" />
          <div
            class="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium"
          >
            {{ quest.distance }}m
          </div>
        </div>

        <!-- Quest Info -->
        <div class="p-4">
          <div class="flex items-start justify-between mb-2">
            <h3 class="text-lg font-bold text-gray-900">{{ quest.title }}</h3>
            <span class="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">{{ quest.difficulty }}</span>
          </div>

          <p class="text-sm text-gray-600 mb-3 leading-relaxed">{{ quest.aiBlurb }}</p>

          <div class="flex items-center gap-4 mb-4 text-xs text-gray-500">
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {{ quest.eta }} 分鐘
            </div>
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              {{ quest.type }}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button
              @click="router.push(`/quest/${quest.id}`)"
              class="flex-1 py-3 bg-[#06C755] hover:bg-[#05b04b] text-white font-medium rounded-xl transition-colors"
            >
              開始
            </button>
            <button
              @click="router.push(`/team/${quest.id}`)"
              class="px-6 py-3 border-2 border-[#06C755] text-[#06C755] font-medium rounded-xl hover:bg-[#06C755]/5 transition-colors"
            >
              揪隊
            </button>
          </div>
        </div>
      </div>
    </div>

    <BottomNav />
  </main>
</template>
