import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 3,
//       cacheTime: 300_000, // 5 minutes
//       staleTime: 10 * 1000, // 10 seconds
//       refetchOnWindowFocus: false,
//       refetchOnReconnect: false,
//       refetchOnMount: false,
//     },
//   },
// });

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
