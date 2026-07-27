'use client'

import { useEffect, useState } from 'react'
import { Heading, Button, Text } from '@primer/react'
import {
  getLearningPaths,
  getArticles,
  getSections,
  createPath,
  createArticle,
  createSection,
  updatePath,
  updateArticle,
  updateSection,
  deletePath,
  deleteArticle,
  deleteSection,
} from '@/app/actions/content'
import PathEditor from './editors/path-editor'
import ArticleEditor from './editors/article-editor'
import SectionEditor from './editors/section-editor'

type EditMode = null | { type: 'path'; id?: string } | { type: 'article'; pathId: string; id?: string } | { type: 'section'; articleId: string; id?: string }

export default function ContentManager({ onUpdated }: { onUpdated: () => void }) {
  const [paths, setPaths] = useState<any[]>([])
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null)
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null)
  const [editMode, setEditMode] = useState<EditMode>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadPaths()
  }, [])

  const loadPaths = async () => {
    try {
      setLoading(true)
      const data = await getLearningPaths()
      setPaths(data)
      if (data.length > 0 && !selectedPathId) {
        setSelectedPathId(data[0].id)
      }
    } catch (error) {
      console.error('Failed to load paths:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePath = async (data: any) => {
    try {
      await createPath(data)
      await loadPaths()
      setEditMode(null)
      onUpdated()
    } catch (error) {
      console.error('Failed to create path:', error)
    }
  }

  const handleUpdatePath = async (id: string, data: any) => {
    try {
      await updatePath(id, data)
      await loadPaths()
      setEditMode(null)
      onUpdated()
    } catch (error) {
      console.error('Failed to update path:', error)
    }
  }

  const handleDeletePath = async (id: string) => {
    if (!confirm('Are you sure you want to delete this learning path and all its articles?')) return

    try {
      await deletePath(id)
      await loadPaths()
      setSelectedPathId(null)
      onUpdated()
    } catch (error) {
      console.error('Failed to delete path:', error)
    }
  }

  const handleCreateArticle = async (data: any) => {
    try {
      await createArticle(data)
      if (selectedPathId) {
        // Reload paths to update the list
        await loadPaths()
      }
      setEditMode(null)
      onUpdated()
    } catch (error) {
      console.error('Failed to create article:', error)
    }
  }

  const handleUpdateArticle = async (id: string, data: any) => {
    try {
      await updateArticle(id, data)
      if (selectedPathId) {
        await loadPaths()
      }
      setEditMode(null)
      onUpdated()
    } catch (error) {
      console.error('Failed to update article:', error)
    }
  }

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return

    try {
      await deleteArticle(id)
      if (selectedPathId) {
        await loadPaths()
      }
      setSelectedArticleId(null)
      onUpdated()
    } catch (error) {
      console.error('Failed to delete article:', error)
    }
  }

  const handleCreateSection = async (data: any) => {
    try {
      await createSection(data)
      if (selectedPathId) {
        await loadPaths()
      }
      setEditMode(null)
      onUpdated()
    } catch (error) {
      console.error('Failed to create section:', error)
    }
  }

  const handleUpdateSection = async (id: string, data: any) => {
    try {
      await updateSection(id, data)
      if (selectedPathId) {
        await loadPaths()
      }
      setEditMode(null)
      onUpdated()
    } catch (error) {
      console.error('Failed to update section:', error)
    }
  }

  const handleDeleteSection = async (id: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return

    try {
      await deleteSection(id)
      if (selectedPathId) {
        await loadPaths()
      }
      onUpdated()
    } catch (error) {
      console.error('Failed to delete section:', error)
    }
  }

  const selectedPath = paths.find((p) => p.id === selectedPathId)
  const selectedArticles = selectedPath ? (selectedPath.articles || []) : []
  const selectedArticle = selectedArticles.find((a: any) => a.id === selectedArticleId)
  const selectedSections = selectedArticle ? (selectedArticle.sections || []) : []

  // Load articles for selected path
  useEffect(() => {
    const loadArticles = async () => {
      if (selectedPathId) {
        try {
          const articles = await getArticles(selectedPathId)
          setPaths((prev) =>
            prev.map((p) => (p.id === selectedPathId ? { ...p, articles } : p))
          )
          if (articles.length > 0 && !selectedArticleId) {
            setSelectedArticleId(articles[0].id)
          }
        } catch (error) {
          console.error('Failed to load articles:', error)
        }
      }
    }
    loadArticles()
  }, [selectedPathId])

  // Load sections for selected article
  useEffect(() => {
    const loadSections = async () => {
      if (selectedArticleId && selectedPath) {
        try {
          const sections = await getSections(selectedArticleId)
          setPaths((prev) =>
            prev.map((p) =>
              p.id === selectedPathId
                ? {
                    ...p,
                    articles: p.articles?.map((a: any) =>
                      a.id === selectedArticleId ? { ...a, sections } : a
                    ),
                  }
                : p
            )
          )
        } catch (error) {
          console.error('Failed to load sections:', error)
        }
      }
    }
    loadSections()
  }, [selectedArticleId, selectedPath])

  if (editMode?.type === 'path') {
    return (
      <PathEditor
        pathId={editMode.id}
        onSave={editMode.id ? (data) => handleUpdatePath(editMode.id!, data) : handleCreatePath}
        onCancel={() => setEditMode(null)}
        isNewItem={!editMode.id}
      />
    )
  }

  if (editMode?.type === 'article') {
    return (
      <ArticleEditor
        articleId={editMode.id}
        pathId={editMode.pathId}
        onSave={editMode.id ? (data) => handleUpdateArticle(editMode.id!, data) : handleCreateArticle}
        onCancel={() => setEditMode(null)}
        isNewItem={!editMode.id}
      />
    )
  }

  if (editMode?.type === 'section') {
    return (
      <SectionEditor
        sectionId={editMode.id}
        articleId={editMode.articleId}
        onSave={editMode.id ? (data) => handleUpdateSection(editMode.id!, data) : handleCreateSection}
        onCancel={() => setEditMode(null)}
        isNewItem={!editMode.id}
      />
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 'var(--stack-gap-spacious)' }}>
      {/* Left Panel - Navigation */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--stack-gap-normal)' }}>
          <Heading as="h3" variant="small">
            Paths
          </Heading>
          <Button onClick={() => setEditMode({ type: 'path' })} variant="primary" size="small">
            Add Path
          </Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '600px', overflowY: 'auto' }}>
          {paths.map((path) => (
            <div
              key={path.id}
              onClick={() => setSelectedPathId(path.id)}
              style={{
                padding: 'var(--stack-gap-normal)',
                border: '1px solid var(--borderColor-default)',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: selectedPathId === path.id ? 'var(--bgColor-neutral)' : 'transparent',
                transition: 'background-color 0.2s',
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>{path.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--fgColor-muted)' }}>{path.articles?.length || 0} articles</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Content */}
      <div>
        {selectedPath ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--stack-gap-spacious)' }}>
              <div>
                <Heading as="h2" variant="medium" style={{ marginBottom: '8px' }}>
                  {selectedPath.title}
                </Heading>
                <div style={{ color: 'var(--fgColor-muted)', fontSize: '12px' }}>
                  {selectedPath.description}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button onClick={() => setEditMode({ type: 'path', id: selectedPath.id })} size="small">
                  Edit Path
                </Button>
                <Button onClick={() => handleDeletePath(selectedPath.id)} variant="danger" size="small">
                  Delete Path
                </Button>
              </div>
            </div>

            {/* Articles */}
            <div style={{ marginBottom: 'var(--stack-gap-spacious)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--stack-gap-normal)' }}>
                <Heading as="h3" variant="small">
                  Articles
                </Heading>
                <Button onClick={() => setEditMode({ type: 'article', pathId: selectedPath.id })} variant="primary" size="small">
                  Add Article
                </Button>
              </div>

              <div style={{ display: 'grid', gap: '12px' }}>
                {selectedArticles.map((article: any) => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticleId(article.id)}
                    style={{
                      padding: 'var(--stack-gap-normal)',
                      border: '1px solid var(--borderColor-default)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      backgroundColor: selectedArticleId === article.id ? 'var(--bgColor-neutral)' : 'transparent',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ fontWeight: 600 }}>{article.title}</div>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <Button onClick={() => setEditMode({ type: 'article', pathId: selectedPath.id, id: article.id })} size="small" variant="invisible">
                          Edit
                        </Button>
                        <Button onClick={() => handleDeleteArticle(article.id)} size="small" variant="invisible">
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--fgColor-muted)' }}>
                      {article.readingTime} min read • {article.difficulty} • {article.sections?.length || 0} sections
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sections */}
            {selectedArticle && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--stack-gap-normal)' }}>
                  <Heading as="h3" variant="small">
                    Sections - {selectedArticle.title}
                  </Heading>
                  <Button onClick={() => setEditMode({ type: 'section', articleId: selectedArticle.id })} variant="primary" size="small">
                    Add Section
                  </Button>
                </div>

                <div style={{ display: 'grid', gap: '12px' }}>
                  {selectedSections.map((section: any) => (
                    <div
                      key={section.id}
                      style={{
                        padding: 'var(--stack-gap-normal)',
                        border: '1px solid var(--borderColor-default)',
                        borderRadius: '6px',
                        backgroundColor: 'var(--bgColor-neutral)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ fontWeight: 600 }}>{section.title}</div>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <Button onClick={() => setEditMode({ type: 'section', articleId: selectedArticle.id, id: section.id })} size="small" variant="invisible">
                            Edit
                          </Button>
                          <Button onClick={() => handleDeleteSection(section.id)} size="small" variant="invisible">
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: 'var(--fgColor-muted)',
                          maxHeight: '100px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {section.content.substring(0, 200)}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--fgColor-muted)', padding: 'var(--stack-gap-spacious)' }}>
            <Text size="medium">Select a learning path to manage its content</Text>
          </div>
        )}
      </div>
    </div>
  )
}
