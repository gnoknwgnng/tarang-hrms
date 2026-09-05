import React, { useState } from 'react';
import { Lead, AdminModuleId } from '../../types';
import { AdminSidebar } from '../Admin/AdminSidebar';
import { AdminModuleViews } from '../Admin/AdminModuleViews';

export const AdminDashboard: React.FC<{ onSelectLead: (lead: Lead) => void }> = ({ onSelectLead }) => {
  const [activeModule, setActiveModule] = useState<AdminModuleId>('home');

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
      
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
        />
      </div>

    </div>
  );
};
