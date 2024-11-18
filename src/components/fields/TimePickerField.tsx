import { FC } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'

export const TimepickerField: FC<{ value: any }> = ({ value }) => {
  return <DateTimePicker label="Basic date time picker" defaultValue={dayjs(value)} />
}
