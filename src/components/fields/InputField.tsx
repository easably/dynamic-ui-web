import { TextField } from "@mui/material"
import { FC } from "react"

export const InputField: FC<{ value: any }> = ({ value }) => {
    return <TextField id="outlined-basic" label={value} variant="outlined" value={value} />
  }