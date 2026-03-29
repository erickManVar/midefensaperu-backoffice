'use client'
import { useState } from 'react'
import { Eye, ChevronRight } from 'lucide-react'
import { casos, EstadoCaso } from '@/lib/mock-data'

const estadoBadge: Record<EstadoCaso, string> = {
  'Pendiente': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'En curso': 'bg-blue-100 text-blue-700 border-blue-200',
  'Completado': 'bg-green-100 text-green-700 border-green-200',
  'Disputa': 'bg-red-100 text-red-700 border-red-200',
}

const filtros: Array<{ label: string; value: EstadoCaso | 'Todos' }> = [
  { label: 'Todos', value: 'Todos' },
  { label: 'Pendiente', value: 'Pendiente' },
  { label: 'En curso', value: 'En curso' },
  { label: 'Completado', value: 'Completado' },
  { label: 'Disputa', value: 'Disputa' },
]

export default function MisCasosPage() {
  const [filtroActivo, setFiltroActivo] = useState<EstadoCaso | 'Todos'>('Todos')

  const casosFiltrados =
    filtroActivo === 'Todos'
      ? casos
      : casos.filter((c) => c.estado === filtroActivo)

  const contadores = {
    Todos: casos.length,
    Pendiente: casos.filter((c) => c.estado === 'Pendiente').length,
    'En curso': casos.filter((c) => c.estado === 'En curso').length,
    Completado: casos.filter((c) => c.estado === 'Completado').length,
    Disputa: casos.filter((c) => c.estado === 'Disputa').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mis Casos</h1>
        <p className="text-sm text-gray-500 mt-1">Gestiona todos tus casos y consultas legales</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {filtros.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFiltroActivo(value)}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              filtroActivo === value
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-700'
            }`}
          >
            {label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                filtroActivo === value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {contadores[value]}
            </span>
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-blue-50 border-b border-blue-100">
              <tr>
                {['Cliente', 'Especialidad', 'Descripción', 'Monto', 'Estado', 'Fecha', 'Acciones'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-semibold text-blue-900 uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {casosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-gray-400">
                    No hay casos con el estado seleccionado
                  </td>
                </tr>
              ) : (
                casosFiltrados.map((caso) => (
                  <tr key={caso.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-blue-700">{caso.clienteAvatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{caso.cliente}</p>
                          <p className="text-xs text-gray-400">{caso.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{caso.especialidad}</td>
                    <td className="px-4 py-3.5 text-gray-600 max-w-xs">
                      <p className="truncate">{caso.descripcion}</p>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-gray-900 whitespace-nowrap">
                      S/ {caso.monto.toLocaleString('es-PE')}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${estadoBadge[caso.estado]}`}
                      >
                        {caso.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap text-xs">
                      {new Date(caso.fecha).toLocaleDateString('es-PE', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 text-xs px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors font-medium">
                          <Eye className="w-3.5 h-3.5" />
                          Ver
                        </button>
                        <button className="flex items-center gap-1 text-xs px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors font-medium">
                          <ChevronRight className="w-3.5 h-3.5" />
                          Gestionar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer conteo */}
        <div className="px-4 py-3 border-t border-gray-50 bg-gray-50/50">
          <p className="text-xs text-gray-400">
            Mostrando {casosFiltrados.length} de {casos.length} casos
          </p>
        </div>
      </div>
    </div>
  )
}
