'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Play, Lock, Clock } from 'lucide-react';
import styles from './CoursesPage.module.css';

type Course = {
  id: string;
  title_az: string;
  description_az: string;
  thumbnail_url: string | null;
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

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: userCourses } = await supabase
        .from('user_courses')
        .select('course_id')
        .eq('user_id', session.user.id);

      if (!userCourses?.length) {
        setLoading(false);
        return;
      }

      const courseIds = userCourses.map((uc: { course_id: string }) => uc.course_id);
      const { data: coursesData } = await supabase
        .from('courses')
        .select('*')
        .in('id', courseIds)
        .eq('is_published', true);

      if (coursesData?.length) {
        setCourses(coursesData);
        setSelectedCourse(coursesData[0]);
        fetchLessons(coursesData[0].id);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const fetchLessons = async (courseId: string) => {
    const supabase = createClient();
    const { data } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', courseId)
      .eq('is_published', true)
      .order('order_index');
    setLessons(data || []);
  };

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <p>Kurslar yüklənir...</p>
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className={styles.empty}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
        <h2>Hələ kursunuz yoxdur</h2>
        <p>Kurs almaq üçün WhatsApp vasitəsilə müraciət edin</p>
        <a href="https://wa.me/994506684823" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg" style={{ marginTop: '1.5rem' }}>
          WhatsApp-da sifariş et
        </a>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Course Tabs */}
      {courses.length > 1 && (
        <div className={styles.courseTabs}>
          {courses.map((course) => (
            <button
              key={course.id}
              className={`${styles.courseTab} ${selectedCourse?.id === course.id ? styles.courseTabActive : ''}`}
              onClick={() => { setSelectedCourse(course); fetchLessons(course.id); setActiveLesson(null); }}
            >
              {course.title_az}
            </button>
          ))}
        </div>
      )}

      <div className={styles.layout}>
        {/* Video Player */}
        <div className={styles.playerCol}>
          {activeLesson ? (
            <div className={styles.playerWrapper}>
              {activeLesson.youtube_url ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeId(activeLesson.youtube_url)}?rel=0`}
                  className={styles.videoFrame}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={activeLesson.title_az}
                />
              ) : (
                <div className={styles.noVideo}>
                  <Lock size={32} color="rgba(255,255,255,0.4)" />
                  <p>Video mövcud deyil</p>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.playerPlaceholder}>
              <Play size={48} color="rgba(255,255,255,0.3)" />
              <p>Dərs seçin</p>
            </div>
          )}

          {activeLesson && (
            <div className={styles.lessonInfo}>
              <h2 className={styles.lessonTitle}>{activeLesson.title_az}</h2>
              {activeLesson.pdf_url && (
                <a href={activeLesson.pdf_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  📄 PDF yüklə
                </a>
              )}
            </div>
          )}
        </div>

        {/* Lesson List */}
        <div className={styles.lessonList}>
          <h3 className={styles.listTitle}>
            {selectedCourse?.title_az} — Dərslər ({lessons.length})
          </h3>
          {lessons.map((lesson, idx) => (
            <button
              key={lesson.id}
              className={`${styles.lessonItem} ${activeLesson?.id === lesson.id ? styles.lessonActive : ''}`}
              onClick={() => setActiveLesson(lesson)}
            >
              <div className={styles.lessonNum}>{idx + 1}</div>
              <div className={styles.lessonMeta}>
                <div className={styles.lessonName}>{lesson.title_az}</div>
                {lesson.duration_minutes && (
                  <div className={styles.lessonDuration}>
                    <Clock size={12} /> {lesson.duration_minutes} dəq
                  </div>
                )}
              </div>
              <Play size={16} className={styles.playIcon} />
            </button>
          ))}

          {lessons.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
              Dərs hələ əlavə edilməyib
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
