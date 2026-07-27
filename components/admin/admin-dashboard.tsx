'use client'

import { useEffect, useState } from 'react'
import { Header as PrimerHeader, Button, Heading, Text } from '@primer/react'
import { logoutAdmin } from '@/app/actions/admin'
import ContentManager from './content-manager'
import LogsViewer from './logs-viewer'
import DashboardOverview from './dashboard-overview'

type Tab = 'overview' | 'content' | 'logs'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [refreshKey, setRefreshKey] = useState(0)

  const handleLogout = async () => {
    await logoutAdmin()
    window.location.href = '/'
  }

  const handleContentUpdated = () => {
    setRefreshKey((k) => k + 1)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bgColor-default)' }}>
      <PrimerHeader>
        <PrimerHeader.Item>
          <div style={{ fontSize: '18px', fontWeight: '600' }}>Business OS Admin</div>
        </PrimerHeader.Item>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button onClick={handleLogout} variant="invisible">
            Logout
          </Button>
        </div>
      </PrimerHeader>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'var(--stack-gap-spacious)' }}>
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: 'var(--stack-gap-normal)', marginBottom: 'var(--stack-gap-spacious)', borderBottom: '1px solid var(--borderColor-default)', paddingBottom: 'var(--stack-gap-normal)' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '8px 16px',
              backgroundColor: activeTab === 'overview' ? 'var(--bgColor-neutral)' : 'transparent',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              color: 'var(--fgColor-default)',
              fontWeight: activeTab === 'overview' ? 600 : 400,
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('content')}
            style={{
              padding: '8px 16px',
              backgroundColor: activeTab === 'content' ? 'var(--bgColor-neutral)' : 'transparent',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              color: 'var(--fgColor-default)',
              fontWeight: activeTab === 'content' ? 600 : 400,
            }}
          >
            Content Manager
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            style={{
              padding: '8px 16px',
              backgroundColor: activeTab === 'logs' ? 'var(--bgColor-neutral)' : 'transparent',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              color: 'var(--fgColor-default)',
              fontWeight: activeTab === 'logs' ? 600 : 400,
            }}
          >
            Logs
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && <DashboardOverview refreshKey={refreshKey} />}
          {activeTab === 'content' && <ContentManager onUpdated={handleContentUpdated} />}
          {activeTab === 'logs' && <LogsViewer refreshKey={refreshKey} />}
        </div>
      </div>
    </div>
  )
}
