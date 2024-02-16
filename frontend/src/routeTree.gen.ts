import { FileRoute, lazyRouteComponent } from '@tanstack/react-router'

import { Route as rootRoute } from './routes/__root'

const ProfileComponentImport = new FileRoute('/profile').createRoute()
const PracticepageComponentImport = new FileRoute(
  '/practice_page',
).createRoute()
const PracticeComponentImport = new FileRoute('/practice').createRoute()
const DashboardComponentImport = new FileRoute('/dashboard').createRoute()
const IndexComponentImport = new FileRoute('/').createRoute()

const ProfileComponentRoute = ProfileComponentImport.update({
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/profile.component'),
    'component',
  ),
})

const PracticepageComponentRoute = PracticepageComponentImport.update({
  path: '/practice_page',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/practice_page.component'),
    'component',
  ),
})

const PracticeComponentRoute = PracticeComponentImport.update({
  path: '/practice',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/practice.component'),
    'component',
  ),
})

const DashboardComponentRoute = DashboardComponentImport.update({
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/dashboard.component'),
    'component',
  ),
})

const IndexComponentRoute = IndexComponentImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/index.component'),
    'component',
  ),
})
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexComponentImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      preLoaderRoute: typeof DashboardComponentImport
      parentRoute: typeof rootRoute
    }
    '/practice': {
      preLoaderRoute: typeof PracticeComponentImport
      parentRoute: typeof rootRoute
    }
    '/practice_page': {
      preLoaderRoute: typeof PracticepageComponentImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      preLoaderRoute: typeof ProfileComponentImport
      parentRoute: typeof rootRoute
    }
  }
}
export const routeTree = rootRoute.addChildren([
  IndexComponentRoute,
  DashboardComponentRoute,
  PracticeComponentRoute,
  PracticepageComponentRoute,
  ProfileComponentRoute,
])
