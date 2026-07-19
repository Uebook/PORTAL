'use client';

import AdminSidebar from '@/components/layout/AdminSidebar';
import { usePathname, useRouter } from 'next/navigation';
import { getAuthUser } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { AdminFilterProvider } from '@/context/AdminFilterContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname.endsWith('/login');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getAuthUser();
    if (!isAuthPage) {
      if (!user) {
        router.push('/admin/login');
      } else if (user.role !== 'ADMIN' && user.role !== 'superadmin') {
        localStorage.removeItem('token');
        router.push('/admin/login?error=unauthorized');
      } else {
        setIsAuthorized(true);
      }
    }
    setIsLoading(false);
  }, [pathname, router, isAuthPage]);

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-indigo-600/25 border-t-indigo-600 rounded-full animate-spin" />
        <div className="text-xs font-bold tracking-widest text-slate-400 uppercase">Verifying Access…</div>
      </div>
    );
  }

  return (
    <AdminFilterProvider>
      <div className="admin-layout flex h-screen overflow-hidden text-foreground">
        <AdminSidebar />
        
        <main className="flex-1 relative overflow-hidden flex flex-col bg-[var(--content-bg)]">
          <div className="flex-1 overflow-y-auto relative">
            <div className="relative z-10 w-full h-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </AdminFilterProvider>
  );
}
