'use client'
import { useEffect, useState } from 'react'
import { getAdminStats } from '@/lib/api'

interface Stats {
  totalLawyers?: number
  pendingVerification?: number
  activeConsultations?: number
  openDisputes?: number
  totalRevenue?: number
  consultationsBySpecialty?: Record<string, number>
  topLawyers?: Array<{ id: string; name?: string; nombre?: string; consultations?: number; rating?: number }>
}

export default function EstadisticasPage() {
  const [stats, setStats] = useState<Stats>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch(() => setStats({}))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-gray-500">Cargando estadísticas...</p>

  const bySpecialty = stats.consultationsBySpecialty ?? {}
  const topLawyers = stats.topLawyers ?? []

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Estadísticas</h1>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Abogados', value: stats.totalLawyers ?? '—' },
          { label: 'Consultas Activas', value: stats.activeConsultations ?? '—' },
          { label: 'Disputas Abiertas', value: stats.openDisputes ?? '—' },
          { label: 'Ingresos Totales', value: stats.totalRevenue != null ? `S/ ${stats.totalRevenue.toLocaleString('es-PE')}` : '—' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <p className="text-2xl font-bold text-[#1e40af]">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Consultations by Specialty */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Consultas por Especialidad</h2>
        {Object.keys(bySpecialty).length === 0 ? (
          <p className="text-gray-400 text-sm">Sin datos disponibles</p>
        ) : (
          <div className="space-y-3">
            {Object.entries(bySpecialty).map(([specialty, count]) => {
              const max = Math.max(...Object.values(bySpecialty))
              const pct = max > 0 ? Math.round((count / max) * 100) : 0
              return (
                <div key={specialty}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{specialty}</span>
                    <span className="font-medium text-gray-900">{count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1e40af] rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Top Lawyers */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Top Abogados</h2>
        {topLawyers.length === 0 ? (
          <p className="text-gray-400 text-sm">Sin datos disponibles</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-xs text-gray-500 font-semibold uppercase">#</th>
                <th className="text-left py-2 text-xs text-gray-500 font-semibold uppercase">Abogado</th>
                <th className="text-right py-2 text-xs text-gray-500 font-semibold uppercase">Consultas</th>
                <th className="text-right py-2 text-xs text-gray-500 font-semibold uppercase">Calificación</th>
              </tr>
            </thead>
            <tbody>
              {topLawyers.map((l, i) => (
                <tr key={l.id} className="border-b border-gray-50">
                  <td className="py-2 text-gray-400">{i + 1}</td>
                  <td className="py-2 font-medium text-gray-900">{l.name ?? l.nombre}</td>
                  <td className="py-2 text-right text-gray-700">{l.consultations ?? '—'}</td>
                  <td className="py-2 text-right">
                    {l.rating != null ? (
                      <span className="text-yellow-600 font-medium">⭐ {l.rating.toFixed(1)}</span>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
