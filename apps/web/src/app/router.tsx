import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoot } from './routes/app/root.tsx';
import { PublicRoutes } from '../lib/auth.tsx';
import { APP_ROUTES } from '../config/routes.config.ts';
import { NotFoundRoute } from '@/app/routes/not-found.tsx';

const queryClient = new QueryClient();

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: APP_ROUTES.app.getHref(),
      element: (
        <PublicRoutes>
          <AppRoot />
        </PublicRoutes>
      ),
      children: [
        {
          path: '',
          lazy: async () => {
            const { AppRoute } = await import('./routes/app/app');
            return { Component: AppRoute };
          }
        }
      ]
    },
    {
      path: '*',
      element: (
        <PublicRoutes>
          <NotFoundRoute />
        </PublicRoutes>
      )
    }
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
