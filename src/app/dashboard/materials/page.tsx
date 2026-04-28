'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Download, FileText, BookOpen } from 'lucide-react';

type CoursePDF = {
  id: string;
  title_az: string;
  pdf_url: string | null;
  order_index: number;
  course: { title_az: string };
};

type StandalonePDF = {
  id: string;
  title_az: string;
  description_az: string | null;
  file_url: string;
  is_public: boolean;
};

export default function MaterialsPage() {
  const [coursePDFs, setCoursePDFs] = useState<CoursePDF[]>([]);
  const [standalonePDFs, setStandalonePDFs] = useState<StandalonePDF[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // 1. Course PDFs — from user's purchased courses
      const { data: userCourses } = await supabase
        .from('user_courses')
        .select('course_id')
        .eq('user_id', session.user.id);

      if (userCourses?.length) {
        const courseIds = userCourses.map((uc: { course_id: string }) => uc.course_id);
        const { data } = await supabase
          .from('lessons')
          .select('id, title_az, pdf_url, order_index, courses(title_az)')
          .in('course_id', courseIds)
          .not('pdf_url', 'is', null)
          .eq('is_published', true)
          .order('order_index');
        setCoursePDFs((data as unknown as CoursePDF[]) || []);
      }

      // 2. Standalone PDFs — public OR user has permission
      const { data: userMaterials } = await supabase
        .from('user_materials')
        .select('material_id')
        .eq('user_id', session.user.id);

      const permittedIds = (userMaterials || []).map((um: { material_id: string }) => um.material_id);

      const { data: allMaterials } = await supabase
        .from('materials')
        .select('*')
        .order('created_at', { ascending: false });

      const visible = (allMaterials || []).filter(
        (m: StandalonePDF) => m.is_public || permittedIds.includes(m.id)
      );
      setStandalonePDFs(visible);

      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Materiallar yüklənir...</div>;

  const totalCount = coursePDFs.length + standalonePDFs.length;

  if (totalCount === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'hsl(var(--glass-bg))', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--glass-border))' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📄</div>
        <h2 style={{ marginBottom: '0.75rem', color: 'hsl(var(--foreground))' }}>Hələ material yoxdur</h2>
        <p style={{ color: 'hsl(var(--foreground)/0.6)' }}>Kurs alındıqdan və ya admin icazə verdikdən sonra materiallar burada görünəcək</p>
      </div>
    );
  }

  const PDFCard = ({ title, sub, url }: { title: string; sub: string; url: string }) => (
    <div style={{
      background: 'hsl(var(--glass-bg))', borderRadius: 'var(--radius)', padding: '1.25rem 1.5rem',
      display: 'flex', alignItems: 'center', gap: '1rem',
      border: '1px solid hsl(var(--glass-border))',
    }}>
      <div style={{ width: 44, height: 44, background: 'hsl(var(--primary)/0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <FileText size={20} color="hsl(var(--primary))" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'hsl(var(--foreground))' }}>{title}</div>
        <div style={{ fontSize: '0.75rem', color: 'hsl(var(--foreground)/0.5)', marginTop: '0.15rem' }}>{sub}</div>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary btn-sm"
        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}
      >
        <Download size={14} /> Yüklə
      </a>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Standalone PDFs */}
      {standalonePDFs.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={18} /> PDF Materiallar
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {standalonePDFs.map((m) => (
              <PDFCard key={m.id} title={m.title_az} sub={m.description_az || 'PDF Material'} url={m.file_url} />
            ))}
          </div>
        </div>
      )}

      {/* Course PDFs */}
      {coursePDFs.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} /> Kurs Materialları
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {coursePDFs.map((m) => (
              <PDFCard key={m.id} title={m.title_az} sub="PDF Material" url={m.pdf_url!} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
