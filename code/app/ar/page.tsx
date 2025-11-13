"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera, useGLTF } from "@react-three/drei"
import { useRouter } from "next/navigation"

function CubeModel() {
  const { scene } = useGLTF(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cube%20%281%29-7PZIVGhA1wsjNGmgv6rdATwCTftGwK.glb",
  )

  return <primitive object={scene} scale={2} position={[0, 0, 0]} />
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#06C755" wireframe />
    </mesh>
  )
}

export default function ARPage() {
  const router = useRouter()

  return (
    <main className="w-full h-screen bg-white relative">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">AR 展示</h1>
              <p className="text-xs text-gray-500">手勢操作查看 3D 模型</p>
            </div>
          </div>
          <div className="w-2 h-2 bg-[#06C755] rounded-full animate-pulse"></div>
        </div>
      </header>

      {/* 3D Canvas */}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <Environment preset="studio" />
        <Suspense fallback={<LoadingFallback />}>
          <CubeModel />
        </Suspense>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={2} maxDistance={20} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#f9fafb" opacity={0.5} transparent />
        </mesh>
      </Canvas>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-t p-6">
        <div className="flex items-center justify-center gap-6 text-gray-600 text-sm mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
            <span>拖曳旋轉</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
            <span>縮放</span>
          </div>
        </div>
        <button
          onClick={() => router.push("/rewards")}
          className="w-full py-4 bg-[#06C755] hover:bg-[#05b04b] text-white font-bold rounded-xl transition-colors"
        >
          完成任務
        </button>
      </div>
    </main>
  )
}
