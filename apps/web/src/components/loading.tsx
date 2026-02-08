'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizes[size]} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-full h-full"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          className="text-purple-950"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-purple-500"
        />
      </svg>
    </motion.div>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="xl" className="text-purple-500" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-purple-400/60 text-sm"
        >
          Caricamento...
        </motion.p>
      </div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="bg-black/50 backdrop-blur-xl border border-purple-500/15 rounded-2xl p-6 animate-pulse">
      <div className="h-40 bg-purple-950/30 rounded-xl mb-4" />
      <div className="h-6 bg-purple-950/30 rounded w-3/4 mb-2" />
      <div className="h-4 bg-purple-950/30 rounded w-1/2" />
    </div>
  );
}

export function LoadingGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <LoadingCard />
        </motion.div>
      ))}
    </div>
  );
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-purple-950/30 rounded animate-pulse"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="p-6 rounded-2xl bg-black/50 backdrop-blur-xl border border-purple-500/15 animate-pulse">
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1">
          <div className="h-3 bg-purple-950/30 rounded w-20 mb-2" />
          <div className="h-10 bg-purple-950/30 rounded w-16" />
        </div>
        <div className="w-14 h-14 rounded-2xl bg-purple-950/30" />
      </div>
      <div className="h-1.5 bg-purple-950/30 rounded-full" />
    </div>
  );
}
