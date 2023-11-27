import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://idtlbgdjeeziitvoxffj.supabase.co';
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkdGxiZ2RqZWV6aWl0dm94ZmZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0NjkzMTcsImV4cCI6MjAxNjA0NTMxN30.eYX-SNrYOrtzRYekQfv6YP7h5FGaSHzzZgO2Q4_8dO8`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
