import { FC } from 'react'
import { User } from '../store/authSlice'
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material'

import { useGetSchemeQuery } from '../store/apiSlice'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { Outlet, useNavigate } from 'react-router-dom'
import { TableMetaData } from '../types/tableMetaData'

export const CollectionsScreen: FC<{ user: User }> = () => {
  const { data, isLoading } = useGetSchemeQuery()

  const navigate = useNavigate()
  const onPressCollectionItem = (collectionName: string, tableMeta: TableMetaData) => {
    navigate(`/collections/${collectionName}`, { state: { tableMeta: tableMeta } })
  }

  return (
    <Box>
      {!isLoading && (
        <Paper elevation={2} sx={{ mt: 2 }}>
          <List disablePadding>
            {data?.map((m) => (
              <div key={m.collection}>
                <ListItemButton onClick={() => onPressCollectionItem(m.collection, m)}>
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
      <Outlet />
    </Box>
  )
}
