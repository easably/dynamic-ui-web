import { FC } from "react";
import { Field, InputMeta, SelectMeta, TimepickerMeta } from "../../types/tableMetaData";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { TimepickerField } from "./TimePickerField";


type TableFieldSwitcherProps= {
  field: Field<InputMeta | SelectMeta | TimepickerMeta>
  value: any
  onChange: (key: string, value: any) => void
}

export const TableFieldSwitcher: FC<TableFieldSwitcherProps> = ({ field, value, onChange }) => {
  
    switch (field.display_template) {
      case 'input':
        return <InputField value={value} onChange={onChange} field={field.field} />
      case 'select':
        return <SelectField value={value} field={field as Field<SelectMeta>} />
      case 'timepicker':
        return <TimepickerField value={value} />
    }
  }