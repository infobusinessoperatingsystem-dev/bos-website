'use client'

import { useState, useEffect } from 'react'
import { Heading, Button, Text } from '@primer/react'
import { getArticleById, getPathById } from '@/app/actions/content'

interface ArticleEditorProps {
  articleId?: string
  pathId: string
  onSave: (data: any) => void
  onCancel: () => void
  isNewItem: boolean
}

export default function ArticleEditor({ articleId, pathId, onSave, onCancel, isNewItem }: ArticleEditorProps) {
  const [formData, setFormData] = useState({
    pathId,
    title: '',
    description: '',
    readingTime: 5,
    difficulty: 'intermediate',
    order: 0,
    objectives: [{ title: '', description: '' }],
  })
  const [loading, setLoading] = useState(!isNewItem)
  const [pathName, setPathName] = useState('')

  useEffect(() => {
    loadPathName()
    if (articleId && !isNewItem) {
      loadArticle()
    }
  }, [articleId, pathId, isNewItem])

  const loadPathName = async () => {
    try {
      const path = await getPathById(pathId)
      if (path) setPathName(path.title)
    } catch (error) {
      console.error('Failed to load path:', error)
    }
  }

  const loadArticle = async () => {
    if (!articleId) return
    try {
      const article = await getArticleById(articleId)
      if (article) {
        setFormData({
          pathId: article.pathId,
          title: article.title,
          description: article.description,
          readingTime: article.readingTime,
          difficulty: article.difficulty,
          order: article.order,
          objectives: article.objectives || [{ title: '', description: '' }],
        })
      }
    } catch (error) {
      console.error('Failed to load article:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const addObjective = () => {
    setFormData({
      ...formData,
      objectives: [...formData.objectives, { title: '', description: '' }],
    })
  }

  const removeObjective = (index: number) => {
    setFormData({
      ...formData,
      objectives: formData.objectives.filter((_, i) => i !== index),
    })
  }

  const updateObjective = (index: number, field: string, value: string) => {
    const newObjectives = [...formData.objectives]
    newObjectives[index] = { ...newObjectives[index], [field]: value }
    setFormData({ ...formData, objectives: newObjectives })
  }

  if (loading) return <div>Loading...</div>

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: 'var(--stack-gap-spacious)' }}>
        <Heading as="h2" variant="medium">
          {isNewItem ? 'Create Article' : 'Edit Article'}
        </Heading>
        {pathName && (
          <div style={{ color: 'var(--fgColor-muted)', marginTop: '8px', fontSize: '12px' }}>
            Path: {pathName}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--stack-gap-normal)', marginBottom: 'var(--stack-gap-spacious)' }}>
        {/* Title */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Article Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="e.g., Introduction to Market Analysis"
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
            rows={3}
            placeholder="Brief description of the article..."
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--stack-gap-normal)' }}>
          {/* Reading Time */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Reading Time (minutes) *</label>
            <input
              type="number"
              value={formData.readingTime}
              onChange={(e) => setFormData({ ...formData, readingTime: parseInt(e.target.value) })}
              required
              min="1"
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

          {/* Difficulty */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Difficulty Level *</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid var(--borderColor-default)',
                borderRadius: '6px',
                backgroundColor: 'var(--bgColor-default)',
                color: 'var(--fgColor-default)',
              }}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
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

        {/* Learning Objectives */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <label style={{ fontWeight: 500 }}>Learning Objectives</label>
            <Button onClick={addObjective} size="small" variant="primary">
              Add Objective
            </Button>
          </div>

          {formData.objectives.map((obj, idx) => (
            <div
              key={idx}
              style={{
                padding: 'var(--stack-gap-normal)',
                border: '1px solid var(--borderColor-default)',
                borderRadius: '6px',
                marginBottom: '12px',
                backgroundColor: 'var(--bgColor-neutral)',
              }}
            >
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 500 }}>Objective Title</label>
                <input
                  type="text"
                  value={obj.title}
                  onChange={(e) => updateObjective(idx, 'title', e.target.value)}
                  placeholder="e.g., Understand key metrics"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid var(--borderColor-default)',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bgColor-default)',
                    color: 'var(--fgColor-default)',
                  }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 500 }}>Description</label>
                <textarea
                  value={obj.description}
                  onChange={(e) => updateObjective(idx, 'description', e.target.value)}
                  rows={2}
                  placeholder="Describe what students will learn..."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid var(--borderColor-default)',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bgColor-default)',
                    color: 'var(--fgColor-default)',
                  }}
                />
              </div>

              {formData.objectives.length > 1 && (
                <Button
                  onClick={() => removeObjective(idx)}
                  size="small"
                  variant="danger"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Button type="submit" variant="primary">
          {isNewItem ? 'Create Article' : 'Save Changes'}
        </Button>
        <Button onClick={onCancel} variant="invisible">
          Cancel
        </Button>
      </div>
    </form>
  )
}
