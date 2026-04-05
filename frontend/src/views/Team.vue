<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useQuestStore } from '@/stores/quest'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const questStore = useQuestStore()

const questId = route.params.id as string

interface Player {
  id: number
  name: string
  level: number
  distance: number
  avatar: string
  status: 'online' | 'busy' | 'offline'
  questsCompleted: number
}

interface Team {
  id: number
  name: string
  leader: string
  members: number
  maxMembers: number
  quest: string
  questId?: string
  difficulty: string
  isPublic: boolean
}

const currentTeam = ref<Team | null>(null)
const activeTab = ref<'nearby' | 'rooms'>('nearby')
const showCreateRoom = ref(false)
const roomName = ref('')
const maxMembers = ref(4)
const isPublic = ref(true)

const nearbyPlayers = ref<Player[]>([
  { 
    id: 1, 
    name: '探險家小明', 
    level: 12,
    distance: 120, 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ming',
    status: 'online',
    questsCompleted: 28
  },
  { 
    id: 2, 
    name: '尋寶獵人小華', 
    level: 18,
    distance: 250, 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hua',
    status: 'online',
    questsCompleted: 45
  },
  { 
    id: 3, 
    name: '冒險者小美', 
    level: 9,
    distance: 380, 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mei',
    status: 'busy',
    questsCompleted: 15
  },
  { 
    id: 4, 
    name: '勇者阿傑', 
    level: 25,
    distance: 450, 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jay',
    status: 'online',
    questsCompleted: 67
  },
])

const publicRooms = ref<Team[]>([
  {
    id: 1,
    name: '衝圖書館！',
    leader: '探險家小明',
    members: 2,
    maxMembers: 4,
    quest: '中央大學圖書館',
    questId: 'q_101',
    difficulty: '簡單',
    isPublic: true
  },
  {
    id: 2,
    name: '志希館解謎團',
    leader: '尋寶獵人小華',
    members: 3,
    maxMembers: 4,
    quest: '志希館・知識迴響',
    questId: 'q_105',
    difficulty: '中等',
    isPublic: true
  },
  {
    id: 3,
    name: '輕鬆組',
    leader: '冒險者小美',
    members: 1,
    maxMembers: 3,
    quest: '中央大學操場',
    questId: 'q_102',
    difficulty: '簡單',
    isPublic: true
  },
])

function invitePlayer(player: Player) {
  alert(`已發送邀請給 ${player.name}`)
}

function joinRoom(room: Team) {
  currentTeam.value = { ...room, members: room.members + 1 }
  alert(`成功加入房間：${room.name}`)
}

function createRoom() {
  if (!roomName.value.trim()) {
    alert('請輸入房間名稱')
    return
  }
  
  const quest = questStore.getQuestById(questId)
  
  const newRoom: Team = {
    id: Date.now(),
    name: roomName.value,
    leader: '你',
    members: 1,
    maxMembers: maxMembers.value,
    quest: quest?.title || '待選擇',
    questId: questId,
    difficulty: quest?.difficulty || '-',
    isPublic: isPublic.value
  }
  
  currentTeam.value = newRoom
  if (isPublic.value) {
    publicRooms.value.unshift(newRoom)
  }
  showCreateRoom.value = false
  roomName.value = ''
}

function leaveTeam() {
  if (confirm('確定要離開隊伍嗎？')) {
    currentTeam.value = null
  }
}

function startQuest() {
  // 如果在隊伍中，使用隊伍的任務ID
  const targetQuestId = currentTeam.value?.questId || questId
  router.push(`/quest/${targetQuestId}`)
}

function shareToLine() {
  // 實際應用中會呼叫 LINE LIFF SDK
  const shareText = currentTeam.value 
    ? `快來加入我的隊伍「${currentTeam.value.name}」一起完成任務！`
    : '一起來玩 LINE 城市任務吧！'
  alert(`${shareText}\n\n連結已複製！`)
}

function getStatusColor(status: string) {
  switch(status) {
    case 'online': return 'bg-green-500'
    case 'busy': return 'bg-yellow-500'
    default: return 'bg-gray-400'
  }
}

function getDifficultyColor(difficulty: string) {
  switch(difficulty) {
    case '簡單': return 'text-green-600 bg-green-50'
    case '中等': return 'text-yellow-600 bg-yellow-50'
    case '困難': return 'text-red-600 bg-red-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}
</script>

<template>
  <main class="min-h-screen bg-gray-50 pb-24">
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
      <!-- Current Team Status -->
      <div v-if="currentTeam" class="bg-linear-to-br from-[#06C755] to-[#05b04b] rounded-2xl p-5 text-white shadow-lg">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-lg">{{ currentTeam.name }}</h3>
              <p class="text-white/80 text-sm">隊長：{{ currentTeam.leader }}</p>
            </div>
          </div>
          <button @click="leaveTeam" class="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
            離開
          </button>
        </div>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span class="font-medium">{{ currentTeam.members }}/{{ currentTeam.maxMembers }} 成員</span>
          </div>
          <div v-if="currentTeam.quest !== '待選擇'" class="text-sm bg-white/20 px-3 py-1 rounded-full">
            {{ currentTeam.quest }}
          </div>
        </div>
        
        <!-- Start Quest Button in Team Card -->
        <button
          @click="startQuest"
          class="w-full py-3 bg-white text-[#06C755] font-bold rounded-xl hover:bg-white/90 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {{ currentTeam.leader === '你' ? '開始任務' : '跟隨隊長前往' }}
        </button>
      </div>

      <!-- Info Banner -->
      <div v-else class="bg-linear-to-br from-[#06C755]/10 to-[#05b04b]/10 border border-[#06C755]/20 rounded-2xl p-4">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 bg-[#06C755]/20 rounded-full flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-medium text-gray-900 mb-1">組隊獲得更多獎勵！</p>
            <p class="text-sm text-gray-600">找到附近的玩家或加入公開房間，一起完成任務獲得額外經驗值和道具獎勵</p>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-2 bg-gray-100 p-1 rounded-xl">
        <button 
          @click="activeTab = 'nearby'"
          :class="[
            'flex-1 py-2.5 rounded-lg font-medium transition-all',
            activeTab === 'nearby' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          ]"
        >
          <div class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            附近玩家
          </div>
        </button>
        <button 
          @click="activeTab = 'rooms'"
          :class="[
            'flex-1 py-2.5 rounded-lg font-medium transition-all',
            activeTab === 'rooms' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          ]"
        >
          <div class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            公開房間
          </div>
        </button>
      </div>

      <!-- Nearby Players Tab -->
      <div v-show="activeTab === 'nearby'" class="space-y-3">
        <div class="flex items-center justify-between mb-2">
          <h2 class="font-bold text-gray-900">附近的探險家</h2>
          <span class="text-sm text-gray-500">{{ nearbyPlayers.length }} 位玩家</span>
        </div>
        
        <div v-for="player in nearbyPlayers" :key="player.id" class="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3 flex-1">
              <div class="relative">
                <img :src="player.avatar" :alt="player.name" class="w-14 h-14 rounded-full border-2 border-[#06C755]/20" />
                <div :class="['absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white', getStatusColor(player.status)]"></div>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <p class="font-semibold text-gray-900">{{ player.name }}</p>
                  <span class="px-2 py-0.5 bg-[#06C755]/10 text-[#06C755] text-xs font-medium rounded-full">
                    Lv.{{ player.level }}
                  </span>
                </div>
                <div class="flex items-center gap-3 text-sm text-gray-500">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {{ player.distance }}m
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ player.questsCompleted }} 任務
                  </span>
                </div>
              </div>
            </div>
            <button 
              @click="invitePlayer(player)"
              :disabled="player.status === 'busy'"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-all',
                player.status === 'busy'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#06C755] text-white hover:bg-[#05b04b] shadow-sm hover:shadow'
              ]"
            >
              {{ player.status === 'busy' ? '忙碌中' : '邀請' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Public Rooms Tab -->
      <div v-show="activeTab === 'rooms'" class="space-y-3">
        <div class="flex items-center justify-between mb-2">
          <h2 class="font-bold text-gray-900">公開房間</h2>
          <span class="text-sm text-gray-500">{{ publicRooms.length }} 個房間</span>
        </div>
        
        <div v-for="room in publicRooms" :key="room.id" class="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1">
              <h3 class="font-bold text-gray-900 mb-1">{{ room.name }}</h3>
              <p class="text-sm text-gray-500 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                隊長：{{ room.leader }}
              </p>
            </div>
            <span :class="['px-2.5 py-1 text-xs font-medium rounded-full', getDifficultyColor(room.difficulty)]">
              {{ room.difficulty }}
            </span>
          </div>
          
          <div class="bg-gray-50 rounded-xl p-3 mb-3">
            <p class="text-sm text-gray-700 flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              任務：{{ room.quest }}
            </p>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span class="font-medium">{{ room.members }}/{{ room.maxMembers }}</span>
            </div>
            <button 
              @click="joinRoom(room)"
              :disabled="room.members >= room.maxMembers"
              :class="[
                'px-5 py-2 rounded-lg font-medium transition-all',
                room.members >= room.maxMembers
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#06C755] text-white hover:bg-[#05b04b] shadow-sm hover:shadow'
              ]"
            >
              {{ room.members >= room.maxMembers ? '已滿' : '加入' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div v-if="!currentTeam" class="space-y-3 pt-2">
        <!-- Create Room Button -->
        <button
          @click="showCreateRoom = true"
          class="w-full py-4 bg-[#06C755] hover:bg-[#05b04b] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#06C755]/20 hover:shadow-xl flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          創建房間
        </button>

        <!-- Share to LINE -->
        <button
          @click="shareToLine"
          class="w-full py-4 bg-white border-2 border-[#06C755] text-[#06C755] font-bold rounded-xl hover:bg-[#06C755]/5 transition-all flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          邀請 LINE 好友
        </button>

        <!-- Solo Option -->
        <button
          @click="startQuest"
          class="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
        >
          單獨開始任務
        </button>
      </div>

      <!-- Already in Team - Alternative Actions -->
      <div v-else class="space-y-3 pt-2">
        <button
          @click="shareToLine"
          class="w-full py-3 bg-white border-2 border-[#06C755] text-[#06C755] font-bold rounded-xl hover:bg-[#06C755]/5 transition-all flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          邀請更多好友加入
        </button>
      </div>
    </div>

    <!-- Create Room Modal -->
    <div v-if="showCreateRoom" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4" @click="showCreateRoom = false">
      <div class="bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-md shadow-2xl" @click.stop>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900">創建房間</h2>
          <button @click="showCreateRoom = false" class="p-2 hover:bg-gray-100 rounded-lg">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <!-- Room Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">房間名稱</label>
            <input 
              v-model="roomName"
              type="text" 
              placeholder="輸入房間名稱..." 
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06C755] focus:border-transparent"
            />
          </div>

          <!-- Max Members -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              最多成員：{{ maxMembers }} 人
            </label>
            <input 
              v-model="maxMembers"
              type="range" 
              min="2" 
              max="6" 
              class="w-full"
            />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>2人</span>
              <span>6人</span>
            </div>
          </div>

          <!-- Public/Private -->
          <div class="bg-gray-50 rounded-xl p-4">
            <label class="flex items-center justify-between cursor-pointer">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-[#06C755]/10 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">公開房間</p>
                  <p class="text-xs text-gray-500">讓其他玩家能搜尋並加入</p>
                </div>
              </div>
              <input 
                v-model="isPublic"
                type="checkbox" 
                class="w-5 h-5 rounded text-[#06C755] focus:ring-[#06C755]"
              />
            </label>
          </div>

          <!-- Create Button -->
          <button
            @click="createRoom"
            class="w-full py-4 bg-[#06C755] hover:bg-[#05b04b] text-white font-bold rounded-xl transition-colors mt-6"
          >
            創建房間
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
