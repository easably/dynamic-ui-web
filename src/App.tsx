import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Fade,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { FC, useState } from 'react'
import { useLoginMutation } from './store/apiSlice'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { logout, User } from './store/authSlice'
import LogoutIcon from '@mui/icons-material/Logout'

export const App = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  return (
    <Container sx={{ my: 2, mx: 0 }}>
      {isAuthenticated && user ? <HomeScreen user={user} /> : <LoginForm />}
    </Container>
  )
}

export const HomeScreen: FC<{ user: User }> = ({ user }) => {
  const dispath = useAppDispatch()

  const onPressSighOut = () => {
    dispath(logout())
  }

  return (
    <Box>
      <Paper elevation={10} sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Avatar
          alt={`${user.firstName} ${user.lastName}`}
          src={'https://alerts.taqdev.com/' + user.avatar}
        />
        <Button onClick={onPressSighOut} variant="contained" endIcon={<LogoutIcon />}>
          Signout
        </Button>
      </Paper>
    </Box>
  )
}

export const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onPressSighIn = async () => {
    await login({ email: email, password: password }).unwrap()
  }

  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', gap: 2 }}>
      <Typography variant="h3">Sign in</Typography>
      <TextField
        variant="outlined"
        size="medium"
        label={'Email'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        size="medium"
        label={'Password'}
        hiddenLabel
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        disabled={email.length === 0 || password.length === 0}
        onClick={onPressSighIn}>
        Sign in
        <Fade
          in={isLoading}
          style={{
            transitionDelay: isLoading ? '200ms' : '0ms',
          }}
          unmountOnExit>
          <CircularProgress size={20} sx={{ ml: 1 }} color="inherit" />
        </Fade>
      </Button>
    </Box>
  )
}
