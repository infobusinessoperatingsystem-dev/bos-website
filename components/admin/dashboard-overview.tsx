'use client'

import { useEffect, useState } from 'react'
import { Heading, Text } from '@primer/react'
import { getLearningPaths, getArticles, getLogs } from '@/app/actions/content'

interface OverviewStats {
  totalPaths: number
  totalArticles: number
  recentChanges: number
}

export default function DashboardOverview({ refreshKey }: { refreshKey: number }) {
  const [stats, setStats] = useState<OverviewStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [refreshKey])

  const loadStats = async () => {
    try {
      setLoading(true)
      const paths = await getLearningPaths()
      let totalArticles = 0

      for (const path of paths) {
        const pathArticles = await getArticles(path.id)
        totalArticles += pathArticles.length
      }

      const logs = await getLogs(100)
      const recentChanges = logs.filter(
        (log) => new Date(log.timestamp).getTime() > Date.now() - 24 * 60 * 60 * 1000
      ).length

      setStats({
        totalPaths: paths.length,
        totalArticles,
        recentChanges,
      })
    } catch (error) {
      console.error('Failed to load stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Heading as="h2" variant="medium" style={{ marginBottom: 'var(--stack-gap-spacious)' }}>
        Dashboard Overview
      </Heading>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--stack-gap-normal)',
          marginBottom: 'var(--stack-gap-spacious)',
        }}
      >
        {/* Learning Paths Card */}
        <div
          style={{
            padding: 'var(--stack-gap-normal)',
            border: '1px solid var(--borderColor-default)',
            borderRadius: '8px',
            backgroundColor: 'var(--bgColor-neutral)',
          }}
        >
          <div style={{ color: 'var(--fgColor-muted)', fontSize: '12px' }}>
            Learning Paths
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px', color: 'var(--fgColor-default)' }}>
            {stats?.totalPaths || 0}
          </div>
          <div style={{ color: 'var(--fgColor-muted)', marginTop: '8px', fontSize: '12px' }}>
            Total learning paths available
          </div>
        </div>

        {/* Articles Card */}
        <div
          style={{
            padding: 'var(--stack-gap-normal)',
            border: '1px solid var(--borderColor-default)',
            borderRadius: '8px',
            backgroundColor: 'var(--bgColor-neutral)',
          }}
        >
          <div style={{ color: 'var(--fgColor-muted)', fontSize: '12px' }}>
            Articles
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px', color: 'var(--fgColor-default)' }}>
            {stats?.totalArticles || 0}
          </div>
          <div style={{ color: 'var(--fgColor-muted)', marginTop: '8px', fontSize: '12px' }}>
            Total articles published
          </div>
        </div>

        {/* Recent Changes Card */}
        <div
          style={{
            padding: 'var(--stack-gap-normal)',
            border: '1px solid var(--borderColor-default)',
            borderRadius: '8px',
            backgroundColor: 'var(--bgColor-neutral)',
          }}
        >
          <div style={{ color: 'var(--fgColor-muted)', fontSize: '12px' }}>
            Recent Changes
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px', color: 'var(--fgColor-default)' }}>
            {stats?.recentChanges || 0}
          </div>
          <div style={{ color: 'var(--fgColor-muted)', marginTop: '8px', fontSize: '12px' }}>
            Changes in the last 24 hours
          </div>
        </div>
      </div>

      <div
        style={{
          padding: 'var(--stack-gap-normal)',
          backgroundColor: 'var(--bgColor-neutral)',
          borderRadius: '8px',
          border: '1px solid var(--borderColor-default)',
        }}
      >
        <Heading as="h3" variant="small" style={{ marginBottom: 'var(--stack-gap-normal)' }}>
          Quick Start
        </Heading>
        <div style={{ color: 'var(--fgColor-muted)', lineHeight: 1.6 }}>
          <Text size="small">
            • Use the <strong>Content Manager</strong> tab to create, edit, and delete learning paths, articles, and sections
          </Text>
          <br />
          <Text size="small">
            • All changes are automatically logged and tracked in the <strong>Logs</strong> tab
          </Text>
          <br />
          <Text size="small">
            • Content updates are saved to the database and appear immediately on the learning platform
          </Text>
        </div>
      </div>
    </div>
  )
}
