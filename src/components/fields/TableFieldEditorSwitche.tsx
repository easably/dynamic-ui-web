import { FC } from 'react'
import { Field, InputMeta, SelectMeta, TableMeta, TimepickerMeta } from '../../types/tableMetaData'
import { InputField } from './editableFields/InputField'
import { SelectField } from './editableFields/SelectField'

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { TimepickerField } from './editableFields/TimePickerField'

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
      return <EditableTableFieldView value={value} field={field as Field<TableMeta>} onChange={onChange} />
  }
}

export const EditableTableFieldView: FC<{
  value: { [key: string]: any }[]
  field: Field<TableMeta>
  onChange: (key: string, value: any) => void
}> = ({ value, field, onChange }) => {


  const onChangeRow = (column: string, rowIndex: number, newValue: any) => {
    let newItem = { ...value[rowIndex] }
    newItem[column] = newValue

    let newTable = Array.from(value)
    newTable[rowIndex] = newItem

    onChange(field.field, newTable)
  }


  const onPressAddItem = () => {
    
  }


  return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableHead sx={{ background: '#ffffff10' }}>
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
                    {field.meta.columns.map((v: any) => {
                      return (
                        <TableCell key={v + 'head'} sx={{ px: 2, py: 1 }}>
                          {v === 'id' ? (
                            row[v]
                          ) : (
                            <TextField
                              variant="outlined"
                              size="small"
                              value={row[v]}
                              onChange={(e) => onChangeRow(v, index, e.target.value)}
                            />
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={field.meta.columns.length}>
                  No elemets
                </TableCell>
              </TableRow>
            )}
            <TableRow key={'add'}>
              <TableCell align="right" colSpan={field.meta.columns.length}>
                <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={onPressAddItem}>
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
