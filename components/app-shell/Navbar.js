"use client";

import React, { useState, useEffect } from 'react'
import {
  Package,
  Swords,
  CircleArrowUp,
  TrendingUp,
  Gift,
  Shield,
  Menu,
  X,
  Orbit,
} from 'lucide-react'
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const links = [
  { id: 'mystery-boxes', label: 'Mystery Boxes', icon: Package, href: '/mystery-boxes' },
  { id: 'case-battles', label: 'Case Battles', icon: Swords, href: '/case-battles' },
  { id: 'item-upgrader', label: 'Item Upgrader', icon: CircleArrowUp, href: '/upgrader' },
  { id: 'crash', label: 'Crash', icon: TrendingUp, href: '/games/crash' },
  { id: 'rewards', label: 'Rewards', icon: Gift, href: '/rewards' },
  { id: 'race', label: 'Race', icon: Shield, href: '/race' },
]

const EASE = 'ease-[cubic-bezier(0.32,0.72,0,1)]'

const getInitials = (name) => {
  const result = (name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0].toUpperCase())
    .join('')
  return result || 'SSB'
}

export default function Navbar({ children }) {
  const { user, loading } = useAuth()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const showAuthButtons = !loading && !user
  const showUser = !loading && !!user
  const initials = getInitials(user?.name || user?.username)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeDrawer = () => setOpen(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0a0820] border-b border-white/5">
        <div className="h-full flex items-center justify-between gap-3 px-3 sm:px-5">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden grid place-items-center h-11 w-11 shrink-0 rounded-xl bg-[#14112f] border border-white/10 text-white hover:bg-[#1c1840] active:scale-95 transition-[background-color,transform] duration-200"
            >
              <Menu size={20} />
            </button>

            <a href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="grid place-items-center h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full border-2 border-amber-400 text-amber-400">
                <Orbit size={20} />
              </span>
              <span className="truncate text-base sm:text-xl lg:text-2xl font-bold tracking-[0.25em] sm:tracking-[0.35em] text-amber-400">
                GALAXY BETS
              </span>
            </a>

            <span className="hidden lg:block h-8 w-px bg-white/10" />

            <nav className="hidden lg:flex items-center gap-1">
              {links.map((item) => {
                const Icon = item.icon
                const isActive = active === item.id

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setActive(item.id)}
                    className={`group relative flex items-center gap-2 h-10 px-3 rounded-xl text-[15px] font-semibold whitespace-nowrap transition-[background-color,color] duration-200 ${
                      isActive
                        ? 'text-white bg-white/[0.06]'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon
                      size={20}
                      className={`shrink-0 transition-colors duration-200 ${
                        isActive ? 'text-amber-400' : 'text-[#7d75c9] group-hover:text-amber-300'
                      }`}
                    />
                    <span>{item.label}</span>
                    <span
                      className={`absolute left-3 right-3 -bottom-[11px] h-0.5 rounded-full bg-amber-400 transition-opacity duration-200 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {showUser && (
              <div
                title={user?.name || user?.username || 'Account'}
                className="grid place-items-center h-10 min-w-10 sm:h-11 sm:min-w-11 px-2 rounded-xl bg-[#14112f] border border-white/10 text-sm font-bold tracking-wider text-amber-400"
              >
                {initials}
              </div>
            )}

            {showAuthButtons && (
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[#14112f] border border-white/10">
                <Link href="/Auth">
                  <button className="hidden sm:block px-3 sm:px-4 h-8 sm:h-9 rounded-lg text-sm font-semibold text-white hover:bg-white/10 active:scale-95 transition-[background-color,transform] duration-200">
                    Login
                  </button>
                </Link>
                <Link href="/Auth">
                  <button className="px-3 sm:px-4 h-8 sm:h-9 rounded-lg text-sm font-bold text-[#2a1a00] bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 active:scale-95 shadow-[0_2px_0_#b45309] transition-transform duration-200">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div
        onClick={closeDrawer}
        className={`lg:hidden fixed inset-0 top-16 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${EASE} ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`lg:hidden fixed top-16 bottom-0 left-0 z-40 w-72 max-w-[85vw] bg-[#0a0820] border-r border-white/5 overflow-y-auto will-change-transform transition-transform duration-300 ${EASE} ${
          open ? 'translate-x-0' : '-translate-x-full'
        } [scrollbar-width:thin] [scrollbar-color:#2a2557_transparent]`}
      >
        <div className="flex justify-end px-3 pt-3">
          <button
            onClick={closeDrawer}
            aria-label="Close menu"
            className="grid place-items-center h-9 w-9 rounded-lg bg-[#14112f] text-white border border-white/10 active:scale-95 transition-transform duration-200"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="p-3 sm:p-4 flex flex-col gap-3">
          <div className="rounded-2xl bg-[#110e2b] overflow-hidden">
            <ul className="py-2">
              {links.map((item) => {
                const Icon = item.icon
                const isActive = active === item.id

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={() => {
                        setActive(item.id)
                        closeDrawer()
                      }}
                      className={`group relative flex items-center h-12 px-4 text-[15px] font-semibold transition-[background-color,color] duration-300 ${
                        isActive
                          ? 'text-white bg-white/[0.06]'
                          : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-2 bottom-2 w-1 rounded-r bg-amber-400 transition-[opacity,transform] duration-300 ${EASE} ${
                          isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-50'
                        }`}
                      />
                      <Icon
                        size={22}
                        className={`shrink-0 transition-colors duration-300 ${
                          isActive ? 'text-amber-400' : 'text-[#7d75c9] group-hover:text-amber-300'
                        }`}
                      />
                      <span className="ml-3 flex-1 truncate">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {showAuthButtons && (
            <div className="grid grid-cols-2 gap-2">
              <Link href="/Auth" onClick={closeDrawer}>
                <button className="w-full h-11 rounded-xl bg-[#14112f] border border-white/10 text-sm font-semibold text-white hover:bg-[#1c1840] active:scale-95 transition-[background-color,transform] duration-200">
                  Login
                </button>
              </Link>
              <Link href="/Auth" onClick={closeDrawer}>
                <button className="w-full h-11 rounded-xl text-sm font-bold text-[#2a1a00] bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 active:scale-95 shadow-[0_2px_0_#b45309] transition-transform duration-200">
                  Register
                </button>
              </Link>
            </div>
          )}
        </nav>
      </aside>

      <div className="min-w-0 pt-16">
        <div className="p-3 sm:p-5 lg:p-6">{children}</div>
      </div>
    </>
  )
}