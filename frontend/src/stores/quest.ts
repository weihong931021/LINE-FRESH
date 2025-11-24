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
      requirements: ['需要到達現場', '使用 AR 查看標記', '可單人完成'],
      milestones: ['前往圖書館', 'AR 查看', '上傳結果', '領取獎勵'],
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
      requirements: ['前往操場', '完成運動挑戰', 'AR 打卡'],
      milestones: ['抵達操場', '運動挑戰', 'AR 查看', '完成任務'],
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
      title: '志希館・知識迴響',
      distance: 300,
      eta: 8,
      aiBlurb: '一份未送出的研究資料遺落在志希館的某間教室……',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/line_brown-grjP2fY9actWaJZ1hhLKWMAty8vjwN.png',
      difficulty: '中等',
      type: '單人',
      location: '中央大學志希館',
      aiStory: `嘿——如果你看到這段訊息，代表你也是能聽到「那個房間」的人……

一份未送出的研究資料遺落在志希館的某間教室，它的門牌編號三個數字會對應某種『規律』。

找到它 —— 送達它 —— 完成我未盡的任務。

【謎題提示】
🔢 第三層的起點
⭕ 循環的開始  
📅 一週的終結
🔄 知識的迴圈`,
      requirements: [
        '前往志希館 1 公里範圍內',
        '解開門牌號碼謎題',
        '使用 AR 查看門牌'
      ],
      milestones: ['接收訊號', '解謎尋找', 'AR 掃描', '獲得檔案'],
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
