"use client"

import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

export default function QuestDetailPage() {
  const router = useRouter()
  const params = useParams()
  const questId = params.id

  const quest = {
    id: questId,
    title: "花園裡的幸運符號",
    distance: 420,
    eta: 15,
    location: "中央大學操場旁公園",
    aiStory:
      "今天陽光正好，微風輕拂。傳說在這座公園的綠色溜滑梯下，藏著一個幸運符號。許多人經過卻從未發現，但今天你將成為揭開秘密的人。",
    requirements: ["需要到達現場", "使用 AR 掃描綠色標記", "可單人完成"],
    milestones: ["前往地點", "AR 掃描", "上傳結果", "領取獎勵"],
    currentStep: 0,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adobe%20Express%20QR%20Code-9juzqpkAaU6m9xFC3lLuRyAQDTfBE7.png",
  }

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
          <h1 className="text-lg font-bold text-gray-900">任務詳情</h1>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-64 bg-gray-200">
        <img src={quest.image || "/placeholder.svg"} alt={quest.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-bold text-white mb-2">{quest.title}</h2>
          <div className="flex items-center gap-4 text-white/90 text-sm">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
              {quest.distance}m
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              步行 {quest.eta} 分鐘
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Location */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            任務地點
          </h3>
          <p className="text-gray-700 mb-3">{quest.location}</p>
          <Link
            href="/map"
            className="inline-flex items-center gap-2 text-[#06C755] text-sm font-medium hover:underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            在地圖上查看
          </Link>
        </div>

        {/* AI Story */}
        <div className="bg-gradient-to-br from-[#06C755]/10 to-[#05b04b]/10 rounded-2xl p-4 border border-[#06C755]/20">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            AI 任務劇情
          </h3>
          <p className="text-gray-700 leading-relaxed">{quest.aiStory}</p>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            任務條件
          </h3>
          <ul className="space-y-2">
            {quest.requirements.map((req, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <span className="w-1.5 h-1.5 bg-[#06C755] rounded-full"></span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            任務進度
          </h3>
          <div className="space-y-4">
            {quest.milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index === quest.currentStep
                      ? "bg-[#06C755] text-white"
                      : index < quest.currentStep
                        ? "bg-[#06C755]/20 text-[#06C755]"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {index < quest.currentStep ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span className={`${index === quest.currentStep ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                  {milestone}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => router.push(`/scan/${quest.id}`)}
          className="w-full py-4 bg-[#06C755] hover:bg-[#05b04b] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#06C755]/20"
        >
          前往 AR 掃描
        </button>
      </div>
    </main>
  )
}
