'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { LayoutDashboard, Users, BookOpen, MessageSquare, LogOut, Menu, X, ChevronRight, ShieldCheck, FileUp, FileText } from 'lucide-react';
import styles from './AdminLayout.module.css';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@dietoloq.az';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/consultations', label: 'Konsultasiyalar', icon: MessageSquare },
  { href: '/admin/blog', label: 'Blog Yazıları', icon: Plus },
  { href: '/admin/courses', label: 'Kurslar', icon: BookOpen },
  { href: '/admin/books', label: 'PDF Kitablar', icon: FileUp },
  { href: '/admin/users', label: 'İstifadəçilər', icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Don't check auth on the login page itself
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    const checkAdmin = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/admin/login');
        return;
      }

      // Check if the logged-in user is the admin
      if (session.user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        // Not admin - sign out and redirect to admin login
        await supabase.auth.signOut();
        router.push('/admin/login');
        return;
      }

      setLoading(false);
    };

    checkAdmin();
  }, [router, pathname]);

  // Render just children for login page (no sidebar)
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#F1F5F9',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔐</div>
        <p style={{ fontFamily: 'Inter, system-ui', color: '#64748B' }}>Giriş yoxlanılır...</p>
      </div>
    </div>
  );

  return (
    <div className={styles.layout}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <ShieldCheck size={22} color="hsl(150 100% 72%)" />
            <div>
              <div className={styles.logoName}>Admin Panel</div>
              <div className={styles.logoSub}>Leyla Zülfüqarlı</div>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={() => setSidebarOpen(false)}><X size={18} /></button>
        </div>

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
                {isActive && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/dashboard" className={styles.dashLink}>← User Dashboard</Link>
          <button className={styles.logoutBtn} onClick={handleLogout}><LogOut size={16} /> Çıxış</button>
        </div>
      </aside>

      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      <div className={styles.main}>
        <header className={styles.topbar}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
          <span className={styles.topbarTitle}>
            {navItems.find(n => n.href === pathname)?.label || 'Admin'}
          </span>
          <Link href="/az" className={styles.siteLink}>← Sayta qayıt</Link>
        </header>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
