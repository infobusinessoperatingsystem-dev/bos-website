import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Heading, Text, Button } from '@primer/react'
import { getLearningPath } from '@/lib/learning-content'

interface PathPageProps {
  params: Promise<{
    pathId: string
  }>
}

export default async function PathPage({ params }: PathPageProps) {
  const { pathId } = await params
  const path = getLearningPath(pathId)

  if (!path) {
    notFound()
  }

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--stack-gap-spacious)' }}>
      {/* Header */}
      <section style={{ marginBottom: 'var(--stack-gap-spacious)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--stack-gap-normal)', marginBottom: 'var(--stack-gap-normal)' }}>
          <span style={{ fontSize: '40px' }}>{path.icon}</span>
          <Heading as="h1" variant="large">
            {path.title}
          </Heading>
        </div>

        <div style={{ color: 'var(--fgColor-muted)', maxWidth: '700px' }}>
          <Text size="medium">{path.description}</Text>
        </div>

        {/* Learning Outcomes */}
        <div style={{ marginTop: 'var(--stack-gap-spacious)', paddingTop: 'var(--stack-gap-spacious)', borderTop: '1px solid var(--borderColor-default)' }}>
          <div style={{ display: 'block', marginBottom: 'var(--stack-gap-normal)', color: 'var(--fgColor-default)', fontWeight: 600 }}>
            What You Will Learn
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--fgColor-muted)' }}>
            {path.learningOutcomes.map((outcome, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>
                <Text size="small">{outcome}</Text>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Articles */}
      <section>
        <Heading as="h2" variant="medium" style={{ marginBottom: 'var(--stack-gap-normal)' }}>
          Learning Articles
        </Heading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--stack-gap-normal)' }}>
          {path.articles.map((article, idx) => (
            <Link
              key={article.id}
              href={`/learn/${pathId}/${article.id}`}
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
                  display: 'flex',
                  gap: 'var(--stack-gap-normal)',
                  alignItems: 'flex-start'
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'var(--borderColor-success)'
                  el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'var(--borderColor-default)'
                  el.style.boxShadow = 'none'
                }}
              >
                <div
                  style={{
                    minWidth: '40px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '4px',
                    backgroundColor: path.color,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '18px'
                  }}
                >
                  {idx + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <Heading as="h3" variant="small" style={{ marginBottom: '8px' }}>
                    {article.title}
                  </Heading>
                  <div style={{ color: 'var(--fgColor-muted)', marginBottom: 'var(--stack-gap-normal)' }}>
                    <Text size="small">{article.description}</Text>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--fgColor-muted)' }}>
                    <span>{article.readingTime} min read</span>
                    <span>•</span>
                    <span style={{ textTransform: 'capitalize' }}>{article.difficulty}</span>
                    <span>•</span>
                    <span>{article.objectives.length} objectives</span>
                  </div>
                </div>

                <div>
                  <Button>Start Reading →</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Back Link */}
      <div style={{ marginTop: 'var(--stack-gap-spacious)' }}>
        <Link href="/learn" style={{ textDecoration: 'none' }}>
          <Button variant="invisible">← Back to Learning Hub</Button>
        </Link>
      </div>
    </main>
  )
}
