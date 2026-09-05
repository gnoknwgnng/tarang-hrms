import React, { useState } from 'react';
import { 
  Home, UserCheck, CheckSquare, PackageSearch, Clock, CalendarOff, 
  DollarSign, CreditCard, Receipt, GitFork, HelpCircle, 
  ChevronLeft, ChevronRight, Menu, X 
} from 'lucide-react';

export type EmployeeTabId = 
  | 'home'
  | 'leads'
  | 'your-tasks'
  | 'your-assets'
  | 'attendance'
  | 'leave-holidays'
  | 'payroll'
  | 'loans'
  | 'reimbursements'
  | 'organization-tree'
  | 'help-support';

interface EmployeeSidebarProps {
  activeTab: EmployeeTabId;
  onSelectTab: (tab: EmployeeTabId) => void;
  userRoleLabel: string;
}

export const EMPLOYEE_NAV_ITEMS = [
  { id: 'home' as EmployeeTabId, label: 'Home', icon: Home },
  { id: 'leads' as EmployeeTabId, label: 'Leads', icon: UserCheck },
  { id: 'your-tasks' as EmployeeTabId, label: 'Your Tasks', icon: CheckSquare },
  { id: 'your-assets' as EmployeeTabId, label: 'Your Assets', icon: PackageSearch },
  { id: 'attendance' as EmployeeTabId, label: 'Attendance', icon: Clock },
  { id: 'leave-holidays' as EmployeeTabId, label: 'Leave & Holidays', icon: CalendarOff },
  { id: 'payroll' as EmployeeTabId, label: 'Payroll', icon: DollarSign },
  { id: 'loans' as EmployeeTabId, label: 'Loans', icon: CreditCard },
  { id: 'reimbursements' as EmployeeTabId, label: 'Reimbursements', icon: Receipt },
  { id: 'organization-tree' as EmployeeTabId, label: 'Organization Tree', icon: GitFork },
  { id: 'help-support' as EmployeeTabId, label: 'Help & Support', icon: HelpCircle },
];

export const EmployeeSidebar: React.FC<EmployeeSidebarProps> = ({ activeTab, onSelectTab, userRoleLabel }) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4 flex items-center justify-between glass-panel p-3">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
          {userRoleLabel} HRMS Options
        </span>
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="p-2 bg-slate-100 text-slate-700 hover:text-slate-900 rounded-xl border border-slate-200 transition"
        >
          {isOpenMobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`glass-panel p-4 flex flex-col transition-all duration-300 z-40 ${
          isOpenMobile ? 'fixed top-20 left-4 right-4 bottom-4 overflow-y-auto lg:static' : 'hidden lg:flex'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-60'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
          {!isCollapsed && (
            <span className="text-[11px] font-black text-slate-900 uppercase tracking-wider">
              Navigation Menu
            </span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition ml-auto"
            title={isCollapsed ? "Expand Navigation" : "Collapse Navigation"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* 10 Navigation Items */}
        <div className="space-y-1.5 overflow-y-auto no-scrollbar flex-1">
          {EMPLOYEE_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setIsOpenMobile(false);
                }}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive 
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
                title={item.label}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                {!isCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
};
