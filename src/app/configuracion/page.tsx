import { User, Bell, Shield, CreditCard } from 'lucide-react'
import { abogadoLogueado } from '@/lib/mock-data'

export default function ConfiguracionPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-sm text-gray-500 mt-1">Gestiona tu perfil y preferencias</p>
      </div>

      {/* Perfil */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-700" />
          <h2 className="text-sm font-semibold text-gray-900">Información del perfil</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xl font-bold text-blue-700">{abogadoLogueado.avatar}</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{abogadoLogueado.nombre}</p>
              <p className="text-sm text-gray-500">{abogadoLogueado.colegiatura}</p>
            </div>
          </div>
          {[
            { label: 'Nombre completo', value: abogadoLogueado.nombre },
            { label: 'Correo electrónico', value: abogadoLogueado.email },
            { label: 'Teléfono', value: abogadoLogueado.telefono },
            { label: 'Colegiatura CAL', value: abogadoLogueado.colegiatura },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs font-medium text-gray-500 block mb-1">{f.label}</label>
              <input
                type="text"
                defaultValue={f.value}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <button className="mt-2 px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg transition-colors">
            Guardar cambios
          </button>
        </div>
      </div>

      {/* Notificaciones */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-700" />
          <h2 className="text-sm font-semibold text-gray-900">Notificaciones</h2>
        </div>
        <div className="p-6 space-y-3">
          {[
            'Nuevas consultas asignadas',
            'Mensajes de clientes',
            'Actualizaciones de disputas',
            'Pagos liberados del escrow',
          ].map((n) => (
            <label key={n} className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700">{n}</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" defaultChecked />
                <div className="w-10 h-5 bg-blue-700 rounded-full" />
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Seguridad y Pagos */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-blue-700" />
            <h2 className="text-sm font-semibold text-gray-900">Seguridad</h2>
          </div>
          <p className="text-xs text-gray-500 mb-3">Cambia tu contraseña o activa 2FA</p>
          <button className="text-xs px-3 py-1.5 border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
            Cambiar contraseña
          </button>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="w-4 h-4 text-blue-700" />
            <h2 className="text-sm font-semibold text-gray-900">Método de cobro</h2>
          </div>
          <p className="text-xs text-gray-500 mb-3">Cuenta BCP ···· 4291</p>
          <button className="text-xs px-3 py-1.5 border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
            Actualizar cuenta
          </button>
        </div>
      </div>
    </div>
  )
}
