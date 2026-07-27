'use client'

import Link from 'next/link'
import { Button, Text } from '@primer/react'
import { Article } from '@/lib/learning-content'

interface ArticleNavProps {
  currentArticle: Article
  previousArticle?: Article
  nextArticle?: Article
  pathId: string
}

export function ArticleNav({ currentArticle, previousArticle, nextArticle, pathId }: ArticleNavProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 'var(--stack-gap-spacious)',
        borderTop: '1px solid var(--borderColor-default)',
        marginTop: 'var(--stack-gap-spacious)'
      }}
    >
      <div style={{ flex: 1 }}>
        {previousArticle ? (
          <Link href={`/learn/${pathId}/${previousArticle.id}`} style={{ textDecoration: 'none' }}>
            <Button>← Previous</Button>
          </Link>
        ) : null}
      </div>

      <div style={{ textAlign: 'center', color: 'var(--fgColor-muted)' }}>
        <Text size="small">
          Article {currentArticle.order} of 2
        </Text>
      </div>

      <div style={{ flex: 1, textAlign: 'right' }}>
        {nextArticle ? (
          <Link href={`/learn/${pathId}/${nextArticle.id}`} style={{ textDecoration: 'none' }}>
            <Button>Next →</Button>
          </Link>
        ) : null}
      </div>
    </div>
  )
}
