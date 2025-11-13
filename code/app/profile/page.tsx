"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"

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

export default function ProfilePage() {
  const router = useRouter()
  const [showAchievements, setShowAchievements] = useState(false)

  const achievements: Achievement[] = [
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

  const handleLogout = () => {
    localStorage.removeItem("user_logged_in")
    router.push("/")
  }

  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#06C755] to-[#05b04b] text-white">
        <div className="px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">探險者</h1>
              <p className="text-white/80 text-sm">LINE 城市任務玩家</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-white/80">完成任務</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">4,321</p>
              <p className="text-sm text-white/80">今日步數</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-white/80">獲得點數</p>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Items */}
      <div className="px-4 py-6 space-y-3">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <Link href="/rewards" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#06C755]/10 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <span className="font-medium text-gray-900">我的獎勵</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/feed"
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-t"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#06C755]/10 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="font-medium text-gray-900">任務歷史</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <button
            onClick={() => setShowAchievements(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-t text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#06C755]/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <div>
                <span className="font-medium text-gray-900">成就徽章</span>
                <p className="text-xs text-gray-500">
                  {unlockedCount}/{achievements.length} 已解鎖
                </p>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">定位權限</p>
                <p className="text-xs text-gray-500">已開啟</p>
              </div>
            </div>
            <div className="w-12 h-7 bg-[#06C755] rounded-full relative">
              <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full"></div>
            </div>
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-t text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">相機權限</p>
                <p className="text-xs text-gray-500">已開啟</p>
              </div>
            </div>
            <div className="w-12 h-7 bg-[#06C755] rounded-full relative">
              <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full"></div>
            </div>
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-4 bg-white text-red-600 font-medium rounded-2xl shadow-sm hover:bg-red-50 transition-colors"
        >
          登出
        </button>
      </div>

      {showAchievements && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-3xl max-h-[85vh] overflow-hidden flex flex-col animate-slide-up">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">成就徽章</h2>
              <button
                onClick={() => setShowAchievements(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-4 text-center">
                <p className="text-sm text-gray-600">
                  已解鎖 <span className="font-bold text-[#06C755]">{unlockedCount}</span> / {achievements.length}{" "}
                  個成就
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {achievements.map((ach) => {
                  const percentage = Math.min(100, Math.round((ach.progress / ach.threshold) * 100))
                  return (
                    <div
                      key={ach.id}
                      className={`relative rounded-2xl border-2 p-5 transition-all ${
                        ach.unlocked
                          ? "bg-gradient-to-br from-[#06C755]/5 to-[#06C755]/10 border-[#06C755]/30"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                              ach.unlocked ? "bg-[#06C755]" : "bg-gray-300"
                            }`}
                          >
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">{ach.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{ach.desc}</p>
                            </div>
                            <span
                              className={`flex-shrink-0 text-[10px] px-2 py-1 rounded-full font-medium border ${getRarityColor(
                                ach.rarity,
                              )}`}
                            >
                              {ach.rarity.toUpperCase()}
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-2 mt-3">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
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
                              {ach.unlocked ? (
                                <span className="text-[#06C755] font-medium flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  已解鎖
                                </span>
                              ) : (
                                <span className="text-amber-600 font-medium flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                  </svg>
                                  {ach.points} pts
                                </span>
                              )}
                            </div>
                          </div>

                          {ach.unlocked_on && <p className="text-xs text-gray-400 mt-2">解鎖於 {ach.unlocked_on}</p>}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

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
          <Link href="/profile" className="flex flex-col items-center gap-1 text-[#06C755]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs font-medium">我的</span>
          </Link>
        </div>
      </nav>
    </main>
  )
}
