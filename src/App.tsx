import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { AuthManager, User } from './api/auth'

export const App = () => {
  const auth = AuthManager.getInstance()
  const [user, setUser] = useState(auth.getCurrentUser())

  useEffect(() => {}, [auth.isAuthenticated])

  return (
    <Container sx={{ my: 2, mx: 0 }}>{auth.isAuthenticated && user ? <HomeScreen user={user} auth={auth}/> : <LoginForm auth={auth} />}</Container>
  )
}

export const HomeScreen: FC<{user: User, auth: AuthManager}> = ({user, auth}) => {


  return (
    <Box>
      <Button onClick={() => auth.signOut()}>++</Button>
      <p>{user.firstName}</p>
      <p>{user.lastname}</p>
    </Box>
  )
}

export const LoginForm: FC<{ auth: AuthManager }> = ({ auth }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onPressSighIn = () => {
    auth.signIn(username, password)
  }

  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', gap: 2 }}>
      <Typography variant="h3">Sign in</Typography>
      <TextField
        variant="outlined"
        size="medium"
        label={'Email'}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        disabled={username.length === 0 || password.length === 0}
        onClick={onPressSighIn}>
        Sign in
      </Button>
    </Box>
  )
}

// export const InputField: FC<InputFieldProps> = ({placeholder}) => {
//   return (
//     <Box sx={{p: 0, m: 0}}>
//       <Typography variant='h3' component="h1" sx={{ pb: 1 }}>
//         FieldName
//       </Typography>
//       <TextField id="outlined-basic" variant="outlined" size="small" placeholder={placeholder}/>
//     </Box>
//   )
// }
