'use client';

'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Folder, 
  MoreHorizontal, 
  Calendar, 
  FileText, 
  Camera, 
  ImageIcon,
  ArrowUpRight,
  CheckCircle2,
  Film,
  Play,
  Clapperboard,
  Lightbulb,
  Sparkles,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// ==========================================
// TYPES
// ==========================================

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  coverImage?: string | null;
  updatedAt: string;
  organizationName: string;
  _count: {
    scripts: number;
    shootingDays: number;
    assets: number;
  };
  progress?: number;
}

interface ProjectGridProps {
  projects: Project[];
}

// ==========================================
// CINEMATIC STATUS CONFIGURATION
// ==========================================

const statusConfig: Record<string, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: typeof CheckCircle2;
  gradient: string;
  glowColor: string;
  pulseColor: string;
}> = {
  IDEA: {
    label: 'Idea',
    color: 'text-purple-300',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/25',
    icon: Lightbulb,
    gradient: 'from-purple-600 to-violet-600',
    glowColor: 'rgba(147, 51, 234, 0.4)',
    pulseColor: 'bg-purple-500',
  },
  PRE_PRODUCTION: {
    label: 'Pre-Produzione',
    color: 'text-fuchsia-300',
    bgColor: 'bg-fuchsia-500/10',
    borderColor: 'border-fuchsia-500/25',
    icon: FileText,
    gradient: 'from-fuchsia-600 to-pink-600',
    glowColor: 'rgba(192, 38, 211, 0.4)',
    pulseColor: 'bg-fuchsia-500',
  },
  PRODUCTION: {
    label: 'Produzione',
    color: 'text-violet-300',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/25',
    icon: Clapperboard,
    gradient: 'from-violet-600 to-purple-600',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    pulseColor: 'bg-violet-500',
  },
  POST_PRODUCTION: {
    label: 'Post-Produzione',
    color: 'text-pink-300',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/25',
    icon: Film,
    gradient: 'from-pink-600 to-rose-600',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    pulseColor: 'bg-pink-500',
  },
  COMPLETED: {
    label: 'Completato',
    color: 'text-emerald-300',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/25',
    icon: CheckCircle2,
    gradient: 'from-emerald-600 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    pulseColor: 'bg-emerald-500',
  },
  ARCHIVED: {
    label: 'Archiviato',
    color: 'text-slate-300',
    bgColor: 'bg-slate-500/10',
    borderColor: 'border-slate-500/25',
    icon: Folder,
    gradient: 'from-slate-600 to-gray-600',
    glowColor: 'rgba(100, 116, 139, 0.4)',
    pulseColor: 'bg-slate-500',
  },
};

// ==========================================
// CINEMATIC PROGRESS BAR
// ==========================================

function ProgressBar({ 
  progress, 
  status,
  isHovered
}: { 
  progress: number; 
  status: string;
  isHovered: boolean;
}) {
  const config = statusConfig[status] || statusConfig.IDEA;
  
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-purple-400/50">Progresso</span>
        <motion.span 
          className="text-xs font-bold text-white tabular-nums"
          animate={{ 
            color: isHovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.7)',
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          {progress}%
        </motion.span>
      </div>
      
      <div className="relative h-1.5 bg-purple-950/80 rounded-full overflow-hidden">
        {/* Animated progress fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${config.gradient} relative`}
        >
          {/* Shimmer stripe */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
          />
        </motion.div>
        
        {/* Glow effect */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ 
            opacity: isHovered ? 0.7 : 0.25,
            width: `${progress}%`
          }}
          transition={{ duration: 0.3 }}
          className={`absolute -bottom-0.5 h-2 bg-gradient-to-r ${config.gradient} rounded-full blur-md`}
        />
      </div>
    </div>
  );
}

// ==========================================
// ELEGANT PLACEHOLDER — CINEMATIC
// ==========================================

function ProjectPlaceholder({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.IDEA;
  const StatusIcon = config.icon;
  
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-15`} />
      <motion.div
        animate={{ 
          background: [
            `radial-gradient(circle at 30% 70%, ${config.glowColor.replace('0.4', '0.15')} 0%, transparent 50%)`,
            `radial-gradient(circle at 70% 30%, ${config.glowColor.replace('0.4', '0.15')} 0%, transparent 50%)`,
            `radial-gradient(circle at 30% 70%, ${config.glowColor.replace('0.4', '0.15')} 0%, transparent 50%)`,
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      />
      
      {/* Icon container with glow */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-20 h-20 rounded-2xl bg-black/50 backdrop-blur-sm border border-purple-500/20 flex items-center justify-center"
        style={{
          boxShadow: `
            0 0 50px ${config.glowColor},
            inset 0 1px 0 rgba(255,255,255,0.08)
          `
        }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <StatusIcon className={`w-10 h-10 ${config.color}`} />
        </motion.div>
        
        {/* Corner sparkle */}
        <motion.div
          animate={{ 
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1, 0.8],
            rotate: [0, 15, -15, 0]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute -top-1 -right-1"
        >
          <Sparkles className={`w-4 h-4 ${config.color}`} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ==========================================
// 3D TILT HOOK
// ==========================================

function useCardTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const springConfig = { stiffness: 300, damping: 25 };
  
  const rotateX = useSpring(useTransform(y, [0, 1], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-4, 4]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos);
    y.set(yPos);
  };
  
  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };
  
  return { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave };
}

// ==========================================
// CINEMATIC PROJECT CARD
// ==========================================

function ProjectCard({ 
  project, 
  index 
}: { 
  project: Project; 
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useCardTilt();
  const status = statusConfig[project.status] || statusConfig.IDEA;
  const StatusIcon = status.icon;
  const progress = project.progress || 0;
  
  const updatedTime = formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <Link href={`/projects/${project.id}`}>
        <motion.div
          ref={ref}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleMouseLeave();
          }}
          onMouseMove={handleMouseMove}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            boxShadow: isHovered 
              ? `
                0 0 0 1px ${status.glowColor.replace('0.4', '0.3')},
                0 12px 50px rgba(0, 0, 0, 0.5),
                0 30px 100px rgba(0, 0, 0, 0.3),
                0 0 120px ${status.glowColor.replace('0.4', '0.15')}
              `
              : `
                0 0 0 1px rgba(147, 51, 234, 0.08),
                0 6px 30px rgba(0, 0, 0, 0.35),
                0 15px 50px rgba(0, 0, 0, 0.2)
              `
          }}
          whileHover={{ y: -10, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}}
          className="group relative bg-black/50 backdrop-blur-xl border border-purple-500/15 rounded-2xl overflow-hidden cursor-pointer"
        >
          {/* Hover gradient overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.06 : 0 }}
            transition={{ duration: 0.4 }}
            className={`absolute inset-0 bg-gradient-to-br ${status.gradient} pointer-events-none`}
          />
          
          {/* Cover Image Section */}
          <div className="relative h-44 overflow-hidden">
            {project.coverImage ? (
              <>
                <motion.div
                  className="w-full h-full relative"
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={project.coverImage}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
                {/* Cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-transparent" />
              </>
            ) : (
              <ProjectPlaceholder status={project.status} />
            )}
            
            {/* Status Badge — Floating */}
            <motion.div 
              className="absolute top-4 left-4"
              initial={{ opacity: 0, x: -20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${status.bgColor} ${status.borderColor} border backdrop-blur-md`}
                style={{
                  boxShadow: `
                    0 4px 20px rgba(0,0,0,0.4),
                    inset 0 1px 0 rgba(255,255,255,0.08),
                    0 0 20px ${status.glowColor.replace('0.4', '0.2')}
                  `
                }}
              >
                <motion.div
                  animate={{ 
                    rotate: isHovered ? [0, -10, 10, 0] : 0,
                    scale: isHovered ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <StatusIcon className={`w-4 h-4 ${status.color}`} />
                </motion.div>
                <span className={`text-xs font-semibold ${status.color}`}>{status.label}</span>
                
                {/* Status pulse dot */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-1.5 h-1.5 rounded-full ${status.pulseColor}`}
                />
              </motion.div>
            </motion.div>
            
            {/* Play button overlay on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30"
                    style={{
                      boxShadow: `
                        0 0 40px ${status.glowColor},
                        inset 0 1px 0 rgba(255,255,255,0.2)
                      `
                    }}
                  >
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Hover Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.5,
                rotate: isHovered ? 0 : -45
              }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20"
            >
              <ArrowUpRight className="w-5 h-5 text-white" />
            </motion.div>
          </div>
          
          {/* Content Section */}
          <div className="p-5 relative z-10">
            {/* Title & Org */}
            <div className="mb-3">
              <motion.h3 
                className="font-bold text-white text-lg leading-tight group-hover:text-purple-200 transition-colors duration-300 line-clamp-1"
                animate={{ y: isHovered ? -3 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {project.name}
              </motion.h3>
              <p className="text-sm text-purple-400/50 mt-1">{project.organizationName}</p>
            </div>
            
            {/* Description */}
            <AnimatePresence>
              {project.description && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-purple-300/35 line-clamp-2 mb-4"
                >
                  {project.description}
                </motion.p>
              )}
            </AnimatePresence>
            
            {/* Stats Row */}
            <motion.div 
              className="flex items-center gap-4 py-3 border-y border-purple-500/8"
              animate={{ borderColor: isHovered ? 'rgba(147, 51, 234, 0.15)' : 'rgba(147, 51, 234, 0.05)' }}
            >
              {[
                { icon: FileText, count: project._count.scripts, label: 'scripts' },
                { icon: Camera, count: project._count.shootingDays, label: 'giorni' },
                { icon: ImageIcon, count: project._count.assets, label: 'assets' },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  className="flex items-center gap-1.5 text-xs text-purple-400/50"
                  animate={{ 
                    y: isHovered ? -3 : 0,
                    color: isHovered ? 'rgba(192, 132, 252, 0.7)' : 'rgba(168, 85, 247, 0.5)'
                  }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <motion.div
                    animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <stat.icon className="w-3.5 h-3.5" />
                  </motion.div>
                  <span className="font-medium">{stat.count} {stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Progress Bar */}
            <ProgressBar progress={progress} status={project.status} isHovered={isHovered} />
            
            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-purple-500/8">
              <div className="flex items-center gap-1.5 text-xs text-purple-400/40">
                <Clock className="w-3.5 h-3.5" />
                <span>{updatedTime}</span>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="p-2 rounded-lg hover:bg-purple-950/40 transition-colors"
              >
                <MoreHorizontal className="w-4 h-4 text-purple-400/50" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ==========================================
// CINEMATIC EMPTY STATE
// ==========================================

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="col-span-full"
    >
      <motion.div 
        className="relative text-center py-24 bg-black/40 backdrop-blur-xl rounded-3xl border border-purple-500/15 overflow-hidden"
        style={{
          boxShadow: `
            0 0 0 1px rgba(147, 51, 234, 0.05),
            0 15px 60px rgba(0, 0, 0, 0.4),
            0 30px 100px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.03)
          `
        }}
      >
        {/* Animated background */}
        <motion.div
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 80%, rgba(147,51,234,0.12) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(192,38,211,0.12) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(147,51,234,0.12) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
        
        {/* Floating icon */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-28 h-28 mx-auto rounded-3xl bg-gradient-to-br from-purple-600/15 to-fuchsia-600/15 backdrop-blur-sm border border-purple-500/25 flex items-center justify-center"
            style={{
              boxShadow: `
                0 0 80px rgba(147, 51, 234, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.08)
              `
            }}
          >
            <Folder className="w-14 h-14 text-purple-400/70" />
          </motion.div>
          
          {/* Floating particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-purple-400/30"
              animate={{
                y: [0, -40, 0],
                x: [0, (i - 2) * 25, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.8, 1]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              style={{
                top: '20%',
                left: `${25 + i * 12}%`
              }}
            />
          ))}
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-white mb-3 relative z-10"
        >
          Nessun progetto
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-purple-400/50 mb-10 max-w-md mx-auto relative z-10"
        >
          Crea il tuo primo progetto per iniziare a organizzare le tue produzioni video
        </motion.p>
        
        <motion.a
          href="/projects/new"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="relative z-10 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-xl font-semibold overflow-hidden group"
          style={{
            boxShadow: `
              0 6px 30px rgba(147, 51, 234, 0.35),
              0 12px 50px rgba(147, 51, 234, 0.2)
            `
          }}
        >
          {/* Button shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
          />
          
          <Film className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <span className="relative z-10">Crea Progetto</span>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

// ==========================================
// MAIN PROJECT GRID — CINEMATIC EXCELLENCE
// ==========================================

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="grid grid-cols-1">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          index={index} 
        />
      ))}
    </div>
  );
}
