import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerType, LeadSource, LeadPriority } from '../../types';
import { X, PlusCircle, AlertCircle, Shield } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose }) => {
  const { createLead, karts, currentUser } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [area, setArea] = useState('Gachibowli');
  const [customerType, setCustomerType] = useState<CustomerType>('Individual');
  
  // Mandatory Source field
  const [source, setSource] = useState<string>(''); // Default empty to test validation!
  const [sourceLocation, setSourceLocation] = useState('');
  const [kartId, setKartId] = useState('');
  const [priority, setPriority] = useState<LeadPriority>('Warm');
  const [requirement, setRequirement] = useState('');
  const [budget, setBudget] = useState<number | undefined>(200000);

  // Validation Error state
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // MANDATORY SOURCE VALIDATION
    if (!source || source.trim() === '') {
      setErrorMsg('Validation Error: Lead Source is mandatory! Please select a source.');
      return;
    }

    const res = createLead({
      customerName,
      phone,
      city,
      area,
      customerType,
      source: source as LeadSource,
      sourceLocation: sourceLocation || 'Direct Entry',
      kartId: source.includes('Kart') ? (kartId || 'TK-004') : undefined,
      priority,
      requirement,
      budget
    });

    if (res.success) {
      onClose();
      // Reset form
      setCustomerName('');
      setPhone('');
      setSource('');
      setRequirement('');
      setErrorMsg('');
    } else {
      setErrorMsg(res.error || 'Failed to save lead.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-sky-600" />
              Add New Lead
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Created By (Auto-populated): <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.role.toUpperCase()})
            </p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          
          {/* Validation Error Alert */}
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-center space-x-2 font-semibold">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Auto-populated CreatedBy Badge */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-slate-700">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Created By (Read-Only)</span>
              <span className="font-bold text-slate-900">{currentUser.name}</span>
            </div>
            <span className="px-2.5 py-1 bg-sky-50 text-sky-800 rounded-lg text-[10px] font-mono border border-sky-200 font-bold">
              Role: {currentUser.role}
            </span>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Customer Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Reddy"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2 focus:bg-white focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
              <input
                type="text"
                required
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2 font-mono focus:bg-white focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">City / Area</label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Gachibowli, Hyderabad"
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2 focus:bg-white focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Customer Type</label>
              <select
                value={customerType}
                onChange={(e) => setCustomerType(e.target.value as CustomerType)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2 focus:bg-white focus:border-sky-500 focus:outline-none"
              >
                <option value="Individual">Individual</option>
                <option value="Architect">Architect</option>
                <option value="Interior Designer">Interior Designer</option>
                <option value="Corporate">Corporate</option>
                <option value="Office">Office</option>
                <option value="Hotel">Hotel</option>
                <option value="Furniture Store">Furniture Store</option>
              </select>
            </div>
          </div>

          {/* MANDATORY SOURCE SELECTOR */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
            <label className="block font-bold text-amber-900 text-xs">
              Lead Source * (Mandatory — Save blocked if unselected)
            </label>
            <select
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              className="w-full bg-white border border-amber-300 text-slate-900 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 font-semibold"
            >
              <option value="">-- Select Lead Source (Required) --</option>
              <option value="Kart – Gated Community">Kart – Gated Community</option>
              <option value="Kart – Mall">Kart – Mall</option>
              <option value="Kart – Exhibition">Kart – Exhibition</option>
              <option value="Website">Website</option>
              <option value="Interior Designer">Interior Designer</option>
              <option value="Architecture Firm">Architecture Firm</option>
              <option value="Referral">Referral</option>
              <option value="Instagram">Instagram</option>
              <option value="Direct Enquiry">Direct Enquiry</option>
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <input
                type="text"
                placeholder="Source Location (e.g. Aparna Sarovar)"
                value={sourceLocation}
                onChange={(e) => setSourceLocation(e.target.value)}
                className="w-full bg-white border border-amber-300 text-slate-900 rounded-xl px-3 py-1.5 focus:outline-none"
              />
              {source.includes('Kart') && (
                <select
                  value={kartId}
                  onChange={(e) => setKartId(e.target.value)}
                  className="w-full bg-white border border-amber-300 text-slate-900 rounded-xl px-3 py-1.5 font-mono focus:outline-none"
                >
                  <option value="">Select Kart ID</option>
                  {karts.map(k => (
                    <option key={k.id} value={k.id}>{k.id} - {k.location}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Priority & Requirement */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Lead Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as LeadPriority)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2 focus:bg-white focus:border-sky-500 focus:outline-none"
              >
                <option value="Hot">Hot Priority</option>
                <option value="Warm">Warm Priority</option>
                <option value="Cold">Cold Priority</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Expected Budget (INR)</label>
              <input
                type="number"
                value={budget || ''}
                onChange={(e) => setBudget(Number(e.target.value))}
                placeholder="200000"
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2 focus:bg-white focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Customer Requirement Notes</label>
            <textarea
              rows={2}
              placeholder="e.g. Needs L-shaped leather sofa & marble dining table..."
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2 focus:bg-white focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 border border-slate-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-md shadow-sky-600/20 transition"
            >
              Save & Auto-Assign Lead
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
