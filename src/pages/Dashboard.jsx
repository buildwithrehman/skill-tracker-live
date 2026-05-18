import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { PlusCircle, Activity, BookOpen, Target, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Load from local storage for now
    const saved = localStorage.getItem('skill_logs');
    if (saved) {
      setLogs(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-6xl space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Skill Tracker Pro
          </h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            Evidence-based skill progression
          </p>
        </div>
        <Link to="/new-log">
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-0 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all">
            <PlusCircle size={18} />
            New Weekly Log
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Logs"
          value={logs.length}
          icon={<Calendar className="text-blue-400" />}
        />
        <MetricCard
          title="Avg Output/Wk"
          value={logs.length ? Math.round(logs.reduce((acc, log) => acc + (parseInt(log.metrics?.commits) || 0), 0) / logs.length) : 0}
          icon={<Activity className="text-emerald-400" />}
          subtitle="commits"
        />
        <MetricCard
          title="Deep Work Hrs"
          value={logs.reduce((acc, log) => acc + (parseInt(log.metrics?.deepWork) || 0), 0)}
          icon={<Target className="text-purple-400" />}
          subtitle="total hours"
        />
        <MetricCard
          title="Active Skills"
          value="8"
          icon={<BookOpen className="text-orange-400" />}
          subtitle="tracking"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Activity size={20} className="text-blue-400" /> Recent Activity
        </h2>
        {logs.length === 0 ? (
          <Card className="bg-[var(--card)]/50 border-dashed border-[var(--border)]">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-[var(--muted)] p-3 rounded-full mb-4">
                <Calendar size={24} className="text-[var(--muted-foreground)]" />
              </div>
              <p className="text-[var(--foreground)] font-medium">No logs yet</p>
              <p className="text-[var(--muted-foreground)] text-sm mt-1 max-w-sm">
                Start tracking your skills by creating your first weekly log.
              </p>
              <Link to="/new-log" className="mt-4">
                <Button variant="outline">Create First Log</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {logs.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map((log, i) => (
              <LogPreviewCard key={i} log={log} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtitle, icon }) {
  return (
    <Card className="hover:border-blue-500/30 transition-colors bg-gradient-to-br from-[var(--card)] to-[#151f32]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-[var(--muted-foreground)] mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}

function LogPreviewCard({ log }) {
  return (
    <Card className="hover:border-blue-500/50 transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] group">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg group-hover:text-blue-400 transition-colors">
                Week of {format(new Date(log.date), 'MMM dd, yyyy')}
              </h3>
              <span className="text-xs px-2 py-1 bg-[var(--muted)] text-[var(--muted-foreground)] rounded-full">
                {log.metrics?.deepWork || 0}h focus
              </span>
            </div>
            
            <div className="text-sm text-[var(--muted-foreground)] line-clamp-2">
              <span className="font-medium text-emerald-400">Shipped:</span> {log.shipped || "Nothing shipped"}
            </div>
          </div>
          
          <div className="flex gap-4 md:items-center text-sm border-l border-[var(--border)] pl-4">
            <div className="text-center">
              <div className="font-bold text-[var(--foreground)]">{log.metrics?.commits || 0}</div>
              <div className="text-[var(--muted-foreground)] text-xs">Commits</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-[var(--foreground)]">{log.metrics?.projects || 0}</div>
              <div className="text-[var(--muted-foreground)] text-xs">Projects</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
