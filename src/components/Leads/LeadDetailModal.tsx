import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lead, LeadStatus, LeadPriority } from '../../types';
import { X, UserCheck, ShieldAlert, History, PhoneCall, CalendarCheck, Tag, Send } from 'lucide-react';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({ lead, onClose }) => {
  const { currentUser, updateLeadStatus, reassignLeadRole, requestReassignment, users } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'timeline'>('overview');
  
  if (!lead || !currentUser) return null;

  const isAdmin = currentUser.role === 'admin';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end">
      <div className="bg-white border-l border-slate-200 w-full max-w-2xl h-full flex flex-col shadow-2xl overflow-hidden text-xs text-slate-800">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sky-700 font-bold text-sm">{lead.id}</span>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold border border-slate-200 text-[10px]">
                {lead.customerType}
              </span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold border border-emerald-200 text-[10px]">
                {lead.status}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">{lead.customerName}</h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Phone: <span className="font-mono text-sky-700 font-bold">{lead.phone}</span> • Area: <span className="text-slate-700">{lead.area} ({lead.city})</span>
            </p>
          </div>

          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 font-bold text-xs border-b-2 transition ${
              activeTab === 'overview' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            4-Role Ownership Matrix & Details
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-3 font-bold text-xs border-b-2 transition flex items-center space-x-1 ${
              activeTab === 'timeline' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Append-Only Lead Timeline ({lead.timeline.length})</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {activeTab === 'overview' && (
            <>
              {/* Status Update Quick Control */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Update Status</span>
                  <span className="font-bold text-slate-900 text-sm">{lead.status}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                    className="bg-white border border-slate-300 text-slate-900 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-sky-500 shadow-sm"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Demo Scheduled">Demo Scheduled</option>
                    <option value="Demo Completed">Demo Completed</option>
                    <option value="Converted">Converted</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
              </div>

              {/* CORE REQUIREMENT: 4 SEPARATE OWNERSHIP FIELDS DISPLAY */}
              <div className="p-5 bg-indigo-50/60 border border-indigo-200 rounded-3xl space-y-4 shadow-sm">
                <div className="flex justify-between items-center border-b border-indigo-200/80 pb-3">
                  <div>
                    <h3 className="font-bold text-indigo-900 text-sm flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-indigo-600" />
                      4-Field Lead Ownership Model
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Four separate roles — never collapsed into a single "Assigned To" field.
                    </p>
                  </div>

                  {!isAdmin && (
                    <button
                      onClick={() => requestReassignment(lead.id, 'Ownership Fields')}
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 text-sky-700 font-bold text-[10px] rounded-xl border border-slate-200 shadow-sm flex items-center space-x-1 transition"
                    >
                      <Send className="w-3 h-3" />
                      <span>Request Reassignment</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  
                  {/* Created By (Audit) */}
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">Created By (Creator)</span>
                    <div className="font-bold text-slate-900 mt-1">{lead.createdBy}</div>
                    <div className="text-[10px] text-slate-500 font-mono">Role: {lead.createdByRole}</div>
                  </div>

                  {/* 1. Lead Owner */}
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-sky-700 uppercase font-bold block">1. Lead Owner (BDA)</span>
                    {isAdmin ? (
                      <select
                        value={lead.leadOwner}
                        onChange={(e) => reassignLeadRole(lead.id, 'leadOwner', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 text-sky-700 font-bold rounded-lg px-2 py-1 mt-1 focus:bg-white focus:outline-none"
                      >
                        {users.filter(u => u.role === 'bda' || u.role === 'admin').map(u => (
                          <option key={u.id} value={u.name}>{u.name}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="font-bold text-sky-700 mt-1">{lead.leadOwner}</div>
                    )}
                    <div className="text-[10px] text-slate-500">Overall lead responsibility</div>
                  </div>

                  {/* 2. Telecaller */}
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-amber-700 uppercase font-bold block">2. Telecaller</span>
                    {isAdmin ? (
                      <select
                        value={lead.telecaller}
                        onChange={(e) => reassignLeadRole(lead.id, 'telecaller', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 text-amber-700 font-bold rounded-lg px-2 py-1 mt-1 focus:bg-white focus:outline-none"
                      >
                        {users.filter(u => u.role === 'telecaller' || u.role === 'admin').map(u => (
                          <option key={u.id} value={u.name}>{u.name}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="font-bold text-amber-700 mt-1">{lead.telecaller}</div>
                    )}
                    <div className="text-[10px] text-slate-500">Calling & follow-ups</div>
                  </div>

                  {/* 3. Demo BDA */}
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-emerald-700 uppercase font-bold block">3. Demo BDA</span>
                    {isAdmin ? (
                      <select
                        value={lead.demoBda}
                        onChange={(e) => reassignLeadRole(lead.id, 'demoBda', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 text-emerald-700 font-bold rounded-lg px-2 py-1 mt-1 focus:bg-white focus:outline-none"
                      >
                        {users.filter(u => u.role === 'bda' || u.role === 'admin').map(u => (
                          <option key={u.id} value={u.name}>{u.name}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="font-bold text-emerald-700 mt-1">{lead.demoBda}</div>
                    )}
                    <div className="text-[10px] text-slate-500">Demo presentation</div>
                  </div>

                </div>

                {/* 4. Sales Owner */}
                <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-indigo-700 uppercase font-bold block">4. Sales Owner (Closing)</span>
                    {isAdmin ? (
                      <select
                        value={lead.salesOwner}
                        onChange={(e) => reassignLeadRole(lead.id, 'salesOwner', e.target.value)}
                        className="bg-slate-50 border border-slate-300 text-indigo-700 font-bold rounded-lg px-2 py-1 mt-1 focus:bg-white focus:outline-none"
                      >
                        {users.filter(u => u.role === 'bda' || u.role === 'admin').map(u => (
                          <option key={u.id} value={u.name}>{u.name}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="font-bold text-indigo-700 mt-1">{lead.salesOwner}</div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 italic">
                    (Auto-defaulted from Demo BDA upon Demo Completion)
                  </span>
                </div>

              </div>

              {/* Requirement & Source Details */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Lead Source & Customer Requirement
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium">Lead Source:</span>
                    <div className="font-bold text-slate-900 mt-0.5">{lead.source}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Source Location / Kart:</span>
                    <div className="font-bold text-slate-900 mt-0.5">
                      {lead.sourceLocation || 'N/A'} {lead.kartId ? `(${lead.kartId})` : ''}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Expected Budget:</span>
                    <div className="font-bold text-amber-700 mt-0.5">
                      {lead.budget ? `₹${lead.budget.toLocaleString()}` : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Created Date:</span>
                    <div className="font-semibold text-slate-800 mt-0.5">
                      {new Date(lead.createdDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {lead.requirement && (
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <span className="text-slate-500 font-medium">Requirement Notes:</span>
                    <p className="mt-1 p-2.5 bg-white rounded-xl border border-slate-200 text-slate-800 italic">
                      "{lead.requirement}"
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* TAB 2: APPEND-ONLY TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <div className="p-3 bg-sky-50 border border-sky-200 text-sky-900 rounded-xl text-[11px] font-medium">
                <strong>Append-Only Timeline Log:</strong> Complete history of lead creation, round-robin assignments, call outcomes, and ownership field reassignments.
              </div>

              <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {lead.timeline.map((item) => (
                  <div key={item.id} className="relative">
                    <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-sky-600 ring-4 ring-white" />
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-slate-900 text-xs">{item.event}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{item.date}</span>
                      </div>
                      <div className="mt-2 text-[10px] text-slate-600 font-mono">
                        Actor: <span className="text-sky-700 font-bold">{item.actor}</span> ({item.role})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
