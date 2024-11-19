import { TextField } from "@mui/material"
import { FC } from "react"

type InputFieldProps = {
  field: string
  value: any
  onChange: (key: string, value: any) => void
}

export const InputField: FC<InputFieldProps> = ({ field, value, onChange }) => {

    return (
      <TextField
        id="outlined-basic"
        // label={value}
        variant="outlined"
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
      />
    )
  }