import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  count: number | string;
  subtitle?: string;
  icon: LucideIcon;
  colorScheme?: 'emerald' | 'sky' | 'amber' | 'purple' | 'rose' | 'indigo';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  count,
  subtitle,
  icon: Icon,
  colorScheme = 'sky',
  onClick
}) => {
  const styles = {
    emerald: {
      bgIcon: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      textCount: 'text-slate-900',
      textSub: 'text-emerald-700 font-bold',
    },
    sky: {
      bgIcon: 'bg-sky-50 text-sky-600 border-sky-200',
      textCount: 'text-slate-900',
      textSub: 'text-sky-700 font-bold',
    },
    amber: {
      bgIcon: 'bg-amber-50 text-amber-600 border-amber-200',
      textCount: 'text-slate-900',
      textSub: 'text-amber-700 font-bold',
    },
    purple: {
      bgIcon: 'bg-purple-50 text-purple-600 border-purple-200',
      textCount: 'text-slate-900',
      textSub: 'text-purple-700 font-bold',
    },
    rose: {
      bgIcon: 'bg-rose-50 text-rose-600 border-rose-200',
      textCount: 'text-slate-900',
      textSub: 'text-rose-700 font-bold',
    },
    indigo: {
      bgIcon: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      textCount: 'text-slate-900',
      textSub: 'text-indigo-700 font-bold',
    }
  };

  const scheme = styles[colorScheme];

  return (
    <div 
      onClick={onClick}
      className={`glass-panel p-5 transition-all duration-200 hover:-translate-y-0.5 ${onClick ? 'cursor-pointer hover:border-slate-300' : ''}`}
    >
      <div className="flex justify-between items-start">
        <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2 rounded-xl border ${scheme.bgIcon} transition-transform hover:scale-105`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className={`text-3xl font-black ${scheme.textCount} mt-2 tracking-tight`}>
        {count}
      </div>
      {subtitle && (
        <div className={`text-[11px] ${scheme.textSub} mt-1 flex items-center gap-1`}>
          <span>{subtitle}</span>
        </div>
      )}
    </div>
  );
};
