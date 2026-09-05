import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lead } from '../../types';
import { 
  UserCheck, PlusCircle, CalendarCheck, CheckCircle2, 
  Clock, ShieldAlert, ArrowRight, Eye, Sparkles 
} from 'lucide-react';
import { EmployeeSidebar, EmployeeTabId } from '../Employee/EmployeeSidebar';
import { EmployeeModuleViews } from '../Employee/EmployeeModuleViews';

interface BdaDashboardProps {
  onSelectLead: (lead: Lead) => void;
  onOpenCreateLeadModal: () => void;
}

export const BdaDashboard: React.FC<BdaDashboardProps> = ({ onSelectLead, onOpenCreateLeadModal }) => {
  const { currentUser, leads, updateDemoStatus, updateLeadStatus } = useApp();
  const [bdaTab, setBdaTab] = useState<'my_leads' | 'created_by_me'>('my_leads');
  const [activeNavTab, setActiveNavTab] = useState<EmployeeTabId>('home');

  if (!currentUser) return null;

  const myOwnedLeads = leads.filter(l => l.leadOwner === currentUser.name || l.demoBda === currentUser.name || l.salesOwner === currentUser.name);
  const leadsCreatedByMe = leads.filter(l => l.createdBy === currentUser.name);
  
  const displayedLeads = bdaTab === 'my_leads' ? myOwnedLeads : leadsCreatedByMe;

  const myDemos = leads.filter(l => l.demoBda === currentUser.name && ['Demo Scheduled', 'Demo Completed', 'Interested'].includes(l.status));
  const demosCompleted = leads.filter(l => l.demoBda === currentUser.name && (l.status === 'Demo Completed' || l.status === 'Converted')).length;
  const myConversions = leads.filter(l => l.salesOwner === currentUser.name && l.status === 'Converted').length;

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
      
      {/* 10 Navigation Options Sidebar */}
      <EmployeeSidebar
        activeTab={activeNavTab}
        onSelectTab={(tabId) => setActiveNavTab(tabId)}
        userRoleLabel="BDA Workspace"
      />

      {/* Main View Container */}
      <div className="flex-1 min-w-0">
        {activeNavTab === 'home' ? (
          <div className="space-y-6">
            
            {/* Top Banner */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 glass-panel p-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full uppercase tracking-wider">
                    BDA Field Sales Workspace
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-medium">Agent: {currentUser.name}</span>
                </div>
                <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
                  Field Sales & Experience Center Demos
                </h1>
              </div>

              <button
                onClick={onOpenCreateLeadModal}
                className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs rounded-2xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] self-start md:self-auto"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add New Lead (Source Required)</span>
              </button>
            </div>

            {/* OWN PERFORMANCE SNAPSHOT */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="glass-panel p-5">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Leads Generated</span>
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 mt-2">{leadsCreatedByMe.length}</div>
                <div className="text-xs text-emerald-700 font-semibold mt-1">Created by {currentUser.name}</div>
              </div>

              <div className="glass-panel p-5">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Demos Completed</span>
                  <div className="p-2 bg-sky-50 text-sky-600 rounded-xl border border-sky-200">
                    <CalendarCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-sky-600 mt-2">{demosCompleted}</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Assigned Demo BDA</div>
              </div>

              <div className="glass-panel p-5">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Conversions Closed</span>
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-xl border border-purple-200">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-purple-600 mt-2">{myConversions}</div>
                <div className="text-xs text-purple-700 font-semibold mt-1">Sales Owner</div>
              </div>

            </div>

            {/* MY DEMOS TODAY LIST WITH STATUS UPDATE BUTTONS */}
            <div className="glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>My Demos Today & Outcome Progression</span>
                </h2>
                <span className="text-xs text-slate-500 font-mono font-semibold whitespace-nowrap">{myDemos.length} active demos</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myDemos.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 col-span-full text-center">No assigned demos right now.</p>
                ) : (
                  myDemos.map(lead => (
                    <div key={lead.id} className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm hover:border-slate-300 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono text-sky-700 font-bold">{lead.id}</span>
                          <h3 className="text-sm font-bold text-slate-900">{lead.customerName}</h3>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">{lead.phone} • {lead.area}</p>
                        </div>
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg ${
                          lead.status === 'Demo Completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-sky-100 text-sky-800 border border-sky-200'
                        }`}>
                          {lead.status}
                        </span>
                      </div>

                      {lead.requirement && (
                        <p className="text-xs text-slate-700 italic p-3 bg-slate-50 rounded-xl border border-slate-200">
                          "{lead.requirement}"
                        </p>
                      )}

                      {/* Status Update Buttons */}
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] text-slate-500 font-bold">Update:</span>
                        <button
                          onClick={() => updateDemoStatus(lead.id, 'Demo Scheduled')}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-sky-700 text-[10px] font-bold rounded-lg border border-slate-200 transition"
                        >
                          Scheduled
                        </button>
                        <button
                          onClick={() => updateDemoStatus(lead.id, 'Demo Completed')}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg shadow-sm transition"
                          title="Will auto-set Sales Owner to Demo BDA"
                        >
                          Demo Completed
                        </button>
                        <button
                          onClick={() => updateLeadStatus(lead.id, 'Converted')}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold rounded-lg shadow-sm transition"
                        >
                          Mark Converted
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* "MY LEADS" VS "LEADS I CREATED" SEPARATE VIEWS */}
            <div className="glass-panel p-6 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                
                <div className="flex space-x-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                  <button
                    onClick={() => setBdaTab('my_leads')}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      bdaTab === 'my_leads' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    My Assigned Leads ({myOwnedLeads.length})
                  </button>

                  <button
                    onClick={() => setBdaTab('created_by_me')}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      bdaTab === 'created_by_me' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Leads I Created ({leadsCreatedByMe.length})
                  </button>
                </div>

                <span className="text-xs text-slate-500 italic">
                  Read-only ownership fields for BDAs (Use Admin account to reassign)
                </span>

              </div>

              {/* Table — Fully Responsive */}
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-xs text-slate-700 min-w-[850px]">
                  <thead className="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-3 whitespace-nowrap">Lead ID & Customer</th>
                      <th className="py-3.5 px-3 whitespace-nowrap">Source</th>
                      <th className="py-3.5 px-3 whitespace-nowrap">Created By</th>
                      <th className="py-3.5 px-3 whitespace-nowrap">Lead Owner</th>
                      <th className="py-3.5 px-3 whitespace-nowrap">Telecaller</th>
                      <th className="py-3.5 px-3 whitespace-nowrap">Demo BDA</th>
                      <th className="py-3.5 px-3 whitespace-nowrap">Sales Owner</th>
                      <th className="py-3.5 px-3 whitespace-nowrap">Status</th>
                      <th className="py-3.5 px-3 text-right whitespace-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {displayedLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition">
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <div className="font-bold text-slate-900">{lead.customerName}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{lead.phone} • {lead.id}</div>
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-slate-800 whitespace-nowrap">{lead.source}</td>
                        <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">{lead.createdBy}</td>
                        
                        {/* Read-only 4 Ownership Fields for BDA */}
                        <td className="py-3.5 px-3 font-bold text-sky-700 whitespace-nowrap">{lead.leadOwner}</td>
                        <td className="py-3.5 px-3 font-bold text-amber-700 whitespace-nowrap">{lead.telecaller}</td>
                        <td className="py-3.5 px-3 font-bold text-emerald-700 whitespace-nowrap">{lead.demoBda}</td>
                        <td className="py-3.5 px-3 font-bold text-indigo-700 whitespace-nowrap">{lead.salesOwner}</td>
                        
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <span className="px-2.5 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-lg font-bold text-[10px]">
                            {lead.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 text-right whitespace-nowrap">
                          <button
                            onClick={() => onSelectLead(lead)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-sky-700 text-[11px] font-bold rounded-xl border border-slate-200 transition flex items-center space-x-1 ml-auto"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        ) : (
          <EmployeeModuleViews activeTab={activeNavTab} onSelectLead={onSelectLead} />
        )}
      </div>

    </div>
  );
};
