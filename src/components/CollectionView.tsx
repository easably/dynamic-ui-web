import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useGetTableItemsQuery } from '../store/apiSlice'
import { TableMetaData } from '../types/tableMetaData'
import { Box, Fab, Paper, Typography } from '@mui/material'

import { useAppSelector } from '../store/hooks'
import AddIcon from '@mui/icons-material/Add'
import { CollectionViewSwitcher } from './collections/CollectionViewSwitcher'

export const CollectionView = () => {
  const { selectedLang } = useAppSelector((state) => state.language)
  const location = useLocation()
  const { collectionName } = useParams()
  const navigate = useNavigate()
  const { tableMeta } = location.state as { tableMeta: TableMetaData }
  const { data, isLoading } = useGetTableItemsQuery(collectionName!)

  const onPressAddItem = () => {
    navigate(`/collections/${collectionName}/add`, { state: { tableMeta: tableMeta } })
  }
  
  return (
    <Box height={'100%'}>
      <Typography variant="h4" sx={{ mt: 2 }}>
        {tableMeta.translations[selectedLang]}
      </Typography>
      <Paper elevation={2} sx={{ mt: 2 }}>
        {!isLoading && data && (
          <CollectionViewSwitcher tableMeta={tableMeta} data={data} collectionName={collectionName!} />
        )}
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Fab color="primary" aria-label="add" onClick={onPressAddItem}>
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  )
}
