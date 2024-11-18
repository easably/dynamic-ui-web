import { useLocation, useParams } from 'react-router-dom'
import { Field, InputMeta, SelectMeta, TableMetaData, TimepickerMeta } from '../types/tableMetaData'
import { FC } from 'react'
import { Box, Divider, List, ListItem, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'

export const CollectionItemView = () => {
  const location = useLocation()
  const { id } = useParams()
  const { tableMeta, fields } = location.state as { tableMeta: TableMetaData; fields: { [key: string]: any } }

  return (
    <Paper elevation={2} sx={{ mt: 2 }}>
      <List disablePadding>
        {tableMeta.fields.map((el, index) => (
          <Box key={el.field + index} >
            <ListItem sx={{display: 'flex', flexDirection:'column', justifyContent: 'flex-start', alignItems:'flex-start', gap: 1}}>
              <Typography variant="h6">{el.meta.translations['en']}</Typography>
              <TableField field={tableMeta.fields.find((e) => e.field === el.field)!} value={fields[el.field]} />
            </ListItem>
            {index <= tableMeta.fields.length -2 && <Divider />}
          </Box>
        ))}
      </List>
    </Paper>
  )
}

const TableField: FC<{ field: Field<InputMeta | SelectMeta | TimepickerMeta>; value: any }> = ({ field, value }) => {
  switch (field.display_template) {
    case 'input':
      return <InputField value={value} />
    case 'select':
      return <SelectField value={value} field={field as Field<SelectMeta>} />
    case 'timepicker':
      return <TimepickerField value={value} />
  }
}

const InputField: FC<{ value: any }> = ({ value }) => {
  return <TextField id="outlined-basic" label={value} variant="outlined" value={value} />
}

const SelectField: FC<{ value: any; field: Field<SelectMeta> }> = ({ field, value }) => {
  return (
    <TextField
      id="outlined-select-currency"
      select
      label="Select"
      value={field.meta.initaial_value}>
      {field.meta.values.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  )
}

const TimepickerField: FC<{ value: any }> = ({ value }) => {
  return <DateTimePicker label="Basic date time picker" defaultValue={dayjs(value)} />
}
