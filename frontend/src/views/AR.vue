<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const route = useRoute()
const router = useRouter()
const canvasRef = ref<HTMLCanvasElement>()
const isLoading = ref(true)
const showReveal = ref(false)
const questId = route.query.quest as string

// 志希館任務特殊處理
const isZhixiQuest = questId === 'q_105'
const showHint = ref(true)
const hintExpanded = ref(false)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let animationId: number

onMounted(() => {
  if (!canvasRef.value) return

  // 創建場景
  scene = new THREE.Scene()
  
  // 載入背景圖片
  const textureLoader = new THREE.TextureLoader()
  textureLoader.load('/305.jpg', (texture) => {
    // 設定背景圖片不要重複，並使用 cover 模式（類似 CSS background-size: cover）
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    
    // 計算圖片縮放以填滿畫面（保持比例，超出部分裁切）
    const imageAspect = texture.image.width / texture.image.height
    const screenAspect = canvasRef.value!.clientWidth / canvasRef.value!.clientHeight
    
    if (screenAspect > imageAspect) {
      // 螢幕比圖片寬，以寬度為準
      texture.repeat.set(1, imageAspect / screenAspect)
      texture.offset.set(0, (1 - imageAspect / screenAspect) / 2)
    } else {
      // 螢幕比圖片高，以高度為準
      texture.repeat.set(screenAspect / imageAspect, 1)
      texture.offset.set((1 - screenAspect / imageAspect) / 1, 0)
    }
    
    scene.background = texture
    console.log('✅ 背景圖片載入成功')
  }, undefined, (error) => {
    console.error('❌ 背景圖片載入失敗:', error)
    scene.background = new THREE.Color(0xf9fafb)
  })

  // 創建相機
  camera = new THREE.PerspectiveCamera(
    75,
    canvasRef.value.clientWidth / canvasRef.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(5, 4  , 5)
  camera.lookAt(0, 0, 0)

  // 創建渲染器
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: false
  })
  renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true

  // 添加燈光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(10, 10, 5)
  directionalLight.castShadow = true
  scene.add(directionalLight)

  const pointLight = new THREE.PointLight(0xffffff, 0.5)
  pointLight.position.set(-10, -10, -5)
  scene.add(pointLight)

  // 添加載入中的立方體
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({
    color: 0x06C755,
    wireframe: true
  })
  const loadingCube = new THREE.Mesh(geometry, material)
  scene.add(loadingCube)

  // 載入 GLB 模型
  const loader = new GLTFLoader()
  loader.load(
    '/Cube.glb',
    (gltf) => {
      // 移除載入中的立方體
      scene.remove(loadingCube)
      
      // 添加模型（往下移到畫面下方）
      gltf.scene.scale.set(2, 2, 2)
      gltf.scene.position.set(0, -2.5, 0)
      scene.add(gltf.scene)
      
      isLoading.value = false
      console.log('✅ GLB 模型載入成功', gltf.scene)
    },
    (progress) => {
      const percent = (progress.loaded / progress.total * 100).toFixed(2)
      console.log('載入中...', percent + '%')
    },
    (error) => {
      console.error('❌ GLB 模型載入失敗:', error)
      isLoading.value = false
    }
  )

  // 添加控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.minDistance = 2
  controls.maxDistance = 20
  controls.enablePan = true

  // 動畫循環
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  // 處理窗口大小變化
  const handleResize = () => {
    if (!canvasRef.value) return
    camera.aspect = canvasRef.value.clientWidth / canvasRef.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight)
  }
  window.addEventListener('resize', handleResize)

  // 清理函數
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    if (controls) {
      controls.dispose()
    }
    if (renderer) {
      renderer.dispose()
    }
  })
})

// 模擬找到物品（點擊 3D 模型後觸發）
const handleCollectItem = () => {
  if (isZhixiQuest) {
    showReveal.value = true
  }
}

const handleCompleteQuest = () => {
  router.push('/rewards')
}
</script>

<template>
  <main class="w-full h-full bg-white relative">
    <!-- Header -->
    <header class="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b">
      <div class="px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button @click="router.back()" class="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 class="text-lg font-bold text-gray-900">AR 展示</h1>
            <p class="text-xs text-gray-500">手勢操作查看 3D 模型</p>
          </div>
        </div>
        <div class="w-2 h-2 bg-[#06C755] rounded-full animate-pulse"></div>
      </div>
    </header>

    <!-- 謎題提示區域 (志希館任務專用) -->
    <div 
      v-if="isZhixiQuest && showHint" 
      class="absolute top-24 left-4 right-4 z-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 transition-all duration-300"
      :class="hintExpanded ? 'p-5' : 'p-4'"
    >
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-[#06C755] rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
            </svg>
          </div>
          <h3 class="font-bold text-gray-900 text-sm">謎題線索</h3>
        </div>
        <button @click="showHint = false" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 簡化版內容 -->
      <div v-if="!hintExpanded" class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-gray-700">
          <span>🔢</span>
          <span>第三層的起點</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-700">
          <span>⭕</span>
          <span>循環的開始</span>
        </div>
        <button 
          @click="hintExpanded = true"
          class="text-[#06C755] text-xs font-medium hover:underline flex items-center gap-1 mt-2"
        >
          <span>查看更多線索</span>
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <!-- 完整版內容 -->
      <div v-else class="space-y-3">
        <div class="space-y-2">
          <div class="flex items-center gap-3 text-sm text-gray-700 p-2 bg-gray-50 rounded-lg">
            <span class="text-lg">🔢</span>
            <span>第三層的起點</span>
          </div>
          <div class="flex items-center gap-3 text-sm text-gray-700 p-2 bg-gray-50 rounded-lg">
            <span class="text-lg">⭕</span>
            <span>循環的開始</span>
          </div>
          <div class="flex items-center gap-3 text-sm text-gray-700 p-2 bg-gray-50 rounded-lg">
            <span class="text-lg">📅</span>
            <span>一週的終結</span>
          </div>
          <div class="flex items-center gap-3 text-sm text-gray-700 p-2 bg-gray-50 rounded-lg">
            <span class="text-lg">🔄</span>
            <span>知識的迴圈</span>
          </div>
        </div>

        <button 
          @click="hintExpanded = false"
          class="text-gray-500 text-xs font-medium hover:text-gray-700 flex items-center gap-1 mt-2 mx-auto"
        >
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
          </svg>
          <span>收起</span>
        </button>
      </div>
    </div>

    <!-- 3D Canvas -->
    <canvas ref="canvasRef" class="w-full h-full"></canvas>

    <!-- 揭曉訊息 Modal (志希館任務) -->
    <div v-if="showReveal" class="absolute inset-0 bg-black/70 backdrop-blur-sm z-20 flex items-center justify-center p-6" @click="showReveal = false">
      <div class="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl" @click.stop>
        <div class="text-center mb-6">
          <div class="w-20 h-20 bg-[#06C755] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">任務完成</h2>
          <div class="h-1 w-20 bg-[#06C755] mx-auto rounded-full"></div>
        </div>

        <div class="bg-gradient-to-br from-[#06C755]/10 to-[#05b04b]/10 rounded-2xl p-5 mb-6 border border-[#06C755]/20">
          <p class="text-gray-700 leading-relaxed mb-4">
            謝謝你——<br>
            你找到我一直想傳遞的教室。
          </p>
          <p class="text-gray-600 text-sm">
            把這份資料帶走吧。<br>
            有一天，它會再被需要。
          </p>
        </div>

        <div class="bg-amber-50 rounded-2xl p-4 mb-6 border-2 border-amber-200">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-bold text-amber-900 text-sm">獲得任務物品</p>
              <p class="text-xs text-amber-700">《志希館回聲檔案》</p>
            </div>
          </div>
        </div>

        <button
          @click="handleCompleteQuest"
          class="w-full py-4 bg-[#06C755] hover:bg-[#05b04b] text-white font-bold rounded-xl transition-colors"
        >
          完成任務
        </button>
      </div>
    </div>

    <!-- Bottom Controls -->
    <div class="absolute bottom-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-t p-6">
      <div class="flex items-center justify-center gap-6 text-gray-600 text-sm mb-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
            />
          </svg>
          <span>拖曳旋轉</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
          <span>縮放</span>
        </div>
      </div>
      <button
        v-if="!isZhixiQuest"
        @click="router.push('/rewards')"
        class="w-full py-4 bg-[#06C755] hover:bg-[#05b04b] text-white font-bold rounded-xl transition-colors"
      >
        完成任務
      </button>
      <button
        v-else
        @click="handleCollectItem"
        class="w-full py-4 bg-[#06C755] hover:bg-[#05b04b] text-white font-bold rounded-xl transition-colors"
      >
        收集資料檔案
      </button>
    </div>
  </main>
</template>
