import { createClient } from '@supabase/supabase-js';

console.log("Supabase URL:", process.env.REACT_APP_SUPABASE_URL);
console.log("Supabase Anon Key:", process.env.REACT_APP_SUPABASE_ANON_KEY);

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export { supabaseClient };