import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from './authSlice'
import { RootState } from './store'
import { DBSchema } from '../types/dbScheme'
import { Field, InputMeta, SelectMeta, TableMetaData, TimepickerMeta } from '../types/tableMetaData'

enum ApiEndpoints {
  signIn = '/rest/signin',
  getScheme = '/rest/get-schema-db',
  getTableItems = '/rest/5c_v5/get',
  addCollectionItem = '/rest/5c_v5/add',
}

interface AddCollectionItemArguments {
  collection: string;
  items: { [key: string]: any }; 
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
            }
          })

          tablesMeta.push(meta)
        }
        return tablesMeta
      },
    }),
    getTableItems: builder.query<Array<{[key: string]: any}>, string>({
      query: (tableName: string) => ({ url: ApiEndpoints.getTableItems, method: 'POST', body: { table: tableName } }),
    }),
    addCollectionItem: builder.query<void, AddCollectionItemArguments>({
      query: ( {collection, items} ) => {
        let body = {
          table: collection,
          insert: {...items}
        }
        return { url: ApiEndpoints.addCollectionItem, method: 'POST', body: body }
      },
    })
  }),
 
})

export const { useGetSchemeQuery, useLoginMutation, useGetTableItemsQuery, useAddCollectionItemQuery } = apiSlice
