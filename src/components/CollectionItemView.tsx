import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Field, InputMeta, ReferenceFieldMeta, SelectMeta, TableMetaData, TimepickerMeta } from '../types/tableMetaData'
import { Box, Button, Divider, List, ListItem, Paper, Typography } from '@mui/material'

import { TableFieldEditorSwitcher } from './fields/TableFieldEditorSwitche'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import { apiSlice } from '../store/apiSlice'
import { FC, useState } from 'react'
import { TableFieldLookupSwitcher } from './fields/TableFieldLookupSwitcher'
import { FabButton } from './UI/FabButton'

export const CollectionItemView = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { tableMeta, fields } = location.state as { tableMeta: TableMetaData; fields: { [key: string]: any } }
  const { selectedLang } = useAppSelector((state) => state.language)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const createItems = () => {
    let newFields = new Map()
    tableMeta.fields.forEach((f) => {
      // if (f.data_type !== 'reference') {
        switch (f.display_template) {
          case 'input':
            newFields.set(f.field, fields[f.field])
            break
          case 'select':
            newFields.set(f.field, fields[f.field])
            break
          case 'timepicker':
            newFields.set(f.field, fields[f.field])
            break
          case 'table':
            newFields.set(f.field, fields[f.field])
            break
        }
      // }
    })
    return newFields
  }

  const [newItems, setNewItems] = useState<Map<string, any>>(createItems())

  const onPressDelete = async () => {
    await dispatch(
      apiSlice.endpoints.deleteCollectionItem.initiate({
        collection: tableMeta.collection,
        itemId: Number(id),
      }),
    )
    setTimeout(() => navigate(-1), 100)
  }

  const onPressEdit = () => {
    if (editMode) {
      saveItem()
    } else {
      setEditMode(true)
    }
  }

  const saveItem = async () => {
    setLoading(true)
    await dispatch(
      apiSlice.endpoints.updateCollectionItem.initiate({
        collection: tableMeta.collection,
        updates: Object.fromEntries(newItems),
        itemId: Number(id),
      }),
    )
    setLoading(false)
    setEditMode(false)
  }

  const onChangeItem = (key: string, value: any) => {
    let items = new Map(newItems)
    items.set(key, value)
    console.log(items)

    setNewItems(items)
  }

  return (
    <Box>
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
          {`${tableMeta.translations[selectedLang]}: ${fields[tableMeta.display_field ?? '']}`}
        </Typography>
        <Button variant="contained" color="error" startIcon={<DeleteOutlineRoundedIcon />} onClick={onPressDelete}>
          Delete
        </Button>
      </Box>

      <Paper elevation={1} sx={{ mt: 2 }}>
        <List disablePadding>
          {tableMeta.fields.map((el, index) => {
            switch (el.data_type) {
              case 'reference':
                return <Box key={el.field + index}>
                <ListItem
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {el.meta.translations[selectedLang]}
                  </Typography>
                  {editMode ? (
                    <TableFieldEditorSwitcher
                      onChange={onChangeItem}
                      field={tableMeta.fields.find((e) => e.field === el.field)!}
                      value={newItems.get(el.field)}
                    />
                  ) : (
                    <TableFieldLookupSwitcher
                      value={newItems.get(el.field)}
                      field={tableMeta.fields.find((e) => e.field === el.field)!}
                    />
                  )}
                </ListItem>
                {index <= tableMeta.fields.length - 2 && <Divider />}
              </Box>

              default:
                return (
                  <Box key={el.field + index}>
                    <ListItem
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {el.meta.translations[selectedLang]}
                      </Typography>
                      {editMode ? (
                        <TableFieldEditorSwitcher
                          onChange={onChangeItem}
                          field={tableMeta.fields.find((e) => e.field === el.field)!}
                          value={newItems.get(el.field)}
                        />
                      ) : (
                        <TableFieldLookupSwitcher
                          value={newItems.get(el.field)}
                          field={tableMeta.fields.find((e) => e.field === el.field)!}
                        />
                      )}
                    </ListItem>
                    {index <= tableMeta.fields.length - 2 && <Divider />}
                  </Box>
                )
            }
          })}
        </List>
      </Paper>
      <FabButton onPressEdit={onPressEdit} loading={loading} editMode={editMode} />
    </Box>
  )
}

type ReferencedCollectionProps = {
  field: Field<InputMeta | SelectMeta | TimepickerMeta | ReferenceFieldMeta>
}

const ReferencedCollection: FC<ReferencedCollectionProps> = ({ field }) => {
  // console.log(field);
  
  return <div>{JSON.stringify(field)}</div>
}