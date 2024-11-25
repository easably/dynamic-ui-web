import { TextField } from "@mui/material"
import { FC } from "react"
import { Field, InputMeta } from "../../../types/tableMetaData"

type InputFieldProps = {
  field: Field<InputMeta>
  value: any
  onChange: (key: string, value: any) => void
}

export const InputField: FC<InputFieldProps> = ({ field, value, onChange }) => {   
    return (
      <TextField
        sx={{minWidth: 250}}
        variant="outlined"
        size="small"
        value={value}
        onChange={(e) => onChange(field.field, e.target.value)}
      />
    )
  }