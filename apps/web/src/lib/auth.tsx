import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';
import { ScrollToTop } from '@/components/scroll-to-top.tsx';

export const ProtectedRoute = observer(({ children }: PropsWithChildren) => {
  // const {
  //   authStore: { isConnected }
  // } = useStores();

  // if (!isConnected) {
  // redirect to login page if not connected
  // }

  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
});

export const PublicRoutes = observer(({ children }: PropsWithChildren) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
});
