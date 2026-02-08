'use client';

import { motion } from 'framer-motion';
import { 
  FileText, 
  ImageIcon, 
  Folder, 
  MessageCircle,
  ArrowUpRight,
  Clock
} from 'lucide-react';

type ActivityType = 'script' | 'asset' | 'project' | 'comment';

interface Activity {
  id: string;
  type: ActivityType;
  message: string;
  time: string;
  user: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const activityConfig: Record<ActivityType, {
  icon: typeof FileText;
  color: string;
  bgColor: string;
  label: string;
}> = {
  script: {
    icon: FileText,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    label: 'Script',
  },
  asset: {
    icon: ImageIcon,
    color: 'text-fuchsia-400',
    bgColor: 'bg-fuchsia-500/20',
    label: 'Asset',
  },
  project: {
    icon: Folder,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/20',
    label: 'Progetto',
  },
  comment: {
    icon: MessageCircle,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20',
    label: 'Commento',
  },
};

function ActivityIcon({ type }: { type: ActivityType }) {
  const config = activityConfig[type];
  const Icon = config.icon;
  
  return (
    <div className={`w-10 h-10 rounded-xl ${config.bgColor} flex items-center justify-center border border-purple-500/20`}>
      <Icon className={`w-5 h-5 ${config.color}`} />
    </div>
  );
}

function ActivityItem({ 
  activity, 
  index 
}: { 
  activity: Activity; 
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        x: 4,
        transition: { duration: 0.2 }
      }}
      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-purple-950/30 transition-all duration-300 cursor-pointer"
    >
      <ActivityIcon type={activity.type} />
      
      <div className="flex-1 min-w-0">
        <p className="text-sm text-purple-100 group-hover:text-white transition-colors line-clamp-2">
          {activity.message}
        </p>
        
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs text-purple-400/60">{activity.user}</span>
          <span className="text-purple-600">•</span>
          <div className="flex items-center gap-1 text-xs text-purple-400/40">
            <Clock className="w-3 h-3" />
            {activity.time}
          </div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="text-purple-400/60"
      >
        <ArrowUpRight className="w-4 h-4" />
      </motion.div>
    </motion.div>
  );
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-black/60 border border-purple-900/30 rounded-2xl overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-purple-900/30 flex items-center justify-between">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-400" />
          Attività Recenti
        </h3>
        <span className="text-xs text-purple-400/50">
          {activities.length} aggiornamenti
        </span>
      </div>
      
      <div className="p-3 space-y-1 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
        {activities.map((activity, index) => (
          <ActivityItem 
            key={activity.id} 
            activity={activity} 
            index={index} 
          />
        ))}
      </div>
      
      <div className="px-6 py-3 border-t border-purple-900/30 bg-purple-950/10">
        <button className="w-full text-center text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center justify-center gap-1 group">
          Vedi tutte le attività
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
