'use client'

import { useState, useEffect } from 'react'
import { Heading, Button, Text } from '@primer/react'
import { getSectionById, getArticleById } from '@/app/actions/content'

interface SectionEditorProps {
  sectionId?: string
  articleId: string
  onSave: (data: any) => void
  onCancel: () => void
  isNewItem: boolean
}

export default function SectionEditor({ sectionId, articleId, onSave, onCancel, isNewItem }: SectionEditorProps) {
  const [formData, setFormData] = useState({
    articleId,
    title: '',
    content: '',
    order: 0,
  })
  const [loading, setLoading] = useState(!isNewItem)
  const [articleTitle, setArticleTitle] = useState('')

  useEffect(() => {
    loadArticleTitle()
    if (sectionId && !isNewItem) {
      loadSection()
    }
  }, [sectionId, articleId, isNewItem])

  const loadArticleTitle = async () => {
    try {
      const article = await getArticleById(articleId)
      if (article) setArticleTitle(article.title)
    } catch (error) {
      console.error('Failed to load article:', error)
    }
  }

  const loadSection = async () => {
    if (!sectionId) return
    try {
      const section = await getSectionById(sectionId)
      if (section) {
        setFormData({
          articleId: section.articleId,
          title: section.title,
          content: section.content,
          order: section.order,
        })
      }
    } catch (error) {
      console.error('Failed to load section:', error)
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
    <form onSubmit={handleSubmit} style={{ maxWidth: '1000px' }}>
      <div style={{ marginBottom: 'var(--stack-gap-spacious)' }}>
        <Heading as="h2" variant="medium">
          {isNewItem ? 'Create Section' : 'Edit Section'}
        </Heading>
        {articleTitle && (
          <div style={{ color: 'var(--fgColor-muted)', marginTop: '8px', fontSize: '12px' }}>
            Article: {articleTitle}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--stack-gap-normal)', marginBottom: 'var(--stack-gap-spacious)' }}>
        {/* Title */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Section Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="e.g., Understanding Customer Segmentation"
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

        {/* Content */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Content (Markdown) *</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={12}
            placeholder="Write your section content here. Supports Markdown formatting:&#10;# Headings&#10;**Bold**, *Italic*&#10;- Lists&#10;- Items&#10;[Links](url)&#10;```code blocks```"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid var(--borderColor-default)',
              borderRadius: '6px',
              backgroundColor: 'var(--bgColor-default)',
              color: 'var(--fgColor-default)',
              fontFamily: 'monospace',
              fontSize: '14px',
            }}
          />
          <div style={{ color: 'var(--fgColor-muted)', marginTop: '8px', fontSize: '12px' }}>
            Markdown formatting supported: headings, bold, italic, lists, links, and code blocks
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

      {/* Preview */}
      <div style={{ marginBottom: 'var(--stack-gap-spacious)' }}>
        <Heading as="h3" variant="small" style={{ marginBottom: 'var(--stack-gap-normal)' }}>
          Live Preview
        </Heading>
        <div
          style={{
            padding: 'var(--stack-gap-normal)',
            border: '1px solid var(--borderColor-default)',
            borderRadius: '6px',
            backgroundColor: 'var(--bgColor-neutral)',
            minHeight: '200px',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          }}
        >
          {formData.content || <div style={{ color: 'var(--fgColor-muted)' }}>Preview will appear here...</div>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Button type="submit" variant="primary">
          {isNewItem ? 'Create Section' : 'Save Changes'}
        </Button>
        <Button onClick={onCancel} variant="invisible">
          Cancel
        </Button>
      </div>
    </form>
  )
}
