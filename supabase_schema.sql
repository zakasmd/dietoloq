-- =============================================
-- DIETOLOQ WEBSITE — SUPABASE SQL SXEM
-- Bu skripti Supabase SQL Editorda RUN edin
-- =============================================

-- 1. Profiles (auth.users ilə avtomatik linked)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Konsultasiya müraciətləri
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  age INTEGER,
  goal TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'done')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Kurslar
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_az TEXT NOT NULL,
  title_ru TEXT,
  title_en TEXT,
  description_az TEXT,
  description_ru TEXT,
  description_en TEXT,
  thumbnail_url TEXT,
  price DECIMAL(10,2),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Kurs dərslər
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title_az TEXT NOT NULL,
  title_ru TEXT,
  title_en TEXT,
  youtube_url TEXT,
  pdf_url TEXT,
  order_index INTEGER DEFAULT 1,
  duration_minutes INTEGER,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. User kurs girişi
CREATE TABLE IF NOT EXISTS user_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);

-- 6. Müştəri rəyləri
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  text_az TEXT,
  text_ru TEXT,
  text_en TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  avatar_url TEXT,
  result TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Before/After nəticələr
CREATE TABLE IF NOT EXISTS results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT,
  before_weight DECIMAL(5,2),
  after_weight DECIMAL(5,2),
  weight_lost DECIMAL(5,2),
  duration_weeks INTEGER,
  goal TEXT,
  before_url TEXT,
  after_url TEXT,
  is_blurred BOOLEAN DEFAULT true,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Blog yazıları
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_az TEXT,
  title_ru TEXT,
  title_en TEXT,
  content_az TEXT,
  content_ru TEXT,
  content_en TEXT,
  excerpt_az TEXT,
  cover_url TEXT,
  category TEXT,
  youtube_url TEXT,
  read_time_minutes INTEGER,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS) QAYDALARI
-- =============================================

-- Profiles RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admin can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Enable insert for authenticated users"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Consultations RLS
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert consultation"
  ON consultations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admin can view consultations"
  ON consultations FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Only admin can update consultations"
  ON consultations FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Courses RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published courses are public"
  ON courses FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admin can manage courses"
  ON courses FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Lessons RLS
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published lessons viewable by enrolled users"
  ON lessons FOR SELECT
  USING (
    is_published = true AND
    EXISTS (
      SELECT 1 FROM user_courses
      WHERE user_courses.user_id = auth.uid()
      AND user_courses.course_id = lessons.course_id
    )
  );

CREATE POLICY "Admin can manage lessons"
  ON lessons FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- User Courses RLS
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own course access"
  ON user_courses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage user courses"
  ON user_courses FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Testimonials RLS (public read)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published testimonials are public"
  ON testimonials FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admin can manage testimonials"
  ON testimonials FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Results RLS (public read)
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published results are public"
  ON results FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admin can manage results"
  ON results FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Blog Posts RLS (public read)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are public"
  ON blog_posts FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admin can manage blog"
  ON blog_posts FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =============================================
-- TRIGGER: Yeni user qeydiyyat edəndə profile yarat
-- =============================================
-- =============================================
-- TRIGGER: Yeni user qeydiyyat edəndə profile yarat
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  profile_name TEXT;
BEGIN
  -- Extract full_name from metadata if exists
  profile_name := COALESCE(new.raw_user_meta_data->>'full_name', '');
  
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, profile_name, 'user')
  ON CONFLICT (id) DO UPDATE
  SET full_name = EXCLUDED.full_name,
      updated_at = NOW();
      
  RETURN new;
EXCEPTION WHEN OTHERS THEN
  -- Log error or just return new to not block auth
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =============================================
-- DEMO DATA (İstəsəniz silin)
-- =============================================
INSERT INTO testimonials (name, text_az, rating, result)
VALUES
  ('Aynur M.', 'Leyla xanımın planı ilə 2 ayda 8 kq arıqladım. Heç vaxt aclıq hiss etmədim!', 5, '-8 kq / 2 ay'),
  ('Sevinc H.', 'İdmansız arıqlama metodunu başlanğıcda inanmamışdım, amma 6 həftədə 5 kq itirdim.', 5, '-5 kq / 6 həftə'),
  ('Rəna Ə.', 'Hamiləlik dövründə çox narahat idim. Leyla xanım mənə xüsusi plan hazırladı.', 5, 'Hamiləlik planı')
ON CONFLICT DO NOTHING;

-- =============================================
-- ADMIN ETMƏK ÜÇÜN (ilk qeydiyyatdan sonra):
-- Öz e-mailinizin ID-sini tapıb aşağıdakı komandanı işlədin:
-- UPDATE profiles SET role = 'admin' WHERE id = 'YOUR-USER-UUID-HERE';
-- =============================================
