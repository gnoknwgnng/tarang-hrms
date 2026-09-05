import React, { useState } from 'react';
import { AdminModuleId } from '../../types';
import { 
  Home, UserCheck, ShoppingBag, MapPin, CheckSquare, Building2, Users, CalendarCheck, 
  CalendarOff, DollarSign, CreditCard, Receipt, FileText, Briefcase, 
  GitFork, BarChart3, HelpCircle, Award, Wallet, GraduationCap, 
  UserPlus, PackageSearch, ChevronLeft, ChevronRight, Menu, X 
} from 'lucide-react';

interface AdminSidebarProps {
  activeModule: AdminModuleId;
  onSelectModule: (id: AdminModuleId) => void;
}

interface ModuleItem {
  id: AdminModuleId;
  label: string;
  icon: React.ElementType;
}

interface CategoryGroup {
  category: string;
  items: ModuleItem[];
}

export const ADMIN_MODULE_GROUPS: CategoryGroup[] = [
  {
    category: 'People & Core HRMS',
    items: [
      { id: 'home', label: 'Home / Overview', icon: Home },
      { id: 'leads', label: 'Leads Directory', icon: UserCheck },
      { id: 'employees', label: 'Employees', icon: Users },
      { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
      { id: 'leave', label: 'Leave & Holidays', icon: CalendarOff },
      { id: 'organization-tree', label: 'Organization Tree', icon: GitFork },
      { id: 'performance-and-reviews', label: 'Performance & Reviews', icon: Award }
    ]
  },
  {
    category: 'Field Operations & Assets',
    items: [
      { id: 'products', label: 'Products Catalog', icon: ShoppingBag },
      { id: 'geo-tracking', label: 'Geo Tracking', icon: MapPin },
      { id: 'tasks', label: 'Task Management', icon: CheckSquare },
      { id: 'asset-tracking', label: 'Asset Tracking', icon: PackageSearch },
      { id: 'managements', label: 'Managements & Karts', icon: Building2 },
      { id: 'recruitments', label: 'Recruitments', icon: UserPlus },
      { id: 'learning-and-development', label: 'Learning & Dev', icon: GraduationCap }
    ]
  },
  {
    category: 'Finance & Compensation',
    items: [
      { id: 'payroll', label: 'Payroll Management', icon: DollarSign },
      { id: 'loans', label: 'Loans & Advances', icon: CreditCard },
      { id: 'reimbursements', label: 'Reimbursements', icon: Receipt },
      { id: 'expenses-and-claims', label: 'Expenses & Claims', icon: Wallet }
    ]
  },
  {
    category: 'Governance & Support',
    items: [
      { id: 'organization-rules', label: 'Organization Rules', icon: FileText },
      { id: 'adminstrative-work', label: 'Administrative Work', icon: Briefcase },
      { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
      { id: 'help-support', label: 'Help & Support', icon: HelpCircle }
    ]
  }
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeModule, onSelectModule }) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4 flex items-center justify-between glass-panel p-3">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
          Admin HRMS Menu (20 Modules)
        </span>
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="p-2 bg-slate-100 text-slate-700 hover:text-slate-900 rounded-xl border border-slate-200 transition"
        >
          {isOpenMobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`glass-panel p-4 flex flex-col transition-all duration-300 z-40 self-start lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] ${
          isOpenMobile ? 'fixed top-20 left-4 right-4 bottom-4 overflow-y-auto lg:static' : 'hidden lg:flex'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        {/* Header / Collapse Control */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
          {!isCollapsed && (
            <span className="text-[11px] font-black text-slate-900 uppercase tracking-wider">
              HRMS Suite Nav
            </span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition ml-auto"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Modules List */}
        <div className="space-y-4 overflow-y-auto no-scrollbar flex-1">
          {ADMIN_MODULE_GROUPS.map((group, idx) => (
            <div key={idx} className="space-y-1">
              {!isCollapsed && (
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-2 py-1">
                  {group.category}
                </div>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectModule(item.id);
                      setIsOpenMobile(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
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
          ))}
        </div>
      </aside>
    </>
  );
};
