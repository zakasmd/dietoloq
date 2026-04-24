'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutDashboard, BookOpen, FileText, User, LogOut,
  Menu, X, ChevronRight
} from 'lucide-react';
import styles from './DashboardLayout.module.css';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/courses', label: 'Kurslarım', icon: BookOpen },
  { href: '/dashboard/materials', label: 'Materiallar', icon: FileText },
  { href: '/dashboard/profile', label: 'Profil', icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ email?: string; user_metadata?: { full_name?: string } } | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/az/login');
        return;
      }
      setUser(session.user);
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/az');
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Yüklənir...</p>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        {/* Logo */}
        <div className={styles.sidebarLogo}>
          <Link href="/az" className={styles.logoLink}>
            <span>🥗</span>
            <div>
              <div className={styles.logoName}>Leyla Z.</div>
              <div className={styles.logoSub}>Dashboard</div>
            </div>
          </Link>
          <button className={styles.closeSidebar} onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* User Info */}
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {(user?.user_metadata?.full_name || user?.email || 'U')[0].toUpperCase()}
          </div>
          <div>
            <div className={styles.userName}>{user?.user_metadata?.full_name || 'İstifadəçi'}</div>
            <div className={styles.userEmail}>{user?.email}</div>
          </div>
        </div>

        {/* Nav */}
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.navActive : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {isActive && <ChevronRight size={14} className={styles.activeArrow} />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className={styles.sidebarBottom}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={18} />
            Çıxış
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className={styles.main}>
        {/* Top Bar */}
        <header className={styles.topbar}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)} aria-label="Menu">
            <Menu size={22} />
          </button>
          <div className={styles.topbarTitle}>
            {navItems.find((n) => n.href === pathname)?.label || 'Dashboard'}
          </div>
          <Link href="/az" className={styles.siteLink}>← Sayta qayıt</Link>
        </header>

        {/* Content */}
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
