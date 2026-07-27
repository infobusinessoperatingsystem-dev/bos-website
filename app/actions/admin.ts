'use server'

import { verifyAdminPin, setAdminSession, clearAdminSession } from '@/lib/admin-auth'

export async function authenticateAdmin(pin: string) {
  try {
    const isValid = await verifyAdminPin(pin)
    if (!isValid) {
      return { success: false, error: 'Invalid PIN' }
    }

    await setAdminSession()
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Authentication failed' }
  }
}

export async function logoutAdmin() {
  try {
    await clearAdminSession()
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Logout failed' }
  }
}
