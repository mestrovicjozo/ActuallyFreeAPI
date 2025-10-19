import { createClient } from '@supabase/supabase-js';

// Use placeholder values during build if env vars not set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  link: string;
  pub_date: string;
  source: string;
  guid: string;
  content: string | null;
  created_at: string;
}

export interface NewsArticleInsert {
  title: string;
  description?: string | null;
  link: string;
  pub_date: string;
  source: string;
  guid: string;
  content?: string | null;
}
