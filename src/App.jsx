import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewLog from './pages/NewLog';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { supabase } from './utils/supabaseClient';

function Navigation() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="border-b border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center font-bold text-white shadow-lg">
              S
            </div>
            <span className="font-semibold text-lg tracking-tight">Skill Tracker</span>
          </Link>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-[var(--muted-foreground)]">
          {session ? (
            <>
              <Link to="/" className="hover:text-[var(--foreground)] transition-colors">Dashboard</Link>
              <Link to="/new-log" className="hover:text-[var(--foreground)] transition-colors">New Log</Link>
              <button 
                onClick={handleSignOut}
                className="ml-4 px-3 py-1.5 rounded-md bg-[var(--border)] hover:bg-red-500/20 hover:text-red-400 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-[var(--foreground)] transition-colors">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <Navigation />
        <main className="py-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/new-log" 
              element={
                <ProtectedRoute>
                  <NewLog />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
