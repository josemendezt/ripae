'use client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';

interface QueryProviderWrapperProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();

function QueryProviderWrapper({
  children,
}: QueryProviderWrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default QueryProviderWrapper;
