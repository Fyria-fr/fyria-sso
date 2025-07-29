import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

export const AppRoot = () => {
  const location = useLocation();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary
        key={location.pathname}
        fallback={<div>Quelque chose fonctionne mal</div>}
      >
        <Outlet />
      </ErrorBoundary>
    </Suspense>
  );
};
