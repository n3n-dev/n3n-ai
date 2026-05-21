import { Suspense, useEffect, useId, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Grid, RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'
import { animate, motion, useMotionValue, type AnimationPlaybackControls } from 'framer-motion'
import { Link } from 'react-router-dom'
import AsciiGlitchText from './AsciiGlitchText'
import type { Translations } from '../i18n/translations'

export type Hero05Variant = '0.5' | '1' | '2' | '3'

interface Props {
  tr: Translations
  h1Override?: string
  subheadOverride?: string
  eyebrowOverride?: string
  /** Controlled variant — when provided, Hero05 calls onVariantChange on
   *  toggle clicks instead of managing its own state. */
  variant?: Hero05Variant
  onVariantChange?: (v: Hero05Variant) => void
}

// Internal variants — drive the 3D scene rendering. Variant '1' (cloud GPU
// floor) is still the default scene shown on Draft 0.5, but its switcher
// button has been replaced with a route link to /draft11 (the new light
// variant). Variant '0.5' is kept for back-compat with conditional code in
// subcomponents.
const HERO05_VARIANTS: Array<{ id: Hero05Variant; label: string; title: string }> = [
  { id: '1', label: 'Draft 1', title: 'Cloud GPU floor' },
  { id: '2', label: 'Draft 2', title: 'Minimal' },
  { id: '3', label: 'Draft 3', title: 'Video' },
]

// Switcher items shown in the floating navbar-region pill on Draft 0.5.
// Mixes internal variant toggles with route links so Draft 0.5 can hand
// off to standalone draft pages (Draft 11 — light, Draft 가 — placeholder).
type SwitcherItem =
  | { kind: 'variant'; id: Hero05Variant; label: string }
  | { kind: 'link'; to: string; label: string }

const HERO05_SWITCHER: SwitcherItem[] = [
  { kind: 'link', to: '/draft14', label: 'Draft 14' },
  { kind: 'link', to: '/draft15', label: 'Draft 15' },
  { kind: 'link', to: '/draft16', label: 'Draft 16' },
  { kind: 'link', to: '/draft17', label: 'Draft 17' },
  { kind: 'variant', id: '2', label: 'Draft 2' },
  { kind: 'variant', id: '3', label: 'Draft 3' },
]

const CENTER_X = 2.25
const TOWER_SCALE = 0.72
const SCENE_Y_OFFSET = 0.14
const HUB_Z_OFFSET = -0.42

function CloudGlyph({ color = '#46b7ff' }: { color?: string }) {
  const puffs = useMemo(
    () => [
      { position: [-0.42, -0.1, 0] as [number, number, number], scale: [0.26, 0.22, 0.24] as [number, number, number] },
      { position: [-0.18, 0.02, 0.01] as [number, number, number], scale: [0.34, 0.32, 0.26] as [number, number, number] },
      { position: [0.14, 0.11, 0] as [number, number, number], scale: [0.42, 0.4, 0.3] as [number, number, number] },
      { position: [0.48, -0.06, 0.01] as [number, number, number], scale: [0.3, 0.28, 0.24] as [number, number, number] },
      { position: [0.08, -0.17, 0] as [number, number, number], scale: [0.56, 0.22, 0.26] as [number, number, number] },
    ],
    []
  )
  const materialProps = {
    color,
    emissive: '#1dbbff',
    emissiveIntensity: 0.42,
    roughness: 0.14,
    metalness: 0.2,
  }

  return (
    <group scale={[1.02, 1, 1.18]}>
      <RoundedBox
        args={[0.86, 0.23, 0.31]}
        radius={0.14}
        smoothness={10}
        bevelSegments={5}
        position={[0.08, -0.17, 0]}
      >
        <meshStandardMaterial {...materialProps} />
      </RoundedBox>
      {puffs.map((puff, index) => (
        <mesh key={index} position={puff.position} scale={puff.scale}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      ))}
      <mesh position={[0.05, -0.02, 0.215]}>
        <boxGeometry args={[0.6, 0.052, 0.02]} />
        <meshBasicMaterial color="#effdff" transparent opacity={0.42} toneMapped={false} />
      </mesh>
      <mesh position={[-0.18, -0.14, 0.226]}>
        <boxGeometry args={[0.2, 0.036, 0.018]} />
        <meshBasicMaterial color="#c7f4ff" transparent opacity={0.32} toneMapped={false} />
      </mesh>
    </group>
  )
}

function MinimalChipFoundation({ variant }: { variant: Hero05Variant }) {
  const isControlCore = variant === '0.5'
  const grooveRadii = useMemo(() => [0.58, 0.72, 0.86, 1.0], [])
  const ventOffsets = useMemo(() => [-0.48, -0.32, -0.16, 0, 0.16, 0.32, 0.48], [])

  return (
    <group>
      {/* Main body slab — darker brushed-metal tone so it actually reads as
          metal instead of being washed out by the glass deck above. */}
      <RoundedBox args={[isControlCore ? 1.82 : 1.96, 0.16, isControlCore ? 1.82 : 1.96]} radius={0.2} smoothness={12} bevelSegments={6} position={[0, -1.22, 0]} receiveShadow castShadow>
        <meshStandardMaterial
          color={isControlCore ? '#2b323c' : '#8ea1b3'}
          emissive={isControlCore ? '#050a12' : '#3197c4'}
          emissiveIntensity={isControlCore ? 0.02 : 0.06}
          roughness={isControlCore ? 0.22 : 0.18}
          metalness={isControlCore ? 0.96 : 0.78}
        />
      </RoundedBox>

      {/* Front-face highlight rail — a thin bright strip that catches light
          along the top-front edge of the body and reads the chamfer. */}
      <mesh position={[0, -1.147, isControlCore ? 0.912 : 0.982]}>
        <boxGeometry args={[isControlCore ? 1.64 : 1.76, 0.01, 0.006]} />
        <meshBasicMaterial color="#e6f5ff" transparent opacity={0.75} toneMapped={false} />
      </mesh>
      <mesh position={[0, -1.153, isControlCore ? 0.912 : 0.982]}>
        <boxGeometry args={[isControlCore ? 1.64 : 1.76, 0.026, 0.008]} />
        <meshBasicMaterial color="#6ecbff" transparent opacity={0.22} toneMapped={false} />
      </mesh>

      {/* Side highlight chamfers — catch rim light on the left/right edges */}
      {[-1, 1].map((sign) => (
        <mesh key={`side-rail-${sign}`} position={[sign * (isControlCore ? 0.911 : 0.982), -1.147, 0]}>
          <boxGeometry args={[0.006, 0.01, isControlCore ? 1.64 : 1.76]} />
          <meshBasicMaterial color="#c7e5ff" transparent opacity={0.45} toneMapped={false} />
        </mesh>
      ))}
      <RoundedBox args={[1.72, 0.024, 1.72]} radius={0.17} smoothness={10} bevelSegments={4} position={[0, -1.125, 0]}>
        <meshStandardMaterial color={isControlCore ? '#d8e1ea' : '#eef7ff'} emissive="#9be7ff" emissiveIntensity={0.08} roughness={0.06} metalness={0.86} />
      </RoundedBox>
      <RoundedBox args={[1.72, 0.024, 1.72]} radius={0.17} smoothness={10} bevelSegments={4} position={[0, -1.305, 0]}>
        <meshStandardMaterial color="#242b32" emissive="#07111c" emissiveIntensity={0.02} roughness={0.1} metalness={1} />
      </RoundedBox>
      <RoundedBox args={[1.58, 0.08, 1.58]} radius={0.18} smoothness={12} bevelSegments={6} position={[0, -1.08, 0]} receiveShadow>
        <meshStandardMaterial
          color={isControlCore ? '#aeb9c3' : '#dce8f2'}
          emissive="#72dcff"
          emissiveIntensity={isControlCore ? 0.05 : 0.12}
          roughness={0.055}
          metalness={0.92}
          transparent
          opacity={0.96}
        />
      </RoundedBox>
      <mesh position={[0, -0.96, 0]}>
        <cylinderGeometry args={[0.98, 1.12, 0.16, 96]} />
        <meshStandardMaterial
          color={isControlCore ? '#8f9aa5' : '#c8d8e6'}
          emissive="#42d4ff"
          emissiveIntensity={0.08}
          roughness={0.06}
          metalness={0.94}
          transparent
          opacity={0.94}
        />
      </mesh>
      {grooveRadii.map((radius) => (
        <mesh key={radius} position={[0, -0.865, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.004, 8, 128]} />
          <meshBasicMaterial color={radius > 0.9 ? '#f4fbff' : '#7fd8ff'} transparent opacity={radius > 0.9 ? 0.42 : 0.22} toneMapped={false} />
        </mesh>
      ))}
      <mesh position={[0, -0.83, 0]}>
        <cylinderGeometry args={[0.76, 0.9, 0.12, 96]} />
        <meshStandardMaterial
          color="#edf7ff"
          emissive="#91ecff"
          emissiveIntensity={0.18}
          roughness={0.1}
          metalness={0.42}
          transparent
          opacity={0.88}
        />
      </mesh>
      {ventOffsets.map((offset) => (
        <mesh key={offset} position={[offset, -1.14, 0.94]}>
          <boxGeometry args={[0.06, 0.026, 0.1]} />
          <meshStandardMaterial color="#e7eef6" metalness={0.88} roughness={0.16} emissive="#6acfff" emissiveIntensity={0.04} />
        </mesh>
      ))}
      <RoundedBox args={[1.38, 0.12, 0.045]} radius={0.035} smoothness={8} bevelSegments={3} position={[0, -1.22, 0.93]}>
        <meshStandardMaterial
          color={isControlCore ? '#7b8792' : '#cbd7e2'}
          emissive="#79d8ff"
          emissiveIntensity={0.04}
          roughness={0.075}
          metalness={0.98}
        />
      </RoundedBox>
      <mesh position={[0, -1.155, 0.957]}>
        <boxGeometry args={[1.18, 0.012, 0.012]} />
        <meshBasicMaterial color="#dff8ff" transparent opacity={0.62} toneMapped={false} />
      </mesh>
      {[-0.42, -0.28, -0.14, 0, 0.14, 0.28, 0.42].map((offset) => (
        <mesh key={`brushed-${offset}`} position={[offset, -1.21, 0.958]}>
          <boxGeometry args={[0.075, 0.006, 0.014]} />
          <meshBasicMaterial color="#f5fbff" transparent opacity={0.34} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

function VariantCoreDetail({ variant }: { variant: Hero05Variant }) {
  // Draft 1 and Draft 2 both render the flipping 3x3x3 cube stack in place
  // of the cloud/body. Draft 2 additionally hides all right-side HUD chrome
  // and the bottom status bar (see Hero05).
  if (variant === '1' || variant === '2') {
    return <CubeStackBody />
  }

  return (
    <group>
      <CloudGlyph />
    </group>
  )
}

// 27 teal cubes arranged in a 3x3x3 grid that periodically flip around Y on
// staggered delays — inspired by the CSS CodePen cube demo, but adapted for
// R3F so it can share the scene's lighting/shadows.
//
// Sized so the stack footprint stays compact (~1.2 world units) and doesn't
// dominate the hero frame. Bottom layer still rests on top of the 3x3 tiles
// with a tiny air gap.
function CubeStackBody() {
  const cubeSize = 0.54
  const gap = 0.03
  const step = cubeSize + gap
  const baseXZ = -step
  // Bottom cube bottom face lands just above DATA_TILE_Y top surface
  // (world -1.101). -1.16 in coreRef local places it at world ~-1.05.
  const baseY = -1.16

  const cubes = useMemo(() => {
    const arr: Array<{
      key: string
      row: number
      col: number
      layer: number
      position: [number, number, number]
      colorTop: string
      colorSide: string
      emissive: string
      delay: number
    }> = []
    // Row = depth (Z), Col = width (X), Layer = height (Y)
    // Palette mirrors the CodePen teal gradient.
    const rowColor: [string, string, string][] = [
      ['#A0EBE8', '#4EAFBC', '#8fe5e0'], // row 1 (front)
      ['#89E4E4', '#43A5B2', '#7cd9d9'], // row 2 (middle)
      ['#76DEE5', '#3D93A9', '#6dd3d4'], // row 3 (back)
    ]
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        for (let layer = 0; layer < 3; layer += 1) {
          arr.push({
            key: `cube-${row}${col}${layer}`,
            row,
            col,
            layer,
            position: [
              baseXZ + col * step,
              baseY + layer * step,
              baseXZ + row * step,
            ],
            colorTop: rowColor[row][0],
            colorSide: rowColor[row][1],
            emissive: rowColor[row][2],
            delay: (row * 0.11 + col * 0.17 + layer * 0.23) % 2.4,
          })
        }
      }
    }
    return arr
  }, [])

  return (
    <group>
      {cubes.map((c) => (
        <FlipCube
          key={c.key}
          position={c.position}
          size={cubeSize}
          delay={c.delay}
        />
      ))}
    </group>
  )
}

interface FlipCubeProps {
  position: [number, number, number]
  size: number
  delay: number
}

function FlipCube({ position, size, delay }: FlipCubeProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const edgeMatRef = useRef<THREE.LineBasicMaterial>(null!)
  const coreMatRef = useRef<THREE.MeshBasicMaterial>(null!)

  // Edge-only geometry (12 box edges) reused per cube for the neon rim.
  const edgesGeo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(size, size, size)),
    [size],
  )

  useFrame(({ clock }) => {
    const group = groupRef.current
    if (!group) return

    const cycle = 4
    const t = ((clock.elapsedTime + delay) / cycle) % 1

    if (t >= 0.2 && t < 0.4) {
      const tt = (t - 0.2) / 0.2
      const eased = tt < 0.5 ? 2 * tt * tt : 1 - Math.pow(-2 * tt + 2, 2) / 2
      group.rotation.y = -eased * Math.PI * 2
      group.position.y = position[1] + Math.sin(tt * Math.PI) * size * 0.12
    } else {
      group.rotation.y = 0
      group.position.y = position[1]
    }

    // Edge + inner core brighten at the apex of the flip.
    const flashT = Math.max(0, 1 - Math.abs(t - 0.3) * 18)
    if (edgeMatRef.current) edgeMatRef.current.opacity = 0.9 + flashT * 0.1
    if (coreMatRef.current) coreMatRef.current.opacity = 0.28 + flashT * 0.5
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Transparent glass body — see-through with dark blue tint */}
      <RoundedBox
        args={[size, size, size]}
        radius={0.02}
        smoothness={4}
        bevelSegments={2}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#0c2a52"
          transparent
          opacity={0.55}
          roughness={0.12}
          metalness={0.08}
          transmission={0.38}
          thickness={0.8}
          ior={1.45}
          clearcoat={0.92}
          clearcoatRoughness={0.08}
          depthWrite={false}
        />
      </RoundedBox>

      {/* Bright blue edge glow — neon rim around every box edge */}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial
          ref={edgeMatRef}
          color="#5cc8ff"
          transparent
          opacity={0.9}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Inner glowing core — a tiny box at center adds interior light that
          refracts through the glass walls (matches the reference image's
          cube interior luminance). */}
      <mesh>
        <boxGeometry args={[size * 0.32, size * 0.32, size * 0.32]} />
        <meshBasicMaterial
          ref={coreMatRef}
          color="#46a8ff"
          transparent
          opacity={0.3}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function CentralTower({ variant }: { variant: Hero05Variant }) {
  const pinOffsets = useMemo(() => [-0.54, -0.39, -0.24, -0.09, 0.09, 0.24, 0.39, 0.54], [])
  const coreRef = useRef<THREE.Group>(null!)
  const ringRef = useRef<THREE.Group>(null!)
  const statusRef = useRef<THREE.MeshStandardMaterial>(null!)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    if (coreRef.current) {
      coreRef.current.rotation.y = Math.sin(t * 0.32) * 0.16
    }

    if (ringRef.current) {
      ringRef.current.rotation.y = t * 0.22
      ringRef.current.rotation.z = Math.sin(t * 0.55) * 0.06
    }

    if (statusRef.current) {
      statusRef.current.emissiveIntensity = 0.58 + Math.sin(t * 1.2) * 0.04
    }
  })

  return (
    <group position={[CENTER_X, -0.15, HUB_Z_OFFSET]} scale={TOWER_SCALE}>
      {/* All chip-body chrome (foundation, pins, glass deck, metal plates,
          glow rings) renders only on Draft 0.5. Draft 1 leaves just the
          3x3x3 cube stack + lights + title, so the 3x3 bed below reads
          completely clean. */}
      {variant === '0.5' && (
        <>
          <MinimalChipFoundation variant={variant} />

          {pinOffsets.map((offset) => (
            <mesh key={`pin-top-${offset}`} position={[offset, -1.0, -0.95]}>
              <boxGeometry args={[0.05, 0.08, 0.16]} />
              <meshStandardMaterial color="#c8d2dd" metalness={0.92} roughness={0.24} emissive="#5aaeff" emissiveIntensity={0.08} />
            </mesh>
          ))}
          {pinOffsets.map((offset) => (
            <mesh key={`pin-bottom-${offset}`} position={[offset, -1.0, 0.95]}>
              <boxGeometry args={[0.05, 0.08, 0.16]} />
              <meshStandardMaterial color="#c8d2dd" metalness={0.92} roughness={0.24} emissive="#5aaeff" emissiveIntensity={0.08} />
            </mesh>
          ))}
          {pinOffsets.map((offset) => (
            <mesh key={`pin-left-${offset}`} position={[-0.95, -1.0, offset]}>
              <boxGeometry args={[0.16, 0.08, 0.05]} />
              <meshStandardMaterial color="#c8d2dd" metalness={0.92} roughness={0.24} emissive="#5aaeff" emissiveIntensity={0.08} />
            </mesh>
          ))}
          {pinOffsets.map((offset) => (
            <mesh key={`pin-right-${offset}`} position={[0.95, -1.0, offset]}>
              <boxGeometry args={[0.16, 0.08, 0.05]} />
              <meshStandardMaterial color="#c8d2dd" metalness={0.92} roughness={0.24} emissive="#5aaeff" emissiveIntensity={0.08} />
            </mesh>
          ))}

          <RoundedBox
            args={[0.98, 0.035, 0.98]}
            radius={0.06}
            smoothness={10}
            bevelSegments={5}
            position={[0, -0.42, 0]}
            receiveShadow
          >
            <meshPhysicalMaterial
              color="#cfe3ff"
              emissive="#61dfff"
              emissiveIntensity={0.05}
              roughness={0.05}
              metalness={0.04}
              transparent
              opacity={0.38}
              transmission={0.88}
              thickness={0.04}
              ior={1.45}
              clearcoat={0.96}
              clearcoatRoughness={0.05}
              depthWrite={false}
            />
          </RoundedBox>

          <mesh position={[0, -0.315, 0]}>
            <boxGeometry args={[0.68, 0.04, 0.68]} />
            <meshStandardMaterial
              color="#eef5fb"
              emissive="#ffffff"
              emissiveIntensity={0.04}
              roughness={0.06}
              metalness={0.94}
            />
          </mesh>
          <mesh position={[0, -0.445, 0.507]}>
            <boxGeometry args={[0.62, 0.018, 0.028]} />
            <meshBasicMaterial color="#effcff" transparent opacity={0.56} toneMapped={false} />
          </mesh>
          <mesh position={[0, -0.56, 0.507]}>
            <boxGeometry args={[0.62, 0.014, 0.026]} />
            <meshBasicMaterial color="#68d6ff" transparent opacity={0.26} toneMapped={false} />
          </mesh>
          <mesh position={[0, -0.285, 0]}>
            <boxGeometry args={[0.52, 0.012, 0.52]} />
            <meshStandardMaterial
              color="#546371"
              emissive="#1e536f"
              emissiveIntensity={0.08}
              roughness={0.18}
              metalness={0.76}
            />
          </mesh>
          <mesh position={[0, -0.75, 0]}>
            <boxGeometry args={[1.36, 0.012, 1.36]} />
            <meshBasicMaterial color="#74bfff" transparent opacity={0.2} toneMapped={false} />
          </mesh>
          <mesh position={[0, -0.26, 0]}>
            <ringGeometry args={[0.42, 0.55, 4]} />
            <meshBasicMaterial color="#d5deea" transparent opacity={0.5} toneMapped={false} side={THREE.DoubleSide} />
          </mesh>
        </>
      )}

      <group ref={coreRef} position={[0, 0.18, 0]}>
        {variant === '0.5' && (
          <>
            {/* Control Tower keycap body — Draft 0.5 only */}
            <RoundedBox args={[1.08, 1.08, 1.08]} radius={0.14} smoothness={14} bevelSegments={6} castShadow receiveShadow>
              <meshPhysicalMaterial
                color="#e8eef5"
                emissive="#1a3147"
                emissiveIntensity={0.05}
                roughness={0.28}
                metalness={0.18}
                clearcoat={0.85}
                clearcoatRoughness={0.12}
                reflectivity={0.42}
              />
            </RoundedBox>

            <mesh position={[0, 0.542, 0]}>
              <boxGeometry args={[1.04, 0.004, 1.04]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.55} toneMapped={false} />
            </mesh>
            <mesh position={[0, -0.546, 0]}>
              <boxGeometry args={[1.04, 0.004, 1.04]} />
              <meshBasicMaterial color="#0a1220" transparent opacity={0.6} toneMapped={false} />
            </mesh>

            <mesh position={[0, -0.54, 0]}>
              <cylinderGeometry args={[0.42, 0.5, 0.18, 72]} />
              <meshStandardMaterial
                ref={statusRef}
                color="#1f77ff"
                emissive="#20d6ff"
                emissiveIntensity={0.7}
                roughness={0.2}
                metalness={0.28}
              />
            </mesh>
          </>
        )}

        {/* Draft 1 swaps the body entirely for a flipping 3x3x3 cube stack */}
        <VariantCoreDetail variant={variant} />
      </group>

      {variant === '0.5' && (
        <group ref={ringRef} position={[0, 0.18, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.45, 0.014, 14, 180]} />
            <meshBasicMaterial color="#76d7ff" transparent opacity={0.62} toneMapped={false} />
          </mesh>
          <mesh rotation={[1.16, 0.36, 0.42]}>
            <torusGeometry args={[1.22, 0.012, 14, 180]} />
            <meshBasicMaterial color="#c7f1ff" transparent opacity={0.46} toneMapped={false} />
          </mesh>
          <mesh rotation={[1.92, -0.28, -0.32]}>
            <torusGeometry args={[1.72, 0.01, 14, 180]} />
            <meshBasicMaterial color="#8aa8ff" transparent opacity={0.36} toneMapped={false} />
          </mesh>
        </group>
      )}

      {variant === '0.5' && (
        <Text
          position={[0, -0.16, 0.61]}
          rotation={[0, 0, 0]}
          fontSize={0.085}
          color="#ecfbff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
        >
          {HERO05_VARIANTS.find((item) => item.id === variant)?.title.toUpperCase() ?? 'CONTROL CORE'}
        </Text>
      )}

      <pointLight
        position={[0, 0.02, 0]}
        intensity={2.1}
        distance={3.7}
        color="#4ea2ff"
      />
      <pointLight
        position={[0, 0.62, 0.35]}
        intensity={0.7}
        distance={2.4}
        color="#dce9ff"
      />
    </group>
  )
}

interface PanelProps {
  lane: LaneSpec
  slot: SlotSpec
  delay: number
  duration: number
  scale: number
}

const FLOOR_Y = -1.42 + SCENE_Y_OFFSET
const DATA_TILE_DEPTH = 0.14
const DATA_TILE_RADIUS = 0.08

interface LaneSpec {
  id: 'top' | 'bottom' | 'left' | 'right'
  start: [number, number]
}

const DATA_LANES: LaneSpec[] = [
  // Spawn further away so cards drift in from deeper in the perspective —
  // keeps their entry point beyond the visible floor boundary.
  { id: 'top', start: [CENTER_X, HUB_Z_OFFSET - 15.4] },
  { id: 'bottom', start: [CENTER_X, HUB_Z_OFFSET + 13.2] },
  { id: 'left', start: [-11.4, HUB_Z_OFFSET] },
  { id: 'right', start: [14.6, HUB_Z_OFFSET] },
]

interface SlotSpec {
  x: number
  z: number
  width: number
  height: number
}

const FLOOR_GRID_CELL_SIZE = 0.6
const DATA_TILE_GAP = 0.08
const DATA_TILE_SIZE = FLOOR_GRID_CELL_SIZE - DATA_TILE_GAP
const TRACE_HORIZONTAL_LENGTH = 14.8
const TRACE_VERTICAL_LENGTH = 15.2
const TRACE_WIDTH = 0.01
const TRACE_GLOW_WIDTH = 0.036
const TRACE_HALO_WIDTH = 0.068
const TRACE_AURA_WIDTH = 0.11
const TRACE_PULSE_LENGTH = 1.8
const TRACE_LEFT_EXTENSION = 4.9
// Bigger top extension so the "수집" (collect) spike reaches further into
// the distance without the vertical trace visibly cutting off mid-floor.
const TRACE_TOP_EXTENSION = 16.4
const TRACE_DATA_LABELS = ['01', 'IO', 'SYS', 'A7', 'DX', 'Q2', 'RT', 'NX']
const BOARD_Y = FLOOR_Y + 0.04
const DATA_TILE_Y = BOARD_Y + 0.082
// Restored the checkpointed value so the card reads as visually centered on
// the 4-line floor bundle. The trace bleed-through is handled by tightening
// the card's opacity/transmission rather than by lifting its Y position.
const MOVING_TILE_Y = BOARD_Y + 0.07
const TRACE_Y = BOARD_Y + 0.036
const FLOOR_FLOW_Y = FLOOR_Y + 0.012
// Both lane offsets are zeroed so every panel travels through the exact
// center of the 3x3 puzzle bed (CENTER_X, HUB_Z_OFFSET), matching the
// circuit trace bundle that also centers on the same point.
const VERTICAL_PANEL_X_OFFSET = 0
const HORIZONTAL_PANEL_Z_OFFSET = 0
const CENTER_SLOT: SlotSpec = {
  x: CENTER_X,
  z: HUB_Z_OFFSET,
  width: DATA_TILE_SIZE,
  height: DATA_TILE_SIZE,
}
const PUZZLE_BED_TILES: SlotSpec[] = [-1, 0, 1].flatMap((row) =>
  [-1, 0, 1].map((col) => ({
    x: CENTER_X + col * FLOOR_GRID_CELL_SIZE,
    z: HUB_Z_OFFSET + row * FLOOR_GRID_CELL_SIZE,
    width: DATA_TILE_SIZE,
    height: DATA_TILE_SIZE,
  }))
)

function createFloorFlowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  if (!ctx) return new THREE.CanvasTexture(canvas)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const base = ctx.createLinearGradient(0, 0, canvas.width, 0)
  base.addColorStop(0, 'rgba(125, 224, 255, 0)')
  base.addColorStop(0.18, 'rgba(125, 224, 255, 0.03)')
  base.addColorStop(0.5, 'rgba(232, 247, 255, 0.08)')
  base.addColorStop(0.82, 'rgba(166, 187, 255, 0.04)')
  base.addColorStop(1, 'rgba(166, 187, 255, 0)')
  ctx.fillStyle = base
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < 30; i += 1) {
    const y = ((i + 0.5) / 30) * canvas.height
    const thickness = i % 5 === 0 ? 6 : i % 3 === 0 ? 3 : 2
    const alpha = i % 5 === 0 ? 0.08 : i % 3 === 0 ? 0.055 : 0.03
    const streak = ctx.createLinearGradient(0, 0, canvas.width, 0)
    streak.addColorStop(0, 'rgba(210, 242, 255, 0)')
    streak.addColorStop(0.14, `rgba(210, 242, 255, ${alpha * 0.45})`)
    streak.addColorStop(0.48, `rgba(255, 255, 255, ${alpha})`)
    streak.addColorStop(0.86, `rgba(155, 198, 255, ${alpha * 0.55})`)
    streak.addColorStop(1, 'rgba(155, 198, 255, 0)')
    ctx.fillStyle = streak
    ctx.fillRect(0, y - thickness / 2, canvas.width, thickness)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.repeat.set(1.8, 1)
  return texture
}

function createFloorMaskTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  if (!ctx) return new THREE.CanvasTexture(canvas)

  const gradient = ctx.createRadialGradient(
    canvas.width * 0.5,
    canvas.height * 0.5,
    canvas.width * 0.08,
    canvas.width * 0.5,
    canvas.height * 0.52,
    canvas.width * 0.58
  )
  // Extend the bright region further out and soften the outer falloff so
  // the floor doesn't cut off as a visible rounded boundary inside the frame.
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.62, 'rgba(255,255,255,0.82)')
  gradient.addColorStop(0.88, 'rgba(255,255,255,0.3)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  return texture
}

function FlowingFloorTexture() {
  const flowTexture = useMemo(() => createFloorFlowTexture(), [])
  const maskTexture = useMemo(() => createFloorMaskTexture(), [])
  const secondaryFlowTexture = useMemo(() => {
    const texture = createFloorFlowTexture()
    texture.repeat.set(2.4, 1)
    return texture
  }, [])

  useEffect(() => {
    return () => {
      flowTexture.dispose()
      secondaryFlowTexture.dispose()
      maskTexture.dispose()
    }
  }, [flowTexture, secondaryFlowTexture, maskTexture])

  return (
    <group position={[CENTER_X, FLOOR_FLOW_Y, HUB_Z_OFFSET]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} renderOrder={1}>
        <planeGeometry args={[42, 30]} />
        <meshBasicMaterial
          map={flowTexture}
          alphaMap={maskTexture}
          color="#b6edff"
          transparent
          opacity={0.11}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, Math.PI / 2, 0]} renderOrder={1}>
        <planeGeometry args={[30, 24]} />
        <meshBasicMaterial
          map={secondaryFlowTexture}
          alphaMap={maskTexture}
          color="#d7c6ff"
          transparent
          opacity={0.055}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function ConvergingPanel({
  lane,
  slot,
  delay,
  duration,
  scale,
}: PanelProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const transform = useMemo(() => {
    const [startX, startZ] = lane.start
    const [endX, endZ] = [slot.x, slot.z]
    const dx = endX - startX
    const dz = endZ - startZ
    const isVerticalLane = lane.id === 'top' || lane.id === 'bottom'
    const xOffset = isVerticalLane ? VERTICAL_PANEL_X_OFFSET : 0
    const zOffset = isVerticalLane ? 0 : HORIZONTAL_PANEL_Z_OFFSET
    return {
      startX: startX + xOffset,
      startZ: startZ + zOffset,
      endX: endX + xOffset,
      endZ: endZ + zOffset,
      dx,
      dz,
      rotationY: Math.atan2(dx, dz),
    }
  }, [lane.id, lane.start, slot.x, slot.z])

  useFrame(({ clock }) => {
    const group = groupRef.current
    if (!group) return

    const cycle = duration * 1.28
    const raw = (clock.elapsedTime + delay) / cycle
    const t = raw - Math.floor(raw)
    const travelWindow = 0.86
    const isTravelling = t < travelWindow
    const travelT = isTravelling ? t / travelWindow : 0
    const progress = travelT * travelT * (3 - 2 * travelT)
    const x = transform.startX + transform.dx * progress
    const z = transform.startZ + transform.dz * progress

    group.visible = isTravelling
    group.position.set(x, MOVING_TILE_Y, z)
    group.rotation.y = transform.rotationY
    group.scale.setScalar(scale)
  })

  return (
    <group ref={groupRef}>
      {/* renderOrder=2 paints the glass panels after the trace bundle (which
          renders at default 0 with additive-blend, depthWrite=false), so the
          white floor lines never bleed through the card's transmission. */}
      <group rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
        <RoundedBox
          args={[slot.width, slot.height, DATA_TILE_DEPTH]}
          radius={DATA_TILE_RADIUS}
          smoothness={8}
          bevelSegments={4}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color="#dcecff"
            emissive="#85d7ff"
            emissiveIntensity={0.12}
            transparent
            opacity={0.78}
            roughness={0.09}
            metalness={0.05}
            clearcoat={0.94}
            clearcoatRoughness={0.08}
          />
        </RoundedBox>
        <RoundedBox
          args={[slot.width * 0.74, slot.height * 0.74, DATA_TILE_DEPTH * 0.82]}
          radius={DATA_TILE_RADIUS * 0.7}
          smoothness={8}
          bevelSegments={4}
          position={[0, 0, DATA_TILE_DEPTH * 0.09]}
        >
          <meshPhysicalMaterial
            color="#1877ff"
            emissive="#08c8ff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.9}
            roughness={0.15}
            metalness={0.08}
            clearcoat={0.6}
            clearcoatRoughness={0.18}
          />
        </RoundedBox>
      </group>
    </group>
  )
}

interface CircuitTraceBundleProps {
  orientation: 'horizontal' | 'vertical'
  centerX: number
  centerZ: number
  color: string
}

function CircuitTraceBundle({ orientation, centerX, centerZ, color }: CircuitTraceBundleProps) {
  const traceOffsets = useMemo(() => [-0.105, -0.035, 0.035, 0.105], [])
  const isHorizontal = orientation === 'horizontal'
  const baseLength = isHorizontal ? TRACE_HORIZONTAL_LENGTH : TRACE_VERTICAL_LENGTH
  const extensionLength = isHorizontal ? TRACE_LEFT_EXTENSION : TRACE_TOP_EXTENSION
  const extensionCenter = isHorizontal
    ? [-(baseLength + extensionLength) * 0.5, 0, 0]
    : [0, 0, -(baseLength + extensionLength) * 0.5]
  // Kept for reference — unused now that the flow-shader replaces pulses.
  const _pulseSpecs = useMemo(
    () =>
      traceOffsets.flatMap((offset, lineIndex) =>
        [-1, 1].map((direction, sideIndex) => ({
          offset,
          direction,
          delay: lineIndex * 0.11 + sideIndex * 0.24,
          label: TRACE_DATA_LABELS[(lineIndex * 2 + sideIndex) % TRACE_DATA_LABELS.length],
        }))
      ),
    [traceOffsets]
  )

  // Animation is now baked into the TraceFlowLine shader (drifting fbm
  // noise + gaussian core), so no per-frame material updates are needed
  // here. Kept as a no-op for symmetry if new per-bundle state is added.

  return (
    <group position={[centerX, TRACE_Y, centerZ]}>

      {/* Continuous flowing glow — one ShaderMaterial plane per trace.  The
          fragment shader paints a soft gaussian line, modulated by a flow
          noise that drifts toward the hub, so the trace reads as a living
          luminous edge instead of a visible pulse moving over a static
          line. */}
      {traceOffsets.map((offset) => (
        <TraceFlowLine
          key={`flow-${offset}`}
          offset={offset}
          length={baseLength}
          color={color}
          isHorizontal={isHorizontal}
        />
      ))}
      {/* The extension pieces get the same flow treatment so the spike
          reads as one continuous glowing trace. */}
      {traceOffsets.map((offset) => (
        <TraceFlowLine
          key={`flow-ext-${offset}`}
          offset={offset}
          length={extensionLength}
          color={color}
          isHorizontal={isHorizontal}
          anchor={
            isHorizontal
              ? [extensionCenter[0], 0, 0]
              : [0, 0, extensionCenter[2]]
          }
        />
      ))}
    </group>
  )
}

interface TraceFlowLineProps {
  offset: number
  length: number
  color: string
  isHorizontal: boolean
  anchor?: [number, number, number]
}

// Thin additive plane rendered with a ShaderMaterial that produces the
// continuous flowing glow — Gaussian core across the perpendicular axis
// plus fbm-noise drift along the line so the trace looks alive without
// discrete pulse meshes moving on top.
function TraceFlowLine({
  offset,
  length,
  color,
  isHorizontal,
  anchor,
}: TraceFlowLineProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const uniforms = useMemo(() => {
    const c = new THREE.Color(color)
    return {
      uTime: { value: 0 },
      uColor: { value: new THREE.Vector3(c.r, c.g, c.b) },
    }
  }, [color])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime
    }
  })

  const planeWidth = TRACE_HALO_WIDTH * 3.2
  const position: [number, number, number] = isHorizontal
    ? [(anchor?.[0] ?? 0), 0.006, offset]
    : [offset, 0.006, (anchor?.[2] ?? 0)]

  return (
    // Euler [-π/2, 0, -π/2] for vertical: the plane's local X (length) rotates
    // from world X onto world Z, putting the trace correctly along the
    // north-south axis instead of sitting sideways on top of the main bundle.
    // Normal depth testing now — the opaque 3x3 bed tiles correctly occlude
    // line segments that pass under them, which reads more physically
    // grounded than painting the line on top of everything.
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, isHorizontal ? 0 : -Math.PI / 2]}
    >
      <planeGeometry args={[length, planeWidth]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColor;

          float hash(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
          }

          float noise(vec2 p) {
            vec2 i = floor(p), f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
          }

          void main() {
            // perpendicular distance from line center (0.5), smooth gaussian
            float perp = vUv.y - 0.5;
            float core = exp(-perp * perp * 110.0);
            float halo = exp(-perp * perp * 18.0);

            // flow noise drifting toward the hub (u increases outward from
            // center in vUv space, so we negate time to sweep inward)
            float flow = noise(vec2(vUv.x * 22.0 - uTime * 1.4, vUv.y * 4.0));
            flow = 0.55 + 0.45 * flow;

            // fade the edge of the plane so each trace tapers cleanly
            float lineEdge = smoothstep(0.02, 0.12, vUv.x) *
                             smoothstep(0.02, 0.12, 1.0 - vUv.x);

            // brighten as the trace nears the hub (u → 0.5 at center of
            // plane; we brighten toward the end that faces the hub —
            // vUv.x=1 side since plane is placed so the hub direction is +x)
            float hubPull = pow(vUv.x, 0.6);

            vec3 col = uColor * (halo * 0.6 + flow * 0.25) + vec3(1.0) * core * 0.9;
            float a = (core * 1.0 + halo * 0.45 + flow * 0.12) * lineEdge * hubPull;
            gl_FragColor = vec4(col, a);
          }
        `}
      />
    </mesh>
  )
}

interface AnimatedBedTileProps {
  tile: SlotSpec
  isCenter: boolean
  delay: number
}

// One of the 9 floor-bed tiles. Extrudes up from the floor in a staggered
// wave (inspired by the CodePen 4x4 grid: scale goes 1 → tall → 1 during
// 0-50% of the cycle, flat for the remaining 50%).
function AnimatedBedTile({ tile, isCenter, delay }: AnimatedBedTileProps) {
  const scaleRef = useRef<THREE.Group>(null!)
  const topMatRef = useRef<THREE.MeshPhysicalMaterial>(null!)
  const innerMatRef = useRef<THREE.MeshPhysicalMaterial>(null!)

  // Tile thickness in world Y (the rotated box's depth axis).
  const tileThickness = DATA_TILE_DEPTH * 0.82
  const halfThickness = tileThickness / 2

  useFrame(({ clock }) => {
    const g = scaleRef.current
    if (!g) return

    const cycle = 1.6
    const t = ((clock.elapsedTime + delay) / cycle) % 1

    // 0–25%: scale ramps up.  25–50%: ramps back down.  50–100%: rests flat.
    // Amplitude lowered (was 5.5) so the tile pops only ~60% taller instead
    // of towering up into the flipping cube stack overhead.
    const popAmp = 0.8
    let scaleY = 1
    let glow = 0
    if (t < 0.25) {
      const tt = t / 0.25
      const eased = tt < 0.5 ? 2 * tt * tt : 1 - Math.pow(-2 * tt + 2, 2) / 2
      scaleY = 1 + eased * popAmp
      glow = eased
    } else if (t < 0.5) {
      const tt = (t - 0.25) / 0.25
      const eased = tt < 0.5 ? 2 * tt * tt : 1 - Math.pow(-2 * tt + 2, 2) / 2
      scaleY = 1 + (1 - eased) * popAmp
      glow = 1 - eased
    }

    g.scale.y = scaleY

    if (topMatRef.current) {
      topMatRef.current.emissiveIntensity =
        (isCenter ? 0.12 : 0.04) + glow * 0.35
    }
    if (innerMatRef.current) {
      innerMatRef.current.emissiveIntensity =
        (isCenter ? 0.14 : 0.05) + glow * 0.4
    }
  })

  return (
    // Outer anchor sits at floor level (tile bottom); the inner scale group
    // grows upward from that anchor so the tile reads as extruding out of
    // the board instead of ballooning in both directions.
    <group position={[tile.x, DATA_TILE_Y - halfThickness, tile.z]}>
      <group ref={scaleRef}>
        <group position={[0, halfThickness, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <RoundedBox
              args={[tile.width, tile.height, tileThickness]}
              radius={DATA_TILE_RADIUS}
              smoothness={8}
              bevelSegments={4}
              receiveShadow
            >
              <meshPhysicalMaterial
                ref={topMatRef}
                color={isCenter ? '#d7ecff' : '#c9dcff'}
                emissive={isCenter ? '#38cfff' : '#7aaeff'}
                emissiveIntensity={isCenter ? 0.12 : 0.04}
                opacity={1}
                roughness={0.18}
                metalness={0.08}
                clearcoat={0.42}
                clearcoatRoughness={0.08}
              />
            </RoundedBox>
            <RoundedBox
              args={[tile.width * 0.72, tile.height * 0.72, DATA_TILE_DEPTH * 0.54]}
              radius={DATA_TILE_RADIUS * 0.68}
              smoothness={8}
              bevelSegments={4}
              position={[0, 0, DATA_TILE_DEPTH * 0.08]}
            >
              <meshPhysicalMaterial
                ref={innerMatRef}
                color={isCenter ? '#7ec4ff' : '#8fb7ff'}
                emissive={isCenter ? '#00cfff' : '#4aa3ff'}
                emissiveIntensity={isCenter ? 0.14 : 0.05}
                opacity={1}
                roughness={0.2}
                metalness={0.08}
                clearcoat={0.34}
                clearcoatRoughness={0.18}
              />
            </RoundedBox>
          </group>
        </group>
      </group>
    </group>
  )
}

function HubConvergeGlow() {
  const coreRef = useRef<THREE.MeshBasicMaterial>(null!)
  const haloRef = useRef<THREE.MeshBasicMaterial>(null!)
  const auraRef = useRef<THREE.MeshBasicMaterial>(null!)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    // Hub brightens as pulses arrive and dims between bursts — same 0.52
    // clock that drives the trace pulses, so everything stays in sync.
    const pulse = (t * 0.52) % 1
    const impact = Math.pow(pulse, 6)
    const breathe = 0.55 + Math.sin(t * 1.35) * 0.25
    if (coreRef.current) coreRef.current.opacity = 0.45 + impact * 0.55
    if (haloRef.current) haloRef.current.opacity = 0.18 + breathe * 0.22 + impact * 0.3
    if (auraRef.current) auraRef.current.opacity = 0.08 + breathe * 0.12 + impact * 0.2
  })

  return (
    <group position={[CENTER_X, TRACE_Y + 0.015, HUB_Z_OFFSET]}>
      {/* Bright core disk */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.09, 32]} />
        <meshBasicMaterial
          ref={coreRef}
          color="#ffffff"
          transparent
          opacity={0.6}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Mid halo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.002, 0]}>
        <circleGeometry args={[0.22, 48]} />
        <meshBasicMaterial
          ref={haloRef}
          color="#cfefff"
          transparent
          opacity={0.3}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Outer aura */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.004, 0]}>
        <circleGeometry args={[0.42, 48]} />
        <meshBasicMaterial
          ref={auraRef}
          color="#9fe2ff"
          transparent
          opacity={0.15}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function DataHubFloor({ variant }: { variant: Hero05Variant }) {
  return (
    <group>
      <CircuitTraceBundle orientation="horizontal" centerX={CENTER_X} centerZ={HUB_Z_OFFSET} color="#f5faff" />
      <CircuitTraceBundle orientation="vertical" centerX={CENTER_X} centerZ={HUB_Z_OFFSET} color="#b19dff" />
      {/* Central hub glow — the point where all four spikes converge.
          Pulses bright white to sell the "electricity gathering" feel. */}
      <HubConvergeGlow />

      {PUZZLE_BED_TILES.map((tile, i) => {
        const row = Math.floor(i / 3) // 0..2 (back→front)
        const col = i % 3             // 0..2 (left→right)
        return (
          <AnimatedBedTile
            key={i}
            tile={tile}
            isCenter={tile.x === CENTER_SLOT.x && tile.z === CENTER_SLOT.z}
            // Diagonal wave: back-left cubes pop first, front-right last.
            delay={(row + col) * 0.09}
          />
        )
      })}

      {variant === '0.5' && (
        <group position={[CENTER_X, DATA_TILE_Y + 0.122, HUB_Z_OFFSET]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Large 2.28² translucent deck that blankets the 3x3 bed — Draft
            0.5 only. Draft 1 leaves the bed tiles uncovered so the cube
            stack reads cleanly. */}
        <RoundedBox
          args={[2.28, 2.28, 0.052]}
          radius={0.16}
          smoothness={10}
          bevelSegments={5}
        >
          <meshPhysicalMaterial
            color="#d9f6ff"
            emissive="#70dfff"
            emissiveIntensity={0.08}
            transparent
            opacity={0.28}
            roughness={0.035}
            metalness={0.02}
            clearcoat={0.85}
            clearcoatRoughness={0.06}
            depthWrite={false}
          />
        </RoundedBox>
        <RoundedBox
          args={[2.32, 2.32, 0.016]}
          radius={0.18}
          smoothness={10}
          bevelSegments={4}
          position={[0, 0, 0.04]}
        >
          <meshBasicMaterial
            color="#f2fdff"
            transparent
            opacity={0.22}
            toneMapped={false}
            depthWrite={false}
          />
        </RoundedBox>
        </group>
      )}
    </group>
  )
}

function Scene({ variant }: { variant: Hero05Variant }) {
  const panels = useMemo<PanelProps[]>(() => {
    const count = 24
    const list: PanelProps[] = []
    for (let i = 0; i < count; i++) {
      const lane = DATA_LANES[i % DATA_LANES.length]
      list.push({
        lane,
        slot: CENTER_SLOT,
        delay: i * 0.18,
        duration: 4.1,
        scale: 0.82,
      })
    }
    return list
  }, [])

  return (
    <>
      <ambientLight intensity={0.42} />
      <directionalLight position={[4, 6, 3]} intensity={1.15} castShadow />
      <directionalLight position={[-3, 2, -2]} intensity={0.42} color="#8fd8ff" />

      {/* Monochrome grid floor — hidden in Draft 2 and Draft 3 for a bare scene. */}
      {variant !== '2' && variant !== '3' && (
        <Grid
          position={[0, FLOOR_Y, 0]}
          args={[40, 40]}
          cellSize={FLOOR_GRID_CELL_SIZE}
          cellThickness={0.24}
          cellColor="#3c5a86"
          sectionSize={2.4}
          sectionThickness={0.52}
          sectionColor="#7aa6e8"
          fadeDistance={28}
          fadeStrength={1.1}
          followCamera={false}
          infiniteGrid
        />
      )}

      {/* Large round radial glow on the floor — Draft 0.5 only. Draft 1's
          cube stack design reads cleaner against a bare grid floor. */}
      {variant === '0.5' && <FlowingFloorTexture />}

      {/* Everything inside the hub (3x3 bed + circuit traces + cube stack +
          converging panels) is skipped on Draft 2 / Draft 3 — those drafts
          keep only their backdrop + centered text. */}
      {variant !== '2' && variant !== '3' && (
        <>
          <DataHubFloor variant={variant} />
          <CentralTower variant={variant} />

          {panels.map((p, i) => (
            <ConvergingPanel key={i} {...p} />
          ))}
        </>
      )}

      <Environment preset="city" />
    </>
  )
}

/**
 * Keyword chip that glitch-scrambles on hover.
 * Renders clean text on mount; hover increments the trigger so the
 * AsciiGlitchText re-runs its scramble animation (stable per-char grid
 * prevents layout shift).
 */
function HoverGlitchWord({ text }: { text: string }) {
  const [trigger, setTrigger] = useState(0)
  return (
    <span
      onMouseEnter={() => setTrigger((t) => t + 1)}
      onFocus={() => setTrigger((t) => t + 1)}
      tabIndex={0}
      className="font-grotesk text-[10px] md:text-[12px] font-medium uppercase tracking-[0.22em] text-white/90 hover:text-white transition-colors cursor-default outline-none"
    >
      <AsciiGlitchText
        text={text}
        duration={520}
        trigger={trigger}
        autoPlay={false}
        stable
      />
    </span>
  )
}

/**
 * Hero for Draft 0.5 — Institutional Precision variant.
 * High-Fidelity Noir: monochrome palette, Manrope/Space Grotesk typography,
 * restrained navy accent, 4px base rounding, no heavy drop shadows.
 */
// Draft 3 backdrop — autoplaying muted MP4 video from the supplied glass-
// video-hero reference, stretched to cover the whole hero.
function VideoHeroBackground() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 z-0 h-full w-full object-cover"
    >
      <source
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4"
        type="video/mp4"
      />
    </video>
  )
}

// Draft 2 backdrop — animated "ethereal shadow" layer that sits beneath
// the starfield. Uses an SVG feTurbulence + feDisplacementMap filter with
// a hue-rotating color matrix (ported from the supplied Framer component)
// so the silhouette gently morphs. No title text — Hero05 owns its own
// typography, this layer is purely background.
interface EtherealShadowBackgroundProps {
  /** Background silhouette tint. Default is the original blue-grey. */
  color?: string
  /** Hue-rotate sweep range (from → to, degrees). When omitted the filter
   *  stays at a fixed hue — useful to lock the silhouette to a specific
   *  cool blue instead of cycling through purples/magentas. */
  hueSweep?: [number, number]
}

function EtherealShadowBackground({
  color = 'rgba(96, 148, 214, 0.9)',
  hueSweep,
}: EtherealShadowBackgroundProps = {}) {
  const rawId = useId()
  const filterId = `eth-shadow-${rawId.replace(/:/g, '')}`
  const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null)
  const hueRotateMotion = useMotionValue(hueSweep ? hueSweep[0] : 0)

  useEffect(() => {
    if (!hueSweep) {
      // Fixed hue — just set the initial value once and skip the animation.
      feColorMatrixRef.current?.setAttribute('values', '0')
      return
    }
    let controls: AnimationPlaybackControls | null = null
    if (feColorMatrixRef.current) {
      hueRotateMotion.set(hueSweep[0])
      controls = animate(hueRotateMotion, hueSweep[1], {
        duration: 22,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'linear',
        onUpdate: (v) => {
          feColorMatrixRef.current?.setAttribute('values', String(v))
        },
      })
    }
    return () => {
      controls?.stop()
    }
  }, [hueRotateMotion, hueSweep])

  const scale = 100
  const displacement = 60

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div
        style={{
          position: 'absolute',
          inset: -displacement,
          filter: `url(#${filterId}) blur(4px)`,
        }}
      >
        <svg style={{ position: 'absolute' }}>
          <defs>
            <filter id={filterId}>
              <feTurbulence
                result="undulation"
                numOctaves={2}
                baseFrequency={`${mapRange(scale, 0, 100, 0.001, 0.0005)},${mapRange(scale, 0, 100, 0.004, 0.002)}`}
                seed={0}
                type="turbulence"
              />
              <feColorMatrix
                ref={feColorMatrixRef}
                in="undulation"
                type="hueRotate"
                values="180"
              />
              <feColorMatrix
                in="dist"
                result="circulation"
                type="matrix"
                values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="circulation"
                scale={displacement}
                result="dist"
              />
              <feDisplacementMap in="dist" in2="undulation" scale={displacement} result="output" />
            </filter>
          </defs>
        </svg>
        <div
          style={{
            backgroundColor: color,
            maskImage:
              "url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')",
            WebkitMaskImage:
              "url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')",
            maskSize: 'cover',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskSize: 'cover',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      {/* Fine noise grain */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')",
          backgroundSize: 240,
          backgroundRepeat: 'repeat',
          opacity: 0.35,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  )
}

function mapRange(v: number, fromLo: number, fromHi: number, toLo: number, toHi: number) {
  if (fromLo === fromHi) return toLo
  const p = (v - fromLo) / (fromHi - fromLo)
  return toLo + p * (toHi - toLo)
}

// Draft 2 background — orbital starfield rendered into a 2D canvas that
// sits behind the r3f canvas. Ported from the CodePen reference: 1,400
// stars orbit around the viewport center with randomised radii/speeds
// and twinkle via alpha jitter. Uses a cached radial-gradient star sprite
// and 'lighter' composite for the additive bloom effect.
function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    const hue = 217
    const maxStars = 1400

    // Pre-render a single star sprite to its own offscreen canvas.
    const sprite = document.createElement('canvas')
    sprite.width = 100
    sprite.height = 100
    const spriteCtx = sprite.getContext('2d')!
    const half = sprite.width / 2
    const g = spriteCtx.createRadialGradient(half, half, 0, half, half, half)
    g.addColorStop(0.025, '#fff')
    g.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`)
    g.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`)
    g.addColorStop(1, 'transparent')
    spriteCtx.fillStyle = g
    spriteCtx.beginPath()
    spriteCtx.arc(half, half, half, 0, Math.PI * 2)
    spriteCtx.fill()

    const rand = (min: number, max?: number) => {
      if (max === undefined) {
        max = min
        min = 0
      }
      if (min > max) [min, max] = [max, min]
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    const maxOrbit = (x: number, y: number) => {
      const m = Math.max(x, y)
      return Math.round(Math.sqrt(m * m + m * m)) / 2
    }

    interface StarT {
      orbitRadius: number
      radius: number
      orbitX: number
      orbitY: number
      timePassed: number
      speed: number
      alpha: number
    }
    const stars: StarT[] = []
    const mkStar = (): StarT => ({
      orbitRadius: rand(maxOrbit(w, h)),
      // Radius halved (was /12) so stars render as small pinpricks rather
      // than obvious blobs.
      radius: rand(60, rand(maxOrbit(w, h))) / 24,
      orbitX: w / 2,
      orbitY: h / 2,
      timePassed: rand(0, maxStars),
      speed: rand(rand(maxOrbit(w, h))) / 50000,
      alpha: rand(2, 10) / 10,
    })
    for (let i = 0; i < maxStars; i += 1) stars.push(mkStar())

    let rafId = 0
    const frame = () => {
      // Transparent trail fade so the ethereal-shadow backdrop shows
      // through the stars. Lower alpha = longer trails; this value keeps
      // smooth motion blur without painting the canvas solid dark.
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 0.25
      ctx.fillStyle = `hsla(${hue}, 64%, 6%, 1)`
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      for (const s of stars) {
        const x = Math.sin(s.timePassed) * s.orbitRadius + s.orbitX
        const y = Math.cos(s.timePassed) * s.orbitRadius + s.orbitY
        const tw = rand(10)
        if (tw === 1 && s.alpha > 0) s.alpha -= 0.05
        else if (tw === 2 && s.alpha < 1) s.alpha += 0.05
        ctx.globalAlpha = s.alpha
        ctx.drawImage(sprite, x - s.radius / 2, y - s.radius / 2, s.radius, s.radius)
        s.timePassed += s.speed
      }
      rafId = window.requestAnimationFrame(frame)
    }
    frame()

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      stars.forEach((s) => {
        s.orbitX = w / 2
        s.orbitY = h / 2
      })
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    // No inline background — the ethereal-shadow layer paints behind this
    // canvas, so keeping the element transparent lets that backdrop show.
    <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
  )
}

export default function Hero05({
  tr,
  h1Override,
  subheadOverride,
  eyebrowOverride,
  variant: controlledVariant,
  onVariantChange,
}: Props) {
  const isKo = tr.steps.s1.role.includes('수집')
  const [internalVariant, setInternalVariant] = useState<Hero05Variant>('1')
  const variant = controlledVariant ?? internalVariant
  const setVariant = (v: Hero05Variant) => {
    if (onVariantChange) onVariantChange(v)
    else setInternalVariant(v)
  }
  const eyebrow = eyebrowOverride ?? (isKo ? 'CENTRALIZED DATA CONTROL TOWER' : 'CENTRALIZED DATA CONTROL TOWER')
  const subhead =
    subheadOverride ??
    (isKo
      ? '흩어진 영상, IoT, 운영 데이터를 하나의 중앙 허브로 모아 실시간 흐름과 의사결정을 제어합니다.'
      : 'Unify video, IoT, and operations data into one central hub for real-time flow control and decisions.')
  const keywords = isKo ? ['INGEST', 'UNIFY', 'MONITOR', 'ACT'] : ['INGEST', 'UNIFY', 'MONITOR', 'ACT']

  const isDraft2 = variant === '2'
  const isDraft3 = variant === '3'
  const minimalScene = isDraft2 || isDraft3

  return (
    <section
      className={`relative overflow-hidden bg-[#050507] ${
        isDraft3 ? 'min-h-screen' : isDraft2 ? 'min-h-[92vh]' : 'min-h-[82vh]'
      }`}
    >
      {/* Draft 2 backdrop — ethereal-shadow with full 0→360 hue cycle
          (morphs through purples/pinks). */}
      {isDraft2 && <EtherealShadowBackground hueSweep={[0, 360]} />}
      {/* Draft 3 backdrop — MP4 video from the glass-video-hero reference,
          tinted cool blue (the source video skews purple, so a blue overlay
          pushes it back into the icy tone shown in the reference renders). */}
      {isDraft3 && (
        <>
          <VideoHeroBackground />
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              backgroundColor: 'rgba(30, 90, 200, 0.32)',
              mixBlendMode: 'color',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                'linear-gradient(180deg, rgba(8,18,40,0.25) 0%, rgba(8,18,40,0) 35%, rgba(8,18,40,0) 65%, rgba(8,18,40,0.45) 100%)',
            }}
          />
        </>
      )}

      {/* Blue ambient glow — titangate style */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 45%, rgba(77,138,255,0.22) 0%, rgba(26,54,93,0.08) 40%, transparent 75%), radial-gradient(ellipse at 20% 85%, rgba(77,138,255,0.08) 0%, transparent 50%)',
        }}
      />

      {/* Circuit grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(77,138,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(77,138,255,0.035) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse at 50% 50%, black 20%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 50%, black 20%, transparent 85%)',
        }}
      />

      {/* Corner HUD brackets — all four corners, all drafts. */}
      <div className="pointer-events-none absolute top-20 left-6 md:left-10 z-10 w-6 h-6 border-t border-l border-blue-400/40" />
      <div className="pointer-events-none absolute top-20 right-6 md:right-10 z-10 w-6 h-6 border-t border-r border-blue-400/40" />
      <div className="pointer-events-none absolute bottom-20 left-6 md:left-10 z-10 w-6 h-6 border-b border-l border-blue-400/40" />
      <div className="pointer-events-none absolute bottom-20 right-6 md:right-10 z-10 w-6 h-6 border-b border-r border-blue-400/40" />

      {/* Thin horizontal rules — institutional scaffolding */}
      <div className="pointer-events-none absolute inset-x-0 top-[18%] h-px bg-gradient-to-r from-transparent via-blue-400/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[18%] h-px bg-gradient-to-r from-transparent via-blue-400/10 to-transparent" />

      {/* Draft switcher — anchored to the top-left (navbar region) so it
          stays out of the hero composition; previously centered which
          competed visually with the headline. */}
      <div className="fixed left-4 top-4 z-50 flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#07111f]/80 p-1 font-grotesk text-[10px] uppercase tracking-[0.16em] text-white/60 backdrop-blur-md md:left-6 md:top-5 md:text-[11px]">
        {HERO05_SWITCHER.map((item) => {
          if (item.kind === 'link') {
            return (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-md px-3 py-1.5 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                {item.label}
              </Link>
            )
          }
          const active = item.id === variant
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setVariant(item.id)}
              className={`rounded-md px-3 py-1.5 transition-colors ${
                active
                  ? 'bg-cyan-300/18 text-cyan-100 shadow-[inset_0_0_0_1px_rgba(125,216,255,0.28)]'
                  : 'hover:bg-white/[0.06] hover:text-white'
              }`}
              aria-pressed={active}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {/* 3D scene */}
      <div className="absolute inset-0">
        <Canvas
          shadows
          camera={{ position: [0, 1.8, 5.8], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Scene variant={variant} />
          </Suspense>
        </Canvas>
      </div>

      {/* Text overlay */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-none relative z-10 flex items-center ${
          isDraft3 ? 'min-h-screen' : isDraft2 ? 'min-h-[92vh]' : 'min-h-[82vh]'
        }`}
      >
        <div className="mx-auto w-full max-w-[1280px] px-8 md:px-12">
          <div className={minimalScene ? 'text-center flex flex-col items-center' : ''}>
            {/* Pre-headline slot — Draft 3 shows the keyword bar here (in
                place of the eyebrow). All other drafts keep the terminal
                prefix + eyebrow text. */}
            {isDraft3 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-4 inline-flex items-center gap-5 md:gap-7 px-4 md:px-5 py-1.5 md:py-2 rounded-lg bg-white/[0.04] backdrop-blur-md pointer-events-auto"
              >
                {keywords.map((word, i, arr) => (
                  <span key={word} className="inline-flex items-center gap-5 md:gap-7">
                    <HoverGlitchWord text={word} />
                    {i < arr.length - 1 && (
                      <span className="font-grotesk text-white/10 text-sm md:text-base font-light" aria-hidden>
                        /
                      </span>
                    )}
                  </span>
                ))}
              </motion.div>
            ) : isDraft2 ? null : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-grotesk text-[11px] md:text-xs uppercase tracking-[0.25em] text-blue-300/70 mb-4"
              >
                <span className="text-blue-400">&gt;</span>{' '}
                <AsciiGlitchText
                  text={eyebrow}
                  duration={1100}
                  delay={200}
                  trigger={variant}
                />
              </motion.div>
            )}

            {/* Headline — Bricolage Grotesque, with parallel-line glitch reveal */}
            <h1 className="font-bricolage text-[52px] sm:text-[68px] md:text-7xl lg:text-[104px] xl:text-[120px] font-semibold text-white leading-[1.02] tracking-[-0.005em] mb-6 md:mb-8 break-keep whitespace-pre-line drop-shadow-[0_0_28px_rgba(77,138,255,0.25)]">
              <AsciiGlitchText
                text={h1Override ?? 'From Video\nto Decisions'}
                duration={1600}
                delay={500}
                stable
                parallelLines
                trigger={variant}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className={`mb-7 text-[15px] md:text-lg leading-7 md:leading-8 text-slate-200/72 ${
                minimalScene ? 'max-w-none whitespace-nowrap' : 'max-w-[560px]'
              }`}
            >
              {subhead}
            </motion.p>

            {/* Keyword bar below subhead — Draft 1 / 2 only. Draft 3 renders
                the keyword bar above the h1 (see pre-headline slot). */}
            {!isDraft3 && (
              <div className="inline-flex items-center gap-5 md:gap-7 px-4 md:px-5 py-1.5 md:py-2 rounded-lg bg-white/[0.04] backdrop-blur-md pointer-events-auto">
                {keywords.map((word, i, arr) => (
                  <span key={word} className="inline-flex items-center gap-5 md:gap-7">
                    <HoverGlitchWord text={word} />
                    {i < arr.length - 1 && (
                      <span className="font-grotesk text-white/10 text-sm md:text-base font-light" aria-hidden>
                        /
                      </span>
                    )}
                  </span>
                ))}
              </div>
            )}

          </div>
        </div>
      </motion.div>

      {/* Terminal status bar — bottom, looping glitch text */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 z-10 bg-[#060810]/40 backdrop-blur-md">
        {/* Marching-ants dashed line above LIVE (replaces solid border) */}
        <div className="marching-ants h-px w-full" aria-hidden />
        <div className="mx-auto w-full max-w-[1280px] px-8 md:px-12 py-2.5 flex items-center justify-between gap-6 font-grotesk text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-blue-300/70">
          {/* Left: version — hidden in Draft 2 / Draft 3 */}
          {!minimalScene ? (
            <div className="flex items-center gap-2 text-white/70">
              <AsciiGlitchText
                text="N3N.OS v4.2.1"
                duration={1400}
                delay={1600}
              />
            </div>
          ) : (
            <div />
          )}

          {/* Middle: metrics (md+) — looping glitch scramble */}
          <div className="hidden md:flex items-center gap-5 text-white/50">
            <span>
              <AsciiGlitchText text="SOURCES 248" duration={1400} delay={2000} loop loopPauseMs={4500} />
            </span>
            <span className="text-white/20">·</span>
            <span>
              <AsciiGlitchText text="SYNC 24/7" duration={1400} delay={2300} loop loopPauseMs={5000} />
            </span>
            <span className="text-white/20">·</span>
            <span>
              <AsciiGlitchText text="CONTROL CORE ONLINE" duration={1400} delay={2600} loop loopPauseMs={5500} />
            </span>
          </div>

          {/* Right: LIVE status pill */}
          <div className="flex items-center gap-2 text-blue-300/90">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_currentColor] animate-pulse" />
            <span className="font-semibold">LIVE</span>
          </div>
        </div>
      </div>
    </section>
  )
}
