"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;
const ME_URL = `${API_ORIGIN}/api/auth/me`
const LOGOUT_URL = `${API_ORIGIN}/api/auth/logout`

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(ME_URL, { credentials: 'include' })
      if (!res.ok) {
        setUser(null)
        return null
      }
      const data = await res.json()
      setUser(data.user)
      return data.user
    } catch {
      setUser(null)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await fetch(LOGOUT_URL, { method: 'POST', credentials: 'include' })
    } finally {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const value = useMemo(
    () => ({ user, loading, setUser, refresh, logout }),
    [user, loading, refresh, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}