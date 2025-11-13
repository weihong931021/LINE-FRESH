"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const mockQuests = [
  {
    id: "q_101",
    title: "花園裡的幸運符號",
    distance: 420,
    eta: 15,
    aiBlurb: "今天天氣超讚，去找那個綠色溜滑梯下的小貼紙！",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/line_sally-8w5mDnMJ0Z2xTgu7QJFXBU4rHTYXqO.png",
    difficulty: "簡單",
    type: "單人",
  },
  {
    id: "q_102",
    title: "古蹟尋寶記",
    distance: 850,
    eta: 25,
    aiBlurb: "歷史建築藏著秘密，跟著線索揭開謎底",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/line_brown-grjP2fY9actWaJZ1hhLKWMAty8vjwN.png",
    difficulty: "中等",
    type: "多人",
  },
  {
    id: "q_103",
    title: "夜市美食獵人",
    distance: 1200,
    eta: 35,
    aiBlurb: "尋找傳說中的隱藏美食，拍照打卡拿獎勵",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/line_moon-ZSVUejqYghQLvN3OoQWcubYM3JHthr.png",
    difficulty: "簡單",
    type: "單人",
  },
]

export default function FeedPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [distanceFilter, setDistanceFilter] = useState("2000")

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">任務</h1>
            <Link href="/profile">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="搜尋地點或任務"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-11 pr-4 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#06C755]"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto">
          <select
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(e.target.value)}
            className="px-4 py-2 bg-gray-100 rounded-full text-sm border-none focus:outline-none focus:ring-2 focus:ring-[#06C755]"
          >
            <option value="500">500m 內</option>
            <option value="1000">1km 內</option>
            <option value="2000">2km 內</option>
            <option value="5000">5km 內</option>
          </select>
          <button className="px-4 py-2 bg-gray-100 rounded-full text-sm whitespace-nowrap">全部難度</button>
          <button className="px-4 py-2 bg-gray-100 rounded-full text-sm whitespace-nowrap">單人/多人</button>
        </div>
      </header>

      {/* Stats Banner */}
      <div className="px-4 py-4 bg-gradient-to-r from-[#06C755] to-[#05b04b] text-white">
        <p className="text-sm opacity-90">今天附近有 {mockQuests.length} 個任務</p>
        <p className="text-lg font-bold mt-1">出門走走吧 ✨</p>
      </div>

      {/* Quest Cards */}
      <div className="px-4 py-4 space-y-4">
        {mockQuests.map((quest) => (
          <div key={quest.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {/* Quest Image */}
            <div className="relative h-40 bg-gray-200">
              <img src={quest.image || "/placeholder.svg"} alt={quest.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                {quest.distance}m
              </div>
            </div>

            {/* Quest Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">{quest.title}</h3>
                <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">{quest.difficulty}</span>
              </div>

              <p className="text-sm text-gray-600 mb-3 leading-relaxed">{quest.aiBlurb}</p>

              <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {quest.eta} 分鐘
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  {quest.type}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => router.push(`/quest/${quest.id}`)}
                  className="flex-1 py-3 bg-[#06C755] hover:bg-[#05b04b] text-white font-medium rounded-xl transition-colors"
                >
                  開始
                </button>
                <button
                  onClick={() => router.push(`/team/${quest.id}`)}
                  className="px-6 py-3 border-2 border-[#06C755] text-[#06C755] font-medium rounded-xl hover:bg-[#06C755]/5 transition-colors"
                >
                  揪隊
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex items-center justify-around py-3">
          <Link href="/feed" className="flex flex-col items-center gap-1 text-[#06C755]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs font-medium">首頁</span>
          </Link>
          <Link href="/map" className="flex flex-col items-center gap-1 text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <span className="text-xs">地圖</span>
          </Link>
          <Link href="/rewards" className="flex flex-col items-center gap-1 text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
            <span className="text-xs">獎勵</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs">我的</span>
          </Link>
        </div>
      </nav>
    </main>
  )
}
