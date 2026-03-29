import {
  Briefcase,
  DollarSign,
  Star,
  Clock,
  Video,
  MessageSquare,
  Phone,
  Calendar,
} from 'lucide-react'
import { kpis, casos, proximasConsultas } from '@/lib/mock-data'

const estadoBadge: Record<string, string> = {
  'Pendiente': 'bg-yellow-100 text-yellow-700',
  'En curso': 'bg-blue-100 text-blue-700',
  'Completado': 'bg-green-100 text-green-700',
  'Disputa': 'bg-red-100 text-red-700',
}

const plataformaIcon = {
  Videollamada: Video,
  Chat: MessageSquare,
  Teléfono: Phone,
}

export default function DashboardPage() {
  const casosRecientes = casos.slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Bienvenido de vuelta. Aquí está el resumen de tu actividad.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">Casos activos</span>
            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{kpis.casosActivos}</p>
          <p className="text-xs text-blue-600 mt-1">En proceso ahora</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">Ingresos del mes</span>
            <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            S/ {kpis.ingresosMes.toLocaleString('es-PE')}
          </p>
          <p className="text-xs text-green-600 mt-1">Marzo 2026</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">Rating promedio</span>
            <div className="w-9 h-9 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{kpis.ratingPromedio}</p>
          <p className="text-xs text-yellow-600 mt-1">Sobre 5.0 — Excelente</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">Consultas pendientes</span>
            <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{kpis.consultasPendientes}</p>
          <p className="text-xs text-orange-600 mt-1">Requieren atención</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Casos recientes */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Casos recientes</h2>
            <a href="/abogados" className="text-xs text-blue-700 hover:text-blue-900 font-medium">
              Ver todos →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Cliente', 'Especialidad', 'Estado', 'Monto', 'Fecha'].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {casosRecientes.map((caso) => (
                  <tr key={caso.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-blue-700">{caso.clienteAvatar}</span>
                        </div>
                        <span className="font-medium text-gray-900 text-xs">{caso.cliente}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{caso.especialidad}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${estadoBadge[caso.estado]}`}>
                        {caso.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-medium text-xs">
                      S/ {caso.monto.toLocaleString('es-PE')}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(caso.fecha).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Próximas consultas */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">Próximas consultas</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {proximasConsultas.map((consulta) => {
              const IconPlat = plataformaIcon[consulta.plataforma]
              return (
                <div key={consulta.id} className="px-5 py-3.5 hover:bg-blue-50/30 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{consulta.cliente}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{consulta.tipo}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <IconPlat className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-xs text-blue-600">{consulta.plataforma}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      {new Date(consulta.fecha).toLocaleDateString('es-PE', { weekday: 'short', day: '2-digit', month: 'short' })} · {consulta.hora}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
