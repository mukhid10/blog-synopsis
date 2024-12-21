import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app'
import { useState } from 'react';
import AppShell from './component/appSell';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </QueryClientProvider>
  );
}
