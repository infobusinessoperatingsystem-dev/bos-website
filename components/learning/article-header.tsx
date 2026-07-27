'use client'

import { Heading, Text } from '@primer/react'
import { Article, Difficulty } from '@/lib/learning-content'

interface ArticleHeaderProps {
  article: Article
}

const difficultyStyles = {
  beginner: { bg: '#dafbe1', text: '#0f6e3f' },
  intermediate: { bg: '#ffd8b5', text: '#7d4e00' },
  advanced: { bg: '#f0d9ff', text: '#5c2e7e' }
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const styles = difficultyStyles[article.difficulty]

  return (
    <div style={{ marginBottom: 'var(--stack-gap-spacious)' }}>
      <div style={{ display: 'flex', gap: 'var(--stack-gap-normal)', alignItems: 'center', marginBottom: 'var(--stack-gap-normal)' }}>
        <div
          style={{
            backgroundColor: styles.bg,
            color: styles.text,
            padding: '4px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'capitalize'
          }}
        >
          {article.difficulty}
        </div>
        <div style={{ color: 'var(--fgColor-muted)', fontSize: '12px' }}>
          {article.readingTime} min read
        </div>
      </div>

      <Heading as="h1" variant="large">
        {article.title}
      </Heading>

      <div style={{ marginTop: 'var(--stack-gap-normal)', color: 'var(--fgColor-muted)' }}>
        <Text size="medium">{article.description}</Text>
      </div>

      {article.objectives.length > 0 && (
        <div style={{ marginTop: 'var(--stack-gap-spacious)', paddingTop: 'var(--stack-gap-normal)', borderTop: '1px solid var(--borderColor-default)' }}>
          <div style={{ display: 'block', marginBottom: 'var(--stack-gap-normal)', fontWeight: 600 }}>
            <Text size="small">Learning Objectives</Text>
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--fgColor-muted)' }}>
            {article.objectives.map((obj) => (
              <li key={obj.title} style={{ marginBottom: '8px' }}>
                <Text size="small">{obj.description}</Text>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
