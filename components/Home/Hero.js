import React from 'react'
import { LogIn, UserPlus, ShieldCheck, MoonStar, Coins, Sparkles } from 'lucide-react'

const ROWS = 6
const SPACING = 28
const TOP = 72
const ROW_GAP = 38
const CYCLE = 4.8
const MULTIPLIERS = ['10x', '3x', '1.5x', '0.5x', '1.5x', '3x', '10x']

const DROPS = [
  { dirs: [1, 1, -1, 1, 1, 1], begin: 0 },
  { dirs: [-1, -1, -1, 1, -1, -1], begin: 1.6 },
  { dirs: [1, -1, -1, 1, 1, -1], begin: 3.2 },
]

const buildDrop = (dirs) => {
  let offset = 0
  let d = `M200,48 L200,${TOP - 11}`
  dirs.forEach((dir, r) => {
    const x1 = 200 + offset
    const y1 = TOP + r * ROW_GAP - 11
    offset += dir * (SPACING / 2)
    const x2 = 200 + offset
    const y2 = r === ROWS - 1 ? 302 : TOP + (r + 1) * ROW_GAP - 11
    d += ` Q${(x1 + x2) / 2},${y1 - 20} ${x2},${y2}`
  })
  return { path: d, bucket: Math.round(offset / SPACING) + 3 }
}

const DROP_PATHS = DROPS.map((drop) => ({ ...drop, ...buildDrop(drop.dirs) }))

const PEGS = []
for (let r = 0; r < ROWS; r++) {
  const count = r + 3
  for (let i = 0; i < count; i++) {
    PEGS.push({ x: 200 + (i - (count - 1) / 2) * SPACING, y: TOP + r * ROW_GAP, key: `${r}-${i}` })
  }
}

const STARS = [
  [24, 40, 1.6], [86, 150, 1.2], [150, 22, 1.4], [330, 30, 1.8], [380, 150, 1.2],
  [20, 260, 1.4], [372, 360, 1.6], [250, 384, 1.2], [140, 392, 1.4], [392, 250, 1.2],
]

function CasinoArt() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gbGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="gbRim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2557" />
          <stop offset="100%" stopColor="#070618" />
        </linearGradient>
        <radialGradient id="gbBall" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#fff7cc" />
          <stop offset="55%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
      </defs>

      {STARS.map(([x, y, r], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill="#e9d5ff"
          className="gb-star"
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}

      <circle cx="200" cy="200" r="195" fill="url(#gbGlow)" className="gb-pulse" />

      <circle cx="200" cy="200" r="172" fill="url(#gbRim)" stroke="url(#gbGold)" strokeWidth="4" />
      <circle
        cx="200"
        cy="200"
        r="158"
        fill="none"
        stroke="#fbbf24"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        strokeDasharray="2 12"
        strokeLinecap="round"
        className="gb-spin"
        style={{ transformOrigin: '200px 200px' }}
      />

      {PEGS.map((peg) => (
        <circle key={peg.key} cx={peg.x} cy={peg.y} r="3.5" fill="#cfc9ff" fillOpacity="0.85" />
      ))}

      {MULTIPLIERS.map((label, k) => {
        const cx = 200 + (k - 3) * SPACING
        const edge = k === 0 || k === 6
        return (
          <g key={k}>
            <rect
              x={cx - 12.5}
              y="290"
              width="25"
              height="28"
              rx="6"
              fill={edge ? 'url(#gbGold)' : '#1a1640'}
              stroke={edge ? '#b45309' : '#2a2557'}
              strokeWidth="1.5"
            />
            <text
              x={cx}
              y="308"
              textAnchor="middle"
              fontSize="8.5"
              fontWeight="700"
              fill={edge ? '#2a1a00' : '#e9e6ff'}
            >
              {label}
            </text>
          </g>
        )
      })}

      {DROP_PATHS.map((drop, i) => (
        <rect
          key={`hit-${i}`}
          className="gb-hit"
          x={200 + (drop.bucket - 3) * SPACING - 12.5}
          y="290"
          width="25"
          height="28"
          rx="6"
          fill="#fde68a"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0;0.9;0"
            keyTimes="0;0.72;0.76;1"
            dur={`${CYCLE}s`}
            begin={`${drop.begin}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}

      {DROP_PATHS.map((drop, i) => (
        <g key={`ball-${i}`} className="gb-ball" opacity="0">
          <circle r="9" fill="#fbbf24" fillOpacity="0.28" />
          <circle r="6" fill="url(#gbBall)" />
          <animateMotion
            path={drop.path}
            dur={`${CYCLE}s`}
            begin={`${drop.begin}s`}
            repeatCount="indefinite"
            calcMode="linear"
            keyPoints="0;1;1"
            keyTimes="0;0.72;1"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0;0"
            keyTimes="0;0.03;0.78;0.88;1"
            dur={`${CYCLE}s`}
            begin={`${drop.begin}s`}
            repeatCount="indefinite"
          />
        </g>
      ))}

      <g className="gb-float" style={{ transformOrigin: '68px 90px' }}>
        <rect x="40" y="62" width="56" height="56" rx="12" fill="#f8fafc" stroke="#a78bfa" strokeWidth="2" />
        <circle cx="56" cy="78" r="5" fill="#070618" />
        <circle cx="68" cy="90" r="5" fill="#070618" />
        <circle cx="80" cy="102" r="5" fill="#070618" />
      </g>

      <g className="gb-float-b" style={{ transformOrigin: '333px 290px' }}>
        <rect x="305" y="262" width="56" height="56" rx="12" fill="#f8fafc" stroke="#a78bfa" strokeWidth="2" />
        <circle cx="321" cy="278" r="5" fill="#dc2626" />
        <circle cx="345" cy="278" r="5" fill="#dc2626" />
        <circle cx="333" cy="290" r="5" fill="#dc2626" />
        <circle cx="321" cy="302" r="5" fill="#dc2626" />
        <circle cx="345" cy="302" r="5" fill="#dc2626" />
      </g>

      <g className="gb-card" style={{ transformOrigin: '340px 90px' }}>
        <rect x="312" y="52" width="56" height="78" rx="8" fill="#f8fafc" stroke="#a78bfa" strokeWidth="2" />
        <text x="322" y="76" fill="#dc2626" fontSize="18" fontWeight="800">A</text>
        <path d="M340 108 C326 96 328 84 336 84 C339 84 340 87 340 87 C340 87 341 84 344 84 C352 84 354 96 340 108 Z" fill="#dc2626" />
      </g>

      <g className="gb-coin" style={{ transformOrigin: '60px 320px' }}>
        <ellipse cx="60" cy="320" rx="26" ry="26" fill="url(#gbGold)" stroke="#b45309" strokeWidth="3" />
        <ellipse cx="60" cy="320" rx="18" ry="18" fill="none" stroke="#b45309" strokeWidth="2" />
        <path d="M60 308 L63 317 L72 320 L63 323 L60 332 L57 323 L48 320 L57 317 Z" fill="#b45309" />
      </g>

      <g className="gb-coin-b" style={{ transformOrigin: '110px 360px' }}>
        <ellipse cx="110" cy="360" rx="16" ry="16" fill="url(#gbGold)" stroke="#b45309" strokeWidth="2.5" />
        <ellipse cx="110" cy="360" rx="10" ry="10" fill="none" stroke="#b45309" strokeWidth="1.5" />
      </g>
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="@container w-full min-w-0 max-w-full">
      <style>{`
        @keyframes gb-spin { to { transform: rotate(360deg); } }
        @keyframes gb-float { 0%,100% { transform: translateY(0) rotate(-8deg); } 50% { transform: translateY(-14px) rotate(10deg); } }
        @keyframes gb-float-b { 0%,100% { transform: translateY(0) rotate(12deg); } 50% { transform: translateY(12px) rotate(-10deg); } }
        @keyframes gb-card { 0%,100% { transform: translateY(0) rotate(14deg); } 50% { transform: translateY(-10px) rotate(6deg); } }
        @keyframes gb-coin { 0%,100% { transform: scaleX(1) translateY(0); } 50% { transform: scaleX(0.25) translateY(-12px); } }
        @keyframes gb-pulse { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
        @keyframes gb-star { 0%,100% { opacity: 0.15; } 50% { opacity: 1; } }
        .gb-spin { animation: gb-spin 18s linear infinite; }
        .gb-float { animation: gb-float 5s ease-in-out infinite; }
        .gb-float-b { animation: gb-float-b 6s ease-in-out infinite; }
        .gb-card { animation: gb-card 5.5s ease-in-out infinite; }
        .gb-coin { animation: gb-coin 2.4s ease-in-out infinite; }
        .gb-coin-b { animation: gb-coin 3s ease-in-out infinite reverse; }
        .gb-pulse { animation: gb-pulse 4s ease-in-out infinite; }
        .gb-star { animation: gb-star 2.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .gb-spin,.gb-float,.gb-float-b,.gb-card,.gb-coin,.gb-coin-b,.gb-pulse,.gb-star { animation: none; }
          .gb-ball,.gb-hit { display: none; }
        }
      `}</style>

      <div className="relative overflow-hidden rounded-2xl border border-galaxy-border bg-galaxy-surface p-5 @md:p-8 @5xl:p-12">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-galaxy-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-galaxy-raised/60 via-transparent to-galaxy-bg/80" />

        <div className="relative grid items-center gap-8 @3xl:grid-cols-2 @5xl:gap-12">
          <div className="order-2 min-w-0 text-center @3xl:order-1 @3xl:text-left">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 @3xl:justify-start">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <MoonStar size={14} />
                100% Islamic &amp; Halal
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-galaxy-gold/30 bg-galaxy-gold/10 px-3 py-1 text-xs font-semibold text-galaxy-gold">
                <Coins size={14} />
                Virtual Coins Only
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight text-white @md:text-4xl @5xl:text-5xl">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-galaxy-gold bg-clip-text text-transparent">
                Galaxy Bets
              </span>
            </h1>

            <p className="mt-4 text-base font-medium text-slate-100 @md:text-lg">
              Login or register now to start playing.
            </p>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400 @md:text-base @3xl:mx-0">
              Galaxy Bets is a virtual land of casino-style games. Everything runs on free virtual coins,
              with no real money, no deposits and no cash prizes. It is built to be 100% Islamic and halal,
              so you can enjoy the fun of the games with a clear conscience.
            </p>

            <div className="mt-6 flex flex-col items-stretch gap-3 @md:flex-row @md:justify-center @3xl:justify-start">
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/30 transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-fuchsia-500 @md:text-base">
                <UserPlus size={18} />
                Register
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-galaxy-border bg-galaxy-card px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-galaxy-raised @md:text-base">
                <LogIn size={18} />
                Login
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400 @3xl:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-emerald-400" />
                No real-money gambling
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles size={15} className="text-galaxy-gold" />
                Free demo coins for everyone
              </span>
            </div>
          </div>

          <div className="order-1 mx-auto aspect-square w-full max-w-[240px] @md:max-w-xs @3xl:order-2 @3xl:max-w-md">
            <CasinoArt />
          </div>
        </div>
      </div>
    </section>
  )
}