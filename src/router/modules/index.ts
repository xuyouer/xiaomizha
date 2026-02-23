import basicRoutes from './basic'
import adminRoutes from './admin'
import errorRoutes from './error'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  ...basicRoutes,
  ...adminRoutes,
  ...errorRoutes
]

export default routes