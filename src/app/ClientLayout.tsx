'use client';

import { ReactNode, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Loader from '../components/Loader.component';
import { GlobalProvider } from '../context/Global.context';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideFooterRoutes = ['/login'];
  const showFooter = !hideFooterRoutes.includes(pathname);

  return (
    <GlobalProvider>
      <>
        <Loader />
        <NavBar />
        <main className="flex-1">
          <Suspense>{children}</Suspense>
        </main>
        {showFooter && <Footer className="mt-auto" />}
      </>
    </GlobalProvider>
  );
}
