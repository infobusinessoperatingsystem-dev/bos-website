'use client'

import { useState } from 'react'
import { Button, Heading, Text } from '@primer/react'
import { seedDatabase } from '@/app/actions/seed'
import { useRouter } from 'next/navigation'

export default function SeedPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSeed = async () => {
    setLoading(true)
    try {
      const res = await seedDatabase()
      setResult(res)
      if (res.success) {
        setTimeout(() => {
          router.push('/admin')
        }, 2000)
      }
    } catch (error) {
      setResult({ success: false, error: String(error) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bgColor-default)' }}>
      <div style={{ maxWidth: '600px', width: '100%', padding: 'var(--stack-gap-normal)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--stack-gap-spacious)' }}>
          <Heading as="h1" variant="large" style={{ marginBottom: 'var(--stack-gap-normal)' }}>
            Initialize Learning Content
          </Heading>
          <div style={{ color: 'var(--fgColor-muted)' }}>
            This will populate the database with professional learning content including 5 learning paths and 12+ articles.
          </div>
        </div>

        <div style={{ marginBottom: 'var(--stack-gap-spacious)' }}>
          {!result ? (
            <div style={{ width: '100%' }}>
              <Button onClick={handleSeed} disabled={loading} variant="primary" style={{ width: '100%' }}>
                {loading ? 'Seeding...' : 'Seed Database'}
              </Button>
            </div>
          ) : result.success ? (
            <div
              style={{
                padding: 'var(--stack-gap-normal)',
                backgroundColor: '#f0f9f6',
                border: '1px solid #28a745',
                borderRadius: '6px',
                color: '#155724',
              }}
            >
              <Text size="medium" style={{ fontWeight: 600 }}>
                ✓ {result.message}
              </Text>
              <Text size="small" style={{ marginTop: '8px' }}>
                Redirecting to admin dashboard...
              </Text>
            </div>
          ) : (
            <div
              style={{
                padding: 'var(--stack-gap-normal)',
                backgroundColor: '#fee',
                border: '1px solid #c33',
                borderRadius: '6px',
                color: '#c33',
              }}
            >
              <Text size="medium" style={{ fontWeight: 600 }}>
                ✗ Error: {result.error}
              </Text>
            </div>
          )}
        </div>

        <div style={{ padding: 'var(--stack-gap-normal)', backgroundColor: 'var(--bgColor-neutral)', borderRadius: '6px' }}>
          <Heading as="h3" variant="small" style={{ marginBottom: '8px' }}>
            What will be created:
          </Heading>
          <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--fgColor-muted)', fontSize: '14px', lineHeight: 1.8 }}>
            <li>5 Learning Paths</li>
            <li>5+ Articles with detailed objectives</li>
            <li>12+ Sections with professional content</li>
            <li>Complete audit trails in the admin logs</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
