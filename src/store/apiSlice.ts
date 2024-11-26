import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from './authSlice'
import { RootState } from './store'
import { DBSchema } from '../types/dbScheme'
import {
  Field,
  InputMeta,
  ReferenceFieldMeta,
  SelectMeta,
  TableMeta,
  TableMetaData,
  TimepickerMeta,
} from '../types/tableMetaData'

enum ApiEndpoints {
  signIn = '/rest/signin',
  getScheme = '/rest/get-schema-db',
  getTableItems = '/rest/5c_v5/get',
  addCollectionItem = '/rest/5c_v5/add',
  deleteCollectionItem = '/rest/5c_v5/delete',
  updateCollectionItem = '/rest/5c_v5/put',
}

interface AddCollectionItemArguments {
  collection: string
  items: { [key: string]: any }
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://alerts.taqdev.com',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = state.auth.user?.token
      if (token) {
        headers.set('Authorization', `${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: ApiEndpoints.signIn,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data['user']) {
            dispatch(setCredentials(data['user']))
          } else {
            console.log(data['error']['message'])
          }
        } catch (error) {
          console.error('Login failed:', error)
        }
      },
    }),
    getScheme: builder.query<TableMetaData[], void>({
      query: () => ({ url: ApiEndpoints.getScheme, method: 'POST' }),
      transformResponse: (response: DBSchema): TableMetaData[] => {
        let tables = Object.keys(response.custom)
        let tablesMeta: TableMetaData[] = []

        for (let i = 0; i < tables.length; i++) {
          let tableName = tables[i]
          let tableMeta = response.custom[tableName].find((t) => t.column_name === 'table_meta_data')
            ?.meta_data as TableMetaData

          if (tableMeta) {
            const meta: TableMetaData = {
              collection: tableName,
              display_field: tableMeta.display_field,
              display_template: tableMeta.display_template,
              hidden: tableMeta.hidden,
              fields: [],
              translations: tableMeta.translations,
            }

            tableMeta.fields.forEach((element) => {
              switch (element.display_template) {
                case 'input':
                  meta.fields.push(element as Field<InputMeta>)
                  break
                case 'select':
                  meta.fields.push(element as Field<SelectMeta>)
                  break
                case 'timepicker':
                  meta.fields.push(element as Field<TimepickerMeta>)
                  break
                case 'table':
                  meta.fields.push(element as Field<ReferenceFieldMeta>)
                  break
              }
            })

            tablesMeta.push(meta)
          }
        }
        return tablesMeta
      },
    }),
    getTableItems: builder.query<Array<{ [key: string]: any }>, TableMetaData>({
      query: (tableMeta: TableMetaData) => {
        let fields: string[] = []
        let joins: Array<{
          table: string
          first: string
          second: string
          type: string
        }> = []
        tableMeta.fields.forEach((f) => {          
          if (f.data_type !== 'reference') {
            fields.push(`${tableMeta.collection}.${f.field}`)
          } else {
            let field = f as Field<ReferenceFieldMeta>
            joins.push({
              table: f.field,
              first: f.join![0],
              second: f.join![1],
              type: 'LEFT',
            })
            field.meta.columns.forEach((m) => fields.push(`${field.field}.${m}`))
          }
        })

        let body: { [key: string]: any } = {
          table: tableMeta.collection,
          fields: [`${tableMeta.collection}.id`, ...fields],
          joins: joins,
        }
        return { url: ApiEndpoints.getTableItems, method: 'POST', body: body }
      },
    }),
    addCollectionItem: builder.query<void, AddCollectionItemArguments>({
      query: ({ collection, items }) => {
        let body = {
          table: collection,
          insert: { ...items },
        }
        return { url: ApiEndpoints.addCollectionItem, method: 'POST', body: body }
      },
    }),
    deleteCollectionItem: builder.query<void, { collection: string; itemId: number }>({
      query: ({ collection, itemId }) => {
        let body = {
          table: collection,
          conditions: {
            id: itemId,
          },
        }
        return { url: ApiEndpoints.deleteCollectionItem, method: 'POST', body: body }
      },
    }),
    updateCollectionItem: builder.query<void, { collection: string; updates: { [key: string]: any }; itemId: number }>({
      query: ({ collection, itemId, updates }) => {
        let body = {
          table: collection,
          updates: updates,
          conditions: {
            id: itemId,
          },
        }
        return { url: ApiEndpoints.updateCollectionItem, method: 'POST', body: body }
      },
    }),
  }),
})

export const { useGetSchemeQuery, useLoginMutation, useGetTableItemsQuery } = apiSlice
