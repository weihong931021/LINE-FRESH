<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestStore } from '@/stores/quest'
import BottomNav from '@/components/BottomNav.vue'

const router = useRouter()
const questStore = useQuestStore()
const userLocation = ref<{ lat: number; lng: number } | null>(null)
const mapContainer = ref<HTMLDivElement>()
let mapInstance: any = null

onMounted(async () => {
  // 先設定預設位置（台北市政府）
  userLocation.value = { lat: 25.0374865, lng: 121.5647688 }
  
  // 等待 DOM 更新
  await nextTick()
  
  // 嘗試獲取用戶位置
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        // 如果地圖已創建，更新中心點
        if (mapInstance) {
          mapInstance.setCenter(userLocation.value)
        } else {
          initMap()
        }
      },
      (error) => {
        console.log('無法獲取位置，使用預設位置', error)
        initMap()
      }
    )
  } else {
    initMap()
  }
  
  // 無論如何，500ms 後嘗試初始化地圖
  setTimeout(() => {
    if (!mapInstance && userLocation.value) {
      initMap()
    }
  }, 500)
})

const initMap = () => {
  console.log('=== initMap 被呼叫 ===')
  console.log('mapContainer.value:', mapContainer.value)
  console.log('userLocation.value:', userLocation.value)
  console.log('mapInstance:', mapInstance)
  console.log('window.google:', (window as any).google)
  
  if (!mapContainer.value || !userLocation.value) {
    console.log('❌ 地圖容器或位置未準備好', { 
      hasContainer: !!mapContainer.value, 
      hasLocation: !!userLocation.value 
    })
    return
  }

  // 檢查 Google Maps 是否已載入
  if (!(window as any).google || !(window as any).google.maps) {
    console.log('⏳ Google Maps 尚未載入，1秒後重試...')
    setTimeout(initMap, 1000)
    return
  }

  if (mapInstance) {
    console.log('⚠️ 地圖已經初始化')
    return
  }

  try {
    const google = (window as any).google
    console.log('✅ Google Maps API 已載入')
    console.log('🗺️ 開始創建地圖...', userLocation.value)

    // 建立地圖
    const map = new google.maps.Map(mapContainer.value, {
      center: userLocation.value,
      zoom: 15,
      mapTypeId: 'roadmap',
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    })

    console.log('✅ 地圖創建成功！')

    // 用戶位置標記
    const userMarker = new google.maps.Marker({
      position: userLocation.value,
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#06C755',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3,
      },
      title: '您的位置',
    })

    console.log('✅ 用戶標記創建成功')

    // 任務標記
    let markerCount = 0
    questStore.quests.forEach((quest, index) => {
      if (quest.lat && quest.lng) {
        const marker = new google.maps.Marker({
          position: { lat: quest.lat, lng: quest.lng },
          map: map,
          title: quest.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#FF5722',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        })

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              padding: 12px 16px 16px 16px;
              min-width: 240px;
            ">
              <div style="
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                margin-bottom: 8px;
              ">
                <h3 style="
                  font-size: 16px;
                  font-weight: bold;
                  color: #111827;
                  margin: 0;
                  flex: 1;
                  padding-right: 8px;
                ">${quest.title}</h3>
              </div>
              <p style="
                font-size: 14px;
                color: #6B7280;
                margin: 0 0 8px 0;
                line-height: 1.5;
              ">${quest.aiBlurb}</p>
              <div style="
                display: flex;
                align-items: center;
                gap: 12px;
                margin-top: 12px;
                padding-top: 12px;
                border-top: 1px solid #E5E7EB;
              ">
                <div style="
                  display: flex;
                  align-items: center;
                  gap: 4px;
                  color: #06C755;
                  font-size: 13px;
                  font-weight: 500;
                ">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  ${quest.distance}m
                </div>
                <div style="
                  display: flex;
                  align-items: center;
                  gap: 4px;
                  color: #6B7280;
                  font-size: 13px;
                ">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  ${quest.eta} 分鐘
                </div>
              </div>
              <div style="
                margin-top: 12px;
                padding: 8px 12px;
                background: #F3F4F6;
                border-radius: 8px;
                font-size: 12px;
                color: #4B5563;
              ">
                難度：${quest.difficulty} | 類型：${quest.type}
              </div>
              <button 
                onclick="window.navigateToScan('${quest.id}')"
                style="
                  width: 100%;
                  margin-top: 16px;
                  padding: 12px 16px;
                  background: #06C755;
                  color: white;
                  border: none;
                  border-radius: 8px;
                  font-size: 15px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.2s;
                "
                onmouseover="this.style.background='#05b04b'"
                onmouseout="this.style.background='#06C755'"
              >
                開始掃描任務
              </button>
            </div>
          `,
        })

        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })
        
        markerCount++
      }
    })

    console.log(`✅ 任務標記創建成功，共 ${markerCount} 個`)
    console.log('🎉 地圖初始化完成！')

    mapInstance = map
  } catch (error) {
    console.error('❌ 創建地圖時發生錯誤:', error)
  }
}

// 全域導航函數，供 InfoWindow 的按鈕使用
;(window as any).navigateToScan = (questId: string) => {
  router.push(`/scan/${questId}`)
}

// 回到用戶位置
const recenterMap = () => {
  if (mapInstance && userLocation.value) {
    mapInstance.setCenter(userLocation.value)
    mapInstance.setZoom(15)
  }
}

onUnmounted(() => {
  mapInstance = null
})
</script>

<template>
  <main class="min-h-screen bg-gray-50 pb-20">
    <header class="bg-white border-b sticky top-0 z-[1000]">
      <div class="px-4 py-4 flex items-center justify-between">
        <h1 class="text-lg font-bold text-gray-900">任務地圖</h1>
      </div>
    </header>

    <div class="relative h-[calc(100vh-140px)]">
      <div v-if="!userLocation" class="h-full flex items-center justify-center bg-gray-100">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-[#06C755] rounded-full mb-4 animate-pulse">
            <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
          </div>
          <p class="text-gray-600 font-medium">正在獲取您的位置...</p>
        </div>
      </div>

      <div v-else>
        <div ref="mapContainer" class="w-full h-full" style="min-height: calc(100vh - 140px); background: #e5e7eb;"></div>

        <!-- 回到我的位置按鈕 -->
        <button 
          @click="recenterMap"
          class="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-[1000]"
          title="回到我的位置"
        >
          <svg class="w-6 h-6 text-[#06C755]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <div class="absolute bottom-4 left-3 right-3 bg-white rounded-2xl shadow-xl p-5 z-[1000]">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-[#06C755] rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-bold text-gray-900 text-base">附近有 {{ questStore.quests.length }} 個任務</p>
              <p class="text-sm text-gray-500">最近的任務距離 {{ questStore.quests[0]?.distance }}m</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BottomNav />
  </main>
</template>
