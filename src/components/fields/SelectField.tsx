import { FC } from "react";
import { Field, SelectMeta } from "../../types/tableMetaData";
import { MenuItem, TextField } from "@mui/material";

export const SelectField: FC<{ value: any; field: Field<SelectMeta> }> = ({ field, value }) => {
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