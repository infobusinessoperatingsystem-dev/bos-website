'use client'

import {
  Button,
  Stack,
  Text,
  Heading,
} from '@primer/react'

export default function CTASection() {
  return (
    <div id="contact" style={{ paddingTop: 'var(--stack-padding-spacious)', paddingBottom: 'var(--stack-padding-spacious)', background: 'var(--bgColor-default)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: 'var(--stack-padding-normal)', paddingRight: 'var(--stack-padding-normal)' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #1f6feb 0%, #0969da 100%)',
            borderRadius: 'var(--borderRadius-medium)',
            padding: 'var(--stack-padding-spacious)',
            textAlign: 'center',
            color: 'var(--fgColor-onEmphasis)',
          }}
        >
          <Stack direction="vertical" gap="spacious" align="center" paddingBottom="normal">
            <div style={{ color: 'inherit' }}>
              <Heading as="h2" variant="medium">
                Ready to Transform Your Business?
              </Heading>
            </div>
            <div style={{ maxWidth: '700px', lineHeight: 1.6, opacity: 0.95, color: 'inherit' }}>
              <Text size="medium">
                Contact Business OS today and discover how our innovative solutions can streamline your operations, strengthen your systems, and position your business for sustainable growth.
              </Text>
            </div>
            <Stack
              direction="horizontal"
              gap="normal"
              align="center"
              justify="center"
              wrap="wrap"
              paddingTop="normal"
            >
              <Button
                size="large"
                onClick={() => {
                  alert('Contact form would open here. Email: hello@businessos.io')
                }}
              >
                Get in Touch
              </Button>
              <Button
                size="large"
              >
                Learn More
              </Button>
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  )
}
