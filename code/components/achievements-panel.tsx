"use client"

import { useEffect, useState } from "react"

// TypeScript interfaces
export type AchCond =
  | { type: "quests_completed"; threshold: number }
  | { type: "scan_success"; threshold: number }
  | { type: "team_completed"; threshold: number }
  | { type: "streak_days"; threshold: number }
  | { type: "poi_category"; match: string; threshold: number }
  | { type: "time_window"; start: string; end: string; threshold: number }
  | { type: "steps_day"; threshold: number }
  | { type: "event_tag"; match: string; threshold: number }
  | { type: "quest_duration_minutes"; threshold: number; operator?: "<=" | ">=" }

export interface Achievement {
  id: string
  name: string
  desc: string
  icon: string
  category: "explorer" | "scanner" | "streak" | "team" | "geo" | "time" | "fitness" | "event" | "secret"
  rarity: "common" | "uncommon" | "rare" | "epic" | "limited"
  points: number
  conditions: AchCond
  tiers: { t: number; reward: { points?: number } }[]
  visibility: "public" | "secret"
  active_window?: { start: string; end: string }
  tags?: string[]
}

export interface UserAchievementProgress {
  progress: number
  threshold: number
  unlocked: boolean
  unlocked_on?: string | null
}

export interface AchievementsBundle {
  schema_version: string
  generated_at: string
  campaign: string
  user: {
    id: string
    displayName: string
    school: string
    tz: string
    level: number
    xp: number
    points: number
    totalQuests: number
    totalScans: number
    streakBest: number
    currentStreak: number
  }
  achievements_catalog: Achievement[]
  user_achievements: Record<string, UserAchievementProgress>
  daily_steps: Record<string, number>
  activity_log: { id: string; ts: string; type: string; data: Record<string, any> }[]
}

export default function AchievementsPanel() {
  const [data, setData] = useState<AchievementsBundle | null>(null)

  useEffect(() => {
    fetch("/achievements_a87.json")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data) return <div className="p-8 text-center text-gray-500">載入中...</div>

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">成就與里程碑</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>Points {data.user.points}</span>
          <span>Quests {data.user.totalQuests}</span>
          <span>Best Streak {data.user.streakBest}d</span>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.achievements_catalog.map((a) => {
          const p = data.user_achievements[a.id]
          const pct = Math.min(100, Math.round((p.progress / p.threshold) * 100))
          return (
            <article key={a.id} className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xl">
                  {a.icon} {a.name}
                </div>
                <span className="text-xs uppercase text-gray-500">{a.rarity}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{a.desc}</p>
              <div className="h-2 bg-gray-100 rounded mb-2">
                <div className="h-full rounded bg-[#06C755]" style={{ width: `${pct}%` }} />
              </div>
              <div className="text-xs text-gray-500">
                進度 {p.progress}/{p.threshold} {p.unlocked ? "✅ 已解鎖" : ""}
              </div>
              {p.unlocked_on && (
                <div className="text-xs text-gray-400 mt-1">解鎖時間 {new Date(p.unlocked_on).toLocaleString()}</div>
              )}
            </article>
          )
        })}
      </section>
    </div>
  )
}
