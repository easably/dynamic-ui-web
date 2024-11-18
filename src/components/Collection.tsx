import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useGetTableItemsQuery } from '../store/apiSlice'
import { TableMetaData } from '../types/tableMetaData'
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { FC } from 'react'
import { useAppSelector } from '../store/hooks'

export const CollectionView = () => {
  const { selectedLang } = useAppSelector((state) => state.language)
  const location = useLocation()

  const { collectionName } = useParams()
  const { tableMeta } = location.state as { tableMeta: TableMetaData }

  const { data, isLoading } = useGetTableItemsQuery(collectionName!)

  return (
    <Box>
      <Typography variant="h4" sx={{mt : 2}}>{tableMeta.translations[selectedLang]}</Typography>
      <Paper elevation={2} sx={{ mt: 2 }}>
        {!isLoading && data && (
          <CollectionViewSwitcher tableMeta={tableMeta} data={data} collectionName={collectionName!} />
        )}
      </Paper>
    </Box>
  )
}

type CollectionViewProps = {
  collectionName: string
  tableMeta: TableMetaData
  data: {
    [key: string]: any
  }[]
}

const CollectionViewSwitcher: FC<CollectionViewProps> = ({ tableMeta, data, collectionName }) => {
  switch (tableMeta.display_template) {
    case 'list':
      return <CollectionListView collectionName={collectionName} data={data} tableMeta={tableMeta} />
    case 'table':
      return <CollectionListView collectionName={collectionName} data={data} tableMeta={tableMeta} />
  }
}

const CollectionListView: FC<CollectionViewProps> = ({ tableMeta, data, collectionName }) => {
  const navigate = useNavigate()
  const onPressCollectionItem = (id: number, itemIndex: number) => {
    navigate(`/collections/${collectionName}/${id}`, { state: { tableMeta: tableMeta, fields: data![itemIndex] } })
  }

  const primaryField = tableMeta.display_field

  return (
    <List disablePadding>
      {data.map((el, index) => (
        <div key={el['id']}>
          <ListItemButton onClick={() => onPressCollectionItem(el['id'], index)}>
            <ListItemText primary={el[primaryField]} />
            <ListItemIcon>
              <ArrowForwardIosRoundedIcon />
            </ListItemIcon>
          </ListItemButton>
          <Divider />
        </div>
      ))}
    </List>
  )
}
