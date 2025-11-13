"use client"

import { useRouter, useParams } from "next/navigation"

export default function TeamPage() {
  const router = useRouter()
  const params = useParams()

  const nearbyPlayers = [
    { id: 1, name: "小明", distance: 120, avatar: "👤" },
    { id: 2, name: "小華", distance: 250, avatar: "👤" },
    { id: 3, name: "小美", distance: 380, avatar: "👤" },
  ]

  return (
    <main className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">組隊大廳</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Info Banner */}
        <div className="bg-gradient-to-br from-[#06C755]/10 to-[#05b04b]/10 border border-[#06C755]/20 rounded-2xl p-4">
          <p className="text-sm text-gray-700">
            <span className="font-medium">提示：</span>
            找到附近的玩家一起完成任務，獲得更多獎勵！
          </p>
        </div>

        {/* Nearby Players */}
        <div>
          <h2 className="font-bold text-gray-900 mb-4">附近玩家</h2>
          <div className="space-y-3">
            {nearbyPlayers.map((player) => (
              <div key={player.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                    {player.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{player.name}</p>
                    <p className="text-sm text-gray-500">{player.distance}m 外</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#06C755] text-white font-medium rounded-lg hover:bg-[#05b04b] transition-colors">
                  邀請
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Create Team */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-3">創建隊伍</h3>
          <p className="text-sm text-gray-600 mb-4">開啟公開房間讓其他玩家加入</p>
          <button className="w-full py-3 border-2 border-[#06C755] text-[#06C755] font-medium rounded-xl hover:bg-[#06C755]/5 transition-colors">
            開啟公開房間
          </button>
        </div>

        {/* Invite via LINE */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-3">邀請好友</h3>
          <p className="text-sm text-gray-600 mb-4">分享連結到 LINE 邀請朋友一起玩</p>
          <button className="w-full py-3 bg-[#06C755] hover:bg-[#05b04b] text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
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
        </div>

        {/* Solo Option */}
        <button
          onClick={() => router.push(`/quest/${params.id}`)}
          className="w-full py-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
        >
          單獨開始任務
        </button>
      </div>
    </main>
  )
}
