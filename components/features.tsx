'use client'

import {
  Stack,
  Text,
  Heading,
} from '@primer/react'
import { CheckCircleIcon } from '@primer/octicons-react'

const features = [
  {
    title: 'Expert Technicians & Developers',
    description: 'Our highly skilled team brings years of industry experience and a passion for innovation.',
  },
  {
    title: 'Tailored Solutions',
    description: 'Every solution is customized to match your unique business requirements and goals.',
  },
  {
    title: 'Proactive Management',
    description: 'We don\'t just react to issues—we anticipate and prevent them before they impact your operations.',
  },
  {
    title: 'Focus on Your Core Business',
    description: 'Outsource your IT concerns and concentrate on what you do best while we handle technology.',
  },
  {
    title: 'Enhanced Efficiency',
    description: 'Our solutions streamline workflows and reduce operational overhead significantly.',
  },
  {
    title: 'Strengthened Security',
    description: 'Comprehensive cybersecurity measures keep your data protected against evolving threats.',
  },
]

export default function FeaturesSection() {
  return (
    <div id="features" style={{ paddingTop: 'var(--stack-padding-spacious)', paddingBottom: 'var(--stack-padding-spacious)', background: 'var(--bgColor-inset)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: 'var(--stack-padding-normal)', paddingRight: 'var(--stack-padding-normal)' }}>
        <Stack direction="vertical" gap="spacious">
          <div style={{ textAlign: 'center', marginBottom: 'var(--stack-gap-normal)' }}>
            <Heading as="h2" variant="medium">
              Why Choose Business OS?
            </Heading>
            <div style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--fgColor-muted)' }}>
              <Text size="medium">
                Trusted by businesses across Ghana to deliver exceptional results.
              </Text>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--stack-gap-normal)',
              paddingTop: 'var(--stack-padding-normal)',
            }}
          >
            {features.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  padding: 'var(--stack-padding-normal)',
                  background: 'var(--bgColor-default)',
                  border: '1px solid var(--borderColor-default)',
                  borderRadius: 'var(--borderRadius-medium)',
                }}
              >
                <Stack direction="vertical" gap="normal">
                  <div style={{ color: 'var(--fgColor-success)' }}>
                    <CheckCircleIcon size={24} />
                  </div>
                  <Heading as="h3" variant="small">
                    {feature.title}
                  </Heading>
                  <div style={{ color: 'var(--fgColor-muted)', lineHeight: 1.6 }}>
                    <Text size="small">
                      {feature.description}
                    </Text>
                  </div>
                </Stack>
              </div>
            ))}
          </div>
        </Stack>
      </div>
    </div>
  )
}
