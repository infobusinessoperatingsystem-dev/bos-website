'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminDashboard from '@/components/admin/admin-dashboard'

async function checkAuth() {
  const response = await fetch('/api/auth/check')
  const data = await response.json()
  return data.authenticated
}

export default function AdminPage() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    checkAuth().then((isAuth) => {
      if (!isAuth) {
        router.push('/admin/login')
      } else {
        setAuthenticated(true)
      }
    })
  }, [router])

  if (authenticated === null) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>Loading...</div>
  }

  return <AdminDashboard />
}
