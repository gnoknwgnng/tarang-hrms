import React, { useState } from 'react';
import { Lead, AdminModuleId } from '../../types';
import { AdminSidebar } from '../Admin/AdminSidebar';
import { AdminModuleViews } from '../Admin/AdminModuleViews';

interface AdminDashboardProps {
  onSelectLead: (lead: Lead) => void;
  onOpenCreateLeadModal?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSelectLead, onOpenCreateLeadModal }) => {
  const [activeModule, setActiveModule] = useState<AdminModuleId>('home');

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 animate-fade-in">
      
      {/* 20 Modules Categorized Sidebar / Drawer */}
      <AdminSidebar
        activeModule={activeModule}
        onSelectModule={(modId) => setActiveModule(modId)}
      />

      {/* Main View Container */}
      <div className="flex-1 min-w-0">
        <AdminModuleViews
          activeModule={activeModule}
          onSelectLead={onSelectLead}
          onOpenCreateLeadModal={onOpenCreateLeadModal}
        />
      </div>

    </div>
  );
};
