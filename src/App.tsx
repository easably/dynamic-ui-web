import { useAppSelector } from './store/hooks'
import { CollectionsScreen } from './components/CollectionsScreen'
import { LoginScreen } from './components/LoginScreen'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import { Container } from '@mui/material'
import { CollectionView } from './components/Collection'
import { FC } from 'react'
import { User } from './store/authSlice'
import { AppHeader } from './components/AppHeader'
import { CollectionItemView } from './components/CollectionItemView'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const App = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: isAuthenticated && user ? <Layout user={user} /> : <Navigate to="/login" replace />,
        children: [
          {
            path: '/',
            element: <CollectionsScreen user={user!} />,
          },
          {
            path: 'collections/:collectionName',
            element: <CollectionView />,
          },
          {
            path: 'collections/:collectionName/:id',
            element: <CollectionItemView />,
          },
        ],
      },
      {
        path: '/login',
        element: !isAuthenticated ? <LoginScreen /> : <Navigate to="/collections" replace />,
      },
    ],
    {
      future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
      },
    },
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </LocalizationProvider>
  )
}

export const Layout: FC<{ user: User }> = ({ user }) => {
  return (
    <Container sx={{ my: 2, mx: 0 }}>
      <AppHeader user={user} />
      <Outlet />
    </Container>
  )
}
