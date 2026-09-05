import React, { useState } from 'react';
import { EmployeeTabId } from './EmployeeSidebar';
import { useApp } from '../../context/AppContext';
import { Lead } from '../../types';
import { 
  CheckSquare, PackageSearch, Clock, CalendarOff, DollarSign, 
  CreditCard, Receipt, GitFork, HelpCircle, Plus, FileText, 
  CheckCircle2, AlertCircle, Calendar as CalendarIcon, Shield 
} from 'lucide-react';
import { StatCard } from '../Common/StatCard';
import { LeadOwnershipMatrix } from '../Leads/LeadOwnershipMatrix';

interface EmployeeModuleViewsProps {
  activeTab: EmployeeTabId;
  onSelectLead?: (lead: Lead) => void;
}

export const EmployeeModuleViews: React.FC<EmployeeModuleViewsProps> = ({ activeTab, onSelectLead }) => {
  const { currentUser, loginSessions, addToast } = useApp();

  const [leaveReason, setLeaveReason] = useState('');
  const [leaveDates, setLeaveDates] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [claimDesc, setClaimDesc] = useState('');

  if (!currentUser) return null;

  const mySession = loginSessions.find(s => s.userName === currentUser.name && s.status === 'Logged In');

  switch (activeTab) {
    case 'leads':
      return (
        <div className="space-y-6 animate-fade-in">
          <LeadOwnershipMatrix onSelectLead={onSelectLead || (() => {})} />
        </div>
      );

    case 'your-tasks':
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Your Work Tasks</h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Assigned operational field tasks and customer outreach work orders for {currentUser.name}.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-sky-700 font-bold">TSK-201</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-800 border border-amber-200">In Progress</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Conduct Demos at Aparna Sarovar Experience Center</h3>
              <p className="text-xs text-slate-500 font-medium">Location: Gachibowli • Target: 2 Leather Sofa Demos</p>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-sky-700 font-bold">TSK-202</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800 border border-emerald-200">Completed</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Log Morning HRMS Check-In Punch</h3>
              <p className="text-xs text-slate-500 font-medium">Time: 09:15 AM • Status: Verified</p>
            </div>
          </div>
        </div>
      );

    case 'your-assets':
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Your Assigned Assets</h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Company hardware, experience karts, and mobile devices allocated to {currentUser.name}.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-2xl flex justify-between items-center shadow-sm">
              <div>
                <span className="text-[10px] font-mono text-sky-700 font-bold">KART-TK-004</span>
                <h3 className="font-bold text-slate-900 text-sm mt-0.5">Aparna Sarovar Mobile Kart Unit</h3>
                <p className="text-xs text-slate-500 font-mono">Serial: TRNG-KT-884 • Condition: Excellent</p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full border border-emerald-200">Active</span>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl flex justify-between items-center shadow-sm">
              <div>
                <span className="text-[10px] font-mono text-sky-700 font-bold">DEV-TAB-09</span>
                <h3 className="font-bold text-slate-900 text-sm mt-0.5">Enterprise Tablet & GPS Tracker</h3>
                <p className="text-xs text-slate-500 font-mono">Serial: TRNG-DEV-991 • Battery: 88%</p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full border border-emerald-200">Active</span>
            </div>
          </div>
        </div>
      );

    case 'attendance':
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Your HRMS Attendance Log</h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Personal check-in / check-out history and monthly attendance record for {currentUser.name}.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="Current Session" count={mySession ? 'Checked-IN' : 'Checked-OUT'} subtitle={mySession ? `Check-in: ${mySession.loginTime}` : 'Offline'} icon={Clock} colorScheme={mySession ? 'emerald' : 'amber'} />
            <StatCard title="Monthly Present" count="22 Days" subtitle="September 2026" icon={CheckCircle2} colorScheme="sky" />
            <StatCard title="Total Work Hours" count="176 hrs" subtitle="Regular Shift" icon={Clock} colorScheme="indigo" />
          </div>
        </div>
      );

    case 'leave-holidays':
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Leave Application & Holiday Calendar</h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Apply for casual or medical leave and check official company holidays.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form onSubmit={(e) => {
              e.preventDefault();
              addToast(`Leave request submitted for ${leaveDates}`, 'success');
              setLeaveDates('');
              setLeaveReason('');
            }} className="glass-panel p-6 space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 text-sm">Apply for Leave</h3>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Leave Date(s)</label>
                <input type="text" required placeholder="e.g. 15 Sep - 16 Sep" value={leaveDates} onChange={(e) => setLeaveDates(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason for Leave</label>
                <textarea rows={2} required placeholder="Reason for leave request..." value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none" />
              </div>
              <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-sm">Submit Leave Request</button>
            </form>

            <div className="glass-panel p-6 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Upcoming Official Holidays</h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 font-bold">Gandhi Jayanti</strong>
                    <div className="text-[10px] text-slate-500">Official National Holiday</div>
                  </div>
                  <span className="font-mono font-bold text-sky-700">02 Oct 2026</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 font-bold">Dussehra / Vijayadashami</strong>
                    <div className="text-[10px] text-slate-500">Festival Holiday</div>
                  </div>
                  <span className="font-mono font-bold text-sky-700">20 Oct 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'payroll':
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Your Salary & Payslips</h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">View monthly salary disbursal statements and download PDF payslips for {currentUser.name}.</p>
          </div>

          <div className="glass-panel p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Latest Salary Disbursal</span>
                <h3 className="text-lg font-bold text-slate-900">August 2026 Payslip</h3>
              </div>
              <button onClick={() => addToast('Payslip downloaded to device.', 'info')} className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-sm">
                Download PDF Payslip
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500">Basic Pay</span>
                <div className="font-bold text-slate-900 mt-0.5 font-mono">₹45,000</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500">HRA & Allowances</span>
                <div className="font-bold text-slate-900 mt-0.5 font-mono">₹20,000</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500">Sales Incentives</span>
                <div className="font-bold text-emerald-700 mt-0.5 font-mono">₹12,500</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500">Net Disbursed</span>
                <div className="font-black text-indigo-700 mt-0.5 font-mono">₹77,500</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'loans':
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Salary Advances & Loans</h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Apply for emergency salary advance and check active EMI recovery schedule.</p>
          </div>

          <div className="glass-panel p-6 space-y-4 max-w-lg text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Request Salary Advance</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              addToast('Salary advance request submitted to HR.', 'success');
            }} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Advance Amount (INR)</label>
                <input type="number" required placeholder="e.g. 25000" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none" />
              </div>
              <button type="submit" className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-sm">Submit Advance Request</button>
            </form>
          </div>
        </div>
      );

    case 'reimbursements':
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Travel & Expense Reimbursements</h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Claim fuel, travel, and field experience center expense bills for approval.</p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            addToast(`Expense claim for ₹${claimAmount} submitted for approval.`, 'success');
            setClaimAmount('');
            setClaimDesc('');
          }} className="glass-panel p-6 space-y-4 max-w-lg text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Submit New Expense Claim</h3>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Claim Amount (INR)</label>
              <input type="number" required placeholder="e.g. 1500" value={claimAmount} onChange={(e) => setClaimAmount(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none" />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Description / Bill Purpose</label>
              <input type="text" required placeholder="e.g. Fuel allowance for Aparna Sarovar Kart commute" value={claimDesc} onChange={(e) => setClaimDesc(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none" />
            </div>
            <button type="submit" className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-sm">Submit Claim for Review</button>
          </form>
        </div>
      );

    case 'organization-tree':
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Organization Reporting Tree</h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Company reporting hierarchy and team structure.</p>
          </div>

          <div className="glass-panel p-6 text-center space-y-4">
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl max-w-xs mx-auto">
              <span className="text-[10px] text-indigo-700 font-bold uppercase">Executive Lead</span>
              <div className="font-bold text-slate-900 text-sm">Rahul Sharma (Admin)</div>
            </div>
            <div className="w-0.5 h-6 bg-slate-300 mx-auto" />
            <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl max-w-xs mx-auto">
              <span className="text-[10px] text-sky-700 font-bold uppercase">Logged In Employee</span>
              <div className="font-bold text-slate-900 text-sm">{currentUser.name} ({currentUser.role.toUpperCase()})</div>
            </div>
          </div>
        </div>
      );

    case 'help-support':
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">HR Help & Support Desk</h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Need help with attendance, payroll, or field tasks? Submit an internal HR ticket.</p>
          </div>

          <div className="glass-panel p-6 space-y-4 max-w-lg text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Create Support Ticket</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              addToast('Support ticket logged with HR Helpdesk.', 'success');
            }} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Issue Category</label>
                <select className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none font-semibold">
                  <option value="attendance">Attendance / Check-In Dispute</option>
                  <option value="payroll">Payroll / Payslip Query</option>
                  <option value="hardware">Mobile Kart / Hardware Issue</option>
                  <option value="other">General HR Assistance</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Details</label>
                <textarea rows={3} required placeholder="Describe your issue..." className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none" />
              </div>
              <button type="submit" className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-sm">Submit Ticket</button>
            </form>
          </div>
        </div>
      );

    default:
      return null;
  }
};
