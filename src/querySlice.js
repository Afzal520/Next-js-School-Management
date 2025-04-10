import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', // optional, default is 'api'
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    getDetails: builder.query({
      
      query: (id) => `/teacherRegister?id=${id}`,
    }),
    editDetails:builder.mutation({
      query:({id,data})=>({
        url:`/teacherRegister?id=${id}`,
        method:"PUT",
        body:data
      })
    })
  }),
});

export const { useGetDetailsQuery, useEditDetailsMutation} = apiSlice;
