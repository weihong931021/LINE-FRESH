import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Quest {
  id: string
  title: string
  distance: number
  eta: number
  aiBlurb: string
  image: string
  difficulty: string
  type: string
  location?: string
  aiStory?: string
  requirements?: string[]
  milestones?: string[]
  currentStep?: number
  lat?: number
  lng?: number
}

export const useQuestStore = defineStore('quest', () => {
  const quests = ref<Quest[]>([
    {
      id: 'q_101',
      title: '中央大學圖書館',
      distance: 200,
      eta: 5,
      aiBlurb: '探索知識的殿堂，找尋隱藏在書海中的秘密！',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/line_sally-8w5mDnMJ0Z2xTgu7QJFXBU4rHTYXqO.png',
      difficulty: '簡單',
      type: '單人',
      location: '320桃園市中壢區中大路300號',
      aiStory: '中央大學圖書館不只是讀書的地方，這裡藏著許多有趣的角落。今天就來探索這座知識寶庫，完成你的尋寶之旅！',
      requirements: ['需要到達現場', '使用 AR 掃描標記', '可單人完成'],
      milestones: ['前往圖書館', 'AR 掃描', '上傳結果', '領取獎勵'],
      currentStep: 0,
      lat: 24.9675,
      lng: 121.1950,
    },
    {
      id: 'q_102',
      title: '中央大學操場',
      distance: 350,
      eta: 10,
      aiBlurb: '在綠茵場上尋找運動的熱情與隱藏的驚喜',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/line_brown-grjP2fY9actWaJZ1hhLKWMAty8vjwN.png',
      difficulty: '簡單',
      type: '單人',
      location: '中央大學田徑場',
      aiStory: '操場是揮灑汗水的地方，但今天你將在這裡發現不一樣的樂趣。完成運動挑戰，獲得專屬獎勵！',
      requirements: ['前往操場', '完成運動挑戰', 'AR 掃描打卡'],
      milestones: ['抵達操場', '運動挑戰', 'AR 掃描', '完成任務'],
      currentStep: 0,
      lat: 24.9685,
      lng: 121.1935,
    },
    {
      id: 'q_103',
      title: '中央大學餐廳',
      distance: 420,
      eta: 12,
      aiBlurb: '美食獵人出動！尋找校園裡的隱藏美味',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/line_moon-ZSVUejqYghQLvN3OoQWcubYM3JHthr.png',
      difficulty: '簡單',
      type: '單人',
      location: '中央大學學生餐廳',
      aiStory: '校園美食不只填飽肚子，今天你要找到傳說中的人氣餐點，完成美食打卡任務！',
      requirements: ['前往學生餐廳', '找到指定美食', '拍照打卡'],
      milestones: ['抵達餐廳', '尋找美食', '拍照上傳', '獲得獎勵'],
      currentStep: 0,
      lat: 24.9665,
      lng: 121.1945,
    },
    {
      id: 'q_104',
      title: '中央大學湖畔',
      distance: 550,
      eta: 15,
      aiBlurb: '漫步湖邊，發現大自然的美好與寧靜',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/line_sally-8w5mDnMJ0Z2xTgu7QJFXBU4rHTYXqO.png',
      difficulty: '中等',
      type: '單人',
      location: '中央大學依仁堂旁',
      aiStory: '校園湖畔是放鬆心情的好地方，在這裡你將完成一場與自然的對話，找到內心的平靜。',
      requirements: ['前往湖畔', '完成冥想任務', '拍攝美景'],
      milestones: ['抵達湖畔', '靜心冥想', '美景打卡', '任務完成'],
      currentStep: 0,
      lat: 24.9670,
      lng: 121.1960,
    },
    {
      id: 'q_105',
      title: '志希館探索',
      distance: 300,
      eta: 8,
      aiBlurb: '探訪歷史建築，了解中大的故事',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/line_brown-grjP2fY9actWaJZ1hhLKWMAty8vjwN.png',
      difficulty: '簡單',
      type: '單人',
      location: '中央大學志希館',
      aiStory: '志希館承載著中央大學的歷史記憶，今天就來探索這棟建築的故事，完成歷史尋寶任務。',
      requirements: ['前往志希館', 'AR 掃描歷史標記', '學習校史'],
      milestones: ['抵達志希館', '掃描標記', '閱讀故事', '完成學習'],
      currentStep: 0,
      lat: 24.9680,
      lng: 121.1940,
    },
  ])

  function getQuestById(id: string) {
    return quests.value.find(q => q.id === id)
  }

  return {
    quests,
    getQuestById,
  }
})
