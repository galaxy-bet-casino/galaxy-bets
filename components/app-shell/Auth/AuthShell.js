import React, { useState } from 'react'
import { MoonStar, Coins, ShieldCheck, Sparkles, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'

const STARS = [
  [24, 40, 1.6], [86, 150, 1.2], [150, 22, 1.4], [330, 30, 1.8], [380, 150, 1.2],
  [20, 260, 1.4], [372, 360, 1.6], [250, 384, 1.2], [140, 392, 1.4], [392, 250, 1.2],
]

function AuthArt() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gaGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="gaRim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2557" />
          <stop offset="100%" stopColor="#070618" />
        </linearGradient>
      </defs>

      {STARS.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#e9d5ff" className="ga-star" style={{ animationDelay: `${i * 0.35}s` }} />
      ))}

      <circle cx="200" cy="200" r="195" fill="url(#gaGlow)" className="ga-pulse" />
      <circle cx="200" cy="200" r="150" fill="url(#gaRim)" stroke="url(#gaGold)" strokeWidth="4" />
      <circle
        cx="200" cy="200" r="134" fill="none" stroke="#fbbf24" strokeOpacity="0.35"
        strokeWidth="1.5" strokeDasharray="2 12" strokeLinecap="round"
        className="ga-spin" style={{ transformOrigin: '200px 200px' }}
      />
      <circle
        cx="200" cy="200" r="100" fill="none" stroke="#a78bfa" strokeOpacity="0.35"
        strokeWidth="1.5" strokeDasharray="4 10" strokeLinecap="round"
        className="ga-spin-rev" style={{ transformOrigin: '200px 200px' }}
      />

      <g className="ga-coin" style={{ transformOrigin: '200px 200px' }}>
        <ellipse cx="200" cy="200" rx="48" ry="48" fill="url(#gaGold)" stroke="#b45309" strokeWidth="4" />
        <ellipse cx="200" cy="200" rx="34" ry="34" fill="none" stroke="#b45309" strokeWidth="2.5" />
        <path d="M200 176 L206 194 L224 200 L206 206 L200 224 L194 206 L176 200 L194 194 Z" fill="#b45309" />
      </g>

      <g className="ga-float" style={{ transformOrigin: '68px 90px' }}>
        <rect x="40" y="62" width="56" height="56" rx="12" fill="#f8fafc" stroke="#a78bfa" strokeWidth="2" />
        <circle cx="56" cy="78" r="5" fill="#070618" />
        <circle cx="68" cy="90" r="5" fill="#070618" />
        <circle cx="80" cy="102" r="5" fill="#070618" />
      </g>

      <g className="ga-float-b" style={{ transformOrigin: '333px 310px' }}>
        <rect x="305" y="282" width="56" height="56" rx="12" fill="#f8fafc" stroke="#a78bfa" strokeWidth="2" />
        <circle cx="321" cy="298" r="5" fill="#dc2626" />
        <circle cx="345" cy="298" r="5" fill="#dc2626" />
        <circle cx="333" cy="310" r="5" fill="#dc2626" />
        <circle cx="321" cy="322" r="5" fill="#dc2626" />
        <circle cx="345" cy="322" r="5" fill="#dc2626" />
      </g>

      <g className="ga-card" style={{ transformOrigin: '340px 90px' }}>
        <rect x="312" y="52" width="56" height="78" rx="8" fill="#f8fafc" stroke="#a78bfa" strokeWidth="2" />
        <text x="322" y="76" fill="#dc2626" fontSize="18" fontWeight="800">A</text>
        <path d="M340 108 C326 96 328 84 336 84 C339 84 340 87 340 87 C340 87 341 84 344 84 C352 84 354 96 340 108 Z" fill="#dc2626" />
      </g>

      <g className="ga-coin-b" style={{ transformOrigin: '70px 330px' }}>
        <ellipse cx="70" cy="330" rx="22" ry="22" fill="url(#gaGold)" stroke="#b45309" strokeWidth="3" />
        <ellipse cx="70" cy="330" rx="14" ry="14" fill="none" stroke="#b45309" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function Field({ icon: Icon, label, type = 'text', delay = 0, ...props }) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'

  return (
    <label className="ga-rise block" style={{ animationDelay: `${delay}ms` }}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
      <span className="group relative block">
        <Icon
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-violet-300"
        />
        <input
          {...props}
          type={isPassword && show ? 'text' : type}
          className="w-full rounded-xl border border-galaxy-border bg-galaxy-card py-3 pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-violet-400/50 focus:border-violet-400 focus:bg-galaxy-raised/60 focus:ring-4 focus:ring-violet-500/20"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition hover:text-violet-300"
          >
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </span>
    </label>
  )
}

export function SubmitButton({ loading, children, icon: Icon, delay = 0 }) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{ animationDelay: `${delay}ms` }}
      className="ga-rise group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/30 transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 @md:text-base"
    >
      <span className="ga-shine pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20" />
      {loading ? <Loader2 size={18} className="animate-spin" /> : <Icon size={18} />}
      {loading ? 'Please wait...' : children}
    </button>
  )
}

export function ErrorBox({ message }) {
  if (!message) return null
  return (
    <div
      key={message}
      role="alert"
      className="ga-shake flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-3.5 py-2.5 text-sm text-rose-300"
    >
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  )
}

export default function AuthShell({ title, highlight, subtitle, children, footer }) {
  return (
    <section className="@container flex min-h-screen w-full items-center justify-center bg-galaxy-bg p-4 @md:p-8">
      <style>{`
        @keyframes ga-spin { to { transform: rotate(360deg); } }
        @keyframes ga-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes ga-float { 0%,100% { transform: translateY(0) rotate(-8deg); } 50% { transform: translateY(-14px) rotate(10deg); } }
        @keyframes ga-float-b { 0%,100% { transform: translateY(0) rotate(12deg); } 50% { transform: translateY(12px) rotate(-10deg); } }
        @keyframes ga-card { 0%,100% { transform: translateY(0) rotate(14deg); } 50% { transform: translateY(-10px) rotate(6deg); } }
        @keyframes ga-coin { 0%,100% { transform: scaleX(1) translateY(0); } 50% { transform: scaleX(0.3) translateY(-10px); } }
        @keyframes ga-pulse { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
        @keyframes ga-star { 0%,100% { opacity: 0.15; } 50% { opacity: 1; } }
        @keyframes ga-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ga-card-in { from { opacity: 0; transform: translateY(24px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes ga-shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
        @keyframes ga-shine { 0% { left: -50%; } 60%,100% { left: 130%; } }
        .ga-spin { animation: ga-spin 18s linear infinite; }
        .ga-spin-rev { animation: ga-spin-rev 26s linear infinite; }
        .ga-float { animation: ga-float 5s ease-in-out infinite; }
        .ga-float-b { animation: ga-float-b 6s ease-in-out infinite; }
        .ga-card { animation: ga-card 5.5s ease-in-out infinite; }
        .ga-coin { animation: ga-coin 2.8s ease-in-out infinite; }
        .ga-coin-b { animation: ga-coin 3s ease-in-out infinite reverse; }
        .ga-pulse { animation: ga-pulse 4s ease-in-out infinite; }
        .ga-star { animation: ga-star 2.6s ease-in-out infinite; }
        .ga-rise { opacity: 0; animation: ga-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .ga-card-in { animation: ga-card-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .ga-shake { animation: ga-shake 0.45s ease-in-out; }
        .ga-shine { animation: ga-shine 3.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ga-spin,.ga-spin-rev,.ga-float,.ga-float-b,.ga-card,.ga-coin,.ga-coin-b,.ga-pulse,.ga-star,.ga-shine,.ga-shake { animation: none; }
          .ga-rise,.ga-card-in { animation: none; opacity: 1; }
        }
      `}</style>

      <div className="ga-card-in relative w-full max-w-5xl overflow-hidden rounded-2xl border border-galaxy-border bg-galaxy-surface">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-galaxy-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-galaxy-raised/60 via-transparent to-galaxy-bg/80" />

        <div className="relative grid items-center @3xl:grid-cols-2">
          {/* Art / brand panel */}
          <div className="hidden flex-col items-center gap-6 p-8 @3xl:flex @5xl:p-12">
            <div className="aspect-square w-full max-w-sm">
              <AuthArt />
            </div>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
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

          {/* Form panel */}
          <div className="min-w-0 p-5 @md:p-8 @5xl:p-12">
            <div className="ga-rise mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <MoonStar size={14} />
                100% Islamic &amp; Halal
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-galaxy-gold/30 bg-galaxy-gold/10 px-3 py-1 text-xs font-semibold text-galaxy-gold">
                <Coins size={14} />
                Virtual Coins Only
              </span>
            </div>

            <h1 className="ga-rise text-3xl font-extrabold leading-tight text-white @md:text-4xl" style={{ animationDelay: '80ms' }}>
              {title}{' '}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-galaxy-gold bg-clip-text text-transparent">
                {highlight}
              </span>
            </h1>
            <p className="ga-rise mt-2 text-sm text-slate-400 @md:text-base" style={{ animationDelay: '140ms' }}>
              {subtitle}
            </p>

            <div className="mt-6">{children}</div>

            <p className="ga-rise mt-6 text-center text-sm text-slate-400" style={{ animationDelay: '600ms' }}>
              {footer}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}