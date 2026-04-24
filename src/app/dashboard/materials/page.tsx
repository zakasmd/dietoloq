'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Download, FileText, BookOpen } from 'lucide-react';

type Material = {
  id: string;
  title_az: string;
  pdf_url: string | null;
  order_index: number;
  course: { title_az: string };
};

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: userCourses } = await supabase
        .from('user_courses')
        .select('course_id')
        .eq('user_id', session.user.id);

      if (!userCourses?.length) { setLoading(false); return; }

      const courseIds = userCourses.map((uc: { course_id: string }) => uc.course_id);

      const { data } = await supabase
        .from('lessons')
        .select('id, title_az, pdf_url, order_index, courses(title_az)')
        .in('course_id', courseIds)
        .not('pdf_url', 'is', null)
        .eq('is_published', true)
        .order('order_index');

      setMaterials((data as unknown as Material[]) || []);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Materiallar yüklənir...</div>;

  if (!materials.length) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'hsl(var(--glass-bg))', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--glass-border))' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📄</div>
        <h2 style={{ marginBottom: '0.75rem', color: 'hsl(var(--foreground))' }}>Hələ material yoxdur</h2>
        <p style={{ color: 'hsl(var(--foreground)/0.6)' }}>Kurs alındıqdan sonra materiallar burada görünəcək</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem' }}>PDF Materiallar</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Kurs materiallarını yükləyin</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {materials.map((m) => (
          <div
            key={m.id}
            style={{
              background: 'hsl(var(--glass-bg))', borderRadius: 'var(--radius)', padding: '1.25rem 1.5rem',
              display: 'flex', alignItems: 'center', gap: '1rem',
              border: '1px solid hsl(var(--glass-border))',
            }}
          >
            <div style={{ width: 44, height: 44, background: 'hsl(var(--primary)/0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FileText size={20} color="hsl(var(--primary))" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'hsl(var(--foreground))' }}>{m.title_az}</div>
              <div style={{ fontSize: '0.75rem', color: 'hsl(var(--foreground)/0.5)', marginTop: '0.15rem' }}>PDF Material</div>
            </div>
            <a
              href={m.pdf_url!}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}
            >
              <Download size={14} /> Yüklə
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
