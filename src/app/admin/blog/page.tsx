'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Edit2, X, Save, ExternalLink, Video, Image as ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

type BlogPost = {
  id: string;
  title_az: string;
  title_ru?: string;
  title_en?: string;
  content_az: string;
  content_ru?: string;
  content_en?: string;
  slug: string;
  image_url?: string;
  youtube_url?: string;
  category: string;
  created_at: string;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const { register, handleSubmit, reset, setValue, watch } = useForm<Partial<BlogPost>>();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (!error && data) setPosts(data);
    setLoading(false);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ə/g, 'e')
      .replace(/ı/g, 'i')
      .replace(/ç/g, 'c')
      .replace(/ş/g, 's')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ö/g, 'o')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const onSubmit = async (data: Partial<BlogPost>) => {
    const supabase = createClient();
    const slug = data.slug || generateSlug(data.title_az || '');
    
    const postData = {
      ...data,
      slug,
    };

    if (editingPost) {
      const { error } = await supabase.from('blog_posts').update(postData).eq('id', editingPost.id);
      if (error) alert(error.message);
      else {
        alert('Post yeniləndi!');
        setEditingPost(null);
        setShowForm(false);
        fetchPosts();
      }
    } else {
      const { error } = await supabase.from('blog_posts').insert([postData]);
      if (error) alert(error.message);
      else {
        alert('Post paylaşıldı!');
        setShowForm(false);
        reset();
        fetchPosts();
      }
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm('Bu postu silmək istədiyinizə əminsiniz?')) return;
    const supabase = createClient();
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) alert(error.message);
    else fetchPosts();
  };

  const startEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowForm(true);
    reset(post);
  };

  if (loading && posts.length === 0) return <div style={{ padding: '2rem' }}>Yüklənir...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Blog İdarəetməsi</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Məqalələr paylaşın və redaktə edin</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => { setShowForm(true); setEditingPost(null); reset({}); }}>
          <Plus size={16} /> Yeni Post
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'white', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-card)', border: '1px solid var(--color-border-light)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.1rem' }}>{editingPost ? 'Postu Redaktə Et' : 'Yeni Post Əlavə Et'}</h2>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}><X size={20} /></button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Başlıq (AZ) *</label>
                <input {...register('title_az', { required: true })} className="form-input" placeholder="Məs: Sağlam Qidalanma" />
              </div>
              <div className="form-group">
                <label className="form-label">Kateqoriya</label>
                <input {...register('category')} className="form-input" placeholder="Məs: Arıqlama" defaultValue="Sağlamlıq" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Məzmun (AZ) *</label>
              <textarea {...register('content_az', { required: true })} className="form-input form-textarea" rows={8} placeholder="Məqalə mətni..." />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label"><ImageIcon size={14} style={{ marginRight: '4px' }} /> Şəkil URL</label>
                <input {...register('image_url')} className="form-input" placeholder="https://..." />
              </div>
              <div className="form-group">
                <label className="form-label"><Video size={14} style={{ marginRight: '4px' }} /> YouTube Video URL</label>
                <input {...register('youtube_url')} className="form-input" placeholder="https://youtube.com/watch?v=..." />
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Digər Dillər (İstəyə bağlı)</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input {...register('title_ru')} className="form-input" placeholder="Заголовок (RU)" />
                  <input {...register('title_en')} className="form-input" placeholder="Title (EN)" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <textarea {...register('content_ru')} className="form-input form-textarea" rows={4} placeholder="Текст (RU)" />
                  <textarea {...register('content_en')} className="form-input form-textarea" rows={4} placeholder="Content (EN)" />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Ləğv et</button>
              <button type="submit" className="btn btn-primary"><Save size={18} /> {editingPost ? 'Yenilə' : 'Paylaş'}</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gap: '1rem' }}>
        {posts.map((post) => (
          <div key={post.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              {post.image_url ? (
                <img src={post.image_url} alt="" style={{ width: 60, height: 60, borderRadius: 12, objectFit: 'cover' }} />
              ) : (
                <div style={{ width: 60, height: 60, borderRadius: 12, background: 'var(--color-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📝</div>
              )}
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{post.title_az}</h3>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  <span>📅 {new Date(post.created_at).toLocaleDateString('az-AZ')}</span>
                  <span>📁 {post.category}</span>
                  {post.youtube_url && <span style={{ color: '#EF4444' }}>🔴 Video var</span>}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a href={`/az/blog/${post.slug}`} target="_blank" className="btn btn-sm" style={{ background: '#F1F5F9' }} title="Bax">
                <ExternalLink size={16} />
              </a>
              <button className="btn btn-sm" style={{ background: '#EDE9FE', color: '#6D28D9' }} onClick={() => startEdit(post)}>
                <Edit2 size={16} />
              </button>
              <button className="btn btn-sm" style={{ background: '#FEE2E2', color: '#991B1B' }} onClick={() => deletePost(post.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '4rem', background: '#F8FAFC', borderRadius: 'var(--radius-2xl)', border: '2px dashed var(--color-border-light)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <p style={{ color: 'var(--color-text-secondary)' }}>Hələ heç bir post paylaşılmayıb.</p>
          </div>
        )}
      </div>
    </div>
  );
}
