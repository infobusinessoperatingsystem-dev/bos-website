'use client'

import { Heading, Text } from '@primer/react'

interface DiagramSectionProps {
  title: string
  description?: string
  imageSrc?: string
  svgContent?: string
}

export function DiagramSection({ title, description, imageSrc, svgContent }: DiagramSectionProps) {
  return (
    <div style={{ margin: 'var(--stack-gap-spacious) 0' }}>
      <Heading as="h3" variant="small">
        {title}
      </Heading>

      {description && (
        <div style={{ color: 'var(--fgColor-muted)', marginTop: 'var(--stack-gap-normal)' }}>
          <Text size="small">{description}</Text>
        </div>
      )}

      <div
        style={{
          marginTop: 'var(--stack-gap-normal)',
          padding: 'var(--stack-gap-normal)',
          backgroundColor: 'var(--bgColor-neutral)',
          borderRadius: '8px',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--borderColor-default)'
        }}
      >
        {svgContent ? (
          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        ) : imageSrc ? (
          <img src={imageSrc} alt={title} style={{ maxWidth: '100%', maxHeight: '400px' }} />
        ) : (
          <div style={{ color: 'var(--fgColor-muted)' }}>
            <Text size="small">
              Diagram: {title}
            </Text>
          </div>
        )}
      </div>
    </div>
  )
}
