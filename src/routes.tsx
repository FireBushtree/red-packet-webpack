import { type RouteObject, useRoutes } from 'react-router'
import Home from '@/pages/CreateRedPacket'
import DefaultLayout from './layouts/default'
import ClaimRedPacket from './pages/ClaimRedPacket'

const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/claim/:id',
        element: <ClaimRedPacket />,
      },
    ],
  },
]

export default function AppRoutes() {
  const routes = useRoutes(routeConfig)
  return routes
}
