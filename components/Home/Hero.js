"use client";

import React from 'react'
import Link from 'next/link'
import { LogIn, UserPlus, ShieldCheck, Sparkles, Package, Swords } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const STARS = [
  [24, 40, 1.6], [86, 150, 1.2], [150, 22, 1.4], [330, 30, 1.8], [380, 150, 1.2],
  [20, 260, 1.4], [372, 360, 1.6], [250, 384, 1.2], [140, 392, 1.4], [392, 250, 1.2],
]

const RAY_COUNT = 12
const RAY_LENGTH = 150
const RAY_WIDTH = 0.1

const RAYS = Array.from({ length: RAY_COUNT }, (_, i) => {
  const a = (i / RAY_COUNT) * Math.PI * 2
  const x1 = 200 + RAY_LENGTH * Math.cos(a - RAY_WIDTH)
  const y1 = 210 + RAY_LENGTH * Math.sin(a - RAY_WIDTH)
  const x2 = 200 + RAY_LENGTH * Math.cos(a + RAY_WIDTH)
  const y2 = 210 + RAY_LENGTH * Math.sin(a + RAY_WIDTH)
  return `M200,210 L${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} Z`
})

const SPARKS = [
  { x: 112, y: 156, delay: 0 },
  { x: 292, y: 142, delay: 0.12 },
  { x: 150, y: 84, delay: 0.2 },
  { x: 258, y: 70, delay: 0.08 },
  { x: 326, y: 214, delay: 0.16 },
]

function PackArt() {
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
        <linearGradient id="gbBox" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#3b1a8a" />
        </linearGradient>
        <linearGradient id="gbLid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="gbGem" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5d0fe" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <radialGradient id="gbRay" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
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

      <g className="gb-spin-slow" style={{ transformOrigin: '200px 210px' }}>
        <g className="gb-rays" opacity="0" style={{ transformOrigin: '200px 210px' }}>
          {RAYS.map((d, i) => (
            <path key={i} d={d} fill="url(#gbRay)" />
          ))}
        </g>
      </g>

      <ellipse cx="200" cy="328" rx="74" ry="9" fill="#000000" opacity="0.35" className="gb-pulse" />

      <g className="gb-shake" style={{ transformOrigin: '200px 320px' }}>
        <rect x="142" y="222" width="116" height="98" rx="10" fill="url(#gbBox)" stroke="#fbbf24" strokeWidth="2.5" />
        <rect x="190" y="222" width="20" height="98" fill="url(#gbGold)" opacity="0.92" />
        <circle cx="200" cy="274" r="17" fill="url(#gbGold)" stroke="#b45309" strokeWidth="2.5" />
        <path d="M200 262 L204 270 L212 274 L204 278 L200 286 L196 278 L188 274 L196 270 Z" fill="#b45309" />

        <g className="gb-lid" style={{ transformOrigin: '200px 210px' }}>
          <rect x="132" y="190" width="136" height="36" rx="9" fill="url(#gbLid)" stroke="#fbbf24" strokeWidth="2.5" />
          <rect x="190" y="190" width="20" height="36" fill="url(#gbGold)" opacity="0.92" />
        </g>
      </g>

      <g className="gb-item-a" opacity="0" style={{ transformOrigin: '200px 215px' }}>
        <rect x="176" y="182" width="48" height="66" rx="7" fill="#f8fafc" stroke="#a78bfa" strokeWidth="2" />
        <path d="M200 198 L204 210 L216 214 L204 218 L200 230 L196 218 L184 214 L196 210 Z" fill="#7c3aed" />
      </g>

      <g className="gb-item-b" opacity="0" style={{ transformOrigin: '200px 215px' }}>
        <path d="M200 192 L224 214 L200 246 L176 214 Z" fill="url(#gbGem)" stroke="#f5d0fe" strokeWidth="2" strokeLinejoin="round" />
        <path d="M176 214 L224 214 M200 192 L190 214 L200 246 L210 214 Z" fill="none" stroke="#f5d0fe" strokeOpacity="0.75" strokeWidth="1.5" strokeLinejoin="round" />
      </g>

      <g className="gb-item-c" opacity="0" style={{ transformOrigin: '200px 215px' }}>
        <ellipse cx="200" cy="215" rx="21" ry="21" fill="url(#gbGold)" stroke="#b45309" strokeWidth="3" />
        <ellipse cx="200" cy="215" rx="14" ry="14" fill="none" stroke="#b45309" strokeWidth="2" />
        <path d="M200 205 L203 212 L210 215 L203 218 L200 225 L197 218 L190 215 L197 212 Z" fill="#b45309" />
      </g>

      {SPARKS.map((s, i) => (
        <g
          key={i}
          className="gb-spark"
          opacity="0"
          style={{ transformOrigin: `${s.x}px ${s.y}px`, animationDelay: `${s.delay}s` }}
        >
          <path
            d={`M${s.x} ${s.y - 9} L${s.x + 3} ${s.y - 3} L${s.x + 9} ${s.y} L${s.x + 3} ${s.y + 3} L${s.x} ${s.y + 9} L${s.x - 3} ${s.y + 3} L${s.x - 9} ${s.y} L${s.x - 3} ${s.y - 3} Z`}
            fill="#fde68a"
          />
        </g>
      ))}

      <g className="gb-float" style={{ transformOrigin: '68px 90px' }}>
        <path d="M68 62 L96 90 L68 124 L40 90 Z" fill="url(#gbGem)" stroke="#f5d0fe" strokeWidth="2" strokeLinejoin="round" />
        <path d="M40 90 L96 90 M68 62 L56 90 L68 124 L80 90 Z" fill="none" stroke="#f5d0fe" strokeOpacity="0.75" strokeWidth="1.5" strokeLinejoin="round" />
      </g>

      <g className="gb-float-b" style={{ transformOrigin: '333px 290px' }}>
        <rect x="307" y="278" width="52" height="40" rx="7" fill="url(#gbBox)" stroke="#fbbf24" strokeWidth="2" />
        <rect x="327" y="278" width="12" height="40" fill="url(#gbGold)" opacity="0.92" />
        <rect x="301" y="262" width="64" height="20" rx="6" fill="url(#gbLid)" stroke="#fbbf24" strokeWidth="2" />
        <rect x="327" y="262" width="12" height="20" fill="url(#gbGold)" opacity="0.92" />
      </g>

      <g className="gb-card" style={{ transformOrigin: '340px 90px' }}>
        <rect x="312" y="52" width="56" height="78" rx="8" fill="#f8fafc" stroke="#a78bfa" strokeWidth="2" />
        <path d="M340 70 L346 87 L363 91 L346 95 L340 112 L334 95 L317 91 L334 87 Z" fill="#7c3aed" />
        <rect x="322" y="116" width="36" height="5" rx="2.5" fill="#fbbf24" />
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
  const { user, loading } = useAuth()

  return (
    <section className="@container w-full max-w-full">
      <style>{`
        @keyframes gb-spin { to { transform: rotate(360deg); } }
        @keyframes gb-float { 0%,100% { transform: translateY(0) rotate(-8deg); } 50% { transform: translateY(-14px) rotate(10deg); } }
        @keyframes gb-float-b { 0%,100% { transform: translateY(0) rotate(12deg); } 50% { transform: translateY(12px) rotate(-10deg); } }
        @keyframes gb-card { 0%,100% { transform: translateY(0) rotate(14deg); } 50% { transform: translateY(-10px) rotate(6deg); } }
        @keyframes gb-coin { 0%,100% { transform: scaleX(1) translateY(0); } 50% { transform: scaleX(0.25) translateY(-12px); } }
        @keyframes gb-pulse { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
        @keyframes gb-star { 0%,100% { opacity: 0.15; } 50% { opacity: 1; } }
        @keyframes gb-shake {
          0%,28%,100% { transform: translateX(0) rotate(0deg); }
          3% { transform: translateX(-3px) rotate(-2deg); }
          6% { transform: translateX(3px) rotate(2deg); }
          9% { transform: translateX(-4px) rotate(-2.5deg); }
          12% { transform: translateX(4px) rotate(2.5deg); }
          15% { transform: translateX(-3px) rotate(-2deg); }
          18% { transform: translateX(3px) rotate(2deg); }
          21% { transform: translateX(-2px) rotate(-1deg); }
          24% { transform: translateX(2px) rotate(1deg); }
        }
        @keyframes gb-lid {
          0%,34% { transform: translateY(0) rotate(0deg); }
          42%,78% { transform: translateY(-72px) rotate(-14deg); }
          90%,100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes gb-rays {
          0%,34% { opacity: 0; transform: scale(0.5); }
          46% { opacity: 1; transform: scale(1); }
          78% { opacity: 0.85; transform: scale(1.05); }
          90%,100% { opacity: 0; transform: scale(1.1); }
        }
        @keyframes gb-item-a {
          0%,38% { opacity: 0; transform: translate(0px,0px) scale(0.3) rotate(0deg); }
          50% { opacity: 1; }
          60%,80% { opacity: 1; transform: translate(-92px,-118px) scale(1) rotate(-14deg); }
          90%,100% { opacity: 0; transform: translate(-92px,-118px) scale(0.8) rotate(-14deg); }
        }
        @keyframes gb-item-b {
          0%,38% { opacity: 0; transform: translate(0px,0px) scale(0.3) rotate(0deg); }
          50% { opacity: 1; }
          60%,80% { opacity: 1; transform: translate(0px,-150px) scale(1.1) rotate(0deg); }
          90%,100% { opacity: 0; transform: translate(0px,-150px) scale(0.9) rotate(0deg); }
        }
        @keyframes gb-item-c {
          0%,38% { opacity: 0; transform: translate(0px,0px) scale(0.3) rotate(0deg); }
          50% { opacity: 1; }
          60%,80% { opacity: 1; transform: translate(92px,-112px) scale(1) rotate(12deg); }
          90%,100% { opacity: 0; transform: translate(92px,-112px) scale(0.8) rotate(12deg); }
        }
        @keyframes gb-spark {
          0%,40% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.3); }
          66%,100% { opacity: 0; transform: scale(0.4); }
        }
        .gb-spin { animation: gb-spin 18s linear infinite; }
        .gb-spin-slow { animation: gb-spin 24s linear infinite; }
        .gb-float { animation: gb-float 5s ease-in-out infinite; }
        .gb-float-b { animation: gb-float-b 6s ease-in-out infinite; }
        .gb-card { animation: gb-card 5.5s ease-in-out infinite; }
        .gb-coin { animation: gb-coin 2.4s ease-in-out infinite; }
        .gb-coin-b { animation: gb-coin 3s ease-in-out infinite reverse; }
        .gb-pulse { animation: gb-pulse 4s ease-in-out infinite; }
        .gb-star { animation: gb-star 2.6s ease-in-out infinite; }
        .gb-shake { animation: gb-shake 5s ease-in-out infinite; }
        .gb-lid { animation: gb-lid 5s cubic-bezier(0.34, 1.3, 0.64, 1) infinite; }
        .gb-rays { animation: gb-rays 5s ease-out infinite; }
        .gb-item-a { animation: gb-item-a 5s ease-out infinite; }
        .gb-item-b { animation: gb-item-b 5s ease-out infinite; }
        .gb-item-c { animation: gb-item-c 5s ease-out infinite; }
        .gb-spark { animation: gb-spark 5s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .gb-spin,.gb-spin-slow,.gb-float,.gb-float-b,.gb-card,.gb-coin,.gb-coin-b,.gb-pulse,.gb-star,
          .gb-shake,.gb-lid,.gb-rays,.gb-item-a,.gb-item-b,.gb-item-c,.gb-spark { animation: none; }
        }
      `}</style>

      <div className="relative overflow-hidden rounded-2xl border border-galaxy-border bg-galaxy-surface p-5 pt-0 @md:p-8 @md:pt-0 @5xl:p-12 @5xl:pt-0">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-galaxy-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-galaxy-raised/60 via-transparent to-galaxy-bg/80" />

        <div className="relative grid items-center gap-8 @3xl:grid-cols-2 @5xl:gap-12">
          <div className="order-2 min-w-0 text-center @3xl:order-1 @3xl:text-left">
            <h1 className="text-3xl font-extrabold leading-tight text-white @md:text-4xl @5xl:text-5xl">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-galaxy-gold bg-clip-text text-transparent">
                Galaxy Bets
              </span>
            </h1>

            <p
              className={`mt-4 text-base font-medium text-slate-100 transition-opacity duration-300 @md:text-lg ${
                loading ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {user ? (
                <>
                  Welcome back,{' '}
                  <span className="font-bold text-galaxy-gold">{user.name}</span>. Open a pack and see what you pull.
                </>
              ) : (
                'Login or register now to start opening packs.'
              )}
            </p>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400 @md:text-base @3xl:mx-0">
              Galaxy Bets is a virtual land of pack draws, mystery boxes and case battles. Every pack opens
              with free virtual coins, with no real money, no deposits and no cash prizes. It is built to be
              100% Islamic and halal, so you can enjoy the thrill of every draw with a clear conscience.
            </p>

            <div
              className={`mt-6 flex flex-col items-stretch gap-3 transition-opacity duration-300 @md:flex-row @md:justify-center @3xl:justify-start ${
                loading ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {user ? (
                <>
                  <Link
                    href="/mystery-boxes"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/30 transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-fuchsia-500 @md:text-base"
                  >
                    <Package size={18} />
                    Open Packs
                  </Link>
                  <Link
                    href="/case-battles"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-galaxy-border bg-galaxy-card px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-galaxy-raised @md:text-base"
                  >
                    <Swords size={18} />
                    Case Battles
                  </Link>
                </>
              ) : (
                <>
                  <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/30 transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-fuchsia-500 @md:text-base">
                    <UserPlus size={18} />
                    Register
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-galaxy-border bg-galaxy-card px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-galaxy-raised @md:text-base">
                    <LogIn size={18} />
                    Login
                  </button>
                </>
              )}
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
            <PackArt />
          </div>
        </div>
      </div>
    </section>
  )
}