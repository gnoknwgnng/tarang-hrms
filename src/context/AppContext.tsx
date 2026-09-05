import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, User, Lead, Kart, Toast, LeadStatus, LeadPriority, LeadSource, LoginSession } from '../types';
import { DEMO_USERS, INITIAL_LEADS, INITIAL_KARTS } from '../data/initialData';

interface AppContextType {
  // Authentication
  isAuthenticated: boolean;
  currentUser: User | null;
  activeSession: LoginSession | null;
  loginSessions: LoginSession[];
  login: (username: string, pass: string) => boolean;
  logout: () => void;

  // Data
  users: User[];
  leads: Lead[];
  karts: Kart[];
  toasts: Toast[];

  // Toast
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;

  // Lead Actions
  createLead: (leadData: Partial<Lead>) => { success: boolean; error?: string };
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  reassignLeadRole: (leadId: string, fieldName: 'leadOwner' | 'telecaller' | 'demoBda' | 'salesOwner', newUserName: string) => void;
  requestReassignment: (leadId: string, fieldName: string) => void;
  updateDemoStatus: (leadId: string, newStatus: LeadStatus) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial HRMS Sessions Seed Data
const INITIAL_SESSIONS: LoginSession[] = [
  {
    id: 'sess-101',
    userId: 'usr-admin',
    userName: 'Rahul Sharma',
    userRole: 'admin',
    date: new Date().toLocaleDateString(),
    loginTime: '09:00 AM',
    logoutTime: undefined,
    status: 'Logged In',
    ipLocation: 'Tarang HQ - Gachibowli'
  },
  {
    id: 'sess-102',
    userId: 'usr-bda2',
    userName: 'Vikram Singh',
    userRole: 'bda',
    date: new Date().toLocaleDateString(),
    loginTime: '09:30 AM',
    logoutTime: '05:45 PM',
    status: 'Logged Out',
    durationMinutes: 495,
    ipLocation: 'Inorbit Mall Kart'
  },
  {
    id: 'sess-103',
    userId: 'usr-tele2',
    userName: 'Ananya Rao',
    userRole: 'telecaller',
    date: new Date().toLocaleDateString(),
    loginTime: '09:15 AM',
    logoutTime: '06:00 PM',
    status: 'Logged Out',
    durationMinutes: 525,
    ipLocation: 'Office Desk 4'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('tarang_demo_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeSession, setActiveSession] = useState<LoginSession | null>(() => {
    const saved = localStorage.getItem('tarang_active_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [loginSessions, setLoginSessions] = useState<LoginSession[]>(() => {
    const saved = localStorage.getItem('tarang_login_sessions');
    return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('tarang_demo_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [karts] = useState<Kart[]>(INITIAL_KARTS);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // LocalStorage Sync
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('tarang_demo_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('tarang_demo_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (activeSession) {
      localStorage.setItem('tarang_active_session', JSON.stringify(activeSession));
    } else {
      localStorage.removeItem('tarang_active_session');
    }
  }, [activeSession]);

  useEffect(() => {
    localStorage.setItem('tarang_login_sessions', JSON.stringify(loginSessions));
  }, [loginSessions]);

  useEffect(() => {
    localStorage.setItem('tarang_demo_leads', JSON.stringify(leads));
  }, [leads]);

  const addToast = (message: string, type: Toast['type'] = 'info') => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const login = (username: string, pass: string): boolean => {
    const matched = DEMO_USERS.find(u => 
      u.username.toLowerCase() === username.toLowerCase().trim() && 
      u.password === pass
    );

    if (matched) {
      const { password, ...userObj } = matched;
      setCurrentUser(userObj);

      // HRMS TIME TRACKING: RECORD LOGIN TIMESTAMP
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const todayDate = new Date().toLocaleDateString();

      const newSess: LoginSession = {
        id: `sess-${Date.now()}`,
        userId: userObj.id,
        userName: userObj.name,
        userRole: userObj.role,
        date: todayDate,
        loginTime: nowTime,
        status: 'Logged In',
        ipLocation: userObj.role === 'bda' ? `${userObj.area || 'Field'} GPS` : 'Tarang CRM Portal'
      };

      setActiveSession(newSess);
      setLoginSessions(prev => [newSess, ...prev]);

      addToast(`HRMS Check-In: ${userObj.name} logged in at ${nowTime}`, 'success');
      return true;
    }

    addToast('Invalid username or password. Please use demo credentials.', 'error');
    return false;
  };

  const logout = () => {
    if (activeSession) {
      // HRMS TIME TRACKING: RECORD LOGOUT TIMESTAMP
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setLoginSessions(prev => prev.map(s => {
        if (s.id === activeSession.id) {
          return {
            ...s,
            logoutTime: nowTime,
            status: 'Logged Out'
          };
        }
        return s;
      }));

      addToast(`HRMS Check-Out: ${currentUser?.name} logged out at ${nowTime}`, 'info');
    }

    setCurrentUser(null);
    setActiveSession(null);
    localStorage.removeItem('tarang_demo_user');
    localStorage.removeItem('tarang_active_session');
  };

  const createLead = (leadData: Partial<Lead>): { success: boolean; error?: string } => {
    if (!currentUser) return { success: false, error: 'User not authenticated' };

    if (!leadData.source || leadData.source.trim() === '') {
      addToast('Validation Error: Lead Source is mandatory!', 'error');
      return { success: false, error: 'Lead Source is mandatory. Please select a valid source.' };
    }

    const nowStr = new Date().toISOString();
    const formattedDate = new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    const leadId = `LEAD-${Date.now().toString().slice(-4)}`;

    const bdaUsers = DEMO_USERS.filter(u => u.role === 'bda');
    const teleUsers = DEMO_USERS.filter(u => u.role === 'telecaller');
    
    const assignedBda = currentUser.role === 'bda' ? currentUser.name : (leadData.leadOwner || bdaUsers[0].name);
    const assignedTele = currentUser.role === 'telecaller' ? currentUser.name : (leadData.telecaller || teleUsers[0].name);

    const newLead: Lead = {
      id: leadId,
      customerName: leadData.customerName || 'New Customer',
      phone: leadData.phone || '9800000000',
      city: leadData.city || 'Hyderabad',
      area: leadData.area || 'Gachibowli',
      customerType: leadData.customerType || 'Individual',

      source: leadData.source as LeadSource,
      sourceLocation: leadData.sourceLocation || 'Experience Booth',
      kartId: leadData.kartId,

      createdBy: currentUser.name,
      createdByRole: currentUser.role,

      leadOwner: assignedBda,
      telecaller: assignedTele,
      demoBda: leadData.demoBda || assignedBda,
      salesOwner: leadData.salesOwner || assignedBda,

      status: leadData.status || 'New',
      priority: leadData.priority || 'Warm',
      createdDate: nowStr,
      nextFollowUpDate: leadData.nextFollowUpDate,
      requirement: leadData.requirement,
      budget: leadData.budget,

      timeline: [
        {
          id: `tl-init-${Date.now()}`,
          date: formattedDate,
          event: `Lead created via ${leadData.source} (${leadData.sourceLocation || 'N/A'}). Initial Lead Owner: ${assignedBda}, Telecaller: ${assignedTele}`,
          actor: currentUser.name,
          role: currentUser.role
        }
      ]
    };

    setLeads(prev => [newLead, ...prev]);
    addToast(`Lead ${leadId} created successfully!`, 'success');
    return { success: true };
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    const formattedDate = new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });

    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          status,
          timeline: [
            ...lead.timeline,
            {
              id: `tl-${Date.now()}`,
              date: formattedDate,
              event: `Status updated from "${lead.status}" to "${status}"`,
              actor: currentUser?.name || 'User',
              role: currentUser?.role || 'bda'
            }
          ]
        };
      }
      return lead;
    }));

    addToast(`Lead ${leadId} status updated to "${status}".`, 'info');
  };

  const updateDemoStatus = (leadId: string, newStatus: LeadStatus) => {
    const formattedDate = new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });

    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        const isCompleted = newStatus === 'Demo Completed';
        const updatedSalesOwner = isCompleted ? lead.demoBda : lead.salesOwner;

        const timelineEntries = [
          ...lead.timeline,
          {
            id: `tl-${Date.now()}`,
            date: formattedDate,
            event: `Demo status updated to "${newStatus}"`,
            actor: currentUser?.name || 'User',
            role: currentUser?.role || 'bda'
          }
        ];

        if (isCompleted && updatedSalesOwner !== lead.salesOwner) {
          timelineEntries.push({
            id: `tl-${Date.now() + 1}`,
            date: formattedDate,
            event: `Sales Owner automatically defaulted to Demo BDA (${lead.demoBda}) upon demo completion`,
            actor: 'System',
            role: 'admin'
          });
        }

        return {
          ...lead,
          status: newStatus,
          salesOwner: updatedSalesOwner,
          timeline: timelineEntries
        };
      }
      return lead;
    }));

    addToast(`Demo status updated to "${newStatus}".`, 'success');
  };

  const reassignLeadRole = (leadId: string, fieldName: 'leadOwner' | 'telecaller' | 'demoBda' | 'salesOwner', newUserName: string) => {
    if (currentUser?.role !== 'admin') {
      addToast('Only Admin users can directly reassign ownership fields.', 'error');
      return;
    }

    const formattedDate = new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    const fieldLabels = {
      leadOwner: 'Lead Owner',
      telecaller: 'Telecaller',
      demoBda: 'Demo BDA',
      salesOwner: 'Sales Owner'
    };

    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        const oldVal = lead[fieldName];
        return {
          ...lead,
          [fieldName]: newUserName,
          timeline: [
            ...lead.timeline,
            {
              id: `tl-${Date.now()}`,
              date: formattedDate,
              event: `${fieldLabels[fieldName]} reassigned from "${oldVal}" to "${newUserName}" by Admin`,
              actor: currentUser.name,
              role: 'admin'
            }
          ]
        };
      }
      return lead;
    }));

    addToast(`${fieldLabels[fieldName]} updated to "${newUserName}".`, 'success');
  };

  const requestReassignment = (leadId: string, fieldName: string) => {
    addToast(`Reassignment request for ${fieldName} on lead ${leadId} sent to Admin!`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated: !!currentUser,
        currentUser,
        activeSession,
        loginSessions,
        login,
        logout,
        users: DEMO_USERS,
        leads,
        karts: INITIAL_KARTS,
        toasts,
        addToast,
        removeToast,
        createLead,
        updateLeadStatus,
        reassignLeadRole,
        requestReassignment,
        updateDemoStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
