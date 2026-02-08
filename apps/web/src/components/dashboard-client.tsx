'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { DashboardShell } from '@/components/dashboard-shell';
import { ProjectGrid } from '@/components/project-grid';
import { StatsOverview } from '@/components/stats-overview';
import { ActivityFeed } from '@/components/activity-feed';
import { QuickActions } from '@/components/quick-actions';
import { Film, Sparkles, TrendingUp, Clock, Calendar, Zap } from 'lucide-react';

// ==========================================
// AURORA BACKGROUND — CINEMATIC BREATHING
// ==========================================

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient — deep cinematic black to purple */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black" />
      
      {/* Animated orbs with breathing effect */}
      <motion.div
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, 40, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ 
          scale: [1.3, 1, 1.3],
          opacity: [0.15, 0.4, 0.15],
          x: [0, -30, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 2 }}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
          rotate: [0, 120, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 4 }}
        className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[90px]"
      />
      
      {/* Grid pattern overlay — subtle sophistication */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
      
      {/* Film grain noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}

// ==========================================
// WELCOME BANNER — PREMIUM CINEMATIC
// ==========================================

function WelcomeBanner({ userName }: { userName: string }) {
  const [greeting, setGreeting] = useState('Buongiorno');
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState('');
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buongiorno');
    else if (hour < 18) setGreeting('Buon pomeriggio');
    else setGreeting('Buonasera');
    
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  if (!mounted) return null;
  
  const firstName = userName?.split(' ')[0] || 'Creator';
  const today = new Date().toLocaleDateString('it-IT', { weekday: 'long', month: 'long', day: 'numeric' });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setGlowIntensity(1)}
      onHoverEnd={() => setGlowIntensity(0)}
      className="relative overflow-hidden rounded-3xl bg-black/50 backdrop-blur-2xl p-8 lg:p-10 mb-8 border border-purple-500/15"
      style={{
        boxShadow: `
          0 0 0 1px rgba(147, 51, 234, 0.08),
          0 4px 30px rgba(0, 0, 0, 0.6),
          0 30px 80px rgba(147, 51, 234, 0.12),
          inset 0 1px 0 rgba(255, 255, 255, 0.04)
        `
      }}
    >
      <AuroraBackground />
      
      {/* Dynamic glow on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-fuchsia-600/3 to-transparent rounded-3xl pointer-events-none"
        animate={{ opacity: glowIntensity }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="flex-1">
          {/* Pro Plan Badge — Floating Glow */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.05, x: 4 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-500/8 backdrop-blur-md mb-5 border border-purple-500/20 cursor-default"
            style={{
              boxShadow: `
                0 0 20px rgba(147, 51, 234, 0.15),
                inset 0 1px 0 rgba(255,255,255,0.08)
              `
            }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
            </motion.div>
            <span className="text-sm font-medium text-purple-200/90">Pro Plan Attivo</span>
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </motion.div>
          
          {/* Greeting with gradient text */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl lg:text-5xl font-bold text-white mb-3 tracking-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            {greeting},{' '}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-300 bg-clip-text text-transparent">
              {firstName}
            </span>
            <motion.span
              animate={{ rotate: [0, 20, -10, 20, 0] }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="inline-block ml-2"
            >
              👋
            </motion.span>
          </motion.h1>
          
          {/* Subtitle with subtle fade */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-purple-200/50 text-base lg:text-lg max-w-lg"
          >
            Hai <span className="text-purple-300 font-semibold">2 progetti attivi</span> e{' '}
            <span className="text-fuchsia-300 font-semibold">3 task in scadenza</span> questa settimana.
          </motion.p>
        </div>
        
        {/* Right Side — Time & CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-6"
        >
          {/* Time Display */}
          <div className="hidden sm:block text-right">
            <motion.div 
              className="text-xs text-purple-300/40 uppercase tracking-widest font-medium mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {today}
            </motion.div>
            <motion.div 
              className="flex items-center justify-end gap-2 text-2xl font-light text-white tabular-nums"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <Clock className="w-5 h-5 text-purple-400/60" />
              </motion.div>
              <span className="bg-gradient-to-r from-white/90 to-purple-200/80 bg-clip-text text-transparent">
                {time}
              </span>
            </motion.div>
          </div>
          
          {/* CTA Button — Liquid Gradient */}
          <motion.a
            href="/projects/new"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 text-white rounded-xl font-semibold overflow-hidden"
            style={{
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite',
              boxShadow: `
                0 4px 25px rgba(147, 51, 234, 0.35),
                0 10px 50px rgba(147, 51, 234, 0.2),
                inset 0 1px 0 rgba(255,255,255,0.15)
              `
            }}
          >
            {/* Animated shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
            />
            <Film className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10 hidden sm:inline">Nuovo Progetto</span>
            <span className="relative z-10 sm:hidden">Nuovo</span>
          </motion.a>
        </motion.div>
      </div>
      
      {/* Bottom decorative line — Gradient sweep */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.9, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
      />
    </motion.div>
  );
}

// ==========================================
// UPCOMING SCHEDULE — GLASSMORPHISM WIDGET
// ==========================================

function UpcomingSchedule() {
  const scheduleItems = [
    { day: 'Oggi', time: '14:00', event: 'Script Review - CRVDO', color: 'from-purple-500 to-violet-500', borderColor: 'border-purple-500/30' },
    { day: 'Domani', time: '09:30', event: 'Shoot Day 1 - Documentario', color: 'from-fuchsia-500 to-pink-500', borderColor: 'border-fuchsia-500/30' },
    { day: 'Merc', time: '15:00', event: 'Team Sync', color: 'from-violet-500 to-purple-500', borderColor: 'border-violet-500/30' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.01 }}
      className="relative bg-black/40 backdrop-blur-xl border border-purple-500/15 rounded-2xl p-6 overflow-hidden group"
      style={{
        boxShadow: `
          0 0 0 1px rgba(147, 51, 234, 0.03),
          0 8px 32px rgba(0, 0, 0, 0.4),
          0 20px 60px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.03)
        `
      }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-white flex items-center gap-2.5">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Calendar className="w-4 h-4 text-purple-400" />
            </motion.div>
            Prossimi Eventi
          </h3>
          <motion.a 
            href="/schedule" 
            className="text-xs text-purple-400/70 hover:text-purple-300 transition-colors relative group/link"
            whileHover={{ x: 3 }}
          >
            Vedi tutti
            <span className="absolute bottom-0 left-0 w-0 h-px bg-purple-400 group-hover/link:w-full transition-all duration-300" />
          </motion.a>
        </div>
        
        <div className="space-y-3">
          {scheduleItems.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                x: 8, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className="flex items-center gap-4 p-3.5 rounded-xl bg-purple-950/15 hover:bg-purple-900/25 transition-all duration-300 cursor-pointer border border-transparent hover:border-purple-500/15 group/item"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
              }}
            >
              <div className={`w-1.5 h-12 rounded-full bg-gradient-to-b ${item.color} group-hover/item:shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-shadow duration-300`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white group-hover/item:text-purple-200 transition-colors truncate">
                  {item.event}
                </div>
                <div className="flex items-center gap-2 text-xs text-purple-400/50 mt-0.5">
                  <span className="font-medium text-purple-300/70">{item.day}</span>
                  <span className="text-purple-700">•</span>
                  <span>{item.time}</span>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileHover={{ opacity: 1, scale: 1, rotate: 0 }}
                className="opacity-0 group-hover/item:opacity-100 transition-all duration-200"
              >
                <Zap className="w-4 h-4 text-purple-400" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// DASHBOARD CLIENT — CINEMATIC EXCELLENCE
// ==========================================

interface DashboardClientProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function DashboardClient({ user }: DashboardClientProps) {
  // Mock data
  const stats = {
    totalProjects: 12,
    activeProjects: 5,
    completedProjects: 7,
    totalScripts: 24,
    totalAssets: 156,
    teamMembers: 8,
  };

  const projects = [
    {
      id: '1',
      name: 'Spot CRVDO Group',
      description: 'Video promozionale ristorante con focus su atmosfera elegante e cucina gourmet',
      status: 'PRE_PRODUCTION' as const,
      updatedAt: new Date().toISOString(),
      organizationName: 'CRVDO Group',
      _count: { scripts: 3, shootingDays: 2, assets: 12 },
      progress: 65,
    },
    {
      id: '2',
      name: 'Documentario uWrap',
      description: 'Behind the scenes della piattaforma e interviste al team',
      status: 'PRODUCTION' as const,
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      organizationName: 'uWrap Studio',
      _count: { scripts: 2, shootingDays: 5, assets: 28 },
      progress: 42,
    },
    {
      id: '3',
      name: 'Tutorial CFO Avanzato',
      description: 'Serie di video formazione sulla gestione contabile per ristoranti',
      status: 'POST_PRODUCTION' as const,
      updatedAt: new Date(Date.now() - 172800000).toISOString(),
      organizationName: 'CFO Italia',
      _count: { scripts: 5, shootingDays: 3, assets: 45 },
      progress: 88,
    },
    {
      id: '4',
      name: 'Evento Launch Party',
      description: 'Copertura video evento lancio nuovo prodotto tech',
      status: 'IDEA' as const,
      updatedAt: new Date(Date.now() - 259200000).toISOString(),
      organizationName: 'TechStart',
      _count: { scripts: 0, shootingDays: 0, assets: 3 },
      progress: 10,
    },
    {
      id: '5',
      name: 'Interviste Founders',
      description: 'Serie di interviste con founders di startup italiane',
      status: 'PRE_PRODUCTION' as const,
      updatedAt: new Date(Date.now() - 345600000).toISOString(),
      organizationName: 'Startup Italia',
      _count: { scripts: 8, shootingDays: 4, assets: 18 },
      progress: 35,
    },
    {
      id: '6',
      name: 'Video Corso Editing',
      description: 'Masterclass completa su tecniche avanzate di video editing',
      status: 'COMPLETED' as const,
      updatedAt: new Date(Date.now() - 432000000).toISOString(),
      organizationName: 'VideoAcademy',
      _count: { scripts: 12, shootingDays: 8, assets: 67 },
      progress: 100,
    },
  ];

  const activities = [
    { id: '1', type: 'script' as const, message: 'Nuovo script aggiunto a "Spot CRVDO Group"', time: '2 ore fa', user: 'Marco R.' },
    { id: '2', type: 'asset' as const, message: '15 asset caricati in "Documentario uWrap"', time: '4 ore fa', user: 'Sarah C.' },
    { id: '3', type: 'project' as const, message: '"Tutorial CFO Avanzato" spostato in Post-Produzione', time: 'Ieri', user: 'Tu' },
    { id: '4', type: 'comment' as const, message: 'Nuovo commento sulla scena 3 in "Spot CRVDO Group"', time: 'Ieri', user: 'Lisa M.' },
    { id: '5', type: 'script' as const, message: 'Script approvato in "Interviste Founders"', time: '2 giorni fa', user: 'John D.' },
  ];

  return (
    <DashboardShell user={user}>
      <div className="space-y-10">
        {/* Welcome Banner */}
        <WelcomeBanner userName={user.name || 'Creator'} />
        
        {/* Stats Overview */}
        <StatsOverview stats={stats} />
        
        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Projects Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-white tracking-tight">
                  Progetti Recenti
                </h2>
                <motion.span 
                  className="px-2.5 py-0.5 bg-purple-500/15 text-purple-300 text-xs font-medium rounded-full border border-purple-500/25"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {projects.length}
                </motion.span>
              </div>
              
              <div className="flex items-center gap-1">
                {['Tutti', 'Attivi'].map((filter, i) => (
                  <motion.button 
                    key={filter}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                      i === 0 
                        ? 'bg-purple-500/15 text-purple-200 border border-purple-500/25' 
                        : 'text-purple-300/50 hover:text-purple-200 hover:bg-purple-950/30'
                    }`}
                  >
                    {filter}
                  </motion.button>
                ))}
                <motion.a
                  href="/projects"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 font-medium ml-2 px-3 py-1.5"
                >
                  Vedi tutti
                  <TrendingUp className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
            
            <ProjectGrid projects={projects} />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <QuickActions />
            <ActivityFeed activities={activities} />
            <UpcomingSchedule />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
