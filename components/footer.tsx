'use client'

import Link from 'next/link'
import {
  Text,
} from '@primer/react'

export default function Footer() {
  return (
    <div
      style={{
        background: 'var(--bgColor-inset)',
        borderTop: '1px solid var(--borderColor-default)',
        paddingTop: 'var(--stack-padding-spacious)',
        paddingBottom: 'var(--stack-padding-spacious)',
        marginTop: 'var(--stack-gap-spacious)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: 'var(--stack-padding-normal)', paddingRight: 'var(--stack-padding-normal)' }}>
        <div style={{ display: 'flex', gap: 'var(--stack-gap-spacious)', paddingBottom: 'var(--stack-padding-normal)', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, marginBottom: 'var(--stack-gap-normal)' }}>
            <Text size="medium" weight="semibold">Business OS</Text>
            <div style={{ color: 'var(--fgColor-muted)', lineHeight: 1.8 }}>
              <Text size="small">
                Leading software company in Ghana providing innovative solutions in custom software development, cybersecurity, and IT services.
              </Text>
            </div>
          </div>

          <div style={{ minWidth: '150px' }}>
            <Text size="medium" weight="semibold">Services</Text>
            <div style={{ color: 'var(--fgColor-muted)' }}>
              <a href="#services" style={{ display: 'block', textDecoration: 'none', color: 'inherit', fontSize: 'var(--text-body-size)', marginBottom: 'var(--stack-gap-tight)' }}>Custom Development</a>
              <a href="#services" style={{ display: 'block', textDecoration: 'none', color: 'inherit', fontSize: 'var(--text-body-size)', marginBottom: 'var(--stack-gap-tight)' }}>Cybersecurity</a>
              <a href="#services" style={{ display: 'block', textDecoration: 'none', color: 'inherit', fontSize: 'var(--text-body-size)' }}>IT Services</a>
            </div>
          </div>

          <div style={{ minWidth: '150px' }}>
            <Text size="medium" weight="semibold">Resources</Text>
            <div style={{ color: 'var(--fgColor-muted)' }}>
              <Link href="/learn" style={{ display: 'block', textDecoration: 'none', color: 'inherit', fontSize: 'var(--text-body-size)', marginBottom: 'var(--stack-gap-tight)' }}>Learning Hub</Link>
              <a href="#features" style={{ display: 'block', textDecoration: 'none', color: 'inherit', fontSize: 'var(--text-body-size)', marginBottom: 'var(--stack-gap-tight)' }}>Documentation</a>
              <a href="#contact" style={{ display: 'block', textDecoration: 'none', color: 'inherit', fontSize: 'var(--text-body-size)' }}>Support</a>
            </div>
          </div>

          <div style={{ minWidth: '150px' }}>
            <Text size="medium" weight="semibold">Connect</Text>
            <div style={{ color: 'var(--fgColor-muted)' }}>
              <a href="#" style={{ display: 'block', textDecoration: 'none', color: 'inherit', fontSize: 'var(--text-body-size)', marginBottom: 'var(--stack-gap-tight)' }}>LinkedIn</a>
              <a href="#" style={{ display: 'block', textDecoration: 'none', color: 'inherit', fontSize: 'var(--text-body-size)', marginBottom: 'var(--stack-gap-tight)' }}>Twitter</a>
              <a href="#" style={{ display: 'block', textDecoration: 'none', color: 'inherit', fontSize: 'var(--text-body-size)' }}>Email</a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--borderColor-default)', paddingTop: 'var(--stack-padding-normal)', textAlign: 'center', color: 'var(--fgColor-muted)' }}>
          <Text size="small">
            © 2024 Business OS. All rights reserved. | Delivering innovation from Ghana to the world.
          </Text>
        </div>
      </div>
    </div>
  )
}
