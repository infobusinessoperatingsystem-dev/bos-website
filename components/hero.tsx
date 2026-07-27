'use client'

import {
  Button,
  Stack,
  Text,
  Heading,
} from '@primer/react'

export default function HeroSection() {
  return (
    <div
      style={{
        paddingTop: 'var(--stack-padding-spacious)',
        paddingBottom: 'var(--stack-padding-spacious)',
        background: 'linear-gradient(135deg, #0969da 0%, #1f6feb 100%)',
        color: 'var(--fgColor-onEmphasis)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: 'var(--stack-padding-normal)', paddingRight: 'var(--stack-padding-normal)' }}>
        <Stack direction="vertical" gap="spacious" align="center">
          <div style={{ textAlign: 'center', color: 'inherit' }}>
            <Heading as="h1" variant="large">
              Transform Your Business with Enterprise-Grade Technology
            </Heading>
          </div>
          <div style={{ lineHeight: 1.6, textAlign: 'center', maxWidth: '800px', margin: '0 auto', color: 'inherit' }}>
            <Text as="p" size="large">
              Business OS delivers innovative software solutions, robust cybersecurity, and comprehensive IT services to streamline your operations and strengthen your digital foundation.
            </Text>
          </div>
          <Stack direction="horizontal" gap="normal" align="center" justify="center" wrap="wrap" sx={{ pt: 2 }}>
            <Button
              size="large"
              onClick={() => {
                const el = document.getElementById('contact')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Start Your Journey
            </Button>
            <Button
              size="large"
              onClick={() => {
                const el = document.getElementById('services')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Explore Our Services
            </Button>
          </Stack>
        </Stack>
      </div>
    </div>
  )
}
