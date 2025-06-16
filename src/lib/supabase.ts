import { createClient } from '@supabase/supabase-js';
import 'cross-fetch/polyfill';

const supabaseUrl = 'https://eaugzwsrnvyyzslmrgjv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhdWd6d3NybnZ5eXpzbG1yZ2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5ODY0NjAsImV4cCI6MjA2NTU2MjQ2MH0.Y9ZCRgCTlRx0GJHoXAuNXMWGvuS8yOirvtc4B6hHBMY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
}); 