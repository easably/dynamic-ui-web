import { Box, Container, TextField, Typography } from '@mui/material'
import './App.css'
import { FC } from 'react'

export const App = () => {
  return (
    <Container sx={{my: 2, mx: 0}}>
        <InputField placeholder="hello"/>
    </Container>
  )
}


type InputFieldProps = {
    placeholder: string
}

export const InputField: FC<InputFieldProps> = ({placeholder}) => {
  return (
    <Box sx={{p: 0, m: 0}}>
      <Typography variant="body1" component="p" sx={{ pb: 1 }}>
        FieldName
      </Typography>
      <TextField id="outlined-basic" variant="outlined" size="small" placeholder={placeholder}/>
    </Box>
  )
}
