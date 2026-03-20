import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for news/announcements
export interface NewsItem {
  id: number;
  title: string;
  title_en?: string;
  title_ja?: string;
  title_zh?: string;
  content: string;
  content_en?: string;
  content_ja?: string;
  content_zh?: string;
  excerpt?: string;
  excerpt_en?: string;
  excerpt_ja?: string;
  excerpt_zh?: string;
  category: 'notice' | 'press' | 'update';
  created_at: string;
  updated_at: string;
  is_published: boolean;
}

// Fetch news items
export async function getNewsItems(limit?: number): Promise<NewsItem[]> {
  let query = supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching news:', error);
    return [];
  }

  return data || [];
}

// Fetch single news item
export async function getNewsItem(id: number): Promise<NewsItem | null> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching news item:', error);
    return null;
  }

  return data;
}

// Contact form submission
export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function submitContactForm(data: ContactSubmission): Promise<boolean> {
  const { error } = await supabase
    .from('contact_submissions')
    .insert([{ ...data, created_at: new Date().toISOString() }]);

  if (error) {
    console.error('Error submitting contact form:', error);
    return false;
  }

  return true;
}

