import { Suspense, useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Film, Camera, Zap, Target, type LucideIcon } from 'lucide-react'
import type { Translations } from '../i18n/translations'

interface Props {
  tr: Translations
  eyebrow?: string
  heading?: string
}

const STAT_ICONS: LucideIcon[] = [Film, Camera, Zap, Target]

/**
 * Ethena-style proof hero:
 *   - left-aligned headline (dark navy bg)
 *   - right-side 3D city-lights globe (R3F, slow rotation)
 *   - faint ASCII letter pattern across the background
 *   - horizontal rule + stat row with icon-prefixed labels
 */
export default function ProofHero({ tr, eyebrow, heading }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  const stats = tr.vision.stats
  const finalEyebrow = eyebrow ?? tr.proof.eyebrow
  const finalHeading = heading ?? tr.proof.h2

  return (
    <section className="relative bg-[#050710] text-white overflow-hidden min-h-[760px] md:min-h-[860px]">
      {/* Background ASCII letter pattern (N3N / SUPPLY / LIVE tiled) */}
      <AsciiBackdrop />

      {/* Ambient blue glow — spread across the whole section, not just right */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 75% 35%, rgba(77,138,255,0.13) 0%, transparent 70%), radial-gradient(ellipse 80% 60% at 25% 65%, rgba(77,138,255,0.06) 0%, transparent 75%), radial-gradient(ellipse 100% 45% at 50% 100%, rgba(26,54,93,0.22) 0%, transparent 75%)',
        }}
        aria-hidden
      />

      {/* Globe — smaller, tucked upper-right; always rendering */}
      <div className="hidden md:block absolute top-[8%] right-[-2%] lg:right-[2%] w-[44%] lg:w-[38%] aspect-square pointer-events-none">
        <Canvas
          dpr={[1, 1.6]}
          camera={{ position: [0, 0.1, 5.6], fov: 32 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          frameloop="always"
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.22} />
          <pointLight position={[4, 3, 5]} intensity={1.3} color="#7fb3ff" />
          <pointLight position={[-5, -2, 3]} intensity={0.55} color="#4d8aff" />
          <Suspense fallback={null}>
            <CityLightsGlobe />
            <EffectComposer>
              <Bloom
                intensity={0.7}
                luminanceThreshold={0.3}
                luminanceSmoothing={0.4}
                mipmapBlur
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      <div
        ref={ref}
        className="relative z-10 mx-auto max-w-[1280px] px-8 md:px-12 pt-24 md:pt-36 pb-14 md:pb-20"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-8 md:mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80 shadow-[0_0_8px_currentColor]" />
          <span className="font-grotesk text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-blue-300/80">
            {finalEyebrow}
          </span>
        </motion.div>

        {/* Heading — left aligned, up to 2 lines of copy */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[68px] font-semibold leading-[1.05] tracking-[-0.02em] text-white/95 mb-28 md:mb-40 max-w-[620px] break-keep whitespace-pre-line"
          style={{ fontFamily: 'Inter, "IBM Plex Sans KR", system-ui, sans-serif' }}
        >
          {finalHeading}
        </motion.h2>

        {/* Thin horizontal rule + stats (ethena pattern) */}
        <div className="border-t border-white/14 pt-8 md:pt-10">
          <div className="flex flex-wrap items-start justify-between gap-y-10 gap-x-6 md:gap-x-10">
            {stats.map((s, i) => {
              const Icon = STAT_ICONS[i] ?? Target
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="min-w-[130px] md:min-w-[150px]"
                >
                  <div
                    className="text-[40px] sm:text-[48px] md:text-[58px] lg:text-[64px] font-bold leading-[1] tracking-[-0.02em] text-white/95 mb-3 md:mb-4"
                    style={{ fontFamily: 'Inter, "IBM Plex Sans KR", system-ui, sans-serif' }}
                  >
                    {s.value}
                  </div>
                  <div className="flex items-center gap-2 text-white/55">
                    <Icon size={13} strokeWidth={1.6} className="opacity-70" />
                    <span className="font-grotesk text-[10px] md:text-[11px] uppercase tracking-[0.22em]">
                      {s.label}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* R3F: city-lights globe                                                     */
/* A sphere of many tiny emissive points distributed on a Fibonacci sphere    */
/* surface — reads as "globe at night" with scattered city lights without     */
/* needing an earth texture. Slow Y rotation.                                 */
/* -------------------------------------------------------------------------- */

function CityLightsGlobe() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  const R = 1.25
  const positions = useMemo(() => {
    const COUNT = 2200
    const arr = new Float32Array(COUNT * 3)
    // Fibonacci sphere distribution
    const phi = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = phi * i
      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius
      arr[i * 3 + 0] = x * R
      arr[i * 3 + 1] = y * R
      arr[i * 3 + 2] = z * R
    }
    return arr
  }, [])

  const sizes = useMemo(() => {
    const arr = new Float32Array(positions.length / 3)
    for (let i = 0; i < arr.length; i++) {
      // 85% small, 15% bright/larger to give a city-lights feel
      arr[i] = Math.random() < 0.15 ? 1 + Math.random() * 0.9 : 0.25 + Math.random() * 0.35
    }
    return arr
  }, [positions])

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.2, 0, -0.12]}>
      {/* Dark base sphere — slightly visible so points sit on a form */}
      <mesh>
        <sphereGeometry args={[R - 0.02, 64, 64]} />
        <meshStandardMaterial
          color="#0a1128"
          metalness={0.4}
          roughness={0.6}
          emissive="#071028"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Thin outer glow shell */}
      <mesh>
        <sphereGeometry args={[R + 0.12, 48, 48]} />
        <meshBasicMaterial color="#4d8aff" transparent opacity={0.04} />
      </mesh>

      {/* Point cloud of city lights */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          color="#bcd2ff"
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

/* -------------------------------------------------------------------------- */
/* ASCII letter backdrop                                                      */
/* Tiled SVG pattern — columns of faint N, 3, E, S, A, I letters that drift   */
/* upward very slowly, giving the "network ambient noise" texture ethena uses */
/* -------------------------------------------------------------------------- */

function AsciiBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.26]" aria-hidden>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="ascii-backdrop"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <text x="4" y="14" fill="#4d8aff" fillOpacity="0.55" fontFamily="'Space Grotesk', monospace" fontSize="10" letterSpacing="1">N</text>
            <text x="26" y="22" fill="#4d8aff" fillOpacity="0.35" fontFamily="'Space Grotesk', monospace" fontSize="10" letterSpacing="1">3</text>
            <text x="14" y="34" fill="#4d8aff" fillOpacity="0.25" fontFamily="'Space Grotesk', monospace" fontSize="10" letterSpacing="1">E</text>
            <text x="40" y="40" fill="#4d8aff" fillOpacity="0.5" fontFamily="'Space Grotesk', monospace" fontSize="10" letterSpacing="1">S</text>
            <text x="2" y="50" fill="#4d8aff" fillOpacity="0.32" fontFamily="'Space Grotesk', monospace" fontSize="10" letterSpacing="1">A</text>
            <text x="32" y="52" fill="#4d8aff" fillOpacity="0.22" fontFamily="'Space Grotesk', monospace" fontSize="10" letterSpacing="1">I</text>
          </pattern>
          <linearGradient id="ascii-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
          </linearGradient>
          <mask id="ascii-mask">
            <rect width="100%" height="100%" fill="url(#ascii-fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#ascii-backdrop)" mask="url(#ascii-mask)" />
      </svg>
    </div>
  )
}
