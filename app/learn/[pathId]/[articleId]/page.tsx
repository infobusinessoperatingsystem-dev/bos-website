import { notFound } from 'next/navigation'
import { Heading, Text } from '@primer/react'
import { getArticle, getLearningPath } from '@/lib/learning-content'
import { ArticleHeader } from '@/components/learning/article-header'
import { TableOfContents } from '@/components/learning/table-of-contents'
import { CalloutBox } from '@/components/learning/callout-box'
import { ArticleNav } from '@/components/learning/article-nav'
import { DiagramSection } from '@/components/learning/diagram-section'

interface ArticlePageProps {
  params: Promise<{
    pathId: string
    articleId: string
  }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { pathId, articleId } = await params
  const path = getLearningPath(pathId)
  const article = getArticle(pathId, articleId)

  if (!path || !article) {
    notFound()
  }

  // Get previous and next articles
  const articleIndex = path.articles.findIndex((a) => a.id === articleId)
  const previousArticle = articleIndex > 0 ? path.articles[articleIndex - 1] : undefined
  const nextArticle = articleIndex < path.articles.length - 1 ? path.articles[articleIndex + 1] : undefined

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--stack-gap-spacious)' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: 'var(--stack-gap-normal)', color: 'var(--fgColor-muted)', fontSize: '12px' }}>
        <a href="/learn" style={{ color: 'inherit', textDecoration: 'none' }}>
          Learning Hub
        </a>
        {' / '}
        <a href={`/learn/${pathId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          {path.title}
        </a>
        {' / '}
        <span>{article.title}</span>
      </div>

      <div style={{ display: 'flex', gap: 'var(--stack-gap-spacious)', alignItems: 'flex-start' }}>
        {/* Sidebar with TOC - Desktop only */}
        <div style={{ minWidth: '260px' }}>
          <TableOfContents sections={article.sections} />
        </div>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {/* Article Header */}
          <ArticleHeader article={article} />

          {/* Article Content */}
          <div style={{ marginTop: 'var(--stack-gap-spacious)' }}>
            {article.sections.map((section) => (
              <div key={section.id} id={`section-${section.id}`} style={{ marginBottom: 'var(--stack-gap-spacious)' }}>
                {section.type === 'text' && (
                  <>
                    <Heading as="h2" variant="medium" style={{ marginBottom: 'var(--stack-gap-normal)' }}>
                      {section.title}
                    </Heading>
                    <div style={{ lineHeight: 1.8, color: 'var(--fgColor-default)' }}>
                      <Text size="medium">{section.content}</Text>
                    </div>
                  </>
                )}

                {section.type === 'callout' && (
                  <CalloutBox type="tip" title={section.title}>
                    <Text size="small">{section.content}</Text>
                  </CalloutBox>
                )}

                {section.type === 'diagram' && <DiagramSection title={section.title} imageSrc={section.illustration} />}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div
            style={{
              marginTop: 'var(--stack-gap-spacious)',
              padding: 'var(--stack-gap-normal)',
              backgroundColor: 'var(--bgColor-neutral)',
              borderRadius: '8px',
              border: '1px solid var(--borderColor-default)'
            }}
          >
            <Heading as="h3" variant="small" style={{ marginBottom: '8px' }}>
              Continue Learning
            </Heading>
            <div style={{ color: 'var(--fgColor-muted)' }}>
              <Text size="small">
                Explore more articles in the {path.title} learning path to deepen your knowledge.
              </Text>
            </div>
          </div>

          {/* Article Navigation */}
          <ArticleNav
            currentArticle={article}
            previousArticle={previousArticle}
            nextArticle={nextArticle}
            pathId={pathId}
          />
        </div>
      </div>
    </main>
  )
}
