'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Film, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function LoginContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const errorParam = searchParams.get('error');

  useEffect(() => {
    if (errorParam) {
      const errorMessages: Record<string, string> = {
        Configuration: 'Errore di configurazione. Contatta l\'amministratore.',
        AccessDenied: 'Accesso negato. Non hai i permessi necessari.',
        Verification: 'Verifica fallita. Riprova.',
        OAuthSignin: 'Errore durante il login con Google.',
        OAuthCallback: 'Errore di callback. Riprova.',
        OAuthCreateAccount: 'Errore nella creazione dell\'account.',
        EmailCreateAccount: 'Errore nella creazione dell\'account con email.',
        Callback: 'Errore di callback.',
        OAuthAccountNotLinked: 'Account già esistente con altro provider.',
        EmailSignin: 'Errore nell\'invio dell\'email.',
        CredentialsSignin: 'Credenziali non valide.',
        SessionRequired: 'Devi essere autenticato per accedere.',
        Default: 'Si è verificato un errore. Riprova.',
      };
      setError(errorMessages[errorParam] || errorMessages.Default);
    }
  }, [errorParam]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn('google', { 
        callbackUrl,
        redirect: true,
      });
    } catch (err) {
      setError('Errore di connessione. Riprova.');
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Error Alert */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-red-200 text-sm">{error}</p>
        </motion.div>
      )}

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8"
      >
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">
            Benvenuto
          </h2>
          <p className="text-slate-400 text-sm">
            Accedi per gestire i tuoi progetti video
          </p>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full h-14 bg-white hover:bg-slate-50 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-900 font-medium rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-900 rounded-full animate-spin" />
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continua con Google</span>
              <ArrowRight className="w-4 h-4 ml-auto text-slate-400" />
            </>
          )}
        </button>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            Continuando accetti i{' '}
            <a href="#" className="text-uwrap-400 hover:text-uwrap-300 transition-colors">
              Termini di Servizio
            </a>{' '}
            e la{' '}
            <a href="#" className="text-uwrap-400 hover:text-uwrap-300 transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </motion.div>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-uwrap-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-uwrap-400 to-uwrap-600 shadow-2xl shadow-uwrap-500/25 mb-6"
          >
            <Film className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white mb-3 tracking-tight"
          >
            uWrap
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg"
          >
            Video Pre-Production Platform
          </motion.p>
        </div>

        <Suspense fallback={
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8">
            <div className="flex items-center justify-center h-14">
              <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
            </div>
          </div>
        }>
          <LoginContent />
        </Suspense>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          <div className="p-3">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-slate-800/50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-uwrap-400" />
            </div>
            <p className="text-xs text-slate-400">Script Editor</p>
          </div>
          <div className="p-3">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-slate-800/50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-uwrap-400" />
            </div>
            <p className="text-xs text-slate-400">Shooting Schedule</p>
          </div>
          <div className="p-3">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-slate-800/50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-uwrap-400" />
            </div>
            <p className="text-xs text-slate-400">Asset Management</p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 text-center text-xs text-slate-600"
        >
          © 2024 uWrap. Built for filmmakers.
        </motion.p>
      </motion.div>
    </div>
  );
}
