import { FC } from "react"
import { Field, InputMeta, SelectMeta, TableMeta, TimepickerMeta } from "../../types/tableMetaData"
import dayjs from "dayjs"
import { Typography } from "@mui/material"
import { TableFieldLookupView } from "./lookupFields/TableFieldLookupView"

type TableFieldLookupSwitcherProps = {
    field: Field<InputMeta | SelectMeta | TimepickerMeta | TableMeta>
    value: any
  }

export const TableFieldLookupSwitcher: FC<TableFieldLookupSwitcherProps> = ({ value, field }) => {
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
        return <TableFieldLookupView value={value} field={field as Field<TableMeta>} />
    }
  }
  