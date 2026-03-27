'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getPendingLawyers } from '@/lib/api'

interface Lawyer {
  id: string
  nombre?: string
  name?: string
  colegiatura?: string
  especialidad?: string
  specialty?: string
  estado?: string
  status?: string
  createdAt?: string
}

export default function AbogadosPage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPendingLawyers()
      .then((data: Lawyer[] | { data: Lawyer[] }) => setLawyers(Array.isArray(data) ? data : data.data ?? []))
      .catch(() => setLawyers([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Abogados — Verificación</h1>
      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Nombre', 'Colegiatura CAL', 'Especialidad', 'Estado', 'Fecha', 'Acciones'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {lawyers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                    No hay abogados pendientes de verificación
                  </td>
                </tr>
              ) : (
                lawyers.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{l.nombre ?? l.name}</td>
                    <td className="px-4 py-3 text-gray-600">{l.colegiatura ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{l.especialidad ?? l.specialty ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        (l.estado ?? l.status) === 'verified'
                          ? 'bg-green-100 text-green-700'
                          : (l.estado ?? l.status) === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {l.estado ?? l.status ?? 'pendiente'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {l.createdAt ? new Date(l.createdAt).toLocaleDateString('es-PE') : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/abogados/${l.id}/verificar`}
                        className="text-[#1e40af] hover:underline font-medium"
                      >
                        Ver detalle
                      </Link>
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
