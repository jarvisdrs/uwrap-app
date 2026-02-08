'use client';

import { motion } from 'framer-motion';
import { 
  Film, 
  Upload, 
  CalendarPlus, 
  UserPlus,
  Sparkles
} from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: typeof Film;
  href: string;
  color: string;
  gradient: string;
}

function QuickActionCard({ 
  action, 
  index 
}: { 
  action: QuickAction; 
  index: number;
}) {
  const Icon = action.icon;
  
  return (
    <motion.a
      href={action.href}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: 0.3 + index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        scale: 1.03,
        y: -4,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative block"
    >
      <div className="relative p-4 rounded-xl bg-black/60 backdrop-blur-sm border border-purple-900/30 overflow-hidden transition-all duration-300 group-hover:border-purple-500/40 group-hover:bg-purple-950/20">
        {/* Glow Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 blur-xl`}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className={`w-11 h-11 rounded-lg ${action.color} flex items-center justify-center mb-3 shadow-lg`}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
          
          <h4 className="font-medium text-white text-sm mb-0.5">{action.label}</h4>
          <p className="text-xs text-purple-400/50">{action.description}</p>
        </div>
      </div>
    </motion.a>
  );
}

export function QuickActions() {
  const actions: QuickAction[] = [
    {
      id: 'new-project',
      label: 'Nuovo Progetto',
      description: 'Inizia ora',
      icon: Film,
      href: '/projects/new',
      color: 'bg-gradient-to-br from-purple-600 to-violet-600',
      gradient: 'from-purple-600 to-violet-600',
    },
    {
      id: 'upload-asset',
      label: 'Upload Asset',
      description: 'Aggiungi file',
      icon: Upload,
      href: '/assets/upload',
      color: 'bg-gradient-to-br from-fuchsia-600 to-pink-600',
      gradient: 'from-fuchsia-600 to-pink-600',
    },
    {
      id: 'schedule',
      label: 'Schedule',
      description: 'Pianifica',
      icon: CalendarPlus,
      href: '/schedule',
      color: 'bg-gradient-to-br from-violet-600 to-purple-600',
      gradient: 'from-violet-600 to-purple-600',
    },
    {
      id: 'invite',
      label: 'Invita',
      description: 'Aggiungi team',
      icon: UserPlus,
      href: '/team/invite',
      color: 'bg-gradient-to-br from-purple-500 to-fuchsia-500',
      gradient: 'from-purple-500 to-fuchsia-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-black/60 border border-purple-900/30 rounded-2xl p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h3 className="font-semibold text-white">Azioni Rapide</h3>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <QuickActionCard 
            key={action.id} 
            action={action} 
            index={index} 
          />
        ))}
      </div>
    </motion.div>
  );
}
