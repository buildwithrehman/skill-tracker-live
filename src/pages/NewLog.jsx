import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

export default function NewLog() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    shipped: '',
    technicalWork: '',
    learning: '',
    struggles: '',
    metrics: {
      commits: '',
      leetcode: '',
      projects: '',
      deepWork: ''
    },
    deltaBefore: '',
    deltaAfter: '',
    deltaProof: '',
    commitmentShipped: '',
    commitmentLearned: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      alert("You must be logged in to save logs.");
      setIsSaving(false);
      return;
    }

    const payload = {
      user_id: session.user.id,
      date: formData.date,
      shipped: formData.shipped,
      technical_work: formData.technicalWork,
      struggles: formData.struggles,
      metrics: formData.metrics,
      delta: {
        before: formData.deltaBefore,
        after: formData.deltaAfter,
        proof: formData.deltaProof
      }
    };

    const { error } = await supabase.from('skill_logs').insert([payload]);

    if (!error) {
      navigate('/');
    } else {
      console.error("Error saving log:", error);
      alert("Failed to save log: " + error.message);
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">New Weekly Skill Log</h1>
        <div className="ml-auto">
          <Button onClick={handleSave} className="gap-2 bg-emerald-600 hover:bg-emerald-500">
            <Save size={18} /> Save Log
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle>Log Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1">Week Of</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-[#0f172a] border border-[var(--border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-emerald-400">1. What I Shipped</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea 
              name="shipped"
              value={formData.shipped}
              onChange={handleChange}
              placeholder="List anything you completed and made public/functional..."
              className="w-full h-24 bg-[#0f172a] border border-[var(--border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-400">2. Technical Work</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea 
              name="technicalWork"
              value={formData.technicalWork}
              onChange={handleChange}
              placeholder="Specific technical activities with measurable details..."
              className="w-full h-24 bg-[#0f172a] border border-[var(--border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-orange-400">3. Struggles & Failures</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea 
              name="struggles"
              value={formData.struggles}
              onChange={handleChange}
              placeholder="What I tried but couldn't finish, bugs I couldn't solve, concepts that confuse me..."
              className="w-full h-24 bg-[#0f172a] border border-[var(--border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-purple-400">4. Measurable Metrics</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-[var(--muted-foreground)] mb-1">GitHub Commits</label>
              <input type="number" name="metrics.commits" value={formData.metrics.commits} onChange={handleChange} className="w-full bg-[#0f172a] border border-[var(--border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted-foreground)] mb-1">LeetCode Solved</label>
              <input type="number" name="metrics.leetcode" value={formData.metrics.leetcode} onChange={handleChange} className="w-full bg-[#0f172a] border border-[var(--border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted-foreground)] mb-1">Projects Completed</label>
              <input type="number" name="metrics.projects" value={formData.metrics.projects} onChange={handleChange} className="w-full bg-[#0f172a] border border-[var(--border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted-foreground)] mb-1">Deep Work Hrs</label>
              <input type="number" name="metrics.deepWork" value={formData.metrics.deepWork} onChange={handleChange} className="w-full bg-[#0f172a] border border-[var(--border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-pink-400">5. Skill Evidence Delta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full md:w-1/2">
                <label className="block text-xs text-[var(--muted-foreground)] mb-1">Before: I couldn't...</label>
                <input type="text" name="deltaBefore" value={formData.deltaBefore} onChange={handleChange} className="w-full bg-[#0f172a] border border-[var(--border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div className="hidden md:block text-[var(--muted-foreground)] mt-4">➔</div>
              <div className="w-full md:w-1/2">
                <label className="block text-xs text-[var(--muted-foreground)] mb-1">Now: I can...</label>
                <input type="text" name="deltaAfter" value={formData.deltaAfter} onChange={handleChange} className="w-full bg-[#0f172a] border border-[var(--border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[var(--muted-foreground)] mb-1">Because (Evidence):</label>
              <input type="text" name="deltaProof" value={formData.deltaProof} onChange={handleChange} placeholder="e.g. deployed 2 apps to Railway because I learned Docker basics" className="w-full bg-[#0f172a] border border-[var(--border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
