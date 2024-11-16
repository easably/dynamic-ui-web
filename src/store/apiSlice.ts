import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from './authSlice'

enum ApiEndpoints {
  signIn = '/rest/signin',
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://alerts.taqdev.com' }), // Adjust your base URL
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
  }),
})

export const { useLoginMutation } = apiSlice
