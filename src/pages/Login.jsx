import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../utils/supabaseClient'

export default function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/')
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center font-bold text-white shadow-lg mb-4 text-xl">
            S
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Welcome to Skill Tracker</h1>
          <p className="text-[var(--muted-foreground)] mt-2">Sign in to track your progress</p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#10b981', // emerald-500
                  brandAccent: '#059669', // emerald-600
                  inputText: 'white',
                  inputBackground: 'transparent',
                  inputBorder: '#3f3f46', // zinc-700
                  inputLabelText: '#a1a1aa', // zinc-400
                },
              },
            },
            className: {
              container: 'auth-container',
              button: 'auth-button',
              input: 'auth-input',
            }
          }}
          theme="dark"
          providers={['github', 'google']}
        />
      </div>
    </div>
  )
}
