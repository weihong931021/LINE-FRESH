"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"

export default function ScanPage() {
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              router.push(`/ar?quest=${params.id}`)
            }, 500)
            return 100
          }
          return prev + 2
        })
      }, 50)

      return () => clearInterval(interval)
    }
  }, [scanning, router, params.id])

  const handleStartScan = () => {
    setScanning(true)
    setProgress(0)
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">AR 掃描</h1>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6">
          {/* Instruction */}
          {!scanning && (
            <div className="text-center space-y-2 mb-6">
              <div className="inline-block p-4 bg-[#06C755]/10 rounded-2xl mb-3">
                <svg className="w-12 h-12 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h-4.01M8 8h.01M16 8h.01M8 16h.01M16 16h.01"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">對準目標掃描</h2>
              <p className="text-gray-600">把鏡頭對準黑色框框內的標記，保持穩定</p>
            </div>
          )}

          {/* QR Code Display */}
          <div className="relative bg-gray-50 p-6 rounded-3xl border-2 border-gray-200">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adobe%20Express%20QR%20Code-9juzqpkAaU6m9xFC3lLuRyAQDTfBE7.png"
              alt="Scan Target"
              className="w-full h-auto rounded-xl"
            />

            {/* Scanning Overlay */}
            {scanning && (
              <>
                {/* Scanning Frame */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div
                    className="relative w-full aspect-square border-4 border-black rounded-2xl"
                    style={{
                      animation: "scanZoom 2s ease-in-out infinite",
                    }}
                  >
                    {/* Corner Decorations */}
                    <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-black rounded-tl-lg"></div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-black rounded-tr-lg"></div>
                    <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-black rounded-bl-lg"></div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-black rounded-br-lg"></div>

                    {/* Scan Line */}
                    <div
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-black to-transparent"
                      style={{
                        animation: "scanLine 2s ease-in-out infinite",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Progress Circle */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                  <div className="relative w-20 h-20 bg-white rounded-full shadow-lg">
                    <svg className="w-20 h-20 -rotate-90">
                      <circle cx="40" cy="40" r="32" stroke="#E5E7EB" strokeWidth="4" fill="none" />
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="#06C755"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 32}`}
                        strokeDashoffset={`${2 * Math.PI * 32 * (1 - progress / 100)}`}
                        className="transition-all duration-300"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-900">{progress}%</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Status Message */}
          {scanning ? (
            <div className="text-center">
              <p className="text-[#06C755] font-medium">掃描中請勿移動</p>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                <span className="font-medium">提示：</span>
                對準黑色框框區域，確保畫面清晰穩定
              </p>
            </div>
          )}

          {/* Action Button */}
          {!scanning && (
            <button
              onClick={handleStartScan}
              className="w-full py-4 bg-[#06C755] hover:bg-[#05b04b] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#06C755]/20"
            >
              開始掃描
            </button>
          )}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes scanZoom {
          0%,
          100% {
            transform: scale(0.95);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }

        @keyframes scanLine {
          0% {
            top: 0%;
          }
          50% {
            top: 100%;
          }
          100% {
            top: 0%;
          }
        }
      `}</style>
    </main>
  )
}
