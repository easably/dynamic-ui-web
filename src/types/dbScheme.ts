export interface DBSchema {
  custom: TableConfiguration
}

interface TableConfiguration {
  [tableName: string]: DBField[]
}

interface DBField {
  column_name: string
  data_type: string
  column_default: string | null
  is_nullable: 'YES' | 'NO'
  constraint_type: string | null
  referenced_table_names: string[] | null
  referenced_column_names: string[] | null
  meta_data: ColumnMetaData
}

interface ColumnMetaData {
  label?: string
  primary?: boolean
  [key: string]: any
}
