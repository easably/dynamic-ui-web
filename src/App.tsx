import { useAppSelector } from './store/hooks'
import { HomeScreen } from './components/HomeScreen'
import { LoginScreen } from './components/LoginScreen'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Container } from '@mui/material'
import { useMemo } from 'react'

export const App = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const router = useMemo(
    () =>
      createBrowserRouter(
        [
          {
            path: '/',
            element: isAuthenticated && user ? <HomeScreen user={user} /> : <Navigate to="/login" replace />,
          },
          {
            path: '/login',
            element: !isAuthenticated ? <LoginScreen /> : <Navigate to="/" replace />,
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
      ),
    [],
  )

  return (
    <Container sx={{ my: 2, mx: 0 }}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </Container>
  )
}
