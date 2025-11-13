<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const router = useRouter()
const canvasRef = ref<HTMLCanvasElement>()
const isLoading = ref(true)

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
  textureLoader.load('/park.jpg', (texture) => {
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
      texture.offset.set((1 - screenAspect / imageAspect) / 2, 0)
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
  camera.position.set(5, 5, 5)
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
      
      // 添加模型
      gltf.scene.scale.set(2, 2, 2)
      gltf.scene.position.set(0, 0, 0)
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
</script>

<template>
  <main class="w-full h-screen bg-white relative">
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

    <!-- 3D Canvas -->
    <canvas ref="canvasRef" class="w-full h-full"></canvas>

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
        @click="router.push('/rewards')"
        class="w-full py-4 bg-[#06C755] hover:bg-[#05b04b] text-white font-bold rounded-xl transition-colors"
      >
        完成任務
      </button>
    </div>
  </main>
</template>
