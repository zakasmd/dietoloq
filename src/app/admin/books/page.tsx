'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Upload, Trash2, FileText, Globe, Lock } from 'lucide-react';

type Material = {
  id: string;
  title_az: string;
  description_az: string | null;
  file_url: string;
  is_public: boolean;
  created_at: string;
};

export default function BooksAdminPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchMaterials(); }, []);

  const fetchMaterials = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) setError(error.message);
    setMaterials(data || []);
    setLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const file = fileRef.current?.files?.[0];
    if (!file) { setError('PDF fayl seçin'); return; }
    if (!title.trim()) { setError('Başlıq daxil edin'); return; }
    if (!file.name.endsWith('.pdf')) { setError('Yalnız PDF fayllar qəbul olunur'); return; }

    setUploading(true);
    const supabase = createClient();

    // Upload to Supabase Storage
    const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('materials')
      .upload(fileName, file, { contentType: 'application/pdf', upsert: false });

    if (uploadError) { setError('Yüklənmə xətası: ' + uploadError.message); setUploading(false); return; }

    // Get public URL
    const { data: urlData } = supabase.storage.from('materials').getPublicUrl(uploadData.path);

    // Insert into DB
    const { error: dbError } = await supabase.from('materials').insert({
      title_az: title.trim(),
      description_az: description.trim() || null,
      file_url: urlData.publicUrl,
      is_public: isPublic,
    });

    if (dbError) {
      setError('Baza xətası: ' + dbError.message);
      setUploading(false);
      return;
    }

    setSuccess('PDF uğurla yükləndi!');
    setTitle('');
    setDescription('');
    setIsPublic(false);
    if (fileRef.current) fileRef.current.value = '';
    setUploading(false);
    fetchMaterials();
  };

  const deleteMaterial = async (id: string, fileUrl: string) => {
    if (!confirm('Bu PDF-i silmək istədiyinizə əminsiniz?')) return;
    const supabase = createClient();

    // Extract file path from URL
    const pathParts = fileUrl.split('/materials/');
    if (pathParts[1]) {
      await supabase.storage.from('materials').remove([pathParts[1]]);
    }

    const { error } = await supabase.from('materials').delete().eq('id', id);
    if (error) { alert('Xəta: ' + error.message); return; }
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  const togglePublic = async (id: string, current: boolean) => {
    const supabase = createClient();
    const { error } = await supabase.from('materials').update({ is_public: !current }).eq('id', id);
    if (error) { alert('Xəta: ' + error.message); return; }
    setMaterials((prev) => prev.map((m) => m.id === id ? { ...m, is_public: !current } : m));
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Yüklənir...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>PDF Kitablar</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>PDF materiallar yükləyin və idarə edin</p>
      </div>

      {/* Upload Form */}
      <div style={{ background: 'white', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-card)', border: '1.5px solid var(--color-primary-200)' }}>
        <h3 style={{ marginBottom: '1.25rem' }}>Yeni PDF Yüklə</h3>
        {error && <div style={{ padding: '0.875rem', background: '#FEE2E2', color: '#991B1B', borderRadius: 8, marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
        {success && <div style={{ padding: '0.875rem', background: '#DCFCE7', color: '#166534', borderRadius: 8, marginBottom: '1rem', fontSize: '0.9rem' }}>{success}</div>}
        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Başlıq *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" placeholder="PDF kitabın adı" required />
          </div>
          <div className="form-group">
            <label className="form-label">Açıqlama</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-input form-textarea" placeholder="Qısa açıqlama (opsional)" />
          </div>
          <div className="form-group">
            <label className="form-label">PDF Fayl *</label>
            <input ref={fileRef} type="file" accept=".pdf" className="form-input" style={{ cursor: 'pointer' }} required />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="is_public_books"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
            <label htmlFor="is_public_books" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>
              Hərkəsə Açıq — qeydiyyatlı bütün istifadəçilər görür
            </label>
          </div>
          <button type="submit" className="btn btn-primary" disabled={uploading} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Upload size={16} />
            {uploading ? 'Yüklənir...' : 'PDF Yüklə'}
          </button>
        </form>
      </div>

      {/* Materials List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {materials.map((m) => (
          <div key={m.id} style={{ background: 'white', borderRadius: 'var(--radius-2xl)', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: 'var(--shadow-card)', border: '1px solid var(--color-border-light)', flexWrap: 'wrap' }}>
            <div style={{ width: 44, height: 44, background: m.is_public ? '#DCFCE7' : '#F1F5F9', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FileText size={20} color={m.is_public ? '#059669' : '#64748B'} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{m.title_az}</div>
              {m.description_az && <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>{m.description_az}</div>}
              <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }}>
                {m.is_public
                  ? <><Globe size={12} color="#059669" /> <span style={{ color: '#059669' }}>Hərkəsə Açıq</span></>
                  : <><Lock size={12} color="#64748B" /> <span style={{ color: '#64748B' }}>Məhdud Giriş</span></>
                }
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              <a href={m.file_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Bax</a>
              <button className="btn btn-outline btn-sm" onClick={() => togglePublic(m.id, m.is_public)}>
                {m.is_public ? 'Məhdudlaşdır' : 'Açıq Et'}
              </button>
              <button
                className="btn btn-sm"
                style={{ background: '#FEE2E2', color: '#991B1B', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                onClick={() => deleteMaterial(m.id, m.file_url)}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {!materials.length && (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: 'var(--radius-2xl)', color: 'var(--color-text-muted)' }}>
            Hələ PDF yüklənməyib.
          </div>
        )}
      </div>
    </div>
  );
}
