'use client'

import { useEffect, useState } from 'react'
import { Heading, Text, Button } from '@primer/react'
import { getLogs } from '@/app/actions/content'

interface Log {
  id: string
  action: string
  entityType: string
  entityId: string
  entityTitle: string
  changes: Record<string, { before: any; after: any }>
  timestamp: Date | string
}

export default function LogsViewer({ refreshKey }: { refreshKey: number }) {
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'create' | 'update' | 'delete'>('all')

  useEffect(() => {
    loadLogs()
  }, [refreshKey])

  const loadLogs = async () => {
    try {
      setLoading(true)
      const data = await getLogs(200)
      setLogs(data)
    } catch (error) {
      console.error('Failed to load logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredLogs = filter === 'all' ? logs : logs.filter((log) => log.action === filter)

  const formatDate = (timestamp: Date | string) => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return '#28a745'
      case 'update':
        return '#007bff'
      case 'delete':
        return '#dc3545'
      default:
        return 'var(--fgColor-default)'
    }
  }

  const getActionBgColor = (action: string) => {
    switch (action) {
      case 'create':
        return '#f0f9f6'
      case 'update':
        return '#f0f7ff'
      case 'delete':
        return '#fef5f7'
      default:
        return 'var(--bgColor-default)'
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 'var(--stack-gap-spacious)' }}>
        <Heading as="h2" variant="medium" style={{ marginBottom: 'var(--stack-gap-normal)' }}>
          Change History
        </Heading>
        <div style={{ color: 'var(--fgColor-muted)', fontSize: '12px' }}>
          All changes to learning content are logged and tracked here
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--stack-gap-normal)', borderBottom: '1px solid var(--borderColor-default)', paddingBottom: 'var(--stack-gap-normal)' }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            padding: '8px 16px',
            backgroundColor: filter === 'all' ? 'var(--bgColor-neutral)' : 'transparent',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            color: 'var(--fgColor-default)',
            fontWeight: filter === 'all' ? 600 : 400,
          }}
        >
          All
        </button>
        <button
          onClick={() => setFilter('create')}
          style={{
            padding: '8px 16px',
            backgroundColor: filter === 'create' ? 'var(--bgColor-neutral)' : 'transparent',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            color: getActionColor('create'),
            fontWeight: filter === 'create' ? 600 : 400,
          }}
        >
          Created
        </button>
        <button
          onClick={() => setFilter('update')}
          style={{
            padding: '8px 16px',
            backgroundColor: filter === 'update' ? 'var(--bgColor-neutral)' : 'transparent',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            color: getActionColor('update'),
            fontWeight: filter === 'update' ? 600 : 400,
          }}
        >
          Updated
        </button>
        <button
          onClick={() => setFilter('delete')}
          style={{
            padding: '8px 16px',
            backgroundColor: filter === 'delete' ? 'var(--bgColor-neutral)' : 'transparent',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            color: getActionColor('delete'),
            fontWeight: filter === 'delete' ? 600 : 400,
          }}
        >
          Deleted
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--stack-gap-spacious)', color: 'var(--fgColor-muted)' }}>
          Loading logs...
        </div>
      ) : filteredLogs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--stack-gap-spacious)', color: 'var(--fgColor-muted)' }}>
          <Text size="medium">No logs found</Text>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              style={{
                padding: 'var(--stack-gap-normal)',
                border: '1px solid var(--borderColor-default)',
                borderRadius: '8px',
                backgroundColor: getActionBgColor(log.action),
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onClick={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        backgroundColor: getActionColor(log.action),
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}
                    >
                      {log.action}
                    </span>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        backgroundColor: 'var(--bgColor-default)',
                        borderRadius: '4px',
                        fontSize: '11px',
                        color: 'var(--fgColor-muted)',
                      }}
                    >
                      {log.entityType}
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, marginBottom: '4px', color: 'var(--fgColor-default)' }}>
                    {log.entityTitle}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--fgColor-muted)' }}>
                    {formatDate(log.timestamp)}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '18px',
                    color: 'var(--fgColor-muted)',
                    marginLeft: '12px',
                  }}
                >
                  {expandedLogId === log.id ? '▼' : '▶'}
                </div>
              </div>

              {/* Details */}
              {expandedLogId === log.id && Object.keys(log.changes).length > 0 && (
                <div
                  style={{
                    marginTop: 'var(--stack-gap-normal)',
                    paddingTop: 'var(--stack-gap-normal)',
                    borderTop: '1px solid var(--borderColor-default)',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: 'var(--fgColor-default)' }}>
                    Changes:
                  </div>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {Object.entries(log.changes).map(([field, { before, after }]) => (
                      <div
                        key={field}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: 'var(--bgColor-default)',
                          borderRadius: '4px',
                          border: '1px solid var(--borderColor-default)',
                        }}
                      >
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fgColor-default)', marginBottom: '4px' }}>
                          {field}:
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <div style={{ fontSize: '11px', color: 'var(--fgColor-muted)', marginBottom: '4px' }}>Before:</div>
                            <div
                              style={{
                                fontSize: '12px',
                                color: '#dc3545',
                                padding: '4px 8px',
                                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                                borderRadius: '3px',
                                wordBreak: 'break-word',
                              }}
                            >
                              {typeof before === 'object' ? JSON.stringify(before) : String(before || '(empty)')}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: '11px', color: 'var(--fgColor-muted)', marginBottom: '4px' }}>After:</div>
                            <div
                              style={{
                                fontSize: '12px',
                                color: '#28a745',
                                padding: '4px 8px',
                                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                                borderRadius: '3px',
                                wordBreak: 'break-word',
                              }}
                            >
                              {typeof after === 'object' ? JSON.stringify(after) : String(after || '(empty)')}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
