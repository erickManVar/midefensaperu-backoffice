'use client'
import { useState } from 'react'
import { AlertTriangle, CheckCircle2, XCircle, Clock, FileText, MessageCircle, Gavel } from 'lucide-react'
import { disputas, Disputa } from '@/lib/mock-data'

const estadoBadge: Record<Disputa['estado'], { cls: string; icon: React.ElementType }> = {
  'En revisión': { cls: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock },
  'Resuelto a favor': { cls: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle2 },
  'Resuelto en contra': { cls: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
}

const timelineIcon: Record<string, React.ElementType> = {
  apertura: AlertTriangle,
  evidencia: FileText,
  resolucion: Gavel,
  comunicacion: MessageCircle,
}

const timelineColor: Record<string, string> = {
  apertura: 'bg-red-100 text-red-600',
  evidencia: 'bg-blue-100 text-blue-600',
  resolucion: 'bg-green-100 text-green-600',
  comunicacion: 'bg-gray-100 text-gray-600',
}

export default function DisputasPage() {
  const [selectedId, setSelectedId] = useState<string | null>(disputas[0]?.id ?? null)
  const selected = disputas.find((d) => d.id === selectedId)

  const resumen = {
    total: disputas.length,
    enRevision: disputas.filter((d) => d.estado === 'En revisión').length,
    aFavor: disputas.filter((d) => d.estado === 'Resuelto a favor').length,
    enContra: disputas.filter((d) => d.estado === 'Resuelto en contra').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Disputas</h1>
        <p className="text-sm text-gray-500 mt-1">Seguimiento de disputas abiertas por tus clientes</p>
      </div>

      {/* Resumen cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{resumen.total}</p>
          <p className="text-xs text-gray-500 mt-1">Total disputas</p>
        </div>
        <div className="bg-yellow-50 rounded-xl border border-yellow-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-yellow-700">{resumen.enRevision}</p>
          <p className="text-xs text-yellow-600 mt-1">En revisión</p>
        </div>
        <div className="bg-green-50 rounded-xl border border-green-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{resumen.aFavor}</p>
          <p className="text-xs text-green-600 mt-1">A tu favor</p>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-red-700">{resumen.enContra}</p>
          <p className="text-xs text-red-600 mt-1">En tu contra</p>
        </div>
      </div>

      {/* Panel principal */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Lista */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Todas las disputas</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {disputas.map((d) => {
              const { cls, icon: Icon } = estadoBadge[d.estado]
              const isSelected = d.id === selectedId
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedId(d.id)}
                  className={`w-full text-left px-5 py-4 transition-colors hover:bg-blue-50/40 ${
                    isSelected ? 'bg-blue-50 border-l-2 border-l-blue-700' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{d.cliente}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{d.id} · {d.caseId}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
                      <Icon className="w-3 h-3" />
                      {d.estado}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">Monto: <span className="font-semibold text-gray-700">S/ {d.monto.toLocaleString('es-PE')}</span></span>
                    <span className="text-xs text-gray-400">
                      {new Date(d.fechaApertura).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Detalle + Timeline */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-blue-50">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">{selected.id}</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Caso: {selected.caseId} · Cliente: {selected.cliente}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${estadoBadge[selected.estado].cls}`}>
                    {selected.estado}
                  </span>
                </div>
              </div>

              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Motivo de la disputa</h3>
                <p className="text-sm text-gray-700">{selected.motivo}</p>
                <div className="flex gap-6 mt-3">
                  <div>
                    <p className="text-xs text-gray-400">Monto en disputa</p>
                    <p className="text-lg font-bold text-blue-900">S/ {selected.monto.toLocaleString('es-PE')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Fecha de apertura</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {new Date(selected.fechaApertura).toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="px-6 py-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Timeline de eventos</h3>
                <div className="relative">
                  {/* Línea vertical */}
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
                  <div className="space-y-5">
                    {selected.timeline.map((evento, idx) => {
                      const Icon = timelineIcon[evento.tipo] ?? MessageCircle
                      const colorCls = timelineColor[evento.tipo] ?? 'bg-gray-100 text-gray-600'
                      return (
                        <div key={idx} className="relative flex gap-4">
                          {/* Ícono con fondo */}
                          <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${colorCls}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 pt-0.5">
                            <p className="text-sm text-gray-700">{evento.descripcion}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(evento.fecha).toLocaleDateString('es-PE', {
                                weekday: 'short',
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-gray-400">
              Selecciona una disputa para ver el detalle
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
