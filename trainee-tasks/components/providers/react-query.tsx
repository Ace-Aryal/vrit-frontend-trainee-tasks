"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export default function ReactQueryProvder({ children }: {
    children: React.ReactNode
}) {
    const qc = new QueryClient()
    return (
        <QueryClientProvider client={qc}>
            {children}
        </QueryClientProvider>
    )
}
