'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { verifyLawyer } from '@/lib/api'

const BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003') + '/api/v1'

interface Lawyer {
  id: string
  nombre?: string
  name?: string
  email?: string
  colegiatura?: string
  especialidad?: string
  specialty?: string
  estado?: string
  status?: string
  bio?: string
  experience?: number
  createdAt?: string
  documents?: string[]
}

export default function VerificarAbogadoPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [lawyer, setLawyer] = useState<Lawyer | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('midefensa_admin_token') : null
    fetch(`${BASE}/admin/lawyers/${id}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((data) => setLawyer(data.data ?? data))
      .catch(() => setLawyer(null))
      .finally(() => setLoading(false))
  }, [id])

  async function handleDecision(approved: boolean) {
    setSubmitting(true)
    try {
      await verifyLawyer(id, approved)
      setMessage(approved ? '✅ Abogado aprobado.' : '❌ Abogado rechazado.')
      setTimeout(() => router.push('/abogados'), 1500)
    } catch {
      setMessage('Error al procesar la decisión.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p className="text-gray-500">Cargando...</p>
  if (!lawyer) return <p className="text-red-500">No se encontró el abogado.</p>

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Verificar Abogado</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Nombre</span>
            <p className="font-semibold text-gray-900">{lawyer.nombre ?? lawyer.name ?? '—'}</p>
          </div>
          <div>
            <span className="text-gray-500">Email</span>
            <p className="font-semibold text-gray-900">{lawyer.email ?? '—'}</p>
          </div>
          <div>
            <span className="text-gray-500">Colegiatura CAL</span>
            <p className="font-semibold text-gray-900">{lawyer.colegiatura ?? '—'}</p>
          </div>
          <div>
            <span className="text-gray-500">Especialidad</span>
            <p className="font-semibold text-gray-900">{lawyer.especialidad ?? lawyer.specialty ?? '—'}</p>
          </div>
          <div>
            <span className="text-gray-500">Experiencia</span>
            <p className="font-semibold text-gray-900">{lawyer.experience ? `${lawyer.experience} años` : '—'}</p>
          </div>
          <div>
            <span className="text-gray-500">Estado actual</span>
            <p className="font-semibold text-gray-900">{lawyer.estado ?? lawyer.status ?? '—'}</p>
          </div>
        </div>
        {lawyer.bio && (
          <div>
            <span className="text-gray-500 text-sm">Bio</span>
            <p className="text-gray-700 text-sm mt-1">{lawyer.bio}</p>
          </div>
        )}
        {message && (
          <div className="p-3 rounded-lg bg-blue-50 text-blue-800 text-sm">{message}</div>
        )}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => handleDecision(true)}
            disabled={submitting}
            className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
          >
            ✅ Aprobar
          </button>
          <button
            onClick={() => handleDecision(false)}
            disabled={submitting}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
          >
            ❌ Rechazar
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  )
}
