import { FC } from 'react'
import { logout, User } from '../store/authSlice'
import { useAppDispatch } from '../store/hooks'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Fade,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useGetSchemeQuery } from '../store/apiSlice'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'

export const HomeScreen: FC<{ user: User }> = ({ user }) => {
  const { data, error, isLoading } = useGetSchemeQuery()

  return (
    <Box>
      <Header user={user} isLoading={isLoading} />
      {!isLoading && (
        <Paper elevation={2} sx={{ mt: 2 }}>
          <List disablePadding>
            {data?.map((m) => (
              <div key={m.collection}>
                <ListItemButton>
                  <ListItemText primary={m.translations['en']} />
                  <ListItemIcon>
                    <ArrowForwardIosRoundedIcon />
                  </ListItemIcon>
                </ListItemButton>
                <Divider />
              </div>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  )
}

const Header: FC<{ user: User; isLoading: boolean }> = ({ user, isLoading }) => {
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

        <Fade
          in={isLoading}
          unmountOnExit
          style={{
            transitionDelay: isLoading ? '200ms' : '0ms',
          }}>
          <LinearProgress />
        </Fade>
      </Paper>
    </>
  )
}
