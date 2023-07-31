'use client'


import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';

const QueryClientWrapper = ({children}: {children: React.ReactNode}) => {


const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryClientWrapper