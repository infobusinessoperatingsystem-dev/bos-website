'use client'

import {
  Stack,
  Text,
  Heading,
} from '@primer/react'
import {
  ShieldLockIcon,
  ServerIcon,
  CommandPaletteIcon,
  BriefcaseIcon,
  ZapIcon,
  HeartIcon,
} from '@primer/octicons-react'

const services = [
  {
    icon: CommandPaletteIcon,
    title: 'Custom Software Development',
    description: 'Tailored solutions built specifically for your business needs, leveraging modern technologies and best practices.',
  },
  {
    icon: ShieldLockIcon,
    title: 'Cybersecurity',
    description: 'Robust security frameworks and proactive threat management to protect your digital assets and sensitive data.',
  },
  {
    icon: ServerIcon,
    title: 'Cloud Infrastructure',
    description: 'Scalable cloud solutions for infrastructure management, migration, and optimization.',
  },
  {
    icon: BriefcaseIcon,
    title: 'IT Consulting',
    description: 'Expert guidance on technology strategy, digital transformation, and operational efficiency.',
  },
  {
    icon: ZapIcon,
    title: 'Network Optimization',
    description: 'Enhanced network performance and reliability for seamless connectivity and productivity.',
  },
  {
    icon: HeartIcon,
    title: 'Technical Support',
    description: 'Reliable 24/7 support from expert technicians to keep your systems running smoothly.',
  },
]

export default function ServicesSection() {
  return (
    <div id="services" style={{ paddingTop: 'var(--stack-padding-spacious)', paddingBottom: 'var(--stack-padding-spacious)', background: 'var(--bgColor-default)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: 'var(--stack-padding-normal)', paddingRight: 'var(--stack-padding-normal)' }}>
        <Stack direction="vertical" gap="spacious">
          <div style={{ textAlign: 'center', marginBottom: 'var(--stack-gap-normal)' }}>
            <Heading as="h2" variant="medium">
              Our Services
            </Heading>
            <div style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--fgColor-muted)' }}>
              <Text size="medium">
                Comprehensive solutions designed to streamline your operations and enhance your business performance.
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
            {services.map((service, idx) => {
              const IconComponent = service.icon
              return (
                <div key={idx} style={{ padding: 'var(--stack-padding-normal)', border: '1px solid var(--borderColor-default)', borderRadius: 'var(--borderRadius-medium)' }}>
                  <Stack direction="vertical" gap="normal">
                    <div style={{ color: 'var(--fgColor-accent)' }}>
                      <IconComponent size={32} />
                    </div>
                    <Heading as="h3" variant="small">
                      {service.title}
                    </Heading>
                    <div style={{ color: 'var(--fgColor-muted)', lineHeight: 1.6 }}>
                      <Text size="small">
                        {service.description}
                      </Text>
                    </div>
                  </Stack>
                </div>
              )
            })}
          </div>
        </Stack>
      </div>
    </div>
  )
}
