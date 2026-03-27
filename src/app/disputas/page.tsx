'use client'
import { useEffect, useState } from 'react'
import { getAdminDisputes } from '@/lib/api'

interface Dispute {
  id: string
  consultationId?: string
  lawyerName?: string
  clientName?: string
  amount?: number
  status?: string
  createdAt?: string
}

const BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003') + '/api/v1'

export default function DisputasPage() {
  const [disputes, setDisputes] = useState<Dispute[]>([])
  const [loading, setLoading] = useState(true)
  const [resolving, setResolving] = useState<string | null>(null)

  useEffect(() => {
    getAdminDisputes()
      .then((d: Dispute[] | { data: Dispute[] }) => setDisputes(Array.isArray(d) ? d : d.data ?? []))
      .catch(() => setDisputes([]))
      .finally(() => setLoading(false))
  }, [])

  async function handleResolve(id: string) {
    setResolving(id)
    const token = typeof window !== 'undefined' ? localStorage.getItem('midefensa_admin_token') : null
    try {
      await fetch(`${BASE}/admin/disputes/${id}/resolve`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'resolved' }),
      })
      setDisputes((prev) => prev.map((d) => d.id === id ? { ...d, status: 'resolved' } : d))
    } catch {
      alert('Error al resolver la disputa.')
    } finally {
      setResolving(null)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Disputas</h1>
      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['ID Consulta', 'Abogado', 'Cliente', 'Monto', 'Estado', 'Fecha', 'Acción'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {disputes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                    No hay disputas abiertas
                  </td>
                </tr>
              ) : (
                disputes.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{d.consultationId ?? d.id}</td>
                    <td className="px-4 py-3 text-gray-900">{d.lawyerName ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-900">{d.clientName ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {d.amount != null ? `S/ ${d.amount.toFixed(2)}` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        d.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {d.status ?? 'abierto'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {d.createdAt ? new Date(d.createdAt).toLocaleDateString('es-PE') : '—'}
                    </td>
                    <td className="px-4 py-3">
                      {d.status !== 'resolved' && (
                        <button
                          onClick={() => handleResolve(d.id)}
                          disabled={resolving === d.id}
                          className="text-xs px-3 py-1.5 bg-[#1e40af] hover:bg-blue-800 text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                          {resolving === d.id ? 'Procesando...' : 'Resolver'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
