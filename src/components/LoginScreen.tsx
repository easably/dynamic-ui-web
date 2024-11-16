import { useState } from "react"
import { useLoginMutation } from "../store/apiSlice"
import { Box, Typography, TextField, Button, Fade, CircularProgress } from "@mui/material"

export const LoginScreen = () => {
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
  