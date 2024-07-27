// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY

// Define a service using a base URL and expected endpoints
export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-host', 'article-extractor-and-summarizer.p.rapidapi.com'),
      headers.set('x-rapidapi-key', rapidApiKey)
      return headers
    }
  }),
  endpoints: (builder) => ({ 
    getUrlSummary : builder.query({
      query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}`}),
    extractUrlText : builder.query({
      query: (params) => `/extract?url=${encodeURIComponent(params.articleUrl)}`}),
    getTextSummary : builder.mutation({
      query: (newText) => ({url: '/summarize-text', method: 'POST', body: newText})})
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetUrlSummaryQuery, useLazyExtractUrlTextQuery} = articleApi



