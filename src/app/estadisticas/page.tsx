import { TrendingUp, Star, Clock, BarChart3, Users } from 'lucide-react'
import {
  ingresosPorMes,
  especialidadesStats,
  ratingHistorico,
  tiempoResolucionPromedio,
  abogadoLogueado,
} from '@/lib/mock-data'

function BarraCSS({ pct, color = 'bg-blue-700' }: { pct: number; color?: string }) {
  return (
    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
    </div>
  )
}

function RatingDots({ rating }: { rating: number }) {
  const filled = Math.round(rating)
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full ${i < filled ? 'bg-yellow-400' : 'bg-gray-200'}`}
        />
      ))}
    </div>
  )
}

export default function EstadisticasPage() {
  const maxIngreso = Math.max(...ingresosPorMes.map((i) => i.monto))
  const maxConsultas = Math.max(...especialidadesStats.map((e) => e.consultas))
  const totalConsultas = especialidadesStats.reduce((acc, e) => acc + e.consultas, 0)
  const totalIngresos = ingresosPorMes.reduce((acc, i) => acc + i.monto, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Estadísticas</h1>
        <p className="text-sm text-gray-500 mt-1">Rendimiento y métricas de los últimos 6 meses</p>
      </div>

      {/* KPIs resumen */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-900 rounded-xl p-5 text-white">
          <TrendingUp className="w-5 h-5 text-blue-300 mb-2" />
          <p className="text-2xl font-bold">S/ {totalIngresos.toLocaleString('es-PE')}</p>
          <p className="text-xs text-blue-300 mt-1">Ingresos totales (6 meses)</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <BarChart3 className="w-5 h-5 text-blue-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{totalConsultas}</p>
          <p className="text-xs text-gray-500 mt-1">Consultas totales</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <Star className="w-5 h-5 text-yellow-500 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{abogadoLogueado.rating}</p>
          <p className="text-xs text-gray-500 mt-1">Rating actual</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <Clock className="w-5 h-5 text-green-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{tiempoResolucionPromedio} días</p>
          <p className="text-xs text-gray-500 mt-1">Resolución promedio</p>
        </div>
      </div>

      {/* Ingresos por mes */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Ingresos por mes</h2>
          <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">Últimos 6 meses</span>
        </div>
        <div className="p-6">
          {/* Barras visuales */}
          <div className="flex items-end gap-2 h-36 mb-3">
            {ingresosPorMes.map((item) => {
              const heightPct = maxIngreso > 0 ? (item.monto / maxIngreso) * 100 : 0
              return (
                <div key={item.mes} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="w-full flex items-end justify-center" style={{ height: '100px' }}>
                    <div
                      className="w-full bg-blue-700 hover:bg-blue-600 rounded-t-md transition-colors relative group-hover:shadow-sm"
                      style={{ height: `${heightPct}%` }}
                    >
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        S/ {item.monto.toLocaleString('es-PE')}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 text-center">{item.mes}</span>
                </div>
              )
            })}
          </div>

          {/* Tabla detalle */}
          <div className="mt-6 border-t border-gray-100 pt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 uppercase tracking-wide">
                  <th className="text-left pb-2">Mes</th>
                  <th className="text-right pb-2">Ingresos</th>
                  <th className="text-right pb-2">Casos cerrados</th>
                  <th className="text-right pb-2">Promedio por caso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ingresosPorMes.map((item) => (
                  <tr key={item.mes} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 font-medium text-gray-900">{item.mes}</td>
                    <td className="py-2.5 text-right font-semibold text-blue-900">
                      S/ {item.monto.toLocaleString('es-PE')}
                    </td>
                    <td className="py-2.5 text-right text-gray-600">{item.casos}</td>
                    <td className="py-2.5 text-right text-gray-600">
                      S/ {Math.round(item.monto / item.casos).toLocaleString('es-PE')}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-gray-200">
                <tr>
                  <td className="py-2.5 font-bold text-gray-900">Total</td>
                  <td className="py-2.5 text-right font-bold text-blue-900">
                    S/ {totalIngresos.toLocaleString('es-PE')}
                  </td>
                  <td className="py-2.5 text-right font-bold text-gray-700">
                    {ingresosPorMes.reduce((acc, i) => acc + i.casos, 0)}
                  </td>
                  <td className="py-2.5 text-right font-bold text-gray-700">—</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Especialidades más consultadas */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-700" />
              <h2 className="text-base font-semibold text-gray-900">Especialidades consultadas</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {especialidadesStats.map((e) => {
              const pct = maxConsultas > 0 ? Math.round((e.consultas / maxConsultas) * 100) : 0
              const porcentajeTotal = Math.round((e.consultas / totalConsultas) * 100)
              return (
                <div key={e.nombre}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{e.nombre}</span>
                      <span className="text-xs text-gray-400 ml-2">({porcentajeTotal}%)</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-blue-900">{e.consultas}</span>
                      <span className="text-xs text-gray-400 ml-1">consultas</span>
                    </div>
                  </div>
                  <BarraCSS pct={pct} color="bg-blue-700" />
                  <p className="text-xs text-gray-400 mt-1">
                    Ingresos: S/ {e.ingresoTotal.toLocaleString('es-PE')}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Rating histórico */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <h2 className="text-base font-semibold text-gray-900">Rating histórico</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {ratingHistorico.map((r) => {
                const pct = (r.rating / 5) * 100
                const ratingColor =
                  r.rating >= 4.7
                    ? 'bg-green-500'
                    : r.rating >= 4.0
                    ? 'bg-yellow-400'
                    : 'bg-red-400'
                return (
                  <div key={r.mes}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-900">{r.mes}</span>
                      <div className="flex items-center gap-2">
                        <RatingDots rating={r.rating} />
                        <span className="text-sm font-semibold text-gray-700">{r.rating.toFixed(1)}</span>
                        <span className="text-xs text-gray-400">({r.resenas} reseñas)</span>
                      </div>
                    </div>
                    <BarraCSS pct={pct} color={ratingColor} />
                  </div>
                )
              })}
            </div>

            {/* Tiempo promedio resolución */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Tiempo promedio de resolución
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 border-4 border-blue-700 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-900">{tiempoResolucionPromedio}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{tiempoResolucionPromedio} días promedio</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Calculado sobre {abogadoLogueado.casosCompletados} casos completados
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    ↑ 12% más rápido que el promedio de la plataforma
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
