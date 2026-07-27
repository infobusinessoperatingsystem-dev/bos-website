import { isAdminAuthenticated } from '@/lib/admin-auth'

export async function GET() {
  try {
    const authenticated = await isAdminAuthenticated()
    return Response.json({ authenticated })
  } catch (error) {
    return Response.json({ authenticated: false }, { status: 500 })
  }
}
