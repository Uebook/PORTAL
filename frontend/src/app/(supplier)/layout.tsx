'use client';

import Sidebar from '@/components/layout/Sidebar';
import { usePathname } from 'next/navigation';

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname.endsWith('/login') || pathname.endsWith('/signup');

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="admin-layout flex h-screen overflow-hidden text-foreground">
      <Sidebar />
      <main className="flex-1 relative overflow-hidden flex flex-col bg-[var(--content-bg)]">
        <div className="flex-1 overflow-y-auto relative">
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
