"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Achievement {
  id: string
  name: string
  desc: string
  category: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "limited"
  points: number
  progress: number
  threshold: number
  unlocked: boolean
  unlocked_on?: string | null
}

export default function RewardsPage() {
  const router = useRouter()
  const [achievements, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    const mockAchievements: Achievement[] = [
      {
        id: "ach001",
        name: "初探者",
        desc: "完成第一個任務",
        category: "explorer",
        rarity: "common",
        points: 10,
        progress: 1,
        threshold: 1,
        unlocked: true,
        unlocked_on: "2025-11-13",
      },
      {
        id: "ach002",
        name: "AR 小能手",
        desc: "成功掃描 3 次",
        category: "scanner",
        rarity: "uncommon",
        points: 20,
        progress: 1,
        threshold: 3,
        unlocked: false,
      },
      {
        id: "ach003",
        name: "三日連擊",
        desc: "連續完成 3 天任務",
        category: "streak",
        rarity: "rare",
        points: 50,
        progress: 1,
        threshold: 3,
        unlocked: false,
      },
      {
        id: "ach004",
        name: "街區漫遊",
        desc: "探訪 5 個不同地點",
        category: "explorer",
        rarity: "uncommon",
        points: 30,
        progress: 1,
        threshold: 5,
        unlocked: false,
      },
    ]
    setAchievements(mockAchievements)
  }, [])

  const rewards = [
    {
      id: 1,
      title: "花園裡的幸運符號",
      points: 5,
      completedAt: "2025-11-13",
      type: "completed",
    },
  ]

  const totalPoints = rewards.reduce((sum, r) => sum + r.points, 0)
  const unlockedAchievements = achievements.filter((a) => a.unlocked)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-600 border-gray-200"
      case "uncommon":
        return "bg-green-50 text-green-600 border-green-200"
      case "rare":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "epic":
        return "bg-purple-50 text-purple-600 border-purple-200"
      case "limited":
        return "bg-amber-50 text-amber-600 border-amber-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">我的獎勵</h1>
        </div>
      </header>

      {/* Success Banner */}
      <div className="px-4 py-8 bg-gradient-to-br from-[#06C755] to-[#05b04b] text-white">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">任務完成！</h2>
          <p className="text-white/90">恭喜你完成這次探索</p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* Points Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">LINE Points</h3>
            <span className="text-xs text-gray-500">稍後由官方發放</span>
          </div>
          <div className="text-center py-4">
            <p className="text-5xl font-bold text-[#06C755]">{totalPoints}</p>
            <p className="text-gray-600 mt-2">累積點數</p>
          </div>
        </div>

        {/* Completed Badges */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">完成徽章</h3>
          {rewards.map((reward) => (
            <div key={reward.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-[#06C755] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{reward.title}</p>
                <p className="text-sm text-gray-500">{reward.completedAt}</p>
              </div>
              <p className="text-[#06C755] font-bold">+{reward.points}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#06C755]/20">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#06C755] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">連續完成</h3>
                <p className="text-xs text-gray-500 mt-0.5">保持每日任務不中斷</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#06C755]">1</p>
              <p className="text-xs text-gray-500">天</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-sm text-gray-600 text-center">繼續保持，解鎖更多獎勵！🎉</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900">成就徽章</h3>
            <span className="text-xs text-gray-500">
              {unlockedAchievements.length}/{achievements.length}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {achievements.map((ach) => {
              const percentage = Math.min(100, Math.round((ach.progress / ach.threshold) * 100))
              return (
                <div
                  key={ach.id}
                  className={`relative rounded-xl border-2 p-4 transition-all ${
                    ach.unlocked
                      ? "bg-gradient-to-br from-[#06C755]/5 to-[#06C755]/10 border-[#06C755]/30"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {/* Rarity Badge */}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${getRarityColor(
                        ach.rarity,
                      )}`}
                    >
                      {ach.rarity.toUpperCase()}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="text-center mb-3">
                    <h4 className="font-bold text-sm text-gray-900 mb-1 mt-4">{ach.name}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2">{ach.desc}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          ach.unlocked ? "bg-[#06C755]" : "bg-gray-400"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        {ach.progress}/{ach.threshold}
                      </span>
                      {ach.unlocked && <span className="text-[#06C755] font-medium">✓ 已解鎖</span>}
                    </div>
                  </div>

                  {/* Points Badge */}
                  <div className="mt-3 text-center">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                      {ach.points} pts
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <button className="w-full py-3 text-sm text-[#06C755] font-medium hover:bg-[#06C755]/5 rounded-xl transition-colors">
            查看所有成就 →
          </button>
        </div>

        {/* Share Button */}
        <button className="w-full py-4 border-2 border-[#06C755] text-[#06C755] font-bold rounded-xl hover:bg-[#06C755]/5 transition-colors flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          分享到 LINE
        </button>

        {/* Back to Feed */}
        <button
          onClick={() => router.push("/feed")}
          className="w-full py-4 bg-[#06C755] hover:bg-[#05b04b] text-white font-bold rounded-xl transition-colors"
        >
          探索更多任務
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex items-center justify-around py-3">
          <Link href="/feed" className="flex flex-col items-center gap-1 text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs">首頁</span>
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
          <Link href="/rewards" className="flex flex-col items-center gap-1 text-[#06C755]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
            <span className="text-xs font-medium">獎勵</span>
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
