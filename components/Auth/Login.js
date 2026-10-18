import React, { useState } from 'react'
import { Mail, Lock, LogIn } from 'lucide-react'
import AuthShell, { Field, SubmitButton, ErrorBox } from './AuthShell'

const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;
const LOGIN_URL = `${API_ORIGIN}/auth/login`;

export default function Login({ onSuccess, onSwitch }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || 'Login failed')
      onSuccess?.(data.user)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Welcome back to"
      highlight="Galaxy Bets"
      subtitle="Login to continue playing with your free virtual coins."
      footer={
        <>
          New here?{' '}
          <button
            type="button"
            onClick={onSwitch}
            className="font-semibold text-violet-300 transition hover:text-galaxy-gold"
          >
            Create an account
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <ErrorBox message={error} />
        <Field
          icon={Mail} label="Email" type="email" name="email" delay={200}
          value={form.email} onChange={update} placeholder="you@example.com"
          autoComplete="email" required
        />
        <Field
          icon={Lock} label="Password" type="password" name="password" delay={280}
          value={form.password} onChange={update} placeholder="Your password"
          autoComplete="current-password" required
        />
        <div className="pt-2">
          <SubmitButton loading={loading} icon={LogIn} delay={360}>Login</SubmitButton>
        </div>
      </form>
    </AuthShell>
  )
}