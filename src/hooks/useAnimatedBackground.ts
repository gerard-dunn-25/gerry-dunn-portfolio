import { useEffect, useRef } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────

interface ScatteredPoint {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

interface MandalaPoint {
  x: number
  y: number
  lcx: number
  lcy: number
  arcR: number
  initAngle: number
  oscSpeed: number
  oscPhase: number
  oscAmp: number
  lobe: number
  ring: number
  type:
    | 'trinity'
    | 'core'
    | 'mandala'
    | 'centre'
    | 'petal-inner'
    | 'petal-outer'
    | 'petal2-inner'
    | 'petal2-outer'
  ringN?: number
  ringIdx?: number
  petalIdx?: number
}

interface Ripple {
  x: number
  y: number
  r: number
  max: number
  alpha: number
  speed: number
}

interface PendingRipple {
  x: number
  y: number
  strength: number
  framesDelay: number
}

interface ThemeConfig {
  bg: [string, string]
  nodeColor: string
  nodeAlpha: number
  edgeBase: [number, number, number]
  edgeRipple: [number, number, number]
  mandalaAlpha: { spoke: number; ring: number; adjacent: number }
  meshAlphaMax: number
  rippleColor: string
  mandalaDim: string
}

// ── Palettes ───────────────────────────────────────────────────────────────

const THEMES: Record<'dark' | 'light', ThemeConfig> = {
  dark: {
    bg: ['#0a0800', '#120f02'],
    nodeColor: 'rgba(196,154,53,',
    nodeAlpha: 0.5,
    edgeBase: [180, 130, 40],
    edgeRipple: [240, 200, 90],
    mandalaAlpha: { spoke: 0.22, ring: 0.32, adjacent: 0.18 },
    meshAlphaMax: 0.22,
    rippleColor: 'rgba(210,165,60,',
    mandalaDim: 'rgba(200,155,55,',
  },
  light: {
    bg: ['#e8edf0', '#d4dde2'],
    nodeColor: 'rgba(45,110,120,',
    nodeAlpha: 0.55,
    edgeBase: [70, 140, 150],
    edgeRipple: [20, 90, 105],
    mandalaAlpha: { spoke: 0.3, ring: 0.4, adjacent: 0.25 },
    meshAlphaMax: 0.32,
    rippleColor: 'rgba(50,130,145,',
    mandalaDim: 'rgba(80,150,160,',
  },
}

// ── Hook ───────────────────────────────────────────────────────────────────

export function useAnimatedBackground(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  isDark: boolean,
) {
  const isDarkRef = useRef(isDark)
  useEffect(() => {
    isDarkRef.current = isDark
  }, [isDark])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    let W = 0
    let H = 0
    let animId: number
    let pts: ScatteredPoint[] = []
    let mandalaPts: MandalaPoint[] = []
    let ripples: Ripple[] = []
    let pendingRipples: PendingRipple[] = []
    let lastScroll = 0
    const mouse = { x: -9999, y: -9999 }

    // ── Build points ────────────────────────────────────────────────────────

    function buildPoints() {
      pts = []
      mandalaPts = []

      const cx = W / 2
      const cy = H / 2
      const unit = Math.min(W, H)

      // Scattered background points
      const N = Math.min(60, Math.floor((W * H) / 16000))
      for (let i = 0; i < N; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 1.2 + 0.8,
        })
      }

      function addPt(obj: MandalaPoint) {
        mandalaPts.push(obj)
      }

      // Trinity knot lobes
      const lobeOffset = unit * 0.11
      const arcR = unit * 0.185
      const arcSpan = Math.PI * 1.32
      const lobePts = 18

      for (let lobe = 0; lobe < 3; lobe++) {
        const lobeAngle = Math.PI / 2 + (lobe / 3) * Math.PI * 2
        const lcx = cx + Math.cos(lobeAngle) * lobeOffset
        const lcy = cy + Math.sin(lobeAngle) * lobeOffset
        const arcStart = lobeAngle + Math.PI - arcSpan / 2
        const oscSpeed = (lobe % 2 === 0 ? 1 : -1) * 0.00035

        for (let i = 0; i < lobePts; i++) {
          const frac = i / (lobePts - 1)
          const initAngle = arcStart + frac * arcSpan
          addPt({
            lcx,
            lcy,
            arcR,
            initAngle,
            oscSpeed,
            oscPhase: frac * Math.PI * 2,
            oscAmp: 0.028,
            lobe,
            ring: lobe,
            type: 'trinity',
            x: lcx + Math.cos(initAngle) * arcR,
            y: lcy + Math.sin(initAngle) * arcR,
          })
        }
      }

      // Inner triangle
      for (let i = 0; i < 3; i++) {
        const angle = Math.PI / 2 + (i / 3) * Math.PI * 2
        const r = unit * 0.05
        addPt({
          lcx: cx,
          lcy: cy,
          arcR: r,
          initAngle: angle,
          oscSpeed: 0.0001,
          oscPhase: (i / 3) * Math.PI * 2,
          oscAmp: 0.035,
          lobe: -2,
          ring: 3,
          type: 'core',
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
        })
      }

      // Mandala rings
      const ringDefs = [
        { r: unit * 0.265, n: 12, oscSpeed: 0.00013, oscAmp: 0.015 },
        { r: unit * 0.34, n: 18, oscSpeed: -0.00009, oscAmp: 0.012 },
        { r: unit * 0.405, n: 24, oscSpeed: 0.00007, oscAmp: 0.01 },
        { r: unit * 0.5, n: 30, oscSpeed: -0.00005, oscAmp: 0.008 },
      ]

      ringDefs.forEach(({ r, n, oscSpeed, oscAmp }, ri) => {
        for (let i = 0; i < n; i++) {
          const initAngle =
            (i / n) * Math.PI * 2 + (ri % 2 === 0 ? 0 : Math.PI / n)
          addPt({
            lcx: cx,
            lcy: cy,
            arcR: r,
            initAngle,
            oscSpeed,
            oscPhase: (i / n) * Math.PI * 2,
            oscAmp,
            lobe: -3,
            ring: 10 + ri,
            type: 'mandala',
            ringN: n,
            ringIdx: ri,
            x: cx + Math.cos(initAngle) * r,
            y: cy + Math.sin(initAngle) * r,
          })
        }
      })

      // Petal layer 1
      const petalCount = 24
      const petalInnerR = unit * 0.265
      const petalOuterR = unit * 0.5

      for (let i = 0; i < petalCount; i++) {
        const mid = (i / petalCount) * Math.PI * 2
        const osc = 0.000035
        const phase = (i / petalCount) * Math.PI * 2
        addPt({
          lcx: cx,
          lcy: cy,
          arcR: petalInnerR,
          initAngle: mid,
          oscSpeed: osc,
          oscPhase: phase,
          oscAmp: 0.004,
          lobe: -4,
          ring: 20,
          type: 'petal-inner',
          petalIdx: i,
          x: cx + Math.cos(mid) * petalInnerR,
          y: cy + Math.sin(mid) * petalInnerR,
        })
        addPt({
          lcx: cx,
          lcy: cy,
          arcR: petalOuterR,
          initAngle: mid,
          oscSpeed: osc,
          oscPhase: phase + 0.3,
          oscAmp: 0.004,
          lobe: -4,
          ring: 21,
          type: 'petal-outer',
          petalIdx: i,
          x: cx + Math.cos(mid) * petalOuterR,
          y: cy + Math.sin(mid) * petalOuterR,
        })
      }

      // Petal layer 2
      const petal2InnerR = unit * 0.265
      const petal2OuterR = unit * 0.405
      const petalOffset = Math.PI / petalCount

      for (let i = 0; i < petalCount; i++) {
        const mid = (i / petalCount) * Math.PI * 2 + petalOffset
        const osc = 0.000035
        const phase = (i / petalCount) * Math.PI * 2
        addPt({
          lcx: cx,
          lcy: cy,
          arcR: petal2InnerR,
          initAngle: mid,
          oscSpeed: osc,
          oscPhase: phase,
          oscAmp: 0.004,
          lobe: -5,
          ring: 22,
          type: 'petal2-inner',
          petalIdx: i,
          x: cx + Math.cos(mid) * petal2InnerR,
          y: cy + Math.sin(mid) * petal2InnerR,
        })
        addPt({
          lcx: cx,
          lcy: cy,
          arcR: petal2OuterR,
          initAngle: mid,
          oscSpeed: osc,
          oscPhase: phase + 0.3,
          oscAmp: 0.004,
          lobe: -5,
          ring: 23,
          type: 'petal2-outer',
          petalIdx: i,
          x: cx + Math.cos(mid) * petal2OuterR,
          y: cy + Math.sin(mid) * petal2OuterR,
        })
      }

      // Centre
      addPt({
        x: cx,
        y: cy,
        lcx: cx,
        lcy: cy,
        lobe: -1,
        ring: -1,
        type: 'centre',
        oscSpeed: 0,
        oscPhase: 0,
        oscAmp: 0,
        arcR: 0,
        initAngle: 0,
      })
    }

    // ── Resize ───────────────────────────────────────────────────────────────

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      buildPoints()
    }

    // ── Ripple ───────────────────────────────────────────────────────────────

    function spawnRipple(x: number, y: number, strength: number) {
      const staggerFrames = 18 // ~0.3s between rings at 60fps
      for (let i = 0; i < 3; i++) {
        pendingRipples.push({
          x,
          y,
          strength: strength * (1 - i * 0.15), // each successive ring slightly weaker
          framesDelay: i * staggerFrames,
        })
      }
    }

    // ── Draw ─────────────────────────────────────────────────────────────────

    function draw() {
      const th = isDarkRef.current ? THEMES.dark : THEMES.light

      ctx.clearRect(0, 0, W, H)

      // Background gradient
      const bg = ctx.createLinearGradient(0, 0, W * 0.6, H)
      bg.addColorStop(0, th.bg[0])
      bg.addColorStop(1, th.bg[1])
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      const cx = W / 2
      const cy = H / 2
      const unit = Math.min(W, H)

      // Update mandala points
      mandalaPts.forEach((p) => {
        if (p.ring < 0) return
        p.oscPhase += p.oscSpeed
        const angle = p.initAngle + Math.sin(p.oscPhase) * p.oscAmp
        p.x = p.lcx + Math.cos(angle) * p.arcR
        p.y = p.lcy + Math.sin(angle) * p.arcR

        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 90 && d > 0) {
          const f = (90 - d) / 90
          p.x += (dx / d) * f * 10
          p.y += (dy / d) * f * 10
        }
      })

      // Update scattered points
      pts.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1

        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 130 && d > 0) {
          const f = (130 - d) / 130
          p.x += (dx / d) * f * 2.2
          p.y += (dy / d) * f * 2.2
        }
      })

      // Ripple influence
      function rippleAt(x: number, y: number): number {
        let influence = 0
        ripples.forEach((rip) => {
          const d = Math.sqrt((x - rip.x) ** 2 + (y - rip.y) ** 2)
          const wave = Math.abs(d - rip.r)
          if (wave < 40)
            influence = Math.max(influence, (1 - wave / 40) * rip.alpha)
        })
        return influence
      }

      // Edge drawing helper
      function drawEdge(
        ax: number,
        ay: number,
        bx: number,
        by: number,
        alpha: number,
        rip: number,
      ) {
        const [er, eg, eb] = th.edgeBase
        const [rr, rg, rb] = th.edgeRipple
        const r2 = Math.floor(er + (rr - er) * rip)
        const g2 = Math.floor(eg + (rg - eg) * rip)
        const b2 = Math.floor(eb + (rb - eb) * rip)
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.strokeStyle = `rgba(${r2},${g2},${b2},${alpha + rip * 0.5})`
        ctx.lineWidth = 0.6 + rip * 1.2
        ctx.stroke()
      }

      const allM = mandalaPts
      const trinityPts = allM.filter(
        (p) => p.type === 'trinity' || p.type === 'core',
      )
      const ringPts = allM.filter((p) => p.type === 'mandala')
      const rings = [0, 1, 2, 3].map((ri) =>
        ringPts.filter((p) => p.ringIdx === ri),
      )

      // 1. Trinity lobe connections
      for (let i = 0; i < allM.length; i++) {
        for (let j = i + 1; j < allM.length; j++) {
          const a = allM[i]
          const b = allM[j]
          if (a.type !== 'trinity' && a.type !== 'core') continue
          if (b.type !== 'trinity' && b.type !== 'core') continue
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          const sameLobe = a.lobe >= 0 && a.lobe === b.lobe && d < unit * 0.17
          const crossLobe =
            a.lobe >= 0 && b.lobe >= 0 && a.lobe !== b.lobe && d < unit * 0.11
          const toCore = (a.lobe === -2 || b.lobe === -2) && d < unit * 0.18
          if (!sameLobe && !crossLobe && !toCore) continue
          const mx = (a.x + b.x) / 2
          const my = (a.y + b.y) / 2
          const rip = rippleAt(mx, my)
          const alpha = sameLobe
            ? th.mandalaAlpha.ring
            : crossLobe
              ? th.mandalaAlpha.adjacent
              : th.mandalaAlpha.spoke
          drawEdge(a.x, a.y, b.x, b.y, alpha, rip)
        }
      }

      // 2. Same-ring neighbour connections
      rings.forEach((ring) => {
        const n = ring.length
        for (let i = 0; i < n; i++) {
          const a = ring[i]
          const b = ring[(i + 1) % n]
          const mx = (a.x + b.x) / 2
          const my = (a.y + b.y) / 2
          const rip = rippleAt(mx, my)
          drawEdge(a.x, a.y, b.x, b.y, th.mandalaAlpha.ring * 0.75, rip)
        }
      })

      // 3. Radial spokes across rings
      if (rings[0] && rings[1] && rings[2] && rings[3]) {
        const n0 = rings[0].length
        for (let i = 0; i < n0; i++) {
          const a = rings[0][i]
          const targetAngle = a.initAngle
          const angleThresh = ((Math.PI * 2) / n0) * 0.6

          ;[rings[1], rings[2], rings[3]].forEach((ring, ri) => {
            const b = ring.reduce((best, p) => {
              const diff = Math.abs(
                ((p.initAngle - targetAngle + Math.PI * 3) % (Math.PI * 2)) -
                  Math.PI,
              )
              const bestDiff = Math.abs(
                ((best.initAngle - targetAngle + Math.PI * 3) % (Math.PI * 2)) -
                  Math.PI,
              )
              return diff < bestDiff ? p : best
            }, ring[0])
            const diff = Math.abs(
              ((b.initAngle - targetAngle + Math.PI * 3) % (Math.PI * 2)) -
                Math.PI,
            )
            if (diff < angleThresh) {
              const mx = (a.x + b.x) / 2
              const my = (a.y + b.y) / 2
              const rip = rippleAt(mx, my)
              drawEdge(
                a.x,
                a.y,
                b.x,
                b.y,
                th.mandalaAlpha.spoke * (0.9 - ri * 0.15),
                rip,
              )
            }
          })
        }
      }

      // 4. Petal cross-connections ring 0 → ring 1
      if (rings[0] && rings[1]) {
        const n0 = rings[0].length
        for (let i = 0; i < n0; i++) {
          const a = rings[0][i]
          const offsetAngle = a.initAngle + ((Math.PI * 2) / n0) * 0.5
          const b = rings[1].reduce((best, p) => {
            const diff = Math.abs(
              ((p.initAngle - offsetAngle + Math.PI * 3) % (Math.PI * 2)) -
                Math.PI,
            )
            const bestDiff = Math.abs(
              ((best.initAngle - offsetAngle + Math.PI * 3) % (Math.PI * 2)) -
                Math.PI,
            )
            return diff < bestDiff ? p : best
          }, rings[1][0])
          const mx = (a.x + b.x) / 2
          const my = (a.y + b.y) / 2
          const rip = rippleAt(mx, my)
          drawEdge(a.x, a.y, b.x, b.y, th.mandalaAlpha.adjacent * 0.5, rip)
        }
      }

      // 5. Spokes from trinity lobes to inner ring
      if (rings[0]) {
        trinityPts.forEach((tp) => {
          if (tp.lobe < 0) return
          const tpAngle = Math.atan2(tp.y - cy, tp.x - cx)
          const closest = rings[0].reduce((best, p) => {
            const diff = Math.abs(
              ((p.initAngle - tpAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI,
            )
            const bestDiff = Math.abs(
              ((best.initAngle - tpAngle + Math.PI * 3) % (Math.PI * 2)) -
                Math.PI,
            )
            return diff < bestDiff ? p : best
          }, rings[0][0])
          const dx = tp.x - closest.x
          const dy = tp.y - closest.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < unit * 0.18) {
            const mx = (tp.x + closest.x) / 2
            const my = (tp.y + closest.y) / 2
            const rip = rippleAt(mx, my)
            drawEdge(
              tp.x,
              tp.y,
              closest.x,
              closest.y,
              th.mandalaAlpha.spoke * 0.6,
              rip,
            )
          }
        })
      }

      // 6. Petal layer 1 bezier petals
      const petalInners = allM.filter((p) => p.type === 'petal-inner')
      const petalOuters = allM.filter((p) => p.type === 'petal-outer')

      function drawPetalLayer(
        inners: MandalaPoint[],
        outers: MandalaPoint[],
        alphaScale: number,
      ) {
        for (let i = 0; i < inners.length; i++) {
          const inner = inners[i]
          const outer = outers[i]
          if (!inner || !outer) continue

          const midR = (inner.arcR + outer.arcR) / 2
          const angle =
            inner.initAngle + Math.sin(inner.oscPhase) * inner.oscAmp
          const perpL = angle - Math.PI / 2
          const perpR = angle + Math.PI / 2
          const bulge = (outer.arcR - inner.arcR) * 0.42

          const ix = inner.x
          const iy = inner.y
          const ox = outer.x
          const oy = outer.y
          const mcx = cx + Math.cos(angle) * midR
          const mcy = cy + Math.sin(angle) * midR
          const cpLx = mcx + Math.cos(perpL) * bulge
          const cpLy = mcy + Math.sin(perpL) * bulge
          const cpRx = mcx + Math.cos(perpR) * bulge
          const cpRy = mcy + Math.sin(perpR) * bulge

          const mx = (ix + ox) / 2
          const my = (iy + oy) / 2
          const rip = rippleAt(mx, my)

          const [er, eg, eb] = th.edgeBase
          const [rr, rg, rb] = th.edgeRipple
          const r2 = Math.floor(er + (rr - er) * rip)
          const g2 = Math.floor(eg + (rg - eg) * rip)
          const b2 = Math.floor(eb + (rb - eb) * rip)
          const alpha = th.mandalaAlpha.ring * alphaScale + rip * 0.4

          ctx.beginPath()
          ctx.moveTo(ix, iy)
          ctx.quadraticCurveTo(cpLx, cpLy, ox, oy)
          ctx.strokeStyle = `rgba(${r2},${g2},${b2},${alpha})`
          ctx.lineWidth = 0.7 + rip * 1.1
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(ix, iy)
          ctx.quadraticCurveTo(cpRx, cpRy, ox, oy)
          ctx.strokeStyle = `rgba(${r2},${g2},${b2},${alpha})`
          ctx.lineWidth = 0.7 + rip * 1.1
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(ix, iy)
          ctx.quadraticCurveTo(cpLx, cpLy, ox, oy)
          ctx.quadraticCurveTo(cpRx, cpRy, ix, iy)
          ctx.fillStyle = `rgba(${r2},${g2},${b2},${0.02 + rip * 0.04})`
          ctx.fill()
        }
      }

      drawPetalLayer(petalInners, petalOuters, 0.9)

      // Petal-to-ring connections
      const innerPetalRing = allM.filter(
        (p) => p.type === 'mandala' && p.ring === 10,
      )
      const outerPetalRing = allM.filter(
        (p) => p.type === 'mandala' && p.ring === 13,
      )

      petalInners.forEach((pi) => {
        innerPetalRing.forEach((or) => {
          const dx = pi.x - or.x
          const dy = pi.y - or.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < unit * 0.09) {
            const mx = (pi.x + or.x) / 2
            const my = (pi.y + or.y) / 2
            const rip = rippleAt(mx, my)
            drawEdge(pi.x, pi.y, or.x, or.y, th.mandalaAlpha.spoke * 0.45, rip)
          }
        })
      })

      petalOuters.forEach((po) => {
        outerPetalRing.forEach((or) => {
          const dx = po.x - or.x
          const dy = po.y - or.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < unit * 0.09) {
            const mx = (po.x + or.x) / 2
            const my = (po.y + or.y) / 2
            const rip = rippleAt(mx, my)
            drawEdge(po.x, po.y, or.x, or.y, th.mandalaAlpha.spoke * 0.35, rip)
          }
        })
      })

      // 7. Petal layer 2
      const petal2Inners = allM.filter((p) => p.type === 'petal2-inner')
      const petal2Outers = allM.filter((p) => p.type === 'petal2-outer')
      drawPetalLayer(petal2Inners, petal2Outers, 0.85)

      // 8. Scattered mesh
      const DIST = 170
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d > DIST) continue

          const mx = (pts[i].x + pts[j].x) / 2
          const my = (pts[i].y + pts[j].y) / 2
          const rip = rippleAt(mx, my)
          const fadeAlpha = (1 - d / DIST) * th.meshAlphaMax
          const [er, eg, eb] = th.edgeBase
          const [rr, rg, rb] = th.edgeRipple
          const r = Math.floor(er + (rr - er) * rip)
          const g = Math.floor(eg + (rg - eg) * rip)
          const b = Math.floor(eb + (rb - eb) * rip)

          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(${r},${g},${b},${fadeAlpha + rip * 0.35})`
          ctx.lineWidth = 0.5 + rip * 0.8
          ctx.stroke()
        }
      }

      // 9. Ripple rings

      // Tick pending ripples into active ones
      pendingRipples = pendingRipples.filter((pr) => {
        pr.framesDelay--
        if (pr.framesDelay <= 0) {
          ripples.push({
            x: pr.x,
            y: pr.y,
            r: 18,
            max: Math.max(
              Math.hypot(pr.x, pr.y),
              Math.hypot(W - pr.x, pr.y),
              Math.hypot(pr.x, H - pr.y),
              Math.hypot(W - pr.x, H - pr.y),
            ),
            alpha: pr.strength,
            speed: 2.5 + Math.random() * 1.2,
          })
          return false
        }
        return true
      })

      ripples.forEach((rip) => {
        ctx.beginPath()
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2)
        const fade = rip.alpha * (1 - rip.r / rip.max)
        ctx.strokeStyle = th.rippleColor + fade * 0.7 + ')'
        ctx.lineWidth = 1.2
        ctx.stroke()

        if (rip.r > 20) {
          ctx.beginPath()
          ctx.arc(rip.x, rip.y, rip.r * 0.6, 0, Math.PI * 2)
          ctx.strokeStyle = th.rippleColor + fade * 0.2 + ')'
          ctx.lineWidth = 0.5
          ctx.stroke()
        }

        rip.r += rip.speed
        rip.alpha *= 0.992
      })
      ripples = ripples.filter((r) => r.r < r.max && r.alpha > 0.008)

      // 10. Mandala nodes
      allM.forEach((p) => {
        const rip = rippleAt(p.x, p.y)
        const size = (p.ring === -1 ? 3 : 1.5 - p.ring * 0.15) + rip * 2
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.8, size), 0, Math.PI * 2)
        ctx.fillStyle = th.mandalaDim + (0.5 + rip * 0.5) + ')'
        ctx.fill()
      })

      // 11. Scattered nodes
      pts.forEach((p) => {
        const rip = rippleAt(p.x, p.y)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size + rip * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = th.nodeColor + (th.nodeAlpha + rip * 0.4) + ')'
        ctx.fill()
      })
    }

    // ── Animation loop ───────────────────────────────────────────────────────

    function loop() {
      draw()
      animId = requestAnimationFrame(loop)
    }

    // ── Event listeners ──────────────────────────────────────────────────────

    function onClick(e: MouseEvent) {
      spawnRipple(e.clientX, e.clientY, 1.0)
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    function onTouch(e: TouchEvent) {
      const t = e.touches[0]
      spawnRipple(t.clientX, t.clientY, 1.0)
    }

    function onScroll() {
      const delta = window.scrollY - lastScroll
      lastScroll = window.scrollY
      void delta
      spawnRipple(W / 2, H / 2, 0.4)
    }

    resize()
    loop()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onClick)
    window.addEventListener('touchstart', onTouch)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('scroll', onScroll)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
