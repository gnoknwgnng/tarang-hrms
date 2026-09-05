import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lead, LeadStatus } from '../../types';
import { 
  PhoneCall, CalendarCheck, Clock, PlusCircle, CheckCircle2, 
  PhoneForwarded, Flame, Eye 
} from 'lucide-react';
import { EmployeeSidebar, EmployeeTabId } from '../Employee/EmployeeSidebar';
import { EmployeeModuleViews } from '../Employee/EmployeeModuleViews';

interface TelecallerDashboardProps {
  onSelectLead: (lead: Lead) => void;
  onOpenCreateLeadModal: () => void;
}

export const TelecallerDashboard: React.FC<TelecallerDashboardProps> = ({ onSelectLead, onOpenCreateLeadModal }) => {
  const { currentUser, leads, updateLeadStatus, updateDemoStatus, addToast } = useApp();
  const [activeNavTab, setActiveNavTab] = useState<EmployeeTabId>('home');

  if (!currentUser) return null;

  const myAssignedLeads = leads.filter(l => l.telecaller === currentUser.name);
  const newLeadsAssigned = myAssignedLeads.filter(l => l.status === 'New' || l.status === 'Assigned');
  const followUpsToday = myAssignedLeads.filter(l => l.status === 'Assigned' || l.status === 'Contacted');
  const overdueLeads = myAssignedLeads.filter(l => l.nextFollowUpDate && new Date(l.nextFollowUpDate) < new Date());

  const handleCallOutcome = (leadId: string, outcome: string, newStatus: LeadStatus) => {
    updateLeadStatus(leadId, newStatus);
    addToast(`Call outcome logged: ${outcome} for ${leadId}`, 'success');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
      
      {/* 10 Navigation Options Sidebar */}
      <EmployeeSidebar
        activeTab={activeNavTab}
        onSelectTab={(tabId) => setActiveNavTab(tabId)}
        userRoleLabel="Telecaller Workspace"
      />

      {/* Main View Container */}
      <div className="flex-1 min-w-0">
        {activeNavTab === 'home' ? (
          <div className="space-y-6">
            
            {/* Banner */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 glass-panel p-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200 rounded-full uppercase tracking-wider">
                    Telecaller Outreach Workspace
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-medium">Agent: {currentUser.name}</span>
                </div>
                <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
                  Calling Work Queue & Demo Booking
                </h1>
              </div>

              <button
                onClick={onOpenCreateLeadModal}
                className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs rounded-2xl shadow-lg shadow-amber-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] self-start md:self-auto"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add New Lead (Source Required)</span>
              </button>
            </div>

            {/* CALLING QUEUE COUNTERS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="glass-panel p-5">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">New Leads Assigned</span>
                  <div className="p-2 bg-sky-50 text-sky-600 rounded-xl border border-sky-200">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-sky-600 mt-2">{newLeadsAssigned.length}</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Ready for first call</div>
              </div>

              <div className="glass-panel p-5">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Follow-ups Today</span>
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-200">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-amber-600 mt-2">{followUpsToday.length}</div>
                <div className="text-xs text-amber-700 font-semibold mt-1">Pending outreach</div>
              </div>

              <div className="glass-panel p-5">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Overdue Leads</span>
                  <div className="p-2 bg-rose-50 text-rose-600 rounded-xl border border-rose-200">
                    <Flame className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-rose-600 mt-2">{overdueLeads.length}</div>
                <div className="text-xs text-rose-700 font-semibold mt-1">Requires immediate call</div>
              </div>

            </div>

            {/* CALL QUEUE LIST */}
            <div className="glass-panel p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-amber-600" />
                  My Active Calling Queue
                </h2>
                <span className="text-xs text-slate-500 font-mono font-semibold">{myAssignedLeads.length} leads assigned</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myAssignedLeads.length === 0 ? (
                  <p className="text-xs text-slate-400 py-8 col-span-full text-center">No leads currently assigned in your call queue.</p>
                ) : (
                  myAssignedLeads.map(lead => (
                    <div key={lead.id} className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm hover:border-slate-300 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono text-sky-700 font-bold">{lead.id}</span>
                          <h3 className="text-sm font-bold text-slate-900">{lead.customerName}</h3>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">Phone: <span className="text-sky-700 font-bold">{lead.phone}</span> • {lead.area}</p>
                        </div>
                        <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md ${
                          lead.priority === 'Hot' ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                          {lead.priority} Priority
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 space-y-0.5">
                        <p>Source: <strong className="text-slate-800">{lead.source}</strong> ({lead.sourceLocation || 'N/A'})</p>
                        <p>Lead Owner BDA: <strong className="text-sky-700">{lead.leadOwner}</strong></p>
                      </div>

                      {/* CLICK LEAD -> CALL OUTCOME BUTTONS */}
                      <div className="pt-3 border-t border-slate-100 space-y-2">
                        <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block">
                          Record Call Outcome:
                        </span>
                        
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            onClick={() => handleCallOutcome(lead.id, 'Interested', 'Interested')}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg shadow-sm transition"
                          >
                            Interested
                          </button>
                          <button
                            onClick={() => handleCallOutcome(lead.id, 'Call Back', 'Contacted')}
                            className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold rounded-lg shadow-sm transition"
                          >
                            Call Back
                          </button>
                          <button
                            onClick={() => {
                              updateDemoStatus(lead.id, 'Demo Scheduled');
                              addToast(`Demo scheduled for ${lead.customerName}! Assigned to Demo BDA: ${lead.demoBda}`, 'success');
                            }}
                            className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white text-[10px] font-bold rounded-lg shadow-sm transition"
                          >
                            Schedule Demo
                          </button>
                          <button
                            onClick={() => handleCallOutcome(lead.id, 'No Answer', 'Contacted')}
                            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded-lg border border-slate-200 transition"
                          >
                            No Answer
                          </button>
                          <button
                            onClick={() => handleCallOutcome(lead.id, 'Not Interested', 'Lost')}
                            className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 text-[10px] font-bold rounded-lg border border-rose-200 transition"
                          >
                            Not Interested
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 text-right">
                        <button
                          onClick={() => onSelectLead(lead)}
                          className="text-[11px] text-sky-700 hover:underline font-bold inline-flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Lead Details & Timeline</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
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
