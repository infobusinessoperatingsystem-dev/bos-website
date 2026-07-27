'use client'

import { useState, useEffect } from 'react'
import { Heading, Button, Text } from '@primer/react'
import { getPathById } from '@/app/actions/content'

interface PathEditorProps {
  pathId?: string
  onSave: (data: any) => void
  onCancel: () => void
  isNewItem: boolean
}

export default function PathEditor({ pathId, onSave, onCancel, isNewItem }: PathEditorProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '📚',
    order: 0,
  })
  const [loading, setLoading] = useState(!isNewItem)

  useEffect(() => {
    if (pathId && !isNewItem) {
      loadPath()
    }
  }, [pathId, isNewItem])

  const loadPath = async () => {
    if (!pathId) return
    try {
      const path = await getPathById(pathId)
      if (path) {
        setFormData({
          title: path.title,
          description: path.description,
          icon: path.icon,
          order: path.order,
        })
      }
    } catch (error) {
      console.error('Failed to load path:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  if (loading) return <div>Loading...</div>

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: 'var(--stack-gap-spacious)' }}>
        <Heading as="h2" variant="medium">
          {isNewItem ? 'Create Learning Path' : 'Edit Learning Path'}
        </Heading>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--stack-gap-normal)', marginBottom: 'var(--stack-gap-spacious)' }}>
        {/* Title */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Path Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="e.g., Product Strategy"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid var(--borderColor-default)',
              borderRadius: '6px',
              backgroundColor: 'var(--bgColor-default)',
              color: 'var(--fgColor-default)',
            }}
          />
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            placeholder="Describe this learning path..."
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid var(--borderColor-default)',
              borderRadius: '6px',
              backgroundColor: 'var(--bgColor-default)',
              color: 'var(--fgColor-default)',
            }}
          />
        </div>

        {/* Icon */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Icon Emoji *</label>
          <input
            type="text"
            maxLength={2}
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            required
            placeholder="📚"
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: '24px',
              border: '1px solid var(--borderColor-default)',
              borderRadius: '6px',
              backgroundColor: 'var(--bgColor-default)',
              color: 'var(--fgColor-default)',
            }}
          />
          <div style={{ color: 'var(--fgColor-muted)', marginTop: '4px', fontSize: '12px' }}>
            Use a single emoji or character
          </div>
        </div>

        {/* Order */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Display Order *</label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            required
            min="0"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid var(--borderColor-default)',
              borderRadius: '6px',
              backgroundColor: 'var(--bgColor-default)',
              color: 'var(--fgColor-default)',
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Button type="submit" variant="primary">
          {isNewItem ? 'Create Path' : 'Save Changes'}
        </Button>
        <Button onClick={onCancel} variant="invisible">
          Cancel
        </Button>
      </div>
    </form>
  )
}
