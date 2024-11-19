import { useLocation, useParams } from 'react-router-dom'
import { TableMetaData } from '../types/tableMetaData'
import { Box, Button, Divider, List, ListItem, Paper, Typography } from '@mui/material'

import { TableFieldSwitcher } from './fields/TableFieldSwitcher'
import { useAppSelector } from '../store/hooks'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'

export const CollectionItemView = () => {
  const { selectedLang } = useAppSelector((state) => state.language)
  const location = useLocation()
  const { id } = useParams()
  const { tableMeta, fields } = location.state as { tableMeta: TableMetaData; fields: { [key: string]: any } }

  const onPressDelete = () => {}

  return (
    <Box>
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4">
          {`${tableMeta.translations[selectedLang]}: ${fields[tableMeta.display_field]}`}
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
                <Typography variant="h6">{el.meta.translations[selectedLang]}</Typography>
                <TableFieldSwitcher
                  onChange={() => {}}
                  field={tableMeta.fields.find((e) => e.field === el.field)!}
                  value={fields[el.field]}
                />
              </ListItem>
              {index <= tableMeta.fields.length - 2 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  )
}
