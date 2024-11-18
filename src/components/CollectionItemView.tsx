import { useLocation, useParams } from 'react-router-dom'
import { Field, InputMeta, SelectMeta, TableMetaData, TimepickerMeta } from '../types/tableMetaData'
import { FC } from 'react'
import { MenuItem, TextField } from '@mui/material'

export const CollectionItemView = () => {
  const location = useLocation()
  const { id } = useParams()
  const { tableMeta, fields } = location.state as { tableMeta: TableMetaData; fields: { [key: string]: any } }

  return (
    <>
      {tableMeta.fields.map((el, index) => (
        <div key={el.field + index}>
          <p>{el.meta.translations['en']}</p>
          <TableField field={tableMeta.fields.find((e) => e.field === el.field)!} value={fields[el.field]} />
        </div>
      ))}
    </>
  )
}

const TableField: FC<{ field: Field<InputMeta | SelectMeta | TimepickerMeta>; value: any }> = ({ field, value }) => {
  switch (field.display_template) {
    case 'input':
      return <InputField value={value} />
    case 'select':
      return <SelectField value={value} field={field as Field<SelectMeta>} />
    case 'timepicker':
      return <div>{value}</div>
  }
}

const InputField: FC<{ value: any }> = ({ value }) => {
  return <TextField id="outlined-basic" label={value} variant="outlined" size="small" />
}

const SelectField: FC<{ value: any; field: Field<SelectMeta> }> = ({ field, value }) => {
  return (
    <TextField
      id="outlined-select-currency"
      select
      label="Select"
      size='small'
      value={field.meta.initaial_value}
      helperText="Please select your currency">
      {field.meta.values.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  )
}

const TimepickerField = () => {
    return (
        <div></div>
    )
}