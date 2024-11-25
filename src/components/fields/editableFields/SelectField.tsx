import { FC } from 'react'
import { Field, SelectMeta } from '../../types/tableMetaData'
import { MenuItem, TextField } from '@mui/material'

type SelectFieldProps = {
  value: any
  field: Field<SelectMeta>
  onChange: (key: string, value: any) => void
}

export const SelectField: FC<SelectFieldProps> = ({ field, value, onChange }) => {
  return (
    <TextField
      select
      label="Select"
      size="small"
      sx={{minWidth: 250}}
      value={value === '' ? field.meta.initaial_value : value}
      onChange={(e) => onChange(field.field, e.target.value)}>
      {field.meta.values.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  )
}
