import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vqolzkiwdctnqtbojbhq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxb2x6a2l3ZGN0bnF0Ym9qYmhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MzAzODgsImV4cCI6MjA5MTIwNjM4OH0.jg3fi_swCkYGro_DSM0whWTpFn8579qYTIcIZYxHHiM'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
