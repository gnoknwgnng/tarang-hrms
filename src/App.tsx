import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginScreen } from './components/Auth/LoginScreen';
import { Navbar } from './components/Navbar';
import { AdminDashboard } from './components/Dashboards/AdminDashboard';
import { BdaDashboard } from './components/Dashboards/BdaDashboard';
import { TelecallerDashboard } from './components/Dashboards/TelecallerDashboard';
import { LeadModal } from './components/Leads/LeadModal';
import { LeadDetailModal } from './components/Leads/LeadDetailModal';
import { GeoTrackingView } from './components/GeoTracking/GeoTrackingView';
import { ToastContainer } from './components/ToastContainer';
import { Lead } from './types';
import { LayoutDashboard, Radio, Shield } from 'lucide-react';

const MainApp: React.FC = () => {
  const { isAuthenticated, currentUser } = useApp();

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState<'dashboard' | 'geo'>('dashboard');

  if (!isAuthenticated || !currentUser) {
    return (
      <>
        <LoginScreen />
        <ToastContainer />
      </>
    );
  }

  const isAdmin = currentUser.role === 'admin';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans overflow-x-hidden">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main Tab Switcher Bar — Mobile Touch Scroll Optimized */}
      <div className="bg-white border-b border-slate-200 px-3 sm:px-6 py-2 overflow-x-auto no-scrollbar shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between min-w-max gap-4">
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setActiveMainTab('dashboard')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold rounded-xl transition ${
                activeMainTab === 'dashboard'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{isAdmin ? 'Admin Dashboard' : currentUser.role === 'bda' ? 'BDA Workspace' : 'Telecaller Workspace'}</span>
            </button>

            {/* GEO TRACKING TAB — VISIBLE ONLY IF CURRENT USER IS ADMIN */}
            {isAdmin && (
              <button
                onClick={() => setActiveMainTab('geo')}
                className={`flex items-center space-x-2 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold rounded-xl transition ${
                  activeMainTab === 'geo'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600 animate-pulse" />
                <span>Geo Tracking (Admin Only)</span>
              </button>
            )}
          </div>

          <div className="text-[11px] text-slate-500 font-mono hidden sm:block">
            {isAdmin ? (
              <span className="text-indigo-700 font-bold flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-indigo-700" />
                Full Admin Privilege Mode
              </span>
            ) : (
              <span>Role: <strong className="text-slate-800 uppercase">{currentUser.role}</strong></span>
            )}
          </div>

        </div>
      </div>

      {/* Main View Container — Mobile Spacing & Padding Optimized */}
      <main className="flex-1 p-3 sm:p-6 max-w-7xl w-full mx-auto overflow-y-auto smooth-scroll">
        {/* GUARD: Geo tracking view strictly restricted to Admin */}
        {activeMainTab === 'geo' && isAdmin ? (
          <GeoTrackingView />
        ) : currentUser.role === 'admin' ? (
          <AdminDashboard onSelectLead={(lead) => setSelectedLead(lead)} />
        ) : currentUser.role === 'bda' ? (
          <BdaDashboard 
            onSelectLead={(lead) => setSelectedLead(lead)} 
            onOpenCreateLeadModal={() => setIsLeadModalOpen(true)}
          />
        ) : (
          <TelecallerDashboard 
            onSelectLead={(lead) => setSelectedLead(lead)} 
            onOpenCreateLeadModal={() => setIsLeadModalOpen(true)}
          />
        )}
      </main>

      {/* Global Modals & Toasts */}
      <LeadModal 
        isOpen={isLeadModalOpen} 
        onClose={() => setIsLeadModalOpen(false)} 
      />

      <LeadDetailModal 
        lead={selectedLead} 
        onClose={() => setSelectedLead(null)} 
      />

      <ToastContainer />

    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;
