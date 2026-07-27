'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heading, Text, Button } from '@primer/react'
import { authenticateAdmin } from '@/app/actions/admin'

export default function AdminLoginPage() {
  const router = useRouter()
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = e.target as HTMLFormElement
    const input = form.querySelector('input[type="password"]') as HTMLInputElement
    const currentPin = input?.value || pin

    try {
      const result = await authenticateAdmin(currentPin)
      if (result.success) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(result.error || 'Authentication failed')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bgColor-default)' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: 'var(--stack-gap-normal)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--stack-gap-spacious)' }}>
          <Heading as="h1" variant="large" style={{ marginBottom: 'var(--stack-gap-normal)' }}>
            Admin Access
          </Heading>
          <div style={{ color: 'var(--fgColor-muted)' }}>
            <Text size="medium">
              Enter your 4-digit PIN to access the admin dashboard
            </Text>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--stack-gap-normal)' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>PIN</label>
            <input
              type="password"
              maxLength={4}
              placeholder="0000"
              value={pin}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, '').slice(0, 4)
                setPin(cleaned)
              }}
              onInput={(e) => {
                const target = e.target as HTMLInputElement
                const cleaned = target.value.replace(/\D/g, '').slice(0, 4)
                setPin(cleaned)
              }}
              onKeyUp={(e) => {
                const target = e.target as HTMLInputElement
                const cleaned = target.value.replace(/\D/g, '').slice(0, 4)
                setPin(cleaned)
              }}
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '32px',
                letterSpacing: '8px',
                textAlign: 'center',
                border: '1px solid var(--borderColor-default)',
                borderRadius: '6px',
                backgroundColor: 'var(--bgColor-default)',
                color: 'var(--fgColor-default)',
              }}
              disabled={loading}
              autoComplete="off"
            />
          </div>

          {error && (
            <div style={{ padding: 'var(--stack-gap-normal)', backgroundColor: '#fee', borderRadius: '6px', color: '#c33', fontSize: '12px' }}>
              {error}
            </div>
          )}

          <div style={{ width: '100%' }}>
            <Button type="submit" disabled={loading} variant="primary" style={{ width: '100%' }}>
              {loading ? 'Authenticating...' : 'Access Admin'}
            </Button>
          </div>
        </form>

        <div style={{ marginTop: 'var(--stack-gap-spacious)', textAlign: 'center', color: 'var(--fgColor-muted)', fontSize: '12px' }}>
          Business OS Learning Platform Admin
        </div>
      </div>
    </div>
  )
}
