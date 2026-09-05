import React, { useState } from 'react';
import { Search, Calendar as CalendarIcon, Upload, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface EmployeeAttendanceItem {
  id: string;
  initials: string;
  name: string;
  department: string;
  shift: string;
  workHours: string;
  status: string;
  inTime: string;
  outTime: string;
  avatarBg: string;
}

export const AttendanceDirectory: React.FC = () => {
  const { addToast } = useApp();

  const [attSearchTerm, setAttSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedDate, setSelectedDate] = useState('2026-09-05');

  const [employeeAttendanceList, setEmployeeAttendanceList] = useState<EmployeeAttendanceItem[]>([
    {
      id: 'TRNG26-033',
      initials: 'AS',
      name: 'Akash Somavarapu',
      department: 'Operations/Marketing',
      shift: 'Regular',
      workHours: '8h 15m',
      status: 'Checked-IN',
      inTime: '09:15 AM',
      outTime: '--',
      avatarBg: 'bg-sky-600 text-white'
    },
    {
      id: 'RNK-002',
      initials: 'KK',
      name: 'Kalisetty Kiran Kumar',
      department: 'Management',
      shift: 'Regular',
      workHours: '8h 45m',
      status: 'Present',
      inTime: '09:00 AM',
      outTime: '05:45 PM',
      avatarBg: 'bg-indigo-600 text-white'
    },
    {
      id: 'RNK25-020',
      initials: 'MS',
      name: 'Movva Srinija',
      department: 'Quality Assurance',
      shift: 'Regular',
      workHours: '0h',
      status: 'Week Off',
      inTime: '--',
      outTime: '--',
      avatarBg: 'bg-purple-600 text-white'
    },
    {
      id: 'RNK25-012',
      initials: 'SK',
      name: 'Sathram Vijay Kumar',
      department: 'Development/IT',
      shift: 'Regular',
      workHours: '0h',
      status: 'Not Marked',
      inTime: '--',
      outTime: '--',
      avatarBg: 'bg-emerald-600 text-white'
    },
    {
      id: 'TRNG26-005',
      initials: 'RV',
      name: 'Rahul Verma',
      department: 'Sales/BDA',
      shift: 'Field Shift',
      workHours: '7h 30m',
      status: 'Checked-IN',
      inTime: '09:30 AM',
      outTime: '--',
      avatarBg: 'bg-amber-600 text-white'
    },
    {
      id: 'TRNG26-006',
      initials: 'PP',
      name: 'Priya Patel',
      department: 'Telecalling',
      shift: 'Regular',
      workHours: '8h 00m',
      status: 'Present',
      inTime: '09:00 AM',
      outTime: '05:00 PM',
      avatarBg: 'bg-rose-600 text-white'
    }
  ]);

  const checkedInCount = employeeAttendanceList.filter(a => a.status === 'Checked-IN').length;
  const presentCount = employeeAttendanceList.filter(a => a.status === 'Present').length;
  const leaveCount = employeeAttendanceList.filter(a => a.status === 'Leave').length;
  const holidayCount = 0;
  const weekoffCount = employeeAttendanceList.filter(a => a.status === 'Week Off').length;
  
  const absentCount = employeeAttendanceList.filter(a => a.status === 'Absent').length;
  const notMarkedCount = employeeAttendanceList.filter(a => a.status === 'Not Marked').length;
  const penaltyCount = 0;
  const otCount = 0;
  const regReqCount = 0;

  const handleMarkAction = (empId: string, actionCode: string) => {
    const actionLabels: Record<string, string> = {
      P: 'Present',
      HD: 'Half Day',
      A: 'Absent',
      L: 'Leave',
      PT: 'Penalty',
      OT: 'Overtime',
      DO: 'Week Off',
      UM: 'Not Marked'
    };

    const newStatus = actionLabels[actionCode] || 'Present';
    setEmployeeAttendanceList(prev => prev.map(emp => {
      if (emp.id === empId) {
        return {
          ...emp,
          status: newStatus,
          inTime: newStatus === 'Present' || newStatus === 'Checked-IN' ? (emp.inTime === '--' ? '09:00 AM' : emp.inTime) : '--'
        };
      }
      return emp;
    }));

    addToast(`Marked ${actionCode} (${newStatus}) for employee ${empId}`, 'info');
  };

  const filteredAttendance = employeeAttendanceList.filter(emp => {
    return emp.name.toLowerCase().includes(attSearchTerm.toLowerCase()) || 
           emp.id.toLowerCase().includes(attSearchTerm.toLowerCase()) ||
           emp.department.toLowerCase().includes(attSearchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      
      {/* SEARCH & CONTROLS HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 glass-panel p-4">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, ID, or department..."
            value={attSearchTerm}
            onChange={(e) => setAttSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-2xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-sky-600 font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Branch Selector */}
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-2xl px-3.5 py-2.5 focus:outline-none"
          >
            <option value="All Branches">All Branches</option>
            <option value="Hyderabad HQ">Hyderabad HQ</option>
            <option value="Gachibowli Experience Center">Gachibowli Center</option>
            <option value="Inorbit Mall Kart">Inorbit Mall Kart</option>
          </select>

          {/* Date Selector */}
          <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs text-slate-800 font-mono">
            <CalendarIcon className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-slate-900 focus:outline-none font-mono font-bold"
            />
          </div>

          {/* Bulk Upload Button */}
          <button
            onClick={() => addToast('Bulk Attendance Upload feature ready.', 'info')}
            className="flex items-center space-x-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-2xl shadow-md shadow-sky-600/20 transition whitespace-nowrap"
          >
            <Upload className="w-4 h-4" />
            <span>Bulk Upload</span>
          </button>
        </div>

      </div>

      {/* TWO-ROW ATTENDANCE SUMMARY COUNTERS */}
      <div className="space-y-3">
        
        {/* ROW 1: Checked-IN, Present, Leave, Holiday, Weekoff */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-bold">
          
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between shadow-sm">
            <span className="text-emerald-800 flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Checked-IN
            </span>
            <span className="text-xl font-black text-emerald-900">{checkedInCount}</span>
          </div>

          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between shadow-sm">
            <span className="text-emerald-800 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Present
            </span>
            <span className="text-xl font-black text-emerald-900">{presentCount}</span>
          </div>

          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between shadow-sm">
            <span className="text-amber-800 font-bold">Leave</span>
            <span className="text-xl font-black text-amber-900">{leaveCount}</span>
          </div>

          <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-2xl flex items-center justify-between shadow-sm">
            <span className="text-purple-800 font-bold">Holiday</span>
            <span className="text-xl font-black text-purple-900">{holidayCount}</span>
          </div>

          <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-2xl flex items-center justify-between shadow-sm">
            <span className="text-sky-800 font-bold">Weekoff</span>
            <span className="text-xl font-black text-sky-900">{weekoffCount}</span>
          </div>

        </div>

        {/* ROW 2: Absent, Not Marked, Penalty, OT, Regularization Requests */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-bold">
          
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between shadow-sm">
            <span className="text-rose-800 font-bold">Absent</span>
            <span className="text-xl font-black text-rose-900">{absentCount}</span>
          </div>

          <div className="p-3.5 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm">
            <span className="text-slate-700 font-bold">Not Marked</span>
            <span className="text-xl font-black text-slate-900">{notMarkedCount}</span>
          </div>

          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between shadow-sm">
            <span className="text-amber-800 font-bold">Penalty</span>
            <span className="text-xl font-black text-amber-900">{penaltyCount}</span>
          </div>

          <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-between shadow-sm">
            <span className="text-indigo-800 font-bold">OT (Overtime)</span>
            <span className="text-xl font-black text-indigo-900">{otCount}</span>
          </div>

          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between shadow-sm">
            <span className="text-rose-800 font-bold">Regularization Req.</span>
            <span className="text-xl font-black text-rose-900">{regReqCount}</span>
          </div>

        </div>

      </div>

      {/* EMPLOYEE ATTENDANCE TABLE */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-900 text-sm">Employee Attendance Directory</h3>
          <span className="text-xs font-mono text-slate-500 font-medium">Showing {filteredAttendance.length} records</span>
        </div>

        <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-200/80">
          <table className="w-full text-left text-xs text-slate-800 min-w-[850px]">
            <thead className="bg-slate-100 text-slate-600 font-extrabold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4 whitespace-nowrap">Employee</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Department</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Shift</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Work Hours</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Status & Punch Time</th>
                <th className="py-3.5 px-4 text-center whitespace-nowrap">Action (Quick Override Grid)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredAttendance.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Employee Avatar & Name */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-full ${emp.avatarBg} flex items-center justify-center font-black text-xs shadow-sm shrink-0`}>
                        {emp.initials}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{emp.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono font-medium">{emp.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="py-3.5 px-4 font-semibold text-slate-700 whitespace-nowrap">{emp.department}</td>

                  {/* Shift */}
                  <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">{emp.shift}</td>

                  {/* Work Hours */}
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-700 whitespace-nowrap">{emp.workHours}</td>

                  {/* Status Pill Badge & In/Out Timestamps */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-[10px] font-black rounded-full ${
                      emp.status === 'Checked-IN' || emp.status === 'Present'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : emp.status === 'Week Off'
                        ? 'bg-sky-100 text-sky-800 border border-sky-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {emp.status}
                    </span>
                    <div className="text-[10px] text-slate-500 font-mono mt-1 space-x-2">
                      <span>In: <strong className="text-slate-900">{emp.inTime}</strong></span>
                      <span>Out: <strong className="text-slate-900">{emp.outTime}</strong></span>
                    </div>
                  </td>

                  {/* ACTION OVERRIDE BUTTON GRID */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="grid grid-cols-4 gap-1 max-w-[220px] mx-auto text-[10px] font-bold text-center">
                      <button
                        onClick={() => handleMarkAction(emp.id, 'P')}
                        className="py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded border border-slate-200 shadow-2xs transition"
                        title="Mark Present"
                      >
                        P
                      </button>

                      <button
                        onClick={() => handleMarkAction(emp.id, 'HD')}
                        className="py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded border border-slate-200 shadow-2xs transition"
                        title="Mark Half Day"
                      >
                        HD
                      </button>

                      <button
                        onClick={() => handleMarkAction(emp.id, 'A')}
                        className="py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded border border-rose-200 shadow-2xs transition"
                        title="Mark Absent"
                      >
                        A
                      </button>

                      <button
                        onClick={() => handleMarkAction(emp.id, 'L')}
                        className="py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded border border-slate-200 shadow-2xs transition"
                        title="Mark Leave"
                      >
                        L
                      </button>

                      <button
                        onClick={() => handleMarkAction(emp.id, 'PT')}
                        className="py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded border border-slate-200 shadow-2xs transition"
                        title="Mark Penalty"
                      >
                        PT
                      </button>

                      <button
                        onClick={() => handleMarkAction(emp.id, 'OT')}
                        className="py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded border border-slate-200 shadow-2xs transition"
                        title="Mark Overtime"
                      >
                        OT
                      </button>

                      <button
                        onClick={() => handleMarkAction(emp.id, 'DO')}
                        className="py-1 bg-sky-600 hover:bg-sky-500 text-white rounded shadow-sm transition"
                        title="Mark Day Off / Week Off"
                      >
                        DO
                      </button>

                      <button
                        onClick={() => handleMarkAction(emp.id, 'UM')}
                        className="py-1 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded border border-slate-200 shadow-2xs transition"
                        title="Unmark / Reset"
                      >
                        UM
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
