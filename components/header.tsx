'use client'

import Link from 'next/link'
import {
  Button,
  Header as PrimerHeader,
} from '@primer/react'

export default function Header() {
  return (
    <PrimerHeader>
      <PrimerHeader.Item>
        <Link href="/" style={{ fontSize: '18px', fontWeight: '600', textDecoration: 'none', color: 'inherit' }}>
          Business OS
        </Link>
      </PrimerHeader.Item>
      <a href="#services" style={{ padding: '12px', color: 'inherit', textDecoration: 'none', display: 'block' }}>Services</a>
      <a href="#features" style={{ padding: '12px', color: 'inherit', textDecoration: 'none', display: 'block' }}>Features</a>
      <Link href="/learn" style={{ padding: '12px', color: 'inherit', textDecoration: 'none', display: 'block' }}>Learn</Link>
      <a href="#contact" style={{ padding: '12px', color: 'inherit', textDecoration: 'none', display: 'block' }}>Contact</a>
      <PrimerHeader.Item full />
      <Button
        onClick={() => {
          const el = document.getElementById('contact')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        Get Started
      </Button>
    </PrimerHeader>
  )
}
