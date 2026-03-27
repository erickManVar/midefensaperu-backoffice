'use client'
import { useEffect, useState } from 'react'
import { getAdminStats } from '@/lib/api'

interface Stats {
  totalLawyers?: number
  pendingVerification?: number
  activeConsultations?: number
  openDisputes?: number
}

const statCards = [
  { key: 'totalLawyers', label: 'Abogados Registrados', icon: '⚖️', color: 'bg-blue-100 text-blue-800' },
  { key: 'pendingVerification', label: 'Pendientes Verificación', icon: '🕐', color: 'bg-yellow-100 text-yellow-800' },
  { key: 'activeConsultations', label: 'Consultas Activas', icon: '📋', color: 'bg-green-100 text-green-800' },
  { key: 'openDisputes', label: 'Disputas Abiertas', icon: '🔔', color: 'bg-red-100 text-red-800' },
]

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch(() => setStats({ totalLawyers: 0, pendingVerification: 0, activeConsultations: 0, openDisputes: 0 }))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      {loading ? (
        <p className="text-gray-500">Cargando estadísticas...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => (
            <div key={card.key} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg text-2xl mb-4 ${card.color}`}>
                {card.icon}
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {stats[card.key as keyof Stats] ?? '—'}
              </p>
              <p className="text-sm text-gray-500 mt-1">{card.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
