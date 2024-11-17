import { FC } from 'react'
import { useAppDispatch } from '../store/hooks'
import { logout, User } from '../store/authSlice'
import { Paper, Box, Avatar, Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

export const AppHeader: FC<{ user: User }> = ({ user }) => {
  const dispath = useAppDispatch()
  const onPressSighOut = () => {
    dispath(logout())
  }

  return (
    <>
      <Paper elevation={10}>
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Avatar alt={`${user.firstName} ${user.lastName}`} src={'https://alerts.taqdev.com/' + user.avatar} />
          <Button onClick={onPressSighOut} variant="contained" endIcon={<LogoutIcon />}>
            Signout
          </Button>
        </Box>

        {/* <Fade
            in={isLoading}
            unmountOnExit
            style={{
              transitionDelay: isLoading ? '200ms' : '0ms',
            }}>
            <LinearProgress />
          </Fade> */}
      </Paper>
    </>
  )
}
