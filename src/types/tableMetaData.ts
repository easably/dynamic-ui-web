interface Translations {
  [key: string]: string
}

export interface TableMetaData {
  collection: string
  display_field: string
  display_template: 'list' | 'table' 
  hidden: boolean
  fields: Field<InputMeta | SelectMeta | TimepickerMeta | ReferenceFieldMeta >[] 
  translations: Translations
}

export interface Field<T> {
  field: string
  data_type: 'string' | 'int' | 'timestamp' | 'reference'
  display_template: 'input' | 'select' | 'timepicker' | 'table'
  join?: string[]
  collection?: string
  meta: T
}

export interface InputMeta {
  display_name: string
  editable: boolean
  icon: string
  is_nullable: boolean
  required: boolean
  translations: Translations
}

export interface SelectMeta {
  display_name: string
  editable: boolean
  icon: string
  initaial_value: string
  values: string[]
  is_nullable: boolean
  required: boolean
  translations: Translations
}

export interface TimepickerMeta {
  display_name: string
  editable: boolean
  icon: string
  is_nullable: boolean
  required: boolean
  translations: Translations
}

export interface TableMeta {
  editable: boolean
  icon: string
  columns: string[]
  is_nullable: boolean
  required: boolean
  translations: Translations
}

export interface ReferenceFieldMeta {
  editable: boolean
  icon: string
  columns: string[]
  is_nullable: boolean
  required: boolean
  translations: Translations
}

