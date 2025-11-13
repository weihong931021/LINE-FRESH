"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"

export default function MapPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  const quests = [
    {
      id: 1,
      title: "花園裡的幸運符號",
      lat: 25.035,
      lng: 121.567,
      distance: "420m",
      image: "/images/line-sally.png",
    },
    {
      id: 2,
      title: "古蹟尋寶記",
      lat: 25.031,
      lng: 121.563,
      distance: "850m",
      image: "/images/line-brown.png",
    },
    {
      id: 3,
      title: "夜市美食獵人",
      lat: 25.037,
      lng: 121.57,
      distance: "1.2km",
      image: "/images/line-moon.png",
    },
  ]

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          // Default to Taipei
          setUserLocation({ lat: 25.033, lng: 121.565 })
        },
      )
    } else {
      setUserLocation({ lat: 25.033, lng: 121.565 })
    }
  }, [])

  useEffect(() => {
    if (!userLocation || mapLoaded) return

    const loadLeaflet = async () => {
      // Load Leaflet CSS
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(link)

      // Load Leaflet JS
      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.async = true
      script.onload = () => {
        initMap()
      }
      document.body.appendChild(script)
    }

    const initMap = () => {
      if (!mapRef.current || mapInstanceRef.current) return

      // @ts-ignore
      const L = window.L
      if (!L) return

      // Initialize map
      const map = L.map(mapRef.current, {
        center: [userLocation.lat, userLocation.lng],
        zoom: 15,
        zoomControl: false,
      })

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      // Add user location marker
      const userIcon = L.divIcon({
        className: "custom-user-marker",
        html: `
          <div class="relative">
            <div class="w-12 h-12 bg-[#06C755] rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="absolute top-0 left-0 w-12 h-12 bg-[#06C755] rounded-full animate-ping opacity-30"></div>
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      })

      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(map)

      // Add quest markers
      quests.forEach((quest) => {
        const questIcon = L.divIcon({
          className: "custom-quest-marker",
          html: `
            <a href="/quest/${quest.id}" class="block">
              <div class="relative group">
                <div class="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-[#06C755] transition-transform hover:scale-110">
                  <img src="${quest.image}" alt="${quest.title}" class="w-16 h-16 object-contain" />
                </div>
                <div class="absolute -top-1 -right-1 w-7 h-7 bg-[#06C755] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  ★
                </div>
                <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-4 py-2 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p class="text-xs font-bold text-gray-900">${quest.title}</p>
                  <p class="text-xs text-gray-500 text-center">${quest.distance}</p>
                </div>
              </div>
            </a>
          `,
          iconSize: [80, 80],
          iconAnchor: [40, 40],
        })

        L.marker([quest.lat, quest.lng], { icon: questIcon }).addTo(map)
      })

      // Add zoom controls to top right
      L.control
        .zoom({
          position: "topright",
        })
        .addTo(map)

      mapInstanceRef.current = map
      setMapLoaded(true)
    }

    loadLeaflet()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [userLocation, mapLoaded])

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-[1000]">
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">任務地圖</h1>
        </div>
      </header>

      <div className="relative h-[calc(100vh-140px)]">
        {!userLocation ? (
          <div className="h-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#06C755] rounded-full mb-4 animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">正在獲取您的位置...</p>
            </div>
          </div>
        ) : (
          <>
            <div ref={mapRef} className="w-full h-full" />

            <div className="absolute bottom-4 left-3 right-3 bg-white rounded-2xl shadow-xl p-5 z-[1000]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#06C755] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-base">附近有 {quests.length} 個任務</p>
                  <p className="text-sm text-gray-500">最近的任務距離 {quests[0].distance}</p>
                </div>
              </div>
            </div>
          </>
        )}
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
          <Link href="/map" className="flex flex-col items-center gap-1 text-[#06C755]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <span className="text-xs font-medium">地圖</span>
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
