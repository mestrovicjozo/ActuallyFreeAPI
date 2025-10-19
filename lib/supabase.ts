import { createClient } from '@supabase/supabase-js';

// Use placeholder values during build if env vars not set
// Note: These are just for build-time. Real credentials must be set in Vercel environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xxxxxxxxxxxxxxxxxxxxx.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

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
