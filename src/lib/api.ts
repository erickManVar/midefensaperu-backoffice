const BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003') + '/api/v1'

async function apiFetch(path: string, options?: RequestInit) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const token = typeof window !== 'undefined' ? localStorage.getItem('midefensa_admin_token') : null
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${BASE}${path}`, { ...options, headers })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export const login = (data: { email: string; password: string }) =>
  apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) })

export const getPendingLawyers = () => apiFetch('/admin/lawyers')
export const verifyLawyer = (id: string, approved: boolean) =>
  apiFetch(`/admin/lawyers/${id}/verify`, { method: 'PUT', body: JSON.stringify({ approved }) })

export const getAdminConsultations = () => apiFetch('/admin/consultations')
export const getAdminDisputes = () => apiFetch('/admin/disputes')
export const getAdminStats = () => apiFetch('/admin/stats')
