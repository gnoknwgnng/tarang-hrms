export type UserRole = 'admin' | 'bda' | 'telecaller';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  username: string;
  phone: string;
  email: string;
  area?: string;
}

export type CustomerType = 
  | 'Individual' 
  | 'Architect' 
  | 'Interior Designer' 
  | 'Furniture Store' 
  | 'Corporate' 
  | 'Hotel' 
  | 'Builder' 
  | 'Real Estate' 
  | 'Office' 
  | 'Other';

export type LeadSource = 
  | 'Kart – Gated Community'
  | 'Kart – Mall'
  | 'Kart – Exhibition'
  | 'Kart – Event'
  | 'Furniture Store'
  | 'Architecture Firm'
  | 'Interior Designer'
  | 'Referral'
  | 'Website'
  | 'Instagram'
  | 'Facebook'
  | 'WhatsApp'
  | 'Direct Enquiry'
  | 'Other';

export type LeadStatus = 
  | 'New'
  | 'Assigned'
  | 'Contacted'
  | 'Interested'
  | 'Demo Scheduled'
  | 'Demo Completed'
  | 'Converted'
  | 'Lost';

export type LeadPriority = 'Hot' | 'Warm' | 'Cold';

export interface TimelineEntry {
  id: string;
  date: string;
  event: string;
  actor: string;
  role: UserRole;
}

export interface Lead {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  area: string;
  customerType: CustomerType;

  // 1st & 2nd level source
  source: LeadSource;
  sourceLocation?: string;
  kartId?: string;

  // Audit of creation
  createdBy: string;
  createdByRole: UserRole;

  // 4 DISTINCT Ownership fields
  leadOwner: string;
  telecaller: string;
  demoBda: string;
  salesOwner: string;

  status: LeadStatus;
  priority: LeadPriority;
  createdDate: string;
  nextFollowUpDate?: string;
  requirement?: string;
  budget?: number;

  timeline: TimelineEntry[];
}

export interface Kart {
  id: string;
  name: string;
  location: string;
  assignedBda: string;
  status: 'Active' | 'Deployed' | 'Maintenance';
}

export interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

// HRMS Employee Login / Logout Time Tracking
export interface LoginSession {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  date: string;
  loginTime: string;
  logoutTime?: string;
  status: 'Logged In' | 'Logged Out';
  durationMinutes?: number;
  ipLocation?: string;
}

// 20 Requested Admin HRMS & Operations Modules
export type AdminModuleId = 
  | 'home'
  | 'geo-tracking'
  | 'tasks'
  | 'managements'
  | 'employees'
  | 'attendance'
  | 'leave'
  | 'payroll'
  | 'loans'
  | 'reimbursements'
  | 'organization-rules'
  | 'adminstrative-work'
  | 'organization-tree'
  | 'reports'
  | 'help-support'
  | 'performance-and-reviews'
  | 'expenses-and-claims'
  | 'learning-and-development'
  | 'recruitments'
  | 'asset-tracking';
