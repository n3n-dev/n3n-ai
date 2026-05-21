import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Grid, Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import type { Translations } from '../i18n/translations'

interface Props {
  tr: Translations
  h1Override?: string
  subheadOverride?: string
}

// World-space offset — tower pushed to the right so left side is clean for text
const CENTER_X = 2.6
const TOWER_SCALE = 0.72

function CentralTower() {
  const sphereRef = useRef<THREE.Mesh>(null!)
  const stripesRef = useRef<THREE.Group>(null!)
  const orbitsRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (sphereRef.current) sphereRef.current.rotation.y += delta * 0.22
    if (stripesRef.current) stripesRef.current.rotation.y += delta * 0.22
    if (orbitsRef.current) orbitsRef.current.rotation.y += delta * 0.12
  })

  const R = 1.3
  const stripeYs = useMemo(() => [-0.9, -0.55, -0.2, 0.15, 0.5, 0.85], [])

  return (
    <group position={[CENTER_X, 0.2, 0]} scale={TOWER_SCALE}>
      {/* Pedestal */}
      <mesh position={[0, -1.4, 0]} receiveShadow>
        <cylinderGeometry args={[1.05, 1.15, 0.12, 48]} />
        <meshStandardMaterial color="#1e2f52" metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[0, -1.28, 0]}>
        <cylinderGeometry args={[0.85, 0.9, 0.08, 48]} />
        <meshStandardMaterial
          color="#2b4476"
          metalness={0.6}
          roughness={0.25}
          emissive="#4d8aff"
          emissiveIntensity={0.55}
        />
      </mesh>

      {/* Core emissive glass sphere */}
      <mesh ref={sphereRef} castShadow>
        <sphereGeometry args={[R, 64, 64]} />
        <meshPhysicalMaterial
          color="#9cc3ff"
          emissive="#4d8aff"
          emissiveIntensity={1.1}
          transmission={0.55}
          thickness={0.8}
          roughness={0.18}
          metalness={0.05}
          clearcoat={0.9}
          clearcoatRoughness={0.15}
        />
      </mesh>

      {/* Horizontal stripe rings on sphere surface */}
      <group ref={stripesRef}>
        {stripeYs.map((y, i) => {
          const r = Math.sqrt(Math.max(R * R - y * y, 0)) + 0.01
          return (
            <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[r, 0.025, 10, 96]} />
              <meshBasicMaterial
                color="#7fb3ff"
                transparent
                opacity={0.95}
                toneMapped={false}
              />
            </mesh>
          )
        })}
      </group>

      {/* Tilted orbital rings */}
      <group ref={orbitsRef}>
        <mesh rotation={[Math.PI / 2.3, 0, Math.PI / 10]}>
          <torusGeometry args={[R + 0.45, 0.018, 10, 128]} />
          <meshBasicMaterial color="#93c5fd" transparent opacity={0.85} toneMapped={false} />
        </mesh>
        <mesh rotation={[Math.PI / 2.8, Math.PI / 4, -Math.PI / 12]}>
          <torusGeometry args={[R + 0.62, 0.014, 10, 128]} />
          <meshBasicMaterial color="#bfdbfe" transparent opacity={0.7} toneMapped={false} />
        </mesh>
      </group>

      {/* Inner point light */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2.2}
        distance={4.5}
        color="#88b6ff"
      />
    </group>
  )
}

interface PanelProps {
  angle: number
  delay: number
  duration: number
  yOffset: number
  scale: number
}

function ConvergingPanel({ angle, delay, duration, yOffset, scale }: PanelProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const glassRef = useRef<THREE.MeshPhysicalMaterial>(null!)
  const frameRef = useRef<THREE.LineBasicMaterial>(null!)

  const START_DIST = 5.4 * TOWER_SCALE + 3
  const END_DIST = 1.3 * TOWER_SCALE

  useFrame(({ clock }) => {
    const raw = (clock.elapsedTime + delay) / duration
    const t = raw - Math.floor(raw)

    const holdOut = 0.08
    const travel = 0.85
    let dist: number
    let visibility: number
    if (t < holdOut) {
      dist = START_DIST
      visibility = t / holdOut
    } else if (t < holdOut + travel) {
      const tt = (t - holdOut) / travel
      const ee = tt * tt
      dist = START_DIST - (START_DIST - END_DIST) * ee
      visibility = 1
    } else {
      dist = END_DIST
      const tt = (t - holdOut - travel) / (1 - holdOut - travel)
      visibility = 1 - tt
    }

    const x = CENTER_X + Math.cos(angle) * dist
    const z = Math.sin(angle) * dist
    const approachRatio = 1 - (dist - END_DIST) / (START_DIST - END_DIST)
    const y = yOffset * approachRatio * 0.35

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z)
      const s = scale * (0.7 + approachRatio * 0.45) * visibility
      groupRef.current.scale.setScalar(Math.max(s, 0.0001))
      groupRef.current.lookAt(CENTER_X, y, 0)
      groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 2 + delay) * 0.05
    }

    if (glassRef.current) {
      glassRef.current.opacity = 0.75 * visibility
      glassRef.current.emissiveIntensity = 1.1 * visibility
    }
    if (frameRef.current) {
      frameRef.current.opacity = visibility
    }
  })

  const W = 0.9
  const H = 0.55
  const framePoints = useMemo(() => {
    const hw = W / 2
    const hh = H / 2
    return new Float32Array([
      -hw, -hh, 0,  hw, -hh, 0,
       hw, -hh, 0,  hw,  hh, 0,
       hw,  hh, 0, -hw,  hh, 0,
      -hw,  hh, 0, -hw, -hh, 0,
    ])
  }, [])

  return (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[W, H]} />
        <meshPhysicalMaterial
          ref={glassRef}
          color="#8ebcff"
          emissive="#4d8aff"
          emissiveIntensity={1.1}
          transparent
          opacity={0.75}
          side={THREE.DoubleSide}
          roughness={0.1}
          metalness={0.1}
          transmission={0.3}
          thickness={0.2}
        />
      </mesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[framePoints, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={frameRef}
          color="#7fb3ff"
          transparent
          opacity={1}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  )
}

function Scene() {
  const panels = useMemo<PanelProps[]>(() => {
    const count = 10
    const list: PanelProps[] = []
    for (let i = 0; i < count; i++) {
      const base = (i / count) * Math.PI * 2
      list.push({
        angle: base + (Math.random() - 0.5) * 0.35,
        delay: i * 0.42,
        duration: 4.2 + Math.random() * 1.2,
        yOffset: (Math.random() - 0.5) * 2.2,
        scale: 0.8 + Math.random() * 0.5,
      })
    }
    return list
  }, [])

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} castShadow />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#4d8aff" />

      {/* Floor grid — brighter against dark bg */}
      <Grid
        position={[0, -1.46, 0]}
        args={[40, 40]}
        cellSize={0.6}
        cellThickness={0.55}
        cellColor="#2f4e88"
        sectionSize={2.4}
        sectionThickness={1}
        sectionColor="#4d8aff"
        fadeDistance={18}
        fadeStrength={1.3}
        followCamera={false}
        infiniteGrid
      />

      <Float speed={1.2} rotationIntensity={0} floatIntensity={0.25}>
        <CentralTower />
      </Float>

      {panels.map((p, i) => (
        <ConvergingPanel key={i} {...p} />
      ))}

      <Environment preset="night" />
    </>
  )
}

export default function Hero0({ tr, h1Override, subheadOverride }: Props) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#050914] via-[#0a1428] to-[#0c1a36]">
      {/* Ambient blue glow anchored near the tower */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: '-8%',
          top: '10%',
          width: '70%',
          height: '85%',
          background:
            'radial-gradient(ellipse at 58% 45%, rgba(77,138,255,0.22) 0%, rgba(77,138,255,0.08) 35%, transparent 65%)',
          filter: 'blur(20px)',
        }}
      />

      {/* 3D scene */}
      <div className="absolute inset-0">
        <Canvas
          shadows
          camera={{ position: [0, 1.8, 5.8], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Scene />
            <EffectComposer>
              <Bloom
                intensity={1.1}
                luminanceThreshold={0.3}
                luminanceSmoothing={0.92}
                mipmapBlur
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* Text overlay — vertically centered, LEFT side */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none relative z-10 flex min-h-screen items-center"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="max-w-xl lg:max-w-2xl">
            <h1 className="font-bricolage text-[44px] sm:text-[60px] md:text-7xl lg:text-[88px] xl:text-[96px] font-bold text-white leading-[0.92] tracking-tight mb-5 md:mb-6 break-keep whitespace-pre-line drop-shadow-[0_2px_24px_rgba(77,138,255,0.35)]">
              {h1Override ?? 'From Video\nto Decisions'}
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed break-keep max-w-xl">
              {subheadOverride ?? tr.hero.subhead}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
