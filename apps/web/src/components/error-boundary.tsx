'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ErrorBoundaryProps {
  error: Error;
  reset?: () => void;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-black/80 backdrop-blur-xl border border-red-500/20 rounded-2xl p-8 text-center"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center"
        >
          <AlertTriangle className="w-10 h-10 text-red-400" />
        </motion.div>

        <h1 className="text-2xl font-bold text-white mb-3">
          Qualcosa è andato storto
        </h1>

        <p className="text-purple-400/60 mb-6">
          {error.message || 'Si è verificato un errore imprevisto. Riprova più tardi.'}
        </p>

        {process.env.NODE_ENV === 'development' && (
          <pre className="text-left text-xs text-red-400/50 bg-red-950/20 p-4 rounded-lg mb-6 overflow-auto max-h-40">
            {error.stack}
          </pre>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {reset && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={reset}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Riprova
            </motion.button>
          )}

          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-purple-500/30 text-purple-300 rounded-xl font-medium hover:bg-purple-950/30 transition-colors"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-8xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-4"
        >
          404
        </motion.div>

        <h1 className="text-2xl font-bold text-white mb-3">
          Pagina non trovata
        </h1>

        <p className="text-purple-400/60 mb-8">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Torna alla Dashboard
        </Link>
      </motion.div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
  actionLabel,
  actionHref,
}: {
  title: string;
  description: string;
  icon?: React.ElementType;
  action?: () => void;
  actionLabel?: string;
  actionHref?: string;
}) {
  const IconComponent = Icon || AlertTriangle;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-4"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center"
      >
        <IconComponent className="w-10 h-10 text-purple-400" />
      </motion.div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

      <p className="text-purple-400/60 mb-6 max-w-sm mx-auto">{description}</p>

      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
        >
          {actionLabel}
        </Link>
      )}

      {!actionHref && action && actionLabel && (
        <motion.button
          onClick={action}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
}
