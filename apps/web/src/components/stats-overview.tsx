'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  FolderOpen, 
  FileText, 
  ImageIcon, 
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight
} from 'lucide-react';

interface StatsOverviewProps {
  stats: {
    totalProjects: number;
    activeProjects: number;
    completedProjects?: number;
    totalScripts: number;
    totalAssets: number;
    teamMembers?: number;
  };
}

// ==========================================
// CUSTOM EASINGS — VERCEL/LINEAR STYLE
// ==========================================

const easings = {
  smooth: [0.22, 1, 0.36, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
  snappy: [0.4, 0, 0.2, 1] as const,
  elastic: [0.68, -0.55, 0.265, 1.55] as const,
};

// ==========================================
// 3D TILT HOOK — PREMIUM INTERACTION
// ==========================================

function useTilt(intensity: number = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const springConfig = { stiffness: 400, damping: 30, mass: 1 };
  
  const rotateX = useSpring(useTransform(y, [0, 1], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-intensity, intensity]), springConfig);
  const glareX = useSpring(useTransform(x, [0, 1], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [0, 1], [0, 100]), springConfig);
  const z = useSpring(useTransform(x, [0, 0.5, 1], [0, 20, 0]), springConfig);
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos);
    y.set(yPos);
  }, [x, y]);
  
  const handleMouseLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);
  
  return { ref, rotateX, rotateY, glareX, glareY, z, handleMouseMove, handleMouseLeave };
}

// ==========================================
// BOUNCING COUNTER — CINEMATIC COUNTING
// ==========================================

function BouncingCounter({ 
  value, 
  duration = 2 
}: { 
  value: number; 
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (!isInView || hasAnimated) return;
    setHasAnimated(true);
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Custom easeOutQuart with slight bounce at end
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const bounceEffect = progress > 0.9 ? Math.sin((progress - 0.9) * 10 * Math.PI) * 0.02 : 0;
      const easedProgress = easeOutQuart + bounceEffect;
      
      setCount(Math.floor(easedProgress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration, hasAnimated]);
  
  return <span ref={ref} className="tabular-nums tracking-tight">{count.toLocaleString()}</span>;
}

// ==========================================
// STAT CARD — 3D TILT WITH MULTI-LAYER SHADOWS
// ==========================================

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  gradient: string;
  description: string;
  trend?: { value: number; positive: boolean };
  delay?: number;
  index: number;
}

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  gradient, 
  description, 
  trend,
  delay = 0,
  index
}: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, rotateX, rotateY, glareX, glareY, z, handleMouseMove, handleMouseLeave } = useTilt(6);
  
  const getGlowColor = () => {
    if (color.includes('purple')) return 'rgba(147, 51, 234, 0.15)';
    if (color.includes('fuchsia')) return 'rgba(192, 38, 211, 0.15)';
    if (color.includes('violet')) return 'rgba(139, 92, 246, 0.15)';
    if (color.includes('emerald')) return 'rgba(16, 185, 129, 0.15)';
    if (color.includes('cyan')) return 'rgba(6, 182, 212, 0.15)';
    return 'rgba(147, 51, 234, 0.15)';
  };

  const getIconShadow = () => {
    if (color.includes('purple')) return 'rgba(147, 51, 234, 0.5)';
    if (color.includes('fuchsia')) return 'rgba(192, 38, 211, 0.5)';
    if (color.includes('violet')) return 'rgba(139, 92, 246, 0.5)';
    return 'rgba(147, 51, 234, 0.5)';
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: easings.smooth
      }}
      className="relative group perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        style={{
          rotateX,
          rotateY,
          z,
          transformStyle: 'preserve-3d',
        }}
        className="relative p-6 rounded-2xl bg-black/50 backdrop-blur-xl border border-purple-500/15 overflow-hidden transition-all duration-500"
      >
        {/* Multi-layer shadow system */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500"
          style={{
            boxShadow: isHovered
              ? `
                inset 0 1px 0 rgba(255,255,255,0.06),
                0 0 0 1px rgba(147, 51, 234, 0.15),
                0 8px 32px rgba(0,0,0,0.5),
                0 24px 80px rgba(0,0,0,0.3),
                0 0 100px ${getGlowColor()}
              `
              : `
                inset 0 1px 0 rgba(255,255,255,0.04),
                0 0 0 1px rgba(147, 51, 234, 0.08),
                0 4px 20px rgba(0,0,0,0.4),
                0 12px 40px rgba(0,0,0,0.2)
              `
          }}
        />
        
        {/* Breathing gradient background */}
        <motion.div
          animate={{ 
            opacity: isHovered ? 0.12 : 0,
            scale: isHovered ? 1.5 : 1
          }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-3xl`}
        />
        
        {/* Dynamic glare effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12) 0%, transparent 50%)`
            )
          }}
        />
        
        {/* Content with 3D depth */}
        <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
          <div className="flex items-start justify-between mb-5">
            <div className="flex-1">
              <motion.p 
                className="text-xs text-purple-300/50 mb-1 font-medium uppercase tracking-widest"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.3, ease: easings.smooth }}
              >
                {title}
              </motion.p>
              
              <div className="flex items-baseline gap-3">
                <motion.h3 
                  className="text-4xl lg:text-5xl font-bold text-white tracking-tighter"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: delay + 0.4, type: "spring", stiffness: 200, damping: 15 }}
                >
                  <BouncingCounter value={value} />
                </motion.h3>
                
                {trend && (
                  <motion.div 
                    className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${
                      trend.positive 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' 
                        : 'bg-red-500/10 text-red-400 border-red-500/25'
                    }`}
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: delay + 0.6, type: "spring", stiffness: 400, damping: 15 }}
                  >
                    {trend.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {trend.value}%
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Animated icon container */}
            <motion.div
              animate={{ 
                scale: isHovered ? 1.12 : 1,
                rotate: isHovered ? [0, -5, 5, 0] : 0,
                y: isHovered ? -6 : 0
              }}
              transition={{ 
                scale: { duration: 0.3, ease: easings.bounce },
                rotate: { duration: 0.5, ease: "easeInOut" },
                y: { duration: 0.3, ease: easings.bounce }
              }}
              className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center`}
              style={{
                boxShadow: isHovered
                  ? `
                    0 8px 30px ${getIconShadow()},
                    0 0 60px ${getIconShadow().replace('0.5', '0.3')},
                    inset 0 1px 0 rgba(255,255,255,0.2)
                  `
                  : `
                    0 4px 15px ${getIconShadow().replace('0.5', '0.3')},
                    inset 0 1px 0 rgba(255,255,255,0.15)
                  `
              }}
            >
              <Icon className="w-7 h-7 text-white" />
            </motion.div>
          </div>
          
          <motion.p 
            className="text-xs text-purple-400/40 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5 }}
          >
            {description}
          </motion.p>
          
          {/* Progress bar with shimmer */}
          <div className="mt-5 relative">
            <div className="h-1.5 bg-purple-950/80 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: `${Math.min((value / 50) * 100, 100)}%`, opacity: 1 }}
                transition={{ duration: 1.5, delay: delay + 0.6, ease: easings.smooth }}
                className={`h-full rounded-full bg-gradient-to-r ${gradient} relative`}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
            
            {/* Glow underlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.6 : 0.2 }}
              className={`absolute -bottom-0.5 left-0 h-1.5 bg-gradient-to-r ${gradient} rounded-full blur-md`}
              style={{ width: `${Math.min((value / 50) * 100, 100)}%` }}
            />
          </div>
        </div>
        
        {/* Corner accent */}
        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-8 transition-opacity duration-500 rounded-tr-2xl rounded-bl-full`} />
        
        {/* Hover arrow indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: -10 }}
          animate={{ 
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1 : 0.5,
            x: isHovered ? 0 : -10
          }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4"
        >
          <ArrowUpRight className="w-4 h-4 text-purple-400" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ==========================================
// STATS OVERVIEW — PREMIUM GRID
// ==========================================

export function StatsOverview({ stats }: StatsOverviewProps) {
  const cards = [
    {
      title: 'Progetti Totali',
      value: stats.totalProjects,
      icon: FolderOpen,
      color: 'bg-gradient-to-br from-purple-600 to-violet-600',
      gradient: 'from-purple-600 to-violet-600',
      description: `${stats.activeProjects} attualmente attivi`,
      trend: { value: 12, positive: true },
    },
    {
      title: 'Script Scritti',
      value: stats.totalScripts,
      icon: FileText,
      color: 'bg-gradient-to-br from-fuchsia-600 to-pink-600',
      gradient: 'from-fuchsia-600 to-pink-600',
      description: 'In tutti i progetti',
      trend: { value: 8, positive: true },
    },
    {
      title: 'Asset Totali',
      value: stats.totalAssets,
      icon: ImageIcon,
      color: 'bg-gradient-to-br from-violet-600 to-purple-600',
      gradient: 'from-violet-600 to-purple-600',
      description: 'File caricati',
      trend: { value: 24, positive: true },
    },
    {
      title: 'Team Members',
      value: stats.teamMembers || 1,
      icon: Users,
      color: 'bg-gradient-to-br from-purple-500 to-fuchsia-500',
      gradient: 'from-purple-500 to-fuchsia-500',
      description: 'Collaboratori attivi',
      trend: { value: 5, positive: true },
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, index) => (
        <StatCard
          key={card.title}
          {...card}
          delay={index * 0.12}
          index={index}
        />
      ))}
    </div>
  );
}
