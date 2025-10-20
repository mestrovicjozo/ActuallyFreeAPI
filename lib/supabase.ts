import { createClient } from '@supabase/supabase-js';

// Lazy initialization - only create client when accessed, not at module load time
let supabaseInstance: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // During build, return a mock that won't fail
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase credentials not found - using mock client for build');
      // Return a mock client for build time
      return createClient(
        'https://placeholder.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder'
      );
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}

// Export getter function instead of direct instance
export const supabase = getSupabaseClient();

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
  tickers: string[] | null;
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
  tickers?: string[] | null;
}
