import React from 'react';
import { Clock, LogIn, LogOut } from 'lucide-react';
import { LoginSession } from '../../types';

interface LoginSessionsLogProps {
  sessions: LoginSession[];
}

export const LoginSessionsLog: React.FC<LoginSessionsLogProps> = ({ sessions }) => {
  const activeCount = sessions.filter(s => s.status === 'Logged In').length;

  return (
    <div className="glass-panel p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>HRMS Employee Login & Logout Time Tracking Log</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Tracks exact check-in (login) and check-out (logout) timestamps for all employees
          </p>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-1.5 shrink-0 whitespace-nowrap self-start sm:self-auto shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          {activeCount} Staff Online Now
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-200/80">
        <table className="w-full text-left text-xs text-slate-800 min-w-[750px]">
          <thead className="bg-slate-100 text-slate-600 font-extrabold border-b border-slate-200 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3.5 px-4 whitespace-nowrap">Session ID</th>
              <th className="py-3.5 px-4 whitespace-nowrap">Employee Name</th>
              <th className="py-3.5 px-4 whitespace-nowrap">Role</th>
              <th className="py-3.5 px-4 whitespace-nowrap">Login Time (Check-In)</th>
              <th className="py-3.5 px-4 whitespace-nowrap">Logout Time (Check-Out)</th>
              <th className="py-3.5 px-4 whitespace-nowrap">Workplace Location</th>
              <th className="py-3.5 px-4 text-right whitespace-nowrap">Current Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {sessions.map((sess) => (
              <tr key={sess.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-mono text-slate-500 font-semibold whitespace-nowrap">{sess.id}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">{sess.userName}</td>
                <td className="py-3.5 px-4 uppercase text-[10px] text-slate-500 font-mono font-bold whitespace-nowrap">{sess.userRole}</td>
                
                <td className="py-3.5 px-4 text-emerald-800 font-mono font-bold whitespace-nowrap">
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-200">
                    <LogIn className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{sess.loginTime}</span>
                  </span>
                </td>

                <td className="py-3.5 px-4 text-amber-800 font-mono font-bold whitespace-nowrap">
                  {sess.logoutTime ? (
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-amber-50 rounded-lg border border-amber-200">
                      <LogOut className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{sess.logoutTime}</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 font-normal italic">-- Active Session --</span>
                  )}
                </td>

                <td className="py-3.5 px-4 text-slate-700 font-medium whitespace-nowrap">{sess.ipLocation || 'Tarang Portal'}</td>

                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <span className={`px-3 py-1 text-[10px] font-bold rounded-full border ${
                    sess.status === 'Logged In'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 animate-pulse'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    {sess.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
