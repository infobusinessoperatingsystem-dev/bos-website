'use client'

import Link from 'next/link'
import { Heading, Text, Button } from '@primer/react'
import { learningPaths, getFeaturedArticles } from '@/lib/learning-content'

export default function LearnHub() {
  const featuredArticles = getFeaturedArticles()

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--stack-gap-spacious)' }}>
      {/* Header Section */}
      <section style={{ marginBottom: 'var(--stack-gap-spacious)' }}>
        <Heading as="h1" variant="large">
          Learning Hub
        </Heading>
        <div style={{ marginTop: 'var(--stack-gap-normal)', color: 'var(--fgColor-muted)', maxWidth: '700px' }}>
          <Text size="medium">
            Discover comprehensive resources to understand modern business systems, software architecture, and digital transformation strategies.
          </Text>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section style={{ marginBottom: 'var(--stack-gap-spacious)' }}>
          <Heading as="h2" variant="medium" style={{ marginBottom: 'var(--stack-gap-normal)' }}>
            Featured Articles
          </Heading>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--stack-gap-normal)'
            }}
          >
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/learn/${article.pathId}/${article.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    padding: 'var(--stack-gap-normal)',
                    border: '1px solid var(--borderColor-default)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backgroundColor: 'var(--bgColor-default)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--borderColor-success)'
                    el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--borderColor-default)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <Heading as="h3" variant="small" style={{ marginBottom: 'var(--stack-gap-normal)' }}>
                    {article.title}
                  </Heading>
                  <div style={{ color: 'var(--fgColor-muted)', marginBottom: 'var(--stack-gap-normal)', flex: 1 }}>
                    <Text size="small">{article.description}</Text>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--stack-gap-tight)', fontSize: '12px', color: 'var(--fgColor-muted)' }}>
                    <span>{article.readingTime} min read</span>
                    <span>•</span>
                    <span style={{ textTransform: 'capitalize' }}>{article.difficulty}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Learning Paths */}
      <section>
        <Heading as="h2" variant="medium" style={{ marginBottom: 'var(--stack-gap-normal)' }}>
          Learning Paths
        </Heading>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--stack-gap-normal)'
          }}
        >
          {learningPaths.map((path) => (
            <div
              key={path.id}
              style={{
                padding: 'var(--stack-gap-normal)',
                border: '1px solid var(--borderColor-default)',
                borderRadius: '8px',
                backgroundColor: 'var(--bgColor-default)',
                borderLeft: `4px solid ${path.color}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--stack-gap-normal)', marginBottom: 'var(--stack-gap-normal)' }}>
                <span style={{ fontSize: '24px' }}>{path.icon}</span>
                <Heading as="h3" variant="small">
                  {path.title}
                </Heading>
              </div>

              <div style={{ color: 'var(--fgColor-muted)', marginBottom: 'var(--stack-gap-normal)' }}>
                <Text size="small">{path.description}</Text>
              </div>

              <div style={{ marginBottom: 'var(--stack-gap-normal)' }}>
                <Text size="small" weight="semibold" style={{ display: 'block', marginBottom: '8px', color: 'var(--fgColor-default)' }}>
                  Key Outcomes
                </Text>
                <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--fgColor-muted)' }}>
                  {path.learningOutcomes.slice(0, 2).map((outcome, idx) => (
                    <li key={idx} style={{ fontSize: '12px', marginBottom: '4px' }}>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={`/learn/${path.id}`} style={{ textDecoration: 'none' }}>
                <Button style={{ width: '100%' }}>Explore Path</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
