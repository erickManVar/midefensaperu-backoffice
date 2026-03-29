// Mock data realista para abogado peruano — MiDefensaPerú

export const abogadoLogueado = {
  id: 'abg-001',
  nombre: 'Dr. Carlos Mendoza Ríos',
  colegiatura: 'CAL 48291',
  especialidades: ['Derecho Laboral', 'Derecho Civil'],
  avatar: 'CM',
  email: 'c.mendoza@midefensaperu.pe',
  telefono: '+51 987 654 321',
  rating: 4.8,
  casosCompletados: 134,
}

export type EstadoCaso =
  | 'Pendiente'
  | 'En curso'
  | 'Completado'
  | 'Disputa'

export interface Caso {
  id: string
  cliente: string
  clienteAvatar: string
  especialidad: string
  descripcion: string
  monto: number
  estado: EstadoCaso
  fecha: string
  duracionDias?: number
}

export interface Consulta {
  id: string
  cliente: string
  fecha: string
  hora: string
  tipo: string
  plataforma: 'Videollamada' | 'Chat' | 'Teléfono'
}

export interface Disputa {
  id: string
  caseId: string
  cliente: string
  monto: number
  motivo: string
  estado: 'En revisión' | 'Resuelto a favor' | 'Resuelto en contra'
  fechaApertura: string
  timeline: TimelineEvento[]
}

export interface TimelineEvento {
  fecha: string
  descripcion: string
  tipo: 'apertura' | 'evidencia' | 'resolucion' | 'comunicacion'
}

export interface IngresoMes {
  mes: string
  monto: number
  casos: number
}

export interface EspecialidadStat {
  nombre: string
  consultas: number
  ingresoTotal: number
}

export interface RatingHistorico {
  mes: string
  rating: number
  resenas: number
}

// ─── Casos ────────────────────────────────────────────────────────────────────
export const casos: Caso[] = [
  {
    id: 'CASO-2026-001',
    cliente: 'María Torres Vega',
    clienteAvatar: 'MT',
    especialidad: 'Derecho Laboral',
    descripcion: 'Despido arbitrario tras 8 años de servicio en empresa minera',
    monto: 2500,
    estado: 'En curso',
    fecha: '2026-03-10',
    duracionDias: 18,
  },
  {
    id: 'CASO-2026-002',
    cliente: 'Roberto Quispe Mamani',
    clienteAvatar: 'RQ',
    especialidad: 'Derecho Civil',
    descripcion: 'Contrato de compraventa de inmueble con cláusulas abusivas',
    monto: 1800,
    estado: 'Pendiente',
    fecha: '2026-03-22',
    duracionDias: 6,
  },
  {
    id: 'CASO-2026-003',
    cliente: 'Ana Lucía Paredes',
    clienteAvatar: 'AL',
    especialidad: 'Derecho Laboral',
    descripcion: 'Reclamación de beneficios sociales y CTS no pagados',
    monto: 3200,
    estado: 'Completado',
    fecha: '2026-02-14',
    duracionDias: 42,
  },
  {
    id: 'CASO-2026-004',
    cliente: 'Jorge Huanca Flores',
    clienteAvatar: 'JH',
    especialidad: 'Derecho Civil',
    descripcion: 'Disputa por herencia y partición de bienes familiares',
    monto: 4500,
    estado: 'Disputa',
    fecha: '2026-01-30',
    duracionDias: 57,
  },
  {
    id: 'CASO-2026-005',
    cliente: 'Sofía Ramírez Chávez',
    clienteAvatar: 'SR',
    especialidad: 'Derecho Laboral',
    descripcion: 'Hostigamiento laboral y vulneración de derechos sindicales',
    monto: 1500,
    estado: 'En curso',
    fecha: '2026-03-05',
    duracionDias: 23,
  },
  {
    id: 'CASO-2026-006',
    cliente: 'Luis Alberto Condori',
    clienteAvatar: 'LC',
    especialidad: 'Derecho Civil',
    descripcion: 'Nulidad de acto jurídico por vicio de voluntad',
    monto: 2200,
    estado: 'Completado',
    fecha: '2026-01-15',
    duracionDias: 30,
  },
  {
    id: 'CASO-2026-007',
    cliente: 'Carmen Rosa Aguilar',
    clienteAvatar: 'CA',
    especialidad: 'Derecho Laboral',
    descripcion: 'Reposición laboral por despido nulo (sindicato)',
    monto: 2800,
    estado: 'En curso',
    fecha: '2026-02-28',
    duracionDias: 28,
  },
  {
    id: 'CASO-2026-008',
    cliente: 'Pedro Villanueva Soto',
    clienteAvatar: 'PV',
    especialidad: 'Derecho Civil',
    descripcion: 'Resolución de contrato de arrendamiento comercial',
    monto: 1200,
    estado: 'Pendiente',
    fecha: '2026-03-25',
    duracionDias: 3,
  },
]

// ─── Próximas consultas ───────────────────────────────────────────────────────
export const proximasConsultas: Consulta[] = [
  {
    id: 'CON-001',
    cliente: 'María Torres Vega',
    fecha: '2026-03-29',
    hora: '10:00',
    tipo: 'Seguimiento de caso',
    plataforma: 'Videollamada',
  },
  {
    id: 'CON-002',
    cliente: 'Roberto Quispe Mamani',
    fecha: '2026-03-29',
    hora: '15:30',
    tipo: 'Primera consulta',
    plataforma: 'Chat',
  },
  {
    id: 'CON-003',
    cliente: 'Sofía Ramírez Chávez',
    fecha: '2026-03-30',
    hora: '09:00',
    tipo: 'Revisión de documentos',
    plataforma: 'Videollamada',
  },
  {
    id: 'CON-004',
    cliente: 'Carmen Rosa Aguilar',
    fecha: '2026-03-31',
    hora: '11:00',
    tipo: 'Estrategia legal',
    plataforma: 'Teléfono',
  },
]

// ─── Disputas ─────────────────────────────────────────────────────────────────
export const disputas: Disputa[] = [
  {
    id: 'DIS-2026-001',
    caseId: 'CASO-2026-004',
    cliente: 'Jorge Huanca Flores',
    monto: 4500,
    motivo: 'Cliente alega que el resultado no fue el acordado en el contrato de servicios',
    estado: 'En revisión',
    fechaApertura: '2026-03-20',
    timeline: [
      {
        fecha: '2026-03-20',
        descripcion: 'Cliente abrió disputa alegando incumplimiento de objetivos',
        tipo: 'apertura',
      },
      {
        fecha: '2026-03-21',
        descripcion: 'MiDefensaPerú notificó al abogado e inició proceso de revisión',
        tipo: 'comunicacion',
      },
      {
        fecha: '2026-03-23',
        descripcion: 'Abogado subió evidencias: contrato firmado, correos y actas de reuniones',
        tipo: 'evidencia',
      },
      {
        fecha: '2026-03-26',
        descripcion: 'Cliente presentó su versión con capturas de conversaciones',
        tipo: 'evidencia',
      },
      {
        fecha: '2026-03-28',
        descripcion: 'Equipo de MiDefensaPerú evalúa documentación. Resolución estimada en 3-5 días hábiles',
        tipo: 'comunicacion',
      },
    ],
  },
  {
    id: 'DIS-2026-002',
    caseId: 'CASO-2025-089',
    cliente: 'Diana Flores Quispe',
    monto: 1800,
    motivo: 'Insatisfacción con el tiempo de respuesta y calidad del asesoramiento',
    estado: 'Resuelto a favor',
    fechaApertura: '2026-02-10',
    timeline: [
      {
        fecha: '2026-02-10',
        descripcion: 'Cliente inició disputa por demoras en respuestas',
        tipo: 'apertura',
      },
      {
        fecha: '2026-02-11',
        descripcion: 'Abogado aportó logs del sistema mostrando respuestas dentro de SLA acordado',
        tipo: 'evidencia',
      },
      {
        fecha: '2026-02-15',
        descripcion: 'MiDefensaPerú resolvió a favor del abogado. Fondos liberados del escrow',
        tipo: 'resolucion',
      },
    ],
  },
  {
    id: 'DIS-2026-003',
    caseId: 'CASO-2025-112',
    cliente: 'Marco Antonio Vargas',
    monto: 950,
    motivo: 'Abogado no entregó el informe legal comprometido en el plazo acordado',
    estado: 'Resuelto en contra',
    fechaApertura: '2026-01-05',
    timeline: [
      {
        fecha: '2026-01-05',
        descripcion: 'Cliente abrió disputa por incumplimiento de entrega',
        tipo: 'apertura',
      },
      {
        fecha: '2026-01-07',
        descripcion: 'Abogado reconoció retraso y ofreció compensación parcial',
        tipo: 'comunicacion',
      },
      {
        fecha: '2026-01-12',
        descripcion: 'MiDefensaPerú resolvió parcialmente a favor del cliente. Se reembolsó S/ 400 al cliente',
        tipo: 'resolucion',
      },
    ],
  },
]

// ─── Estadísticas ─────────────────────────────────────────────────────────────
export const ingresosPorMes: IngresoMes[] = [
  { mes: 'Oct 2025', monto: 5200, casos: 8 },
  { mes: 'Nov 2025', monto: 6800, casos: 11 },
  { mes: 'Dic 2025', monto: 4100, casos: 6 },
  { mes: 'Ene 2026', monto: 7500, casos: 12 },
  { mes: 'Feb 2026', monto: 8900, casos: 14 },
  { mes: 'Mar 2026', monto: 6200, casos: 9 },
]

export const especialidadesStats: EspecialidadStat[] = [
  { nombre: 'Derecho Laboral', consultas: 52, ingresoTotal: 28400 },
  { nombre: 'Derecho Civil', consultas: 38, ingresoTotal: 19600 },
  { nombre: 'Derecho Comercial', consultas: 14, ingresoTotal: 9800 },
  { nombre: 'Derecho Familia', consultas: 18, ingresoTotal: 7200 },
  { nombre: 'Derecho Penal', consultas: 8, ingresoTotal: 5600 },
]

export const ratingHistorico: RatingHistorico[] = [
  { mes: 'Oct 2025', rating: 4.5, resenas: 6 },
  { mes: 'Nov 2025', rating: 4.7, resenas: 9 },
  { mes: 'Dic 2025', rating: 4.6, resenas: 5 },
  { mes: 'Ene 2026', rating: 4.8, resenas: 10 },
  { mes: 'Feb 2026', rating: 4.9, resenas: 12 },
  { mes: 'Mar 2026', rating: 4.8, resenas: 7 },
]

export const tiempoResolucionPromedio = 28 // días

// ─── KPIs rápidos ─────────────────────────────────────────────────────────────
export const kpis = {
  casosActivos: casos.filter((c) => c.estado === 'En curso').length,
  ingresosMes: 6200,
  ratingPromedio: 4.8,
  consultasPendientes: casos.filter((c) => c.estado === 'Pendiente').length,
}
