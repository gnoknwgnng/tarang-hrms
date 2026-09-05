import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Lead } from '../../types';

interface LeadOwnershipMatrixProps {
  onSelectLead: (lead: Lead) => void;
}

export const LeadOwnershipMatrix: React.FC<LeadOwnershipMatrixProps> = ({ onSelectLead }) => {
  const { currentUser, leads, users, reassignLeadRole } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedOwner, setSelectedOwner] = useState<string>('all');

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.phone.includes(searchTerm) || 
                          l.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || l.status === selectedStatus;
    const matchesOwner = selectedOwner === 'all' || l.leadOwner === selectedOwner || l.salesOwner === selectedOwner;
    return matchesSearch && matchesStatus && matchesOwner;
  });

  return (
    <div className="glass-panel p-6 space-y-4">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            Full Leads Directory (4-Role Ownership Matrix)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Admin Direct Reassignment Enabled on all 4 fields (Lead Owner • Telecaller • Demo BDA • Sales Owner)
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-sky-600 font-medium"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="all">All Statuses</option>
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

      {/* Table Container */}
      <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-200/80">
        <table className="w-full text-left text-xs text-slate-800 min-w-[950px]">
          <thead className="bg-slate-100 text-slate-600 font-extrabold border-b border-slate-200 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3.5 px-3 whitespace-nowrap">Lead ID & Customer</th>
              <th className="py-3.5 px-3 whitespace-nowrap">Source & Location</th>
              <th className="py-3.5 px-3 whitespace-nowrap">Created By</th>
              <th className="py-3.5 px-3 whitespace-nowrap">1. Lead Owner</th>
              <th className="py-3.5 px-3 whitespace-nowrap">2. Telecaller</th>
              <th className="py-3.5 px-3 whitespace-nowrap">3. Demo BDA</th>
              <th className="py-3.5 px-3 whitespace-nowrap">4. Sales Owner</th>
              <th className="py-3.5 px-3 whitespace-nowrap">Status</th>
              <th className="py-3.5 px-3 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <div className="font-bold text-slate-900">{lead.customerName}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{lead.phone} • {lead.id}</div>
                </td>

                <td className="py-3.5 px-3 whitespace-nowrap">
                  <div className="font-bold text-slate-800">{lead.source}</div>
                  <div className="text-[10px] text-slate-500">{lead.sourceLocation}</div>
                </td>

                <td className="py-3.5 px-3 whitespace-nowrap">
                  <div className="font-bold text-slate-700">{lead.createdBy}</div>
                  <div className="text-[10px] font-mono text-slate-500">{lead.createdByRole}</div>
                </td>

                <td className="py-3.5 px-3 whitespace-nowrap">
                  {currentUser?.role === 'admin' ? (
                    <select
                      value={lead.leadOwner}
                      onChange={(e) => reassignLeadRole(lead.id, 'leadOwner', e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-sky-700 text-[11px] font-bold rounded-xl px-2.5 py-1.5 focus:border-indigo-600 focus:outline-none"
                    >
                      {users.filter(u => u.role === 'bda' || u.role === 'admin').map(u => (
                        <option key={u.id} value={u.name}>{u.name}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="font-bold text-sky-700 text-xs">{lead.leadOwner}</span>
                  )}
                </td>

                <td className="py-3.5 px-3 whitespace-nowrap">
                  {currentUser?.role === 'admin' ? (
                    <select
                      value={lead.telecaller}
                      onChange={(e) => reassignLeadRole(lead.id, 'telecaller', e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-amber-700 text-[11px] font-bold rounded-xl px-2.5 py-1.5 focus:border-indigo-600 focus:outline-none"
                    >
                      {users.filter(u => u.role === 'telecaller' || u.role === 'admin').map(u => (
                        <option key={u.id} value={u.name}>{u.name}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="font-bold text-amber-700 text-xs">{lead.telecaller}</span>
                  )}
                </td>

                <td className="py-3.5 px-3 whitespace-nowrap">
                  {currentUser?.role === 'admin' ? (
                    <select
                      value={lead.demoBda}
                      onChange={(e) => reassignLeadRole(lead.id, 'demoBda', e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-emerald-700 text-[11px] font-bold rounded-xl px-2.5 py-1.5 focus:border-indigo-600 focus:outline-none"
                    >
                      {users.filter(u => u.role === 'bda' || u.role === 'admin').map(u => (
                        <option key={u.id} value={u.name}>{u.name}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="font-bold text-emerald-700 text-xs">{lead.demoBda}</span>
                  )}
                </td>

                <td className="py-3.5 px-3 whitespace-nowrap">
                  {currentUser?.role === 'admin' ? (
                    <select
                      value={lead.salesOwner}
                      onChange={(e) => reassignLeadRole(lead.id, 'salesOwner', e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-indigo-700 text-[11px] font-bold rounded-xl px-2.5 py-1.5 focus:border-indigo-600 focus:outline-none"
                    >
                      {users.filter(u => u.role === 'bda' || u.role === 'admin').map(u => (
                        <option key={u.id} value={u.name}>{u.name}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="font-bold text-indigo-700 text-xs">{lead.salesOwner}</span>
                  )}
                </td>

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
  );
};
