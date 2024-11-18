import { FC } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

export const TimepickerField: FC<{ value: any }> = ({ value }) => {
  return <DateTimePicker label="" defaultValue={dayjs(value)} />
}
