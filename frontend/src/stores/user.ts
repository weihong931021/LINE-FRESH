import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Achievement {
  id: string
  name: string
  desc: string
  category: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'limited'
  points: number
  progress: number
  threshold: number
  unlocked: boolean
  unlocked_on?: string | null
}

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const userName = ref('探險者')
  const completedQuests = ref(1)
  const steps = ref(4321)
  const totalPoints = ref(5)
  
  const achievements = ref<Achievement[]>([
    {
      id: 'ach001',
      name: '初探者',
      desc: '完成第一個任務',
      category: 'explorer',
      rarity: 'common',
      points: 10,
      progress: 1,
      threshold: 1,
      unlocked: true,
      unlocked_on: '2025-11-13',
    },
    {
      id: 'ach002',
      name: 'AR 小能手',
      desc: '成功掃描 3 次',
      category: 'scanner',
      rarity: 'uncommon',
      points: 20,
      progress: 1,
      threshold: 3,
      unlocked: false,
    },
    {
      id: 'ach003',
      name: '三日連擊',
      desc: '連續完成 3 天任務',
      category: 'streak',
      rarity: 'rare',
      points: 50,
      progress: 1,
      threshold: 3,
      unlocked: false,
    },
    {
      id: 'ach004',
      name: '街區漫遊',
      desc: '探訪 5 個不同地點',
      category: 'explorer',
      rarity: 'uncommon',
      points: 30,
      progress: 1,
      threshold: 5,
      unlocked: false,
    },
  ])

  const unlockedAchievements = computed(() => 
    achievements.value.filter(a => a.unlocked)
  )

  function login() {
    isLoggedIn.value = true
    localStorage.setItem('user_logged_in', 'true')
  }

  function logout() {
    isLoggedIn.value = false
    localStorage.removeItem('user_logged_in')
  }

  function checkLoginStatus() {
    isLoggedIn.value = localStorage.getItem('user_logged_in') === 'true'
  }

  return {
    isLoggedIn,
    userName,
    completedQuests,
    steps,
    totalPoints,
    achievements,
    unlockedAchievements,
    login,
    logout,
    checkLoginStatus,
  }
})
