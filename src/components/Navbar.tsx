import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, UserCheck, PhoneCall, LogOut, Clock } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, activeSession, logout } = useApp();

  if (!currentUser) return null;

  const roleBadges = {
    admin: { label: 'Admin', icon: Shield, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    bda: { label: 'BDA', icon: UserCheck, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    telecaller: { label: 'Telecaller', icon: PhoneCall, color: 'bg-amber-50 text-amber-700 border-amber-200' }
  };

  const currentBadge = roleBadges[currentUser.role];
  const Icon = currentBadge.icon;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl text-slate-900 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <img 
              src="/logo.png" 
              alt="Tarang Logo" 
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-xl bg-white p-1 border border-slate-200 shadow-sm" 
            />
            <div>
              <span className="text-base sm:text-xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-sky-700 bg-clip-text text-transparent">
                Tarang CRM
              </span>
              <span className="hidden sm:inline-block ml-2 px-2.5 py-0.5 text-[10px] font-extrabold bg-sky-50 text-sky-700 rounded-full border border-sky-200 uppercase tracking-wider">
                HRMS Active
              </span>
            </div>
          </div>

          {/* Active User & Mobile Friendly Badge */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* HRMS LOGIN TIME BADGE (Desktop) */}
            {activeSession && (
              <div className="hidden lg:flex items-center space-x-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-semibold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  Check-In: <strong className="font-mono text-emerald-900">{activeSession.loginTime}</strong>
                </span>
              </div>
            )}

            {/* Active User Pill */}
            <div className="flex items-center space-x-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center font-black text-sky-700 text-xs shadow-inner">
                {currentUser.name.charAt(0)}
              </div>
              
              <div className="text-left">
                <div className="text-[11px] sm:text-xs font-bold text-slate-900 truncate max-w-[90px] sm:max-w-none">
                  {currentUser.name}
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`inline-flex items-center space-x-1 px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded text-[9px] sm:text-[10px] font-bold border ${currentBadge.color}`}>
                    <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>{currentBadge.label}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center space-x-1 px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-extrabold rounded-xl sm:rounded-2xl border border-rose-200 transition-all duration-200 shadow-sm"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
