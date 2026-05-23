import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase environment variables. Please check your .env.local file.")
}

// Provide dummy values to prevent the app from crashing before the user configures their .env.local file
const fallbackUrl = "https://your-project-ref.supabase.co"
const fallbackKey = "your-anon-key"

export const supabase = createClient(supabaseUrl || fallbackUrl, supabaseAnonKey || fallbackKey)
