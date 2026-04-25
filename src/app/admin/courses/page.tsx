'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from '@/lib/supabase/client';
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react';

type Course = { id: string; title_az: string; description_az: string; price: number | null; is_published: boolean };
type Lesson = { id: string; course_id: string; title_az: string; youtube_url: string | null; pdf_url: string | null; order_index: number; is_published: boolean };
type CourseForm = { title_az: string; description_az: string; price: string };
type LessonForm = { title_az: string; youtube_url: string; pdf_url: string; order_index: string; duration_minutes: string };

export default function CoursesAdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Record<string, Lesson[]>>({});
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [addLessonFor, setAddLessonFor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const courseForm = useForm<CourseForm>();
  const lessonForm = useForm<LessonForm>();

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    const supabase = createClient();
    const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
    setCourses(data || []);
    setLoading(false);
  };

  const fetchLessons = async (courseId: string) => {
    const supabase = createClient();
    const { data } = await supabase.from('lessons').select('*').eq('course_id', courseId).order('order_index');
    setLessons((prev) => ({ ...prev, [courseId]: data || [] }));
  };

  const toggleExpand = (courseId: string) => {
    if (expandedCourse === courseId) { setExpandedCourse(null); return; }
    setExpandedCourse(courseId);
    fetchLessons(courseId);
  };

  const [formError, setFormError] = useState<string | null>(null);
  const [editCourseId, setEditCourseId] = useState<string | null>(null);

  const createOrUpdateCourse = async (data: CourseForm) => {
    setFormError(null);
    const supabase = createClient();
    
    if (editCourseId) {
      const { error } = await supabase
        .from('courses')
        .update({ title_az: data.title_az, description_az: data.description_az, price: data.price ? parseFloat(data.price) : null })
        .eq('id', editCourseId);
      if (error) { setFormError(error.message); return; }
    } else {
      const { data: newCourse, error } = await supabase
        .from('courses')
        .insert({ title_az: data.title_az, description_az: data.description_az, price: data.price ? parseFloat(data.price) : null })
        .select()
        .single();
      if (error) { setFormError(error.message); return; }
      if (newCourse) {
        setExpandedCourse(newCourse.id);
        setLessons((prev) => ({ ...prev, [newCourse.id]: [] }));
      }
    }

    setShowCourseForm(false);
    setEditCourseId(null);
    courseForm.reset();
    await fetchCourses();
  };

  const togglePublish = async (courseId: string, current: boolean) => {
    const supabase = createClient();
    const { error } = await supabase.from('courses').update({ is_published: !current }).eq('id', courseId);
    if (error) {
      alert('Xəta baş verdi: ' + error.message + '\nBöyük ehtimalla bazada icazə (RLS) problemi var.');
      return;
    }
    setCourses((prev) => prev.map((c) => c.id === courseId ? { ...c, is_published: !current } : c));
  };

  const addLesson = async (data: LessonForm) => {
    if (!addLessonFor) return;
    setFormError(null);
    const supabase = createClient();
    const { error } = await supabase.from('lessons').insert({
      course_id: addLessonFor, title_az: data.title_az,
      youtube_url: data.youtube_url || null, pdf_url: data.pdf_url || null,
      order_index: parseInt(data.order_index) || 1,
      duration_minutes: parseInt(data.duration_minutes) || null,
      is_published: true,
    });
    
    if (error) {
      setFormError(error.message);
      return;
    }
    
    const courseId = addLessonFor;
    setAddLessonFor(null);
    lessonForm.reset();
    // Clear cache and re-fetch fresh lessons
    setLessons((prev) => { const u = { ...prev }; delete u[courseId]; return u; });
    const supabase2 = createClient();
    const { data: fresh } = await supabase2
      .from('lessons').select('*').eq('course_id', courseId).order('order_index');
    setLessons((prev) => ({ ...prev, [courseId]: fresh || [] }));
    setExpandedCourse(courseId);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Yüklənir...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Kurslar İdarəetməsi</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Kursları və dərsləri idarə edin</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCourseForm(true)}>
          <Plus size={16} /> Yeni Kurs
        </button>
      </div>

      {/* New/Edit Course Form */}
      {showCourseForm && (
        <div style={{ background: 'white', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-card)', border: '1.5px solid var(--color-primary-200)' }}>
          <h3 style={{ marginBottom: '1.25rem' }}>{editCourseId ? 'Kursu Redaktə Et' : 'Yeni Kurs Əlavə Et'}</h3>
          {formError && <div style={{ padding: '1rem', background: '#FEE2E2', color: '#991B1B', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>{formError}</div>}
          <form onSubmit={courseForm.handleSubmit(createOrUpdateCourse)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Kursun adı (AZ) *</label>
              <input {...courseForm.register('title_az', { required: true })} className="form-input" placeholder="Kursun adı" />
            </div>
            <div className="form-group">
              <label className="form-label">Açıqlama (AZ)</label>
              <textarea {...courseForm.register('description_az')} className="form-input form-textarea" placeholder="Kursun açıqlaması" />
            </div>
            <div className="form-group">
              <label className="form-label">Qiymət (AZN)</label>
              <input {...courseForm.register('price')} className="form-input" type="number" placeholder="150" />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit" className="btn btn-primary">{editCourseId ? 'Yadda Saxla' : 'Kurs yarat'}</button>
              <button type="button" className="btn btn-outline" onClick={() => { setShowCourseForm(false); setEditCourseId(null); courseForm.reset(); }}>Ləğv et</button>
            </div>
          </form>
        </div>
      )}

      {/* Course List */}
      {courses.map((course) => (
        <div key={course.id} style={{ background: 'white', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--color-border-light)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{course.title_az}</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)' }}>{course.description_az?.slice(0, 80)}...</p>
              {course.price && <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary)', marginTop: '0.25rem' }}>{course.price} AZN</div>}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button className="btn btn-outline btn-sm" onClick={() => togglePublish(course.id, course.is_published)}>
                {course.is_published ? 'Gizlə' : 'Aktiv et'}
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setAddLessonFor(course.id)}>
                <Plus size={14} /> Dərs
              </button>
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '0.25rem' }}
                onClick={() => toggleExpand(course.id)}
              >
                {expandedCourse === course.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>
          </div>

          {/* Lesson Add Form */}
          {addLessonFor === course.id && (
            <div style={{ padding: '1.25rem 1.5rem', background: 'var(--color-primary-50)', borderTop: '1px solid var(--color-primary-200)' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Yeni Dərs Əlavə Et</h4>
              {formError && <div style={{ padding: '1rem', background: '#FEE2E2', color: '#991B1B', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>{formError}</div>}
              <form onSubmit={lessonForm.handleSubmit(addLesson)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Dərsin adı *</label>
                  <input {...lessonForm.register('title_az', { required: true })} className="form-input" placeholder="Dərs 1: Giriş" />
                </div>
                <div className="form-group">
                  <label className="form-label">YouTube URL</label>
                  <input {...lessonForm.register('youtube_url')} className="form-input" placeholder="https://youtube.com/watch?v=..." />
                </div>
                <div className="form-group">
                  <label className="form-label">PDF URL (opsional)</label>
                  <input {...lessonForm.register('pdf_url')} className="form-input" placeholder="https://..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Sıra №</label>
                  <input {...lessonForm.register('order_index')} className="form-input" type="number" defaultValue="1" />
                </div>
                <div className="form-group">
                  <label className="form-label">Müddət (dəqiqə)</label>
                  <input {...lessonForm.register('duration_minutes')} className="form-input" type="number" placeholder="30" />
                </div>
                <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '0.75rem' }}>
                  <button type="submit" className="btn btn-primary btn-sm">Dərs yarat</button>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setAddLessonFor(null)}>Ləğv et</button>
                </div>
              </form>
            </div>
          )}

          {/* Lessons */}
          {expandedCourse === course.id && (
            <div style={{ borderTop: '1px solid var(--color-border-light)' }}>
              {(lessons[course.id] || []).map((lesson, i) => (
                <div key={lesson.id} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1.5rem', borderBottom: i < (lessons[course.id].length - 1) ? '1px solid var(--color-border-light)' : 'none', background: i % 2 === 0 ? 'white' : 'var(--color-bg)' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--color-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', flexShrink: 0 }}>
                    {lesson.order_index}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{lesson.title_az}</div>
                    {lesson.youtube_url && <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>▶ {lesson.youtube_url.slice(0, 50)}...</div>}
                  </div>
                  {lesson.pdf_url && <span style={{ fontSize: '0.72rem', color: '#059669', background: '#DCFCE7', padding: '0.2rem 0.5rem', borderRadius: 6 }}>PDF</span>}
                </div>
              ))}
              {(!lessons[course.id] || !lessons[course.id].length) && (
                <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Hələ dərs yoxdur</div>
              )}
            </div>
          )}
        </div>
      ))}

      {!courses.length && (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'white', borderRadius: 'var(--radius-2xl)', color: 'var(--color-text-muted)' }}>
          Hələ kurs yoxdur. Yeni kurs yaradın.
        </div>
      )}
    </div>
  );
}
