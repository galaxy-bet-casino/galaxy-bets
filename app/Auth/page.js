"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Login from '@/components/app-shell/Auth/Login'
import Register from '@/components/app-shell/Auth/Register'
import { useAuth } from '@/context/AuthContext'

export default function AuthPage() {
  const [mode, setMode] = useState('login')
  const { user, loading, setUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) router.replace('/')
  }, [loading, user, router])

  const handleSuccess = (u) => {
    setUser(u)
    router.replace('/')
  }

  if (loading || user) return null

  return mode === 'login' ? (
    <Login onSuccess={handleSuccess} onSwitch={() => setMode('register')} />
  ) : (
    <Register onSuccess={handleSuccess} onSwitch={() => setMode('login')} />
  )
}