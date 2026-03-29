'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Briefcase,
  AlertTriangle,
  BarChart2,
  Settings,
  Scale,
  Star,
} from 'lucide-react'
import { abogadoLogueado } from '@/lib/mock-data'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/abogados', label: 'Mis Casos', icon: Briefcase },
  { href: '/disputas', label: 'Disputas', icon: AlertTriangle },
  { href: '/estadisticas', label: 'Estadísticas', icon: BarChart2 },
  { href: '/configuracion', label: 'Configuración', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-blue-900 text-white flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-blue-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight leading-none block">MiDefensaPerú</span>
            <span className="text-xs text-blue-300 leading-none block mt-0.5">Panel Abogado</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 px-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Abogado logueado */}
      <div className="px-4 py-4 border-t border-blue-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">{abogadoLogueado.avatar}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">{abogadoLogueado.nombre}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs text-blue-300 truncate">{abogadoLogueado.colegiatura}</span>
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 shrink-0" />
              <span className="text-xs text-yellow-300">{abogadoLogueado.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
