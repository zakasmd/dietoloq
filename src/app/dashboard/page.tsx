'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { BookOpen, FileText, User, ArrowRight, Clock } from 'lucide-react';
import styles from './Dashboard.module.css';

export default function DashboardPage() {
  const [user, setUser] = useState<{ email?: string; user_metadata?: { full_name?: string } } | null>(null);
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        // Fetch user's course count
        const { count } = await supabase
          .from('user_courses')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', session.user.id);
        setCourseCount(count || 0);
      }
    };
    load();
  }, []);

  const cards = [
    {
      href: '/dashboard/courses',
      icon: <BookOpen size={24} color="#8B5CF6" />,
      bg: '#F5F3FF',
      title: 'Kurslarım',
      value: courseCount,
      label: 'Aktiv kurs',
    },
    {
      href: '/dashboard/materials',
      icon: <FileText size={24} color="#10B981" />,
      bg: '#F0FDF4',
      title: 'Materiallar',
      value: '–',
      label: 'PDF materiallar',
    },
    {
      href: '/dashboard/profile',
      icon: <User size={24} color="#F59E0B" />,
      bg: '#FFF7ED',
      title: 'Profil',
      value: '–',
      label: 'Hesab məlumatları',
    },
  ];

  return (
    <div className={styles.page}>
      {/* Welcome */}
      <div className={styles.welcomeCard}>
        <div className={styles.welcomeLeft}>
          <div className={styles.welcomeEmoji}>👋</div>
          <div>
            <h1 className={styles.welcomeTitle}>
              Xoş gəldiniz, {user?.user_metadata?.full_name?.split(' ')[0] || 'Qonaq'}!
            </h1>
            <p className={styles.welcomeSub}>Bugün hansı kursla davam edəcəksiniz?</p>
          </div>
        </div>
        <Link href="/dashboard/courses" className="btn btn-primary">
          Kurslara bax <ArrowRight size={16} />
        </Link>
      </div>

      {/* Quick Stats */}
      <div className={styles.statsGrid}>
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: card.bg }}>
              {card.icon}
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{card.value}</div>
              <div className={styles.statLabel}>{card.label}</div>
            </div>
            <ArrowRight size={16} className={styles.statArrow} />
          </Link>
        ))}
      </div>

      {/* No courses message */}
      {courseCount === 0 && (
        <div className={styles.noCoursesCard}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Hələ kurs yoxdur</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            Kurs almaq üçün WhatsApp vasitəsilə müraciət edin. Kurs alındıqdan sonra bu bölmədə görünəcək.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/994506684823" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              WhatsApp-da sifariş et
            </a>
            <Link href="/az/services" className="btn btn-outline">
              Xidmətlərə bax
            </Link>
          </div>
        </div>
      )}

      {/* Quick Info */}
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <Clock size={18} color="#8B5CF6" />
          <div>
            <div className={styles.infoTitle}>24/7 Dəstək</div>
            <div className={styles.infoDesc}>Suallarınız üçün WhatsApp-da bizimlə əlaqə saxlaya bilərsiniz</div>
          </div>
        </div>
        <div className={styles.infoCard}>
          <BookOpen size={18} color="#10B981" />
          <div>
            <div className={styles.infoTitle}>Kurs materialları</div>
            <div className={styles.infoDesc}>Video dərslər, PDF kitablar və əlavə materiallar</div>
          </div>
        </div>
      </div>
    </div>
  );
}
