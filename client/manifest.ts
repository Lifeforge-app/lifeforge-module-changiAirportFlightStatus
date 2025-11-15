import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'Changi Airport Flight Status',
  icon: 'tabler:plane',
  routes: {
    '/': lazy(() => import('@'))
  },
  category: 'Information'
} satisfies ModuleConfig
