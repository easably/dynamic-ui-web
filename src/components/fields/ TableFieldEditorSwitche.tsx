import { FC } from 'react'
import { Field, InputMeta, SelectMeta, TableMeta, TimepickerMeta } from '../../types/tableMetaData'
import { InputField } from './InputField'
import { SelectField } from './SelectField'
import { TimepickerField } from './TimePickerField'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

type TableFieldSwitcherProps = {
  field: Field<InputMeta | SelectMeta | TimepickerMeta | TableMeta>
  value: any
  onChange: (key: string, value: any) => void
}

export const TableFieldEditorSwitcher: FC<TableFieldSwitcherProps> = ({ field, value, onChange }) => {
  switch (field.display_template) {
    case 'input':
      return <InputField value={value} onChange={onChange} field={field as Field<InputMeta>} />
    case 'select':
      return <SelectField value={value} onChange={onChange} field={field as Field<SelectMeta>} />
    case 'timepicker':
      return <TimepickerField value={value} onChange={onChange} field={field as Field<TimepickerMeta>} />
    case 'table':
      return <EditableTableFieldView value={value} field={field as Field<TableMeta>} />
  }
}

export const EditableTableFieldView: FC<{ value: { [key: string]: any }[]; field: Field<TableMeta> }> = ({
  value,
  field,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableHead  sx={{background: '#ffffff10'}}>
          <TableRow>
            {field.meta.columns.map((v) => (
              <TableCell key={v + 'head'} sx={{ fontWeight: 'bold', px: 2, py: 1 }}>
                {v}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {
          <TableBody>
            {value ? (
              value.map((row, index) => {
                return (
                  <TableRow key={String(row) + index}>
                    {field.meta.columns.map((v: any) => (
                      <TableCell key={v + 'head'}>{row[v]}</TableCell>
                    ))}
                  </TableRow>
                )
              })
            ) : (
              <TableRow >
                <TableCell align="center" colSpan={field.meta.columns.length}>
                  No elemets
                </TableCell>
              </TableRow>
            )}
            <TableRow key={'add'}>
              <TableCell align="right" colSpan={field.meta.columns.length}>
                <Button variant="contained" color="success" startIcon={<AddIcon />}>
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        }
      </Table>
    </TableContainer>
  )
}
