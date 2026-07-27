'use client'

import { Text } from '@primer/react'

interface CalloutBoxProps {
  type: 'tip' | 'important' | 'warning' | 'note'
  title: string
  children: React.ReactNode
}

const calloutStyles = {
  tip: {
    bg: '#dafbe1',
    border: '#28a745',
    icon: '💡'
  },
  important: {
    bg: '#cce5ff',
    border: '#0969da',
    icon: '⭐'
  },
  warning: {
    bg: '#fff8c5',
    border: '#ffc107',
    icon: '⚠️'
  },
  note: {
    bg: '#f6f8fa',
    border: '#d0d7de',
    icon: '📝'
  }
}

export function CalloutBox({ type, title, children }: CalloutBoxProps) {
  const styles = calloutStyles[type]

  return (
    <div
      style={{
        backgroundColor: styles.bg,
        borderLeft: `4px solid ${styles.border}`,
        borderRadius: '6px',
        padding: 'var(--stack-gap-normal)',
        margin: 'var(--stack-gap-normal) 0',
        display: 'flex',
        gap: 'var(--stack-gap-normal)'
      }}
    >
      <div style={{ fontSize: '20px', lineHeight: 1 }}>{styles.icon}</div>
      <div style={{ flex: 1 }}>
        <Text size="small" weight="semibold" style={{ display: 'block', marginBottom: '4px' }}>
          {title}
        </Text>
        <div style={{ color: 'var(--fgColor-default)' }}>{children}</div>
      </div>
    </div>
  )
}
