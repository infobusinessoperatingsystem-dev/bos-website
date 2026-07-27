import { cookies } from 'next/headers'

const ADMIN_PIN_COOKIE = 'admin_authenticated'

export async function verifyAdminPin(pin: string): Promise<boolean> {
  const expectedPin = process.env.ADMIN_PIN
  if (!expectedPin) throw new Error('ADMIN_PIN not configured')
  return pin === expectedPin
}

export async function setAdminSession() {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_PIN_COOKIE, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get(ADMIN_PIN_COOKIE)?.value === 'true'
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_PIN_COOKIE)
}
