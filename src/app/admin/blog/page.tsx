'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useForm, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { 
  Plus, X, Save, Edit2, Trash2, ExternalLink, 
  Image as ImageIcon, Video, Loader2, Upload 
} from 'lucide-react';
import styles from './AdminBlog.module.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div style={{ height: '250px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
});
import 'react-quill-new/dist/quill.snow.css';

interface BlogPost {
  id: string;
  title_az: string;
  title_ru?: string;
  title_en?: string;
  content_az: string;
  content_ru?: string;
  content_en?: string;
  image_url: string;
  youtube_url?: string;
  category: string;
  slug: string;
  created_at: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset, setValue, control } = useForm<Partial<BlogPost>>();

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'clean']
    ],
  }), []);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file);

    if (error) {
      alert('Şəkil yüklənərkən xəta: ' + error.message);
    } else {
      const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(filePath);
      setValue('image_url', publicUrl);
    }
    setUploading(false);
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
      <div className={styles.header}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Blog İdarəetməsi</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Məqalələr paylaşın və redaktə edin</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => { 
          setEditingPost(null);
          reset({
            title_az: '', title_ru: '', title_en: '',
            content_az: '', content_ru: '', content_en: '',
            image_url: '', youtube_url: '', category: 'Sağlamlıq',
            slug: ''
          });
          setShowForm(true); 
        }}>
          <Plus size={16} /> Yeni Post
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'white', borderRadius: 'var(--radius-2xl)', padding: 'clamp(1rem, 5vw, 2rem)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--color-border-light)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.1rem' }}>{editingPost ? 'Postu Redaktə Et' : 'Yeni Post Əlavə Et'}</h2>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}><X size={20} /></button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: '1.25rem' }}>
            <style>{`
              .ql-container {
                min-height: 250px;
                font-family: inherit;
                font-size: 0.95rem;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
              }
              .ql-toolbar {
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                background: #f8fafc;
              }
              .ql-editor {
                min-height: 250px;
              }
            `}</style>

            <div className={styles.formGrid}>
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
              <Controller
                name="content_az"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <ReactQuill 
                    theme="snow" 
                    value={field.value || ''} 
                    onChange={field.onChange}
                    modules={quillModules}
                  />
                )}
              />
            </div>

            <div className={styles.formGrid}>
              <div className="form-group">
                <label className="form-label"><ImageIcon size={14} style={{ marginRight: '4px' }} /> Şəkil (Yüklə)</label>
                <div className={styles.uploadGroup}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                  />
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    <span style={{ marginLeft: '4px' }}>{uploading ? 'Yüklənir...' : 'Şəkil seç'}</span>
                  </button>
                  <input {...register('image_url')} className="form-input" style={{ flex: 2 }} placeholder="Şəkil URL" readOnly />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label"><Video size={14} style={{ marginRight: '4px' }} /> YouTube Video URL</label>
                <input {...register('youtube_url')} className="form-input" placeholder="https://youtube.com/watch?v=..." />
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Digər Dillər (İstəyə bağlı)</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div className={styles.formGrid}>
                  <div className="form-group">
                    <label className="form-label">Başlıq (RU)</label>
                    <input {...register('title_ru')} className="form-input" placeholder="Заголовок (RU)" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Başlıq (EN)</label>
                    <input {...register('title_en')} className="form-input" placeholder="Title (EN)" />
                  </div>
                </div>
                
                <div className={styles.formGrid}>
                  <div className="form-group">
                    <label className="form-label">Məzmun (RU)</label>
                    <Controller
                      name="content_ru"
                      control={control}
                      render={({ field }) => (
                        <ReactQuill 
                          theme="snow" 
                          value={field.value || ''} 
                          onChange={field.onChange}
                          modules={quillModules}
                        />
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Məzmun (EN)</label>
                    <Controller
                      name="content_en"
                      control={control}
                      render={({ field }) => (
                        <ReactQuill 
                          theme="snow" 
                          value={field.value || ''} 
                          onChange={field.onChange}
                          modules={quillModules}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowForm(false)}>Ləğv et</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}><Save size={18} /> {editingPost ? 'Yenilə' : 'Paylaş'}</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gap: '1rem' }}>
        {posts.map((post) => (
          <div key={post.id} className={`${styles.postItem} card`}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flex: 1 }}>
              {post.image_url ? (
                <img src={post.image_url} alt="" style={{ width: 60, height: 60, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
              ) : (
                <div style={{ width: 60, height: 60, borderRadius: 12, background: 'var(--color-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>📝</div>
              )}
              <div style={{ minWidth: 0 }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title_az}</h3>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', flexWrap: 'wrap' }}>
                  <span>📅 {new Date(post.created_at).toLocaleDateString('az-AZ')}</span>
                  <span>📁 {post.category}</span>
                  {post.youtube_url && <span style={{ color: '#EF4444' }}>🔴 Video</span>}
                </div>
              </div>
            </div>
            <div className={styles.postActions} style={{ display: 'flex', gap: '0.5rem' }}>
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
      </div>
    </div>
  );
}
