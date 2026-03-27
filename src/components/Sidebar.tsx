'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/abogados', label: 'Abogados', icon: '⚖️' },
  { href: '/disputas', label: 'Disputas', icon: '🔔' },
  { href: '/estadisticas', label: 'Estadísticas', icon: '📈' },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-64 min-h-screen bg-[#1e40af] text-white flex flex-col">
      <div className="px-6 py-5 border-b border-blue-700">
        <span className="text-lg font-bold tracking-tight">MiDefensaPerú</span>
        <span className="block text-xs text-blue-200 mt-0.5">Panel de Administración</span>
      </div>
      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors hover:bg-blue-700 ${
              pathname.startsWith(item.href) ? 'bg-blue-800' : ''
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="px-6 py-4 border-t border-blue-700 text-xs text-blue-300">
        © 2026 MiDefensaPerú
      </div>
    </aside>
  )
}
