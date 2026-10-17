"use client";

import React, { useState, useEffect } from 'react'
import {
  Club,
  ChevronUp,
  ChevronDown,
  Gamepad2,
  Flame,
  Gem,
  Sparkles,
  TrendingDown,
  Dices,
  CircleDot,
  Bomb,
  Rocket,
  Coins,
  Grid3x3,
  ArrowUpDown,
  LifeBuoy,
  Headset,
  CircleHelp,
  ShieldCheck,
  HeartHandshake,
  FileText,
  X,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  MessageSquare,
  Orbit,
} from 'lucide-react'

const groups = [
  {
    id: 'casino',
    label: 'Casino',
    icon: Club,
    items: [
      { id: 'galaxy-games', label: 'Galaxy Games', icon: Gamepad2, href: '/games' },
      { id: 'popular', label: 'Popular', icon: Flame, href: '/popular' },
      { id: 'exclusives', label: 'Exclusives', icon: Gem, href: '/exclusives' },
      { id: 'new-games', label: 'New Games', icon: Sparkles, href: '/new-games' },
      { id: 'limbo', label: 'Limbo', icon: TrendingDown, href: '/games/limbo' },
      { id: 'dice', label: 'Dice', icon: Dices, href: '/games/dice' },
      { id: 'plinko', label: 'Plinko', icon: CircleDot, href: '/games/plinko' },
      { id: 'mines', label: 'Mines', icon: Bomb, href: '/games/mines' },
      { id: 'crash', label: 'Crash', icon: Rocket, href: '/games/crash' },
      { id: 'coinflip', label: 'Coin Flip', icon: Coins, href: '/games/coinflip' },
      { id: 'keno', label: 'Keno', icon: Grid3x3, href: '/games/keno' },
      { id: 'hilo', label: 'Hi-Lo', icon: ArrowUpDown, href: '/games/hilo' },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    icon: LifeBuoy,
    items: [
      { id: 'live-support', label: 'Live Support', icon: Headset, href: '/support', badge: 'LIVE' },
      { id: 'help-center', label: 'Help Center', icon: CircleHelp, href: '/help' },
      { id: 'provably-fair', label: 'Provably Fair', icon: ShieldCheck, href: '/fair' },
      { id: 'responsible', label: 'Responsible Gaming', icon: HeartHandshake, href: '/responsible-gaming' },
      { id: 'terms', label: 'Terms of Service', icon: FileText, href: '/terms' },
    ],
  },
]

export default function SideBar({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('galaxy-games')
  const [expanded, setExpanded] = useState({ casino: true, support: true })

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-w', collapsed ? '84px' : '18rem')
  }, [collapsed])

  const toggleGroup = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  const closeDrawer = () => setOpen(false)
  const showLabels = !collapsed || open

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0a0820] border-b border-white/5">
        <div className="h-full flex items-center justify-between gap-3 px-3 sm:px-5">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden grid place-items-center h-11 w-11 shrink-0 rounded-xl bg-[#14112f] border border-white/10 text-white hover:bg-[#1c1840] transition-colors"
            >
              <Menu size={20} />
            </button>

            <button
              onClick={() => setCollapsed((prev) => !prev)}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="hidden lg:grid place-items-center h-11 w-11 shrink-0 rounded-xl bg-[#14112f] border border-white/10 text-white hover:bg-[#1c1840] transition-colors"
            >
              {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            </button>

            <a href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="grid place-items-center h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full border-2 border-amber-400 text-amber-400">
                <Orbit size={20} />
              </span>
              <span className="truncate text-base sm:text-xl lg:text-2xl font-bold tracking-[0.25em] sm:tracking-[0.35em] text-amber-400">
                GALAXY BETS
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              aria-label="Search"
              className="grid place-items-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-[#14112f] border border-white/10 text-white hover:bg-[#1c1840] transition-colors"
            >
              <Search size={18} />
            </button>

            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#14112f] border border-white/10">
              <button className="hidden sm:block px-3 sm:px-4 h-8 sm:h-9 rounded-lg text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                Login
              </button>
              <button className="px-3 sm:px-4 h-8 sm:h-9 rounded-lg text-sm font-bold text-[#2a1a00] bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-[0_2px_0_#b45309] transition-colors">
                Register
              </button>
            </div>

            <button
              aria-label="Chat"
              className="hidden sm:grid place-items-center h-11 w-11 rounded-xl bg-[#14112f] border border-white/10 text-white hover:bg-[#1c1840] transition-colors"
            >
              <MessageSquare size={18} />
            </button>
          </div>
        </div>
      </header>

      <div
        onClick={closeDrawer}
        className={`lg:hidden fixed inset-0 top-16 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 bg-[#0a0820] border-r border-white/5 overflow-y-auto overflow-x-hidden transition-all duration-300
          w-72 max-w-[85vw] ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 ${collapsed ? 'lg:w-[84px]' : 'lg:w-72'}
          [scrollbar-width:thin] [scrollbar-color:#2a2557_transparent]`}
      >
        <div className="lg:hidden flex justify-end px-3 pt-3">
          <button
            onClick={closeDrawer}
            aria-label="Close menu"
            className="grid place-items-center h-9 w-9 rounded-lg bg-[#14112f] text-white border border-white/10"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="p-3 sm:p-4 flex flex-col gap-3">
          {groups.map((group) => {
            const GroupIcon = group.icon
            const isOpen = !showLabels || expanded[group.id]

            return (
              <div key={group.id} className="rounded-2xl bg-[#110e2b] overflow-hidden">
                <button
                  onClick={() => showLabels && toggleGroup(group.id)}
                  title={group.label}
                  className={`w-full flex items-center h-12 bg-[#1a1640] text-white font-bold hover:bg-[#211c4d] transition-colors ${
                    showLabels ? 'justify-between px-4' : 'justify-center'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <GroupIcon size={22} />
                    {showLabels && <span>{group.label}</span>}
                  </span>
                  {showLabels && (
                    <span className="grid place-items-center h-8 w-8 rounded-lg bg-[#2a2557]">
                      {expanded[group.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  )}
                </button>

                {isOpen && (
                  <ul className="py-2">
                    {group.items.map((item) => {
                      const Icon = item.icon
                      const isActive = active === item.id

                      return (
                        <li key={item.id}>
                          <a
                            href={item.href}
                            title={item.label}
                            onClick={() => {
                              setActive(item.id)
                              closeDrawer()
                            }}
                            className={`group relative flex items-center h-11 text-[15px] font-semibold transition-colors ${
                              showLabels ? 'gap-3 px-4' : 'justify-center'
                            } ${
                              isActive
                                ? 'text-white bg-white/[0.06]'
                                : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                            }`}
                          >
                            {isActive && (
                              <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-amber-400" />
                            )}
                            <Icon
                              size={22}
                              className={isActive ? 'text-amber-400' : 'text-[#7d75c9] group-hover:text-amber-300'}
                            />
                            {showLabels && <span className="flex-1 truncate">{item.label}</span>}
                            {showLabels && item.badge && (
                              <span className="px-2.5 py-1 rounded-md bg-[#2a2557] text-white text-xs font-bold">
                                {item.badge}
                              </span>
                            )}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )
          })}
        </nav>
      </aside>

      <div
        className={`min-w-0 pt-16 transition-[padding-left] duration-300 ${
          collapsed ? 'lg:pl-[84px]' : 'lg:pl-72'
        }`}
      >
        <div className="p-3 sm:p-5 lg:p-6">{children}</div>
      </div>
    </>
  )
}