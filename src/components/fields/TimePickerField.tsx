import { FC } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { Field, TimepickerMeta } from '../../types/tableMetaData'

type SelectFieldProps = {
  value: any
  field: Field<TimepickerMeta>
  onChange: (key: string, value: any) => void
}

export const TimepickerField: FC<SelectFieldProps> = ({ value, onChange, field }) => {
  return (
    <DateTimePicker
      label=""
      defaultValue={dayjs(value)}
      sx={{ minWidth: 250 }}
      onChange={(e) => onChange(field.field, e?.toISOString())}
    />
  )
}
