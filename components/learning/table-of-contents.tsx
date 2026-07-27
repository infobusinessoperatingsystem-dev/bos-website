'use client'

import { useState, useEffect } from 'react'
import { Text } from '@primer/react'
import { ArticleSection } from '@/lib/learning-content'

interface TableOfContentsProps {
  sections: ArticleSection[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const element = document.getElementById(`section-${section.id}`)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top >= 0 && rect.top <= window.innerHeight / 3) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <nav
      style={{
        position: 'sticky',
        top: '20px',
        backgroundColor: 'var(--bgColor-default)',
        border: '1px solid var(--borderColor-default)',
        borderRadius: '8px',
        padding: 'var(--stack-gap-normal)',
        maxWidth: '250px'
      }}
    >
      <Text size="small" weight="semibold" style={{ display: 'block', marginBottom: 'var(--stack-gap-normal)' }}>
        Contents
      </Text>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {sections.map((section) => (
          <li key={section.id} style={{ marginBottom: '8px' }}>
            <a
              href={`#section-${section.id}`}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(`section-${section.id}`)
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                display: 'block',
                padding: '6px 8px',
                textDecoration: 'none',
                color: activeSection === section.id ? 'var(--fgColor-default)' : 'var(--fgColor-muted)',
                borderLeft: activeSection === section.id ? '3px solid var(--borderColor-success)' : '3px solid transparent',
                fontSize: '14px',
                fontWeight: activeSection === section.id ? 600 : 400,
                transition: 'all 0.2s'
              }}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
