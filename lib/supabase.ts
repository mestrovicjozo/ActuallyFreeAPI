import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Check if we're in build mode (no browser, no runtime server)
const isBuildTime = typeof window === 'undefined' && !process.env.NEXT_RUNTIME;

let supabaseInstance: SupabaseClient | null = null;

function getSupabase() {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        'Missing Supabase environment variables. ' +
        'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your Vercel environment variables.'
      );
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}

// Export a proxy that creates the client on first access (lazy initialization)
export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop) {
    // During build time, return dummy object to prevent errors
    if (isBuildTime) {
      return () => {};
    }
    // At runtime, initialize and use real client
    const client = getSupabase();
    return (client as any)[prop];
  }
});

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
