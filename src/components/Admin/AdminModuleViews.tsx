import React, { useState } from 'react';
import { AdminModuleId } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Home, Users, CalendarCheck, CalendarOff, DollarSign, CreditCard, Receipt, 
  FileText, Briefcase, GitFork, BarChart3, HelpCircle, Award, Wallet, GraduationCap, 
  UserPlus, PackageSearch, CheckSquare, Building2, MapPin, Plus, CheckCircle2, 
  Clock, AlertCircle, Download, Upload, Shield, Search, ArrowUpRight, PhoneCall, ArrowRight 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { AttendanceDirectory } from '../HRMS/AttendanceDirectory';
import { GeoTrackingView } from '../GeoTracking/GeoTrackingView';
import { LeadOwnershipMatrix } from '../Leads/LeadOwnershipMatrix';
import { StatCard } from '../Common/StatCard';
import { LoginSessionsLog } from '../HRMS/LoginSessionsLog';

interface AdminModuleViewsProps {
  activeModule: AdminModuleId;
  onSelectLead?: (lead: any) => void;
  onOpenCreateLeadModal?: () => void;
}

export const AdminModuleViews: React.FC<AdminModuleViewsProps> = ({ activeModule, onSelectLead, onOpenCreateLeadModal }) => {
  const { users, leads, karts, loginSessions, addToast } = useApp();

  // State simulators for interactive features
  const [tasks, setTasks] = useState([
    { id: 'TSK-101', title: 'Verify Aparna Sarovar BDA Geo-Fence logs', assignee: 'Rahul Verma', priority: 'High', status: 'In Progress' },
    { id: 'TSK-102', title: 'Prepare monthly payroll CTC summaries', assignee: 'Akash Somavarapu', priority: 'Medium', status: 'To Do' },
    { id: 'TSK-103', title: 'Audit Inorbit Mall Kart TK-002 inventory', assignee: 'Vikram Singh', priority: 'High', status: 'Completed' }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 'LR-001', name: 'Rahul Verma', type: 'Casual Leave', dates: '10 Sep - 12 Sep', reason: 'Family Function', status: 'Pending' },
    { id: 'LR-002', name: 'Priya Patel', type: 'Sick Leave', dates: '06 Sep', reason: 'Medical Checkup', status: 'Approved' }
  ]);

  const handleApproveLeave = (id: string) => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
    addToast(`Leave Request ${id} approved successfully!`, 'success');
  };

  // Leads Summary Metrics
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const pendingCallsCount = leads.filter(l => l.status === 'Assigned' || l.status === 'New').length;
  const followUpsDueCount = leads.filter(l => l.status === 'Contacted' || l.status === 'Interested').length;
  const demosTodayCount = leads.filter(l => l.status === 'Demo Scheduled').length;
  const convertedCount = leads.filter(l => l.status === 'Converted').length;

  // Multi-colored Funnel Bar Data
  const funnelData = [
    { stage: 'New Leads', count: newLeadsCount, fill: '#0284c7' },       // Sky Blue
    { stage: 'Pending Calls', count: pendingCallsCount, fill: '#d97706' }, // Amber / Orange
    { stage: 'Follow-ups', count: followUpsDueCount, fill: '#4f46e5' },   // Indigo / Violet
    { stage: 'Demos Today', count: demosTodayCount, fill: '#059669' },  // Emerald Green
    { stage: 'Converted', count: convertedCount, fill: '#9333ea' }      // Purple / Magenta
  ];

  switch (activeModule) {
    case 'leads':
      return (
        <div className="space-y-6 animate-fade-in">
          <LeadOwnershipMatrix 
            onSelectLead={onSelectLead || (() => {})} 
            onOpenCreateLeadModal={onOpenCreateLeadModal} 
          />
        </div>
      );

    case 'home':
      return (
        <div className="space-y-6 animate-fade-in">
          {/* Header Banner */}
          <div className="glass-panel p-6">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 text-[10px] font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-full uppercase tracking-wider">
                Admin Executive Control Center
              </span>
              <span className="text-xs text-slate-500 font-mono font-medium">Enterprise Control Portal</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">Executive HRMS & Sales Operations Overview</h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Complete real-time metrics for lead pipeline progression, workforce login logs, attendance, and field operations.</p>
          </div>

          {/* 1. TOP SECTION: SALES FUNNEL OVERVIEW CHART WITH MULTI-COLOR BARS & MOBILE KARTS OVERVIEW */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 glass-panel p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-bold text-slate-900">Company-wide Sales Funnel Overview</h2>
                {/* Color Legend Pills */}
                <div className="hidden sm:flex flex-wrap items-center gap-2 text-[10px] font-bold font-mono">
                  <span className="flex items-center gap-1 text-sky-700"><span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" /> New</span>
                  <span className="flex items-center gap-1 text-amber-700"><span className="w-2.5 h-2.5 rounded-full bg-[#d97706]" /> Calls</span>
                  <span className="flex items-center gap-1 text-indigo-700"><span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]" /> Follow-ups</span>
                  <span className="flex items-center gap-1 text-emerald-700"><span className="w-2.5 h-2.5 rounded-full bg-[#059669]" /> Demos</span>
                  <span className="flex items-center gap-1 text-purple-700"><span className="w-2.5 h-2.5 rounded-full bg-[#9333ea]" /> Converted</span>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                    <XAxis type="number" stroke="#64748b" />
                    <YAxis dataKey="stage" type="category" stroke="#334155" width={110} tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '1rem', color: '#0f172a' }} />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {funnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-panel p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  Mobile Karts Overview
                </h2>
                
                <div className="space-y-3">
                  {karts.map((kart) => (
                    <div key={kart.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                      <div className="flex justify-between items-start">
                        <span className="font-mono font-bold text-sky-700">{kart.id}</span>
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">
                          {kart.status}
                        </span>
                      </div>
                      <div className="font-bold text-slate-900 mt-1">{kart.location}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Assigned BDA: <span className="text-slate-800 font-bold">{kart.assignedBda}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* 2. VISUAL STEP-BY-STEP LEAD PROGRESSION DIAGRAM */}
          <div className="glass-panel p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <GitFork className="w-5 h-5 text-sky-600 shrink-0" />
                  <span>Lead Progression Lifecycle Diagram</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Visual stage-by-stage pipeline flow from initial lead entry to conversion</p>
              </div>

              <span className="text-xs font-mono font-bold px-3 py-1 bg-sky-50 text-sky-800 rounded-xl border border-sky-200 flex items-center gap-1.5 shrink-0 whitespace-nowrap self-start sm:self-auto">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
                Pipeline Active
              </span>
            </div>

            {/* Diagram Flow Step Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative pt-2">
              
              {/* Node 1 */}
              <div className="p-4 bg-sky-50/80 border border-sky-200 rounded-2xl flex flex-col justify-between space-y-3 relative group hover:border-sky-400 transition shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">Step 1 • Inbound</span>
                  <div className="p-1.5 bg-sky-100 text-sky-700 rounded-xl border border-sky-200">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase">NEW LEADS</h3>
                  <div className="text-2xl font-black text-sky-700 mt-1">{newLeadsCount}</div>
                  <p className="text-[10px] text-slate-600 font-semibold mt-0.5">Fresh inbound</p>
                </div>
              </div>

              {/* Node 2 */}
              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl flex flex-col justify-between space-y-3 relative group hover:border-amber-400 transition shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Step 2 • Calling</span>
                  <div className="p-1.5 bg-amber-100 text-amber-700 rounded-xl border border-amber-200">
                    <PhoneCall className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase">CALLS PENDING</h3>
                  <div className="text-2xl font-black text-amber-700 mt-1">{pendingCallsCount}</div>
                  <p className="text-[10px] text-slate-600 font-semibold mt-0.5">Ready for outreach</p>
                </div>
              </div>

              {/* Node 3 */}
              <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-2xl flex flex-col justify-between space-y-3 relative group hover:border-indigo-400 transition shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">Step 3 • Nurture</span>
                  <div className="p-1.5 bg-indigo-100 text-indigo-700 rounded-xl border border-indigo-200">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase">FOLLOW-UPS DUE</h3>
                  <div className="text-2xl font-black text-indigo-700 mt-1">{followUpsDueCount}</div>
                  <p className="text-[10px] text-slate-600 font-semibold mt-0.5">Active nurture</p>
                </div>
              </div>

              {/* Node 4 */}
              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex flex-col justify-between space-y-3 relative group hover:border-emerald-400 transition shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Step 4 • Demo</span>
                  <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-xl border border-emerald-200">
                    <CalendarCheck className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase">DEMOS TODAY</h3>
                  <div className="text-2xl font-black text-emerald-700 mt-1">{demosTodayCount}</div>
                  <p className="text-[10px] text-slate-600 font-semibold mt-0.5">Experience center</p>
                </div>
              </div>

              {/* Node 5 */}
              <div className="p-4 bg-purple-50/80 border border-purple-200 rounded-2xl flex flex-col justify-between space-y-3 relative group hover:border-purple-400 transition shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">Step 5 • Won</span>
                  <div className="p-1.5 bg-purple-100 text-purple-700 rounded-xl border border-purple-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase">CONVERTED</h3>
                  <div className="text-2xl font-black text-purple-700 mt-1">{convertedCount}</div>
                  <p className="text-[10px] text-slate-600 font-semibold mt-0.5">Closed deals</p>
                </div>
              </div>

            </div>
          </div>

          {/* 3. FIVE LEADS METRIC SNAPSHOT CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            <StatCard 
              title="New Leads" 
              count={newLeadsCount} 
              subtitle="Fresh inbound" 
              icon={Users} 
              colorScheme="sky" 
            />

            <StatCard 
              title="Calls Pending" 
              count={pendingCallsCount} 
              subtitle="Ready for outreach" 
              icon={PhoneCall} 
              colorScheme="amber" 
            />

            <StatCard 
              title="Follow-ups Due" 
              count={followUpsDueCount} 
              subtitle="Active nurture" 
              icon={Clock} 
              colorScheme="indigo" 
            />

            <StatCard 
              title="Demos Today" 
              count={demosTodayCount} 
              subtitle="Experience center" 
              icon={CalendarCheck} 
              colorScheme="emerald" 
            />

            <div className="col-span-2 sm:col-span-1">
              <StatCard 
                title="Converted" 
                count={convertedCount} 
                subtitle="Closed deals" 
                icon={CheckCircle2} 
                colorScheme="purple" 
              />
            </div>
          </div>

          {/* 4. OPERATIONAL SUMMARY METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard 
              title="Active Staff Online" 
              count={loginSessions.filter(s => s.status === 'Logged In').length} 
              subtitle="Checked-IN now" 
              icon={Users} 
              colorScheme="emerald" 
            />
            <StatCard 
              title="Pending Work Tasks" 
              count={tasks.filter(t => t.status !== 'Completed').length} 
              subtitle="Requires field action" 
              icon={CheckSquare} 
              colorScheme="amber" 
            />
            <StatCard 
              title="Leave Requests" 
              count={leaveRequests.filter(l => l.status === 'Pending').length} 
              subtitle="Pending HR approval" 
              icon={CalendarOff} 
              colorScheme="rose" 
            />
          </div>

          {/* 5. HRMS EMPLOYEE LOGIN/LOGOUT TIME TRACKING LOG */}
          <LoginSessionsLog sessions={loginSessions} />

          {/* 6. FULL LEAD TABLE WITH ALL FOUR OWNERSHIP COLUMNS */}
          {onSelectLead && <LeadOwnershipMatrix onSelectLead={onSelectLead} />}
        </div>
      );

    case 'geo-tracking':
      return <GeoTrackingView />;

    case 'attendance':
      return <AttendanceDirectory />;

    case 'employees':
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Employee Directory & Management</h1>
              <p className="text-xs text-slate-500 mt-0.5">Full staff records, designation roles, contact info, and department allocations.</p>
            </div>
            <button onClick={() => addToast('Add Employee Modal opened', 'info')} className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-2xl shadow-md shadow-sky-600/20 flex items-center space-x-1.5">
              <Plus className="w-4 h-4" />
              <span>Add New Employee</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((emp) => (
              <div key={emp.id} className="glass-panel p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-black text-sm border border-indigo-200">
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{emp.name}</h3>
                      <p className="text-[10px] text-slate-500 font-mono">{emp.email}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 border border-slate-200 rounded-md font-bold text-[10px] uppercase font-mono">
                    {emp.role}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                  <p>Phone: <strong className="text-slate-800 font-mono">{emp.phone}</strong></p>
                  <p>Workplace: <strong className="text-slate-800">{emp.area || 'Hyderabad HQ'}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'tasks':
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Task & Work Management</h1>
              <p className="text-xs text-slate-500 mt-0.5">Assign, track, and monitor operational tasks for field BDAs and Telecallers.</p>
            </div>
            <button onClick={() => addToast('Task creation ready.', 'info')} className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-2xl shadow-md shadow-sky-600/20 flex items-center space-x-1.5">
              <Plus className="w-4 h-4" />
              <span>Create New Task</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['To Do', 'In Progress', 'Completed'].map((colStatus) => (
              <div key={colStatus} className="glass-panel p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${colStatus === 'Completed' ? 'bg-emerald-500' : colStatus === 'In Progress' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                    {colStatus}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">
                    {tasks.filter(t => t.status === colStatus).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {tasks.filter(t => t.status === colStatus).map((t) => (
                    <div key={t.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-sky-700 font-bold">{t.id}</span>
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-rose-100 text-rose-800 border border-rose-200">
                          {t.priority}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs">{t.title}</h4>
                      <p className="text-[10px] text-slate-500 font-mono">Assignee: {t.assignee}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'leave':
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Leave & Holidays Management</h1>
            <p className="text-xs text-slate-500 mt-0.5">Approve leave applications, manage employee balances, and view the company holiday calendar.</p>
          </div>

          <div className="glass-panel p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Pending Leave Requests</h3>
            <div className="space-y-3">
              {leaveRequests.map((lr) => (
                <div key={lr.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-slate-900 text-sm">{lr.name}</h4>
                      <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded font-bold text-[10px] border border-amber-200">{lr.type}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 font-medium">Dates: <strong>{lr.dates}</strong> • Reason: "{lr.reason}"</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {lr.status === 'Approved' ? (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200">Approved</span>
                    ) : (
                      <button onClick={() => handleApproveLeave(lr.id)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm">
                        Approve Request
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'payroll':
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Payroll & Compensation Management</h1>
              <p className="text-xs text-slate-500 mt-0.5">Monthly salary processing, CTC breakdown, tax deductions, and automated payslip generation.</p>
            </div>
            <button onClick={() => addToast('Payroll run initiated for September 2026', 'success')} className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl shadow-md shadow-emerald-600/20">
              Run Monthly Payroll
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="Total Monthly Payroll" count="₹14,50,000" subtitle="Sep 2026 Disbursal" icon={DollarSign} colorScheme="emerald" />
            <StatCard title="Processed Payslips" count="7 / 7" subtitle="100% Generated" icon={FileText} colorScheme="sky" />
            <StatCard title="Tax & Deductions" count="₹1,85,000" subtitle="TDS & PF Remittance" icon={Receipt} colorScheme="purple" />
          </div>
        </div>
      );

    case 'organization-tree':
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Organization Tree & Hierarchy</h1>
            <p className="text-xs text-slate-500 mt-0.5">Visual reporting hierarchy chart showing Executive Management, Department Heads, and Field Operations.</p>
          </div>

          <div className="glass-panel p-8 flex flex-col items-center space-y-6">
            <div className="p-4 bg-indigo-50 border border-indigo-200 text-center rounded-2xl w-64 shadow-sm">
              <span className="text-[10px] text-indigo-700 font-bold uppercase">Executive Director</span>
              <h3 className="font-black text-slate-900 text-base">Rahul Sharma (Admin)</h3>
              <p className="text-[10px] text-slate-500">Tarang HQ Executive Board</p>
            </div>

            <div className="w-0.5 h-8 bg-slate-300" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-center rounded-2xl shadow-sm">
                <span className="text-[10px] text-emerald-700 font-bold uppercase">Field Sales BDA Head</span>
                <h4 className="font-bold text-slate-900 text-sm">Rahul Verma</h4>
                <p className="text-[10px] text-slate-500">Gachibowli Experience Center</p>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 text-center rounded-2xl shadow-sm">
                <span className="text-[10px] text-amber-700 font-bold uppercase">Telecalling Outreach Lead</span>
                <h4 className="font-bold text-slate-900 text-sm">Priya Patel</h4>
                <p className="text-[10px] text-slate-500">Calling Hub Hyderabad</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'asset-tracking':
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Asset Tracking & Hardware Inventory</h1>
              <p className="text-xs text-slate-500 mt-0.5">Track Mobile Experience Karts, GPS devices, laptops, and mobile hardware assignments.</p>
            </div>
            <button onClick={() => addToast('Asset registered.', 'info')} className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-2xl shadow-md">
              Register New Asset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['TK-001 - Forum Mall Kart', 'TK-002 - Inorbit Mall Kart', 'TK-004 - Aparna Sarovar Kart', 'TK-005 - Jubilee Hills Mobile Unit'].map((asset, i) => (
              <div key={i} className="glass-panel p-5 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono text-sky-700 font-bold">ASSET-{100 + i}</span>
                  <h3 className="font-bold text-slate-900 text-sm mt-0.5">{asset}</h3>
                  <p className="text-xs text-slate-500 font-mono">Location: Hyderabad • Status: Deployed</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs border border-emerald-200">Active</span>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight capitalize">
              {activeModule.replace(/-/g, ' ')} Module
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Enterprise HRMS management suite for {activeModule.replace(/-/g, ' ')}.</p>
          </div>

          <div className="glass-panel p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto border border-sky-200">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base capitalize">{activeModule.replace(/-/g, ' ')} Portal Active</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Real-time enterprise feature hub for {activeModule.replace(/-/g, ' ')} ready for administrative control and record processing.
            </p>
          </div>
        </div>
      );
  }
};
