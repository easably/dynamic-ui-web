import { FC, useEffect } from 'react'
import { User } from '../store/authSlice'
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material'

import { useGetSchemeQuery } from '../store/apiSlice'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { useNavigate } from 'react-router-dom'
import { TableMetaData } from '../types/tableMetaData'
import { useAppSelector } from '../store/hooks'

export const CollectionsScreen: FC<{ user: User }> = () => {
  const { selectedLang } = useAppSelector((state) => state.language)
  const { data, isLoading, error } = useGetSchemeQuery()

  useEffect(() => {
    if (error) {
      console.log(error)
    }
  }, [error])

  const navigate = useNavigate()
  const onPressCollection = (collectionName: string, tableMeta: TableMetaData) => {
    navigate(`/collections/${collectionName}`, { state: { tableMeta: tableMeta } })
  }

  return (
    <Box>
      {!isLoading && (
        <Paper elevation={2} sx={{ mt: 2 }}>
          <List disablePadding>
            {data?.map((m) => (
              <div key={m.collection}>
                <ListItemButton onClick={() => onPressCollection(m.collection, m)}>
                  <ListItemText primary={m.translations[selectedLang]} />
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
