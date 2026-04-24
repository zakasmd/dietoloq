'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { BookOpen, Play, ArrowRight, MessageCircle } from 'lucide-react';

const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

type Course = {
  id: string;
  title_az: string;
  description_az: string;
};

type Lesson = {
  id: string;
  title_az: string;
  order_index: number;
};

export default function DashboardPage() {
  const [user, setUser] = useState<{ email?: string; user_metadata?: { full_name?: string } } | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessonCounts, setLessonCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUser(session.user);

      // Get user's courses
      const { data: userCourses } = await supabase
        .from('user_courses')
        .select('course_id')
        .eq('user_id', session.user.id);

      if (userCourses?.length) {
        const ids = userCourses.map((uc: { course_id: string }) => uc.course_id);
        const { data: coursesData } = await supabase
          .from('courses')
          .select('id, title_az, description_az')
          .in('id', ids)
          .eq('is_published', true);
        setCourses(coursesData || []);

        // Get lesson counts per course
        const counts: Record<string, number> = {};
        await Promise.all(
          (coursesData || []).map(async (c: Course) => {
            const { count } = await supabase
              .from('lessons')
              .select('*', { count: 'exact', head: true })
              .eq('course_id', c.id)
              .eq('is_published', true);
            counts[c.id] = count || 0;
          })
        );
        setLessonCounts(counts);
      }
      setLoading(false);
    };
    load();
  }, []);

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Qonaq';

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: '#64748B' }}>
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
      <p style={{ fontFamily: 'Inter, system-ui' }}>Yüklənir...</p>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0D2137 100%)',
        borderRadius: '16px',
        padding: '2rem 2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        boxShadow: '0 4px 24px rgba(15,23,42,0.12)',
      }}>
        <div>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>👋</div>
          <h1 style={{
            fontFamily: 'Space Grotesk, system-ui',
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: 700,
            color: 'white',
            letterSpacing: '-0.02em',
            marginBottom: '0.375rem',
          }}>
            Xoş gəldiniz, {firstName}!
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, system-ui', fontSize: '0.9rem' }}>
            {courses.length > 0
              ? `${courses.length} kursunuz var. Dərslərə davam edin.`
              : 'Kurs almaq üçün bizimlə əlaqə saxlayın.'}
          </p>
        </div>
        {courses.length > 0 ? (
          <Link href="/dashboard/courses" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, hsl(150 100% 72%), hsl(175 85% 60%))',
            color: 'hsl(165 60% 8%)',
            borderRadius: '10px',
            fontFamily: 'Space Grotesk, system-ui',
            fontWeight: 700, fontSize: '0.9rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            Kurslara bax <ArrowRight size={16} />
          </Link>
        ) : (
          <a href="https://wa.me/994506684823" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: '#25D366',
            color: 'white',
            borderRadius: '10px',
            fontFamily: 'Space Grotesk, system-ui',
            fontWeight: 700, fontSize: '0.9rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            <WaIcon /> WhatsApp ilə müraciət
          </a>
        )}
      </div>

      {/* Courses Grid */}
      {courses.length > 0 ? (
        <div>
          <h2 style={{
            fontFamily: 'Space Grotesk, system-ui',
            fontSize: '1.1rem', fontWeight: 700,
            color: '#0F172A', marginBottom: '1.25rem',
            letterSpacing: '-0.01em',
          }}>
            📚 Kurslarım ({courses.length})
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}>
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/dashboard/courses?course=${course.id}`}
                style={{
                  display: 'block',
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  textDecoration: 'none',
                  boxShadow: '0 1px 4px rgba(15,23,42,0.08)',
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(15,23,42,0.12)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(15,23,42,0.08)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: '12px',
                  background: 'linear-gradient(135deg, hsl(150 100% 72% / 0.15), hsl(175 85% 60% / 0.1))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1rem',
                }}>
                  <BookOpen size={22} color="#059669" />
                </div>

                <h3 style={{
                  fontFamily: 'Space Grotesk, system-ui',
                  fontSize: '1rem', fontWeight: 600,
                  color: '#0F172A', marginBottom: '0.5rem',
                  letterSpacing: '-0.01em',
                }}>
                  {course.title_az}
                </h3>

                {course.description_az && (
                  <p style={{
                    fontFamily: 'Inter, system-ui',
                    fontSize: '0.82rem', color: '#64748B',
                    lineHeight: 1.5, marginBottom: '1.25rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {course.description_az}
                  </p>
                )}

                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{
                    fontFamily: 'Inter, system-ui',
                    fontSize: '0.8rem', color: '#059669',
                    background: '#DCFCE7', padding: '0.25rem 0.75rem',
                    borderRadius: '20px', fontWeight: 600,
                  }}>
                    {lessonCounts[course.id] || 0} dərs
                  </span>
                  <span style={{
                    display: 'flex', alignItems: 'center', gap: '0.25rem',
                    fontFamily: 'Inter, system-ui',
                    fontSize: '0.8rem', color: '#059669', fontWeight: 600,
                  }}>
                    <Play size={14} /> İzlə
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        /* Empty state */
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '4rem 2rem',
          textAlign: 'center',
          boxShadow: '0 1px 4px rgba(15,23,42,0.08)',
          border: '1px solid #E2E8F0',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.25rem' }}>🎓</div>
          <h2 style={{
            fontFamily: 'Space Grotesk, system-ui',
            fontSize: '1.35rem', fontWeight: 700,
            color: '#0F172A', marginBottom: '0.75rem',
            letterSpacing: '-0.01em',
          }}>
            Hələ kursunuz yoxdur
          </h2>
          <p style={{
            fontFamily: 'Inter, system-ui',
            color: '#64748B', marginBottom: '2rem',
            maxWidth: '380px', margin: '0 auto 2rem',
            lineHeight: 1.6,
          }}>
            Kurs almaq üçün WhatsApp-da bizimlə əlaqə saxlayın.
            Kurs alındıqdan sonra burada görünəcək.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/994506684823?text=Salam!%20Kurs%20haqqında%20məlumat%20almaq%20istəyirəm."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: '#25D366', color: 'white',
                borderRadius: '10px',
                fontFamily: 'Space Grotesk, system-ui',
                fontWeight: 700, fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              <WaIcon /> WhatsApp-da sifariş et
            </a>
            <Link href="/az/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'white', color: '#0F172A',
              border: '1.5px solid #E2E8F0',
              borderRadius: '10px',
              fontFamily: 'Space Grotesk, system-ui',
              fontWeight: 700, fontSize: '0.9rem',
              textDecoration: 'none',
            }}>
              <MessageCircle size={16} /> Xidmətlərə bax
            </Link>
          </div>
        </div>
      )}

      {/* Support card */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 1px 4px rgba(15,23,42,0.08)',
        border: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: '10px',
          background: '#F0FDF4',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <MessageCircle size={20} color="#059669" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'Space Grotesk, system-ui',
            fontWeight: 600, fontSize: '0.9rem', color: '#0F172A', marginBottom: '0.2rem',
          }}>
            Sualınız var?
          </div>
          <div style={{
            fontFamily: 'Inter, system-ui',
            fontSize: '0.82rem', color: '#64748B',
          }}>
            WhatsApp-da bizimlə əlaqə saxlayın, dərhal cavab veririk.
          </div>
        </div>
        <a
          href="https://wa.me/994506684823"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '0.6rem 1.25rem',
            background: '#25D366', color: 'white',
            borderRadius: '8px',
            fontFamily: 'Inter, system-ui',
            fontWeight: 600, fontSize: '0.85rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          WhatsApp
        </a>
      </div>

    </div>
  );
}
