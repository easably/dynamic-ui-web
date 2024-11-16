import { FC } from "react"
import { logout, User } from "../store/authSlice"
import { useAppDispatch } from "../store/hooks"
import { Avatar, Box, Button, Paper } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout'

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