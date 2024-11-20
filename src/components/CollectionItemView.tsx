import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Field, InputMeta, SelectMeta, TableMeta, TableMetaData, TimepickerMeta } from '../types/tableMetaData'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Fab,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import { TableFieldEditorSwitcher } from './fields/ TableFieldEditorSwitche'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import { apiSlice } from '../store/apiSlice'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded'
import { FC, useState } from 'react'
import dayjs from 'dayjs'

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
    setNewItems(items)
  }

  return (
    <Box>
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4">
          {`${tableMeta.translations[selectedLang]}: ${fields[tableMeta.display_field ?? '']}`}
        </Typography>
        <Button variant="contained" color="error" startIcon={<DeleteOutlineRoundedIcon />} onClick={onPressDelete}>
          Delete
        </Button>
      </Box>

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
          ))}
        </List>
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Fab color="primary" aria-label="add" onClick={onPressEdit}>
          {editMode ? (
            loading ? (
              <CircularProgress size="30px" color="inherit" />
            ) : (
              <SaveRoundedIcon />
            )
          ) : (
            <EditRoundedIcon />
          )}
        </Fab>
      </Box>
    </Box>
  )
}

type TableFieldLookupSwitcherProps = {
  field: Field<InputMeta | SelectMeta | TimepickerMeta | TableMeta>
  value: any
}

const TableFieldLookupSwitcher: FC<TableFieldLookupSwitcherProps> = ({ value, field }) => {
  const convertValue = (value: any): string => {
    const parsedDate = dayjs(value, ['YYYY-MM-DDTHH:mm:ss.sssZ'], false)
    return parsedDate.isValid() ? dayjs(value).format('LLL') : String(value)
  }

  switch (field.display_template) {
    case 'input':
      return <Typography variant="body1">{value}</Typography>
    case 'select':
      return <Typography variant="body1">{value}</Typography>
    case 'timepicker':
      return <Typography variant="body1">{convertValue(value)}</Typography>
    case 'table':
      return <TableFieldView value={value} field={field as Field<TableMeta>} />
  }
}

export const TableFieldView: FC<{ value: { [key: string]: any }[]; field: Field<TableMeta> }> = ({ value, field }) => {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            {field.meta.columns.map((v) => (
              <TableCell key={v + 'head'} sx={{ fontWeight: 'bold' }}>
                {v}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {value ? (
          <TableBody>
            {value.map((row, index) => {
              return (
                <TableRow key={String(row) + index}>
                  {field.meta.columns.map((v: any) => (
                    <TableCell key={v + 'head'}>{row[v]}</TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={field.meta.columns.length}>
                No elemets
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  )
}
