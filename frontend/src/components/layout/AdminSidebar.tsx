'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Shield, LogOut } from 'lucide-react';
import { getAuthUser, logout } from '@/lib/auth';
import { ThemeToggle } from '@/components/ThemeToggle';

const adminNav = [
  { href: '/admin/dashboard', label: 'Dashboard', permissionKey: 'global_dashboard' },
  { href: '/admin/hotels', label: 'Hotels', permissionKey: 'hotels_manage' },
  { href: '/admin/notifications', label: 'Notifications', permissionKey: 'global_dashboard' },
  { href: '/admin/bookings', label: 'Bookings', permissionKey: 'global_dashboard' },
  { href: '/admin/cancellations', label: 'Cancellations', permissionKey: 'global_dashboard' },
  { href: '/admin/invoices', label: 'Invoices & notes', permissionKey: 'global_dashboard' },
  { href: '/admin/payouts', label: 'Payouts', permissionKey: 'global_dashboard' },
  { href: '/admin/ledgers', label: 'Ledgers', permissionKey: 'global_dashboard' },
  { href: '/admin/reports', label: 'Reports', permissionKey: 'global_dashboard' },
  { href: '/admin/taxes', label: 'Tax rules', permissionKey: 'global_dashboard' },
  { href: '/admin/whatsapp', label: 'WhatsApp', permissionKey: 'global_dashboard' },
  { href: '/admin/banners', label: 'Banners', permissionKey: 'global_dashboard' },
  { href: '/admin/content', label: 'Footer & social', permissionKey: 'global_dashboard' },
  { href: '/admin/api-keys', label: 'API keys', permissionKey: 'users_manage' },
  { href: '/admin/users', label: 'Users', permissionKey: 'users_manage' },
  { href: '/admin/audit', label: 'Audit log', permissionKey: 'users_manage' },
  { href: '/admin/settings', label: 'Settings', permissionKey: 'users_manage' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = getAuthUser();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  if (!user) return null;

  const filteredNav = adminNav.filter(item => {
    const hasAccess =
      user.role === 'OWNER' || user.role === 'ADMIN' || user.role === 'superadmin' ||
      !item.permissionKey || user.permissions?.[item.permissionKey] === true;
    return hasAccess;
  });

  return (
    <aside className="admin-sidebar" style={{ width: 220, minWidth: 220, backgroundColor: '#14352b', color: '#fff' }}>
      {/* Logo */}
      <div className="sidebar-logo" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '24px 20px', gap: 12 }}>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <Shield size={24} color="#cca35e" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#cca35e', fontFamily: '"Playfair Display", serif' }}>Toliday</span>
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#cca35e', fontFamily: '"Playfair Display", serif' }}>Admin</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav" style={{ padding: '20px 12px', gap: 6 }}>
        {filteredNav.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                backgroundColor: isActive ? 'rgba(204,163,94,0.15)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div 
                style={{ 
                  width: 5, 
                  height: 5, 
                  borderRadius: '50%', 
                  backgroundColor: isActive ? '#cca35e' : 'rgba(255,255,255,0.3)',
                  flexShrink: 0 
                }} 
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '16px 20px', gap: 12, marginTop: 'auto' }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', backgroundColor: '#cca35e', 
          color: '#14352b', fontSize: 13, fontWeight: 700, display: 'flex', 
          alignItems: 'center', justifyContent: 'center'
        }}>
          {user.name?.charAt(0).toUpperCase() || 'A'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user.name}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
            Sign out
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              padding: '6px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.7)',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
