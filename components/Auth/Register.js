import React, { useState } from 'react'
import { User, Mail, Lock, UserPlus } from 'lucide-react'
import AuthShell, { Field, SubmitButton, ErrorBox } from './AuthShell'

const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;
const REGISTER_URL = `${API_ORIGIN}/auth/signin` 

export default function Register({ onSuccess, onSwitch }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password.length < 6) return setError('Password must be at least 6 characters')
    if (form.password !== form.confirm) return setError('Passwords do not match')

    setLoading(true)
    try {
      const res = await fetch(REGISTER_URL, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || 'Registration failed')
      onSuccess?.(data.user)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Join"
      highlight="Galaxy Bets"
      subtitle="Create your account and get free demo coins to start playing."
      footer={
        <>
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitch}
            className="font-semibold text-violet-300 transition hover:text-galaxy-gold"
          >
            Login
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <ErrorBox message={error} />
        <Field
          icon={User} label="Name" name="name" delay={200}
          value={form.name} onChange={update} placeholder="Your name"
          autoComplete="name" required
        />
        <Field
          icon={Mail} label="Email" type="email" name="email" delay={260}
          value={form.email} onChange={update} placeholder="you@example.com"
          autoComplete="email" required
        />
        <Field
          icon={Lock} label="Password" type="password" name="password" delay={320}
          value={form.password} onChange={update} placeholder="At least 6 characters"
          autoComplete="new-password" required
        />
        <Field
          icon={Lock} label="Confirm password" type="password" name="confirm" delay={380}
          value={form.confirm} onChange={update} placeholder="Repeat password"
          autoComplete="new-password" required
        />
        <div className="pt-2">
          <SubmitButton loading={loading} icon={UserPlus} delay={440}>Create account</SubmitButton>
        </div>
      </form>
    </AuthShell>
  )
}