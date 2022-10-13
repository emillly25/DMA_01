import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import React, { useState } from 'react'

declare global {
  interface Window {
    kakao: any
  }
}

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: unknown }>) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
