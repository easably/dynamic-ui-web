import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { TableMetaData } from '../../types/tableMetaData'
import { Box, Divider, Fab, List, ListItem, Paper, Typography } from '@mui/material'
import { TableFieldSwitcher } from '../fields/TableFieldSwitcher'
import SaveIcon from '@mui/icons-material/Save'
import { useState } from 'react'
import { apiSlice, useAddCollectionItemQuery } from '../../store/apiSlice'

export const AddCollectionItem = () => {
  const { selectedLang } = useAppSelector((state) => state.language)
  const { collectionName } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { tableMeta } = location.state as { tableMeta: TableMetaData }
  const dispatch = useAppDispatch()

  const createItems = () => {
    let fields = new Map()
    tableMeta.fields.forEach((f) => {
      switch (f.display_template) {
        case 'input':
          fields.set(f.field, '')
          break
        case 'select':
          fields.set(f.field, '')
          break
        case 'timepicker':
          let date = new Date()
          let iso = date.toISOString()
          fields.set(f.field, iso)
          break
      }
    })
    return fields
  }

  const [newItems, setNewItems] = useState<Map<string, any>>(createItems())

  const onChangeItem = (key: string, value: any) => {
    let items = new Map(newItems)
    items.set(key, value)
    setNewItems(items)
  }

  const onPressSaveItem = async () => {
    console.log(Object.fromEntries(newItems))
    const res = await dispatch(
      apiSlice.endpoints.addCollectionItem.initiate({
        collection: collectionName!,
        items: Object.fromEntries(newItems),
      }),
    )
		console.log(res)
    setTimeout(() => navigate(-1), 200)
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mt: 2 }}>
        {tableMeta.translations[selectedLang]}
      </Typography>
      <Paper elevation={2} sx={{ mt: 2 }}>
        <List disablePadding>
          {tableMeta.fields.map((el, index) => (
            <Box key={el.field + index}>
              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: 1,
                }}>
                <Typography variant="h6">{el.meta.translations[selectedLang]}</Typography>
                <TableFieldSwitcher
                  onChange={onChangeItem}
                  field={tableMeta.fields.find((e) => e.field === el.field)!}
                  value={newItems.get(el.field)}
                />
              </ListItem>
              {index <= tableMeta.fields.length - 2 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Fab color="primary" aria-label="add" onClick={onPressSaveItem}>
          <SaveIcon />
        </Fab>
      </Box>
    </Box>
  )
}
