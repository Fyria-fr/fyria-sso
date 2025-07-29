import {
  StoresProvider,
  useInitialStores
} from '@/providers/stores-provider.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QUERY_CLIENT } from '@/lib/react-query.ts';
import { useEffect, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@/providers/toast-provider.tsx';
import AOS from 'aos';
import 'aos/dist/aos.css';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(() => QUERY_CLIENT);
  const { rehydrated } = useInitialStores();

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  if (!rehydrated) {
    return 'loading...';
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StoresProvider>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </StoresProvider>
    </QueryClientProvider>
  );
};
