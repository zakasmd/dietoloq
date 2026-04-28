'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from '@/lib/supabase/client';
import { Plus, X, ChevronDown, ChevronUp, Trash2, Users as UsersIcon, UserMinus } from 'lucide-react';

type Course = { id: string; title_az: string; description_az: string; price: number | null; is_published: boolean; is_public: boolean };
type Lesson = { id: string; course_id: string; title_az: string; youtube_url: string | null; pdf_url: string | null; order_index: number; is_published: boolean };
type CourseForm = { title_az: string; description_az: string; price: string; is_public: boolean };
type LessonForm = { title_az: string; youtube_url: string; pdf_url: string; order_index: string; duration_minutes: string };

export default function CoursesAdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Record<string, Lesson[]>>({});
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [addLessonFor, setAddLessonFor] = useState<string | null>(null);
  const [showUsersFor, setShowUsersFor] = useState<{ id: string; title: string } | null>(null);
  const [allowedUsers, setAllowedUsers] = useState<{ user_id: string; profiles: { full_name: string | null; email: string } }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);

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
        .update({ 
          title_az: data.title_az, 
          description_az: data.description_az, 
          price: data.price ? parseFloat(data.price) : null, 
          is_public: !!data.is_public 
        })
        .eq('id', editCourseId);
      if (error) { setFormError(error.message); return; }
    } else {
      const { data: newCourse, error } = await supabase
        .from('courses')
        .insert({ 
          title_az: data.title_az, 
          description_az: data.description_az, 
          price: data.price ? parseFloat(data.price) : null, 
          is_public: !!data.is_public, 
          is_published: true 
        })
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

  const deleteCourse = async (courseId: string) => {
    if (!confirm('Bu kursu silmək istədiyinizə əminsiniz?')) return;
    const supabase = createClient();
    const { error } = await supabase.from('courses').delete().eq('id', courseId);
    if (error) { alert('Xəta: ' + error.message); return; }
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  const deleteLesson = async (lessonId: string, courseId: string) => {
    if (!confirm('Bu dərsi silmək istədiyinizə əminsiniz?')) return;
    const supabase = createClient();
    const { error } = await supabase.from('lessons').delete().eq('id', lessonId);
    if (error) { alert('Xəta: ' + error.message); return; }
    setLessons((prev) => ({ ...prev, [courseId]: prev[courseId].filter((l) => l.id !== lessonId) }));
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

  const fetchAllowedUsers = async (courseId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('user_courses')
      .select('user_id, profiles(full_name, email)')
      .eq('course_id', courseId);
    
    if (error) { 
      alert('Baza xətası (Kurs giriş siyahısı): ' + error.message);
      console.error(error); 
      return; 
    }
    setAllowedUsers(data as any || []);
  };

  const revokeAccess = async (userId: string, courseId: string) => {
    if (!confirm('Bu istifadəçinin girişini ləğv etmək istədiyinizə əminsiniz?')) return;
    const supabase = createClient();
    const { error } = await supabase.from('user_courses').delete().eq('user_id', userId).eq('course_id', courseId);
    if (error) { alert('Xəta: ' + error.message); return; }
    setAllowedUsers((prev) => prev.filter((u) => u.user_id !== userId));
  };

  const toggleSelect = (id: string) => {
    setSelectedCourseIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedCourseIds.length === courses.length) setSelectedCourseIds([]);
    else setSelectedCourseIds(courses.map(c => c.id));
  };

  const deleteSelectedCourses = async () => {
    if (!confirm(`${selectedCourseIds.length} kursu silmək istədiyinizə əminsiniz?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from('courses').delete().in('id', selectedCourseIds);
    if (error) { alert('Xəta: ' + error.message); return; }
    setCourses(prev => prev.filter(c => !selectedCourseIds.includes(c.id)));
    setSelectedCourseIds([]);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Yüklənir...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Kurslar İdarəetməsi</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Kursları və dərsləri idarə edin</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {selectedCourseIds.length > 0 && (
            <button className="btn btn-sm" style={{ background: '#FEE2E2', color: '#991B1B', border: 'none' }} onClick={deleteSelectedCourses}>
              <Trash2 size={16} /> Seçilənləri Sil ({selectedCourseIds.length})
            </button>
          )}
          <button className="btn btn-primary" onClick={() => setShowCourseForm(true)}>
            <Plus size={16} /> Yeni Kurs
          </button>
        </div>
      </div>

      {courses.length > 0 && (
        <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" checked={selectedCourseIds.length === courses.length} onChange={toggleSelectAll} style={{ width: 18, height: 18, cursor: 'pointer' }} />
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Hamısını seç</span>
        </div>
      )}

      {/* New Course Form (at the top) */}
      {showCourseForm && !editCourseId && (
        <div style={{ background: 'white', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-card)', border: '1.5px solid var(--color-primary-200)' }}>
          <h3 style={{ marginBottom: '1.25rem' }}>Yeni Kurs Əlavə Et</h3>
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
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" id="is_public_new" {...courseForm.register('is_public')} style={{ width: 18, height: 18, cursor: 'pointer' }} />
              <label htmlFor="is_public_new" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>Hərkəsə Açıq (qeydiyyatlı bütün istifadəçilər görür)</label>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit" className="btn btn-primary">Kurs yarat</button>
              <button type="button" className="btn btn-outline" onClick={() => { setShowCourseForm(false); setEditCourseId(null); courseForm.reset(); }}>Ləğv et</button>
            </div>
          </form>
        </div>
      )}

      {/* Course List */}
      {courses.map((course) => (
        <div key={course.id}>
          {editCourseId === course.id ? (
            /* Inline Edit Form */
            <div style={{ background: 'white', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-card)', border: '1.5px solid var(--color-primary-200)', marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '1.25rem' }}>Kursu Redaktə Et</h3>
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
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" id={`is_public_edit_${course.id}`} {...courseForm.register('is_public')} style={{ width: 18, height: 18, cursor: 'pointer' }} />
                  <label htmlFor={`is_public_edit_${course.id}`} className="form-label" style={{ margin: 0, cursor: 'pointer' }}>Hərkəsə Açıq (qeydiyyatlı bütün istifadəçilər görür)</label>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="submit" className="btn btn-primary">Yadda Saxla</button>
                  <button type="button" className="btn btn-outline" onClick={() => { setEditCourseId(null); courseForm.reset(); }}>Ləğv et</button>
                </div>
              </form>
            </div>
          ) : (
            /* Course Card */
            <div style={{ background: 'white', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-card)', border: selectedCourseIds.includes(course.id) ? '2px solid var(--color-primary)' : '1px solid var(--color-border-light)', overflow: 'hidden', marginBottom: '1rem', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '0.75rem', top: '1.25rem' }}>
                <input type="checkbox" checked={selectedCourseIds.includes(course.id)} onChange={() => toggleSelect(course.id)} style={{ width: 18, height: 18, cursor: 'pointer' }} />
              </div>
              <div style={{ padding: '1.25rem 1.5rem 1.25rem 3rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem' }}>{course.title_az}</h3>
                    {course.is_public && <span style={{ fontSize: '0.65rem', background: '#DCFCE7', color: '#166534', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>AÇIQ</span>}
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{course.description_az?.slice(0, 80)}...</p>
                  {course.price && <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary)', marginTop: '0.25rem' }}>{course.price} AZN</div>}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <button className="btn btn-outline btn-sm" onClick={() => { 
                    setEditCourseId(course.id);
                    setShowCourseForm(true); // Ensure form state is true but editId is what matters
                    setAddLessonFor(null); // Close lesson form if open
                    courseForm.reset({
                      title_az: course.title_az,
                      description_az: course.description_az || '',
                      price: course.price?.toString() || '',
                      is_public: course.is_public
                    });
                  }}>
                    Redaktə
                  </button>
                  <button className="btn btn-outline btn-sm" onClick={() => togglePublish(course.id, course.is_published)}>
                    {course.is_published ? 'Gizlə' : 'Aktiv et'}
                  </button>
                  <button className="btn btn-outline btn-sm" onClick={() => { setShowUsersFor({ id: course.id, title: course.title_az }); fetchAllowedUsers(course.id); }} title="Girişi olan istifadəçilər">
                    <UsersIcon size={14} />
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => { setAddLessonFor(course.id); setEditCourseId(null); }}>
                    <Plus size={14} /> Dərs
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{ background: '#FEE2E2', color: '#991B1B', border: 'none', cursor: 'pointer' }}
                    onClick={() => deleteCourse(course.id)}
                  >
                    <Trash2 size={14} />
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
                      <button
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: '0.25rem', flexShrink: 0 }}
                        onClick={() => deleteLesson(lesson.id, course.id)}
                        title="Dərsi sil"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                  {(!lessons[course.id] || !lessons[course.id].length) && (
                    <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Hələ dərs yoxdur</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Allowed Users Modal */}
      {showUsersFor && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-2xl)', padding: '2rem', width: '100%', maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Giriş icazəsi olanlar</h3>
              <button onClick={() => setShowUsersFor(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1rem' }}>Kurs: <strong>{showUsersFor.title}</strong></p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {allowedUsers.map((u) => (
                <div key={u.user_id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{(u as any).profiles?.full_name || 'Adsız'}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{(u as any).profiles?.email}</div>
                  </div>
                  <button 
                    onClick={() => revokeAccess(u.user_id, showUsersFor.id)}
                    style={{ background: '#FEE2E2', color: '#991B1B', border: 'none', padding: '0.4rem', borderRadius: '8px', cursor: 'pointer' }}
                    title="Girişi ləğv et"
                  >
                    <UserMinus size={16} />
                  </button>
                </div>
              ))}
              {allowedUsers.length === 0 && <div style={{ textAlign: 'center', padding: '2rem', color: '#94A3B8', fontSize: '0.875rem' }}>Bu kursa hələ heç kimə giriş icazəsi verilməyib.</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
