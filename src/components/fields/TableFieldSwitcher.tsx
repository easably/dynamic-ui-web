import { FC } from "react";
import { Field, InputMeta, SelectMeta, TimepickerMeta } from "../../types/tableMetaData";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { TimepickerField } from "./TimePickerField";


export const TableFieldSwitcher: FC<{ field: Field<InputMeta | SelectMeta | TimepickerMeta>; value: any }> = ({ field, value }) => {
    switch (field.display_template) {
      case 'input':
        return <InputField value={value} />
      case 'select':
        return <SelectField value={value} field={field as Field<SelectMeta>} />
      case 'timepicker':
        return <TimepickerField value={value} />
    }
  }