'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Play, Clock, ChevronRight, ArrowLeft, FileDown, BookOpen, Lock } from 'lucide-react';

type Course = {
  id: string;
  title_az: string;
  description_az: string;
};

type Lesson = {
  id: string;
  title_az: string;
  youtube_url: string | null;
  pdf_url: string | null;
  order_index: number;
  duration_minutes: number | null;
  is_published: boolean;
};

function getYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

function CoursesContent() {
  const searchParams = useSearchParams();
  const initialCourseId = searchParams?.get('course');

  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [lessonsLoading, setLessonsLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoading(false); return; }

      const { data: userCourses } = await supabase
        .from('user_courses')
        .select('course_id')
        .eq('user_id', session.user.id);

      if (!userCourses?.length) { setLoading(false); return; }

      const ids = userCourses.map((uc: { course_id: string }) => uc.course_id);
      const { data: coursesData } = await supabase
        .from('courses')
        .select('id, title_az, description_az')
        .in('id', ids)
        .order('created_at', { ascending: true });

      if (coursesData?.length) {
        setCourses(coursesData);
        // Auto-select from URL param or first
        const target = initialCourseId
          ? coursesData.find((c: Course) => c.id === initialCourseId) || coursesData[0]
          : coursesData[0];
        setSelectedCourse(target);
        await loadLessons(target.id);
      }
      setLoading(false);
    };
    fetchAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadLessons = async (courseId: string) => {
    setLessonsLoading(true);
    setActiveLesson(null);
    const supabase = createClient();
    const { data } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index');
    setLessons(data || []);
    setLessonsLoading(false);
  };

  const selectCourse = (course: Course) => {
    setSelectedCourse(course);
    loadLessons(course.id);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#64748B' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <p style={{ fontFamily: 'Inter, system-ui' }}>Kurslar yüklənir...</p>
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div style={{
        background: 'white', borderRadius: '16px', padding: '4rem 2rem',
        textAlign: 'center', boxShadow: '0 1px 4px rgba(15,23,42,0.08)',
        border: '1px solid #E2E8F0',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.25rem' }}>🎓</div>
        <h2 style={{ fontFamily: 'Space Grotesk, system-ui', fontSize: '1.35rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
          Hələ kursunuz yoxdur
        </h2>
        <p style={{ fontFamily: 'Inter, system-ui', color: '#64748B', marginBottom: '2rem', maxWidth: '360px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          Kurs almaq üçün WhatsApp-da bizimlə əlaqə saxlayın.
        </p>
        <a
          href="https://wa.me/994506684823?text=Salam!%20Kurs%20almaq%20istəyirəm."
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
          WhatsApp-da sifariş et
        </a>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Course tabs (if multiple courses) */}
      {courses.length > 1 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => selectCourse(course)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                border: '1.5px solid',
                borderColor: selectedCourse?.id === course.id ? '#059669' : '#E2E8F0',
                background: selectedCourse?.id === course.id ? '#059669' : 'white',
                color: selectedCourse?.id === course.id ? 'white' : '#334155',
                fontFamily: 'Space Grotesk, system-ui',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {course.title_az}
            </button>
          ))}
        </div>
      )}

      {/* Main layout: video player + lesson list */}
      <div className="course-layout">

        {/* LEFT: Video Player */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Video */}
          <div style={{
            background: '#0F172A',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(15,23,42,0.15)',
            aspectRatio: '16/9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
            {activeLesson ? (
              activeLesson.youtube_url ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeId(activeLesson.youtube_url)}?rel=0&modestbranding=1`}
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={activeLesson.title_az}
                />
              ) : (
                <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
                  <Lock size={36} style={{ marginBottom: '1rem' }} />
                  <p style={{ fontFamily: 'Inter, system-ui', fontSize: '0.9rem' }}>Video mövcud deyil</p>
                </div>
              )
            ) : (
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
                <Play size={56} style={{ marginBottom: '1rem' }} />
                <p style={{ fontFamily: 'Inter, system-ui', fontSize: '0.95rem' }}>
                  Sağ tərəfdən dərs seçin
                </p>
              </div>
            )}
          </div>

          {/* Active lesson info */}
          {activeLesson && (
            <div style={{
              background: 'white', borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              boxShadow: '0 1px 4px rgba(15,23,42,0.08)',
              border: '1px solid #E2E8F0',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap',
            }}>
              <div>
                <div style={{ fontFamily: 'Inter, system-ui', fontSize: '0.75rem', color: '#059669', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                  İzlənir
                </div>
                <h2 style={{ fontFamily: 'Space Grotesk, system-ui', fontSize: '1.05rem', fontWeight: 600, color: '#0F172A', letterSpacing: '-0.01em' }}>
                  {activeLesson.title_az}
                </h2>
              </div>
              {activeLesson.pdf_url && (
                <a
                  href={activeLesson.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.6rem 1.25rem',
                    background: '#F0FDF4', color: '#059669',
                    border: '1px solid #BBF7D0',
                    borderRadius: '8px',
                    fontFamily: 'Inter, system-ui',
                    fontWeight: 600, fontSize: '0.85rem',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <FileDown size={15} /> PDF yüklə
                </a>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: Lesson List */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 1px 4px rgba(15,23,42,0.08)',
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex', alignItems: 'center', gap: '0.625rem',
          }}>
            <BookOpen size={18} color="#059669" />
            <div>
              <div style={{ fontFamily: 'Space Grotesk, system-ui', fontWeight: 700, fontSize: '0.95rem', color: '#0F172A', letterSpacing: '-0.01em' }}>
                {selectedCourse?.title_az}
              </div>
              <div style={{ fontFamily: 'Inter, system-ui', fontSize: '0.75rem', color: '#64748B' }}>
                {lessonsLoading ? 'Yüklənir...' : `${lessons.length} dərs`}
              </div>
            </div>
          </div>

          <div style={{ maxHeight: '460px', overflowY: 'auto' }}>
            {lessonsLoading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#94A3B8', fontFamily: 'Inter, system-ui', fontSize: '0.875rem' }}>
                Dərslər yüklənir...
              </div>
            ) : lessons.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#94A3B8', fontFamily: 'Inter, system-ui', fontSize: '0.875rem' }}>
                Dərs hələ əlavə edilməyib
              </div>
            ) : (
              lessons.map((lesson, idx) => {
                const isActive = activeLesson?.id === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem',
                      width: '100%',
                      padding: '1rem 1.5rem',
                      borderBottom: idx < lessons.length - 1 ? '1px solid #F8FAFC' : 'none',
                      background: isActive ? 'linear-gradient(135deg, #F0FDF4, #DCFCE7)' : 'white',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.background = '#F8FAFC';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.background = 'white';
                    }}
                  >
                    {/* Number circle */}
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: isActive ? '#059669' : '#F1F5F9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Space Grotesk, system-ui',
                      fontSize: '0.8rem', fontWeight: 700,
                      color: isActive ? 'white' : '#64748B',
                      flexShrink: 0,
                    }}>
                      {isActive ? <Play size={14} /> : idx + 1}
                    </div>

                    {/* Title + duration */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'Inter, system-ui',
                        fontSize: '0.875rem', fontWeight: isActive ? 600 : 500,
                        color: isActive ? '#059669' : '#1E293B',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {lesson.title_az}
                      </div>
                      {lesson.duration_minutes && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.2rem' }}>
                          <Clock size={11} color="#94A3B8" />
                          <span style={{ fontFamily: 'Inter, system-ui', fontSize: '0.72rem', color: '#94A3B8' }}>
                            {lesson.duration_minutes} dəq
                          </span>
                        </div>
                      )}
                    </div>

                    <ChevronRight size={15} color={isActive ? '#059669' : '#CBD5E1'} />
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Back link */}
      <div>
        <a
          href="/dashboard"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            fontFamily: 'Inter, system-ui',
            fontSize: '0.85rem', color: '#64748B',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={15} /> Dashboard-a qayıt
        </a>
      </div>

    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: '4rem', color: '#64748B' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <p style={{ fontFamily: 'Inter, system-ui' }}>Yüklənir...</p>
      </div>
    }>
      <CoursesContent />
    </Suspense>
  );
}
