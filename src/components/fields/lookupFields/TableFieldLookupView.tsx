import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { FC } from "react";
import { Field, TableMeta } from "../../../types/tableMetaData";

export const TableFieldLookupView: FC<{ value: { [key: string]: any }[]; field: Field<TableMeta> }> = ({ value, field }) => {

    return (
      <TableContainer component={Paper}>
        <Table aria-label="table">
          <TableHead sx={{background: '#ffffff10'}}>
            <TableRow>
              {field.meta.columns.map((v) => (
                <TableCell key={v + 'head'} sx={{ fontWeight: 'bold', px: 2, py: 1  }}>
                  {v}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {value ? (
            <TableBody>
              {value.map((row, index) => {
                return (
                  <TableRow key={String(row) + index}>
                    {field.meta.columns.map((v: any) => (
                      <TableCell key={v + 'head'}>{row[v]}</TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={field.meta.columns.length}>
                  No elemets
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    )
  }