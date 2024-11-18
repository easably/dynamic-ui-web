import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout, User } from '../store/authSlice'
import { Paper, Box, Avatar, Button, TextField, MenuItem } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { Languages, setLanguage } from '../store/languageSlice'

export const AppHeader: FC<{ user: User }> = ({ user }) => {
  const dispath = useAppDispatch()
  const { selectedLang } = useAppSelector((state) => state.language)

  
  const onPressSighOut = () => {
    dispath(logout())
  }

  const onChangeLang = (lang: string) => {
    dispath(setLanguage(lang))
  }

  return (
    <>
      <Paper elevation={10}>
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Avatar alt={`${user.firstName} ${user.lastName}`} src={'https://alerts.taqdev.com/' + user.avatar} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField size="small" select onChange={(e) => onChangeLang(e.target.value)} value={selectedLang}>
              {Object.keys(Languages).map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <Button onClick={onPressSighOut} variant="contained" endIcon={<LogoutIcon />}>
              Signout
            </Button>
          </Box>
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
