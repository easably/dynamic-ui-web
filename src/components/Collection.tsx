import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useGetTableItemsQuery } from '../store/apiSlice'
import { TableMetaData } from '../types/tableMetaData'
import { Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'

export const CollectionView = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { collectionName } = useParams()
  const { tableMeta } = location.state as { tableMeta: TableMetaData }
  const primaryField = tableMeta.display_field

  const { data, isLoading } = useGetTableItemsQuery(collectionName!)

  const onPressCollectionItem = (id: number, itemIndex: number ) => {
    navigate(`/collections/${collectionName}/${id}`, { state: { tableMeta: tableMeta, fields: data![itemIndex] } } )
  }

  return (
    <Paper elevation={2} sx={{ mt: 2 }}>
      {!isLoading && data && (
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
      )}
    </Paper>
  )
}
