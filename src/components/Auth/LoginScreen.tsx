import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, UserCheck, PhoneCall, LogIn, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login } = useApp();
  const [username, setUsername] = useState('admin@tarang.com');
  const [password, setPassword] = useState('admin123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  const handleQuickLogin = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    login(u, p);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden animate-fade-in">
      
      {/* Light Background Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-gradient-to-tr from-sky-400/20 via-indigo-500/20 to-purple-400/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[28rem] h-[28rem] bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-3">
        
        {/* Brand Logo */}
        <div className="inline-flex items-center space-x-3.5 p-2.5 bg-white/90 border border-slate-200 rounded-3xl shadow-xl backdrop-blur-xl">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-purple-600 flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-sky-500/20">
            T
          </div>
          <div className="text-left pr-3">
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-sky-700 bg-clip-text text-transparent block">
              Tarang CRM + HRMS
            </span>
            <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest block font-mono">
              Enterprise Light UI v1.2
            </span>
          </div>
        </div>

        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Sign In to Demo Workspace
        </h1>
        <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
          Select a demo account to test role-separated dashboards, HRMS login time tracking, and 4-role lead ownership.
        </p>
      </div>

      {/* Main Login Card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        
        <div className="bg-white border border-slate-200/90 rounded-3xl shadow-2xl p-8 space-y-6 relative overflow-hidden">
          
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500" />

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                Username / Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@tarang.com"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-2xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-sky-600 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-2xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-sky-600 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 py-3.5 bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 hover:from-sky-500 hover:to-indigo-600 text-white font-bold text-sm rounded-2xl shadow-xl shadow-sky-600/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In & Check-In HRMS</span>
            </button>
          </form>

          {/* 1-CLICK DEMO ACCOUNTS PRESETS */}
          <div className="pt-5 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-center space-x-2 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>1-Click Preset Demo Accounts</span>
            </div>

            <div className="space-y-2.5">
              
              {/* Admin Card */}
              <button
                onClick={() => handleQuickLogin('admin@tarang.com', 'admin123')}
                className="w-full p-3.5 bg-slate-50/80 hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-300 rounded-2xl flex items-center justify-between text-left transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center border border-indigo-200 group-hover:scale-105 transition">
                    <Shield className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-700">
                      1. Admin Account
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">admin@tarang.com • admin123</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition">
                  Admin Layout
                </span>
              </button>

              {/* BDA Card */}
              <button
                onClick={() => handleQuickLogin('bda@tarang.com', 'bda123')}
                className="w-full p-3.5 bg-slate-50/80 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 rounded-2xl flex items-center justify-between text-left transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-200 group-hover:scale-105 transition">
                    <UserCheck className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-700">
                      2. BDA Account (Field & Demos)
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">bda@tarang.com • bda123</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition">
                  BDA Layout
                </span>
              </button>

              {/* Telecaller Card */}
              <button
                onClick={() => handleQuickLogin('telecaller@tarang.com', 'tele123')}
                className="w-full p-3.5 bg-slate-50/80 hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300 rounded-2xl flex items-center justify-between text-left transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center border border-amber-200 group-hover:scale-105 transition">
                    <PhoneCall className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 group-hover:text-amber-700">
                      3. Telecaller Account (Call Queue)
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">telecaller@tarang.com • tele123</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg group-hover:bg-amber-600 group-hover:text-white transition">
                  Telecaller Layout
                </span>
              </button>

            </div>
          </div>

        </div>

        <div className="text-center mt-6 text-xs text-slate-500 font-medium">
          Tarang CRM + HRMS v1.2 Prototype • Ultra-Clean Light UI
        </div>

      </div>
    </div>
  );
};
