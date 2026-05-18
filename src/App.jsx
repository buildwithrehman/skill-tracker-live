import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewLog from './pages/NewLog';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <nav className="border-b border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center font-bold text-white shadow-lg">
                S
              </div>
              <span className="font-semibold text-lg tracking-tight">Skill Tracker</span>
            </div>
            <div className="flex gap-4 text-sm font-medium text-[var(--muted-foreground)]">
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">Dashboard</a>
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">Skills</a>
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">Settings</a>
            </div>
          </div>
        </nav>
        <main className="py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new-log" element={<NewLog />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
