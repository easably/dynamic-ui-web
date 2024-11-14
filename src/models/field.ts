
export type FieldType = "string" | "int"

export interface Field {
    collection: string
    field: string
    type: FieldType
}

export interface Scheme {
    name: string
    table: string
    data_type: FieldType
    default_value: string,
    generation_expression: string | null,
    max_length: number | null,
    numeric_precision: number | null,
    "numeric_scale": null,
    "is_generated": false,
    "is_nullable": true,
    "is_unique": false,
    "is_indexed": false,
    "is_primary_key": false,
    "has_auto_increment": false,
    "foreign_key_schema": null,
    "foreign_key_table": null,
    "foreign_key_column": null,
    "comment": null
}

