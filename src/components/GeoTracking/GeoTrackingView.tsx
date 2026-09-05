import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, RefreshCw, Radio, Activity, Navigation, Clock, 
  Users, CheckCircle2, AlertCircle, Shield, Sliders, ChevronRight 
} from 'lucide-react';

export const GeoTrackingView: React.FC = () => {
  const { users, currentUser } = useApp();

  const [geoTab, setGeoTab] = useState<'live' | 'timeline' | 'dashboard' | 'settings'>('live');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState<string>('usr-bda1');

  // Seed Live Employee Locations Data
  const [employeeLocations, setEmployeeLocations] = useState([
    {
      id: 'usr-bda1',
      name: 'Rahul Verma (BDA)',
      role: 'bda',
      status: 'active', // active, recent, inactive
      statusLabel: 'Active Now',
      area: 'Gachibowli - Aparna Sarovar',
      lat: 17.4447,
      lng: 78.3483,
      lastUpdate: 'Just now',
      kartId: 'TK-004',
      battery: '88%'
    },
    {
      id: 'usr-bda2',
      name: 'Vikram Singh (BDA)',
      role: 'bda',
      status: 'active',
      statusLabel: 'Active Now',
      area: 'Kondapur - Inorbit Mall',
      lat: 17.4375,
      lng: 78.3814,
      lastUpdate: '2 mins ago',
      kartId: 'TK-002',
      battery: '74%'
    },
    {
      id: 'usr-bda3',
      name: 'Sneha Reddy (BDA)',
      role: 'bda',
      status: 'recent',
      statusLabel: 'Recent (15m ago)',
      area: 'Hitec City - Forum Sujana Mall',
      lat: 17.4504,
      lng: 78.3808,
      kartId: 'TK-001',
      lastUpdate: '15 mins ago',
      battery: '52%'
    },
    {
      id: 'usr-tele1',
      name: 'Priya Patel (Telecaller)',
      role: 'telecaller',
      status: 'active',
      statusLabel: 'Active Now',
      area: 'Tarang HQ - Gachibowli Desk 1',
      lat: 17.4400,
      lng: 78.3480,
      lastUpdate: 'Just now',
      battery: '100%'
    },
    {
      id: 'usr-tele2',
      name: 'Ananya Rao (Telecaller)',
      role: 'telecaller',
      status: 'recent',
      statusLabel: 'Recent (10m ago)',
      area: 'Tarang HQ - Desk 3',
      lat: 17.4400,
      lng: 78.3480,
      lastUpdate: '10 mins ago',
      battery: '91%'
    },
    {
      id: 'usr-tele3',
      name: 'Ramesh Kumar (Telecaller)',
      role: 'telecaller',
      status: 'inactive',
      statusLabel: 'Inactive',
      area: 'Logged Out',
      lat: 17.4400,
      lng: 78.3480,
      lastUpdate: '2 hours ago',
      battery: '15%'
    },
    {
      id: 'usr-admin',
      name: 'Rahul Sharma (Admin)',
      role: 'admin',
      status: 'active',
      statusLabel: 'Active Now',
      area: 'Tarang HQ - Admin Suite',
      lat: 17.4400,
      lng: 78.3480,
      lastUpdate: 'Just now',
      battery: '99%'
    }
  ]);

  const activeCount = employeeLocations.filter(e => e.status === 'active').length;
  const recentCount = employeeLocations.filter(e => e.status === 'recent').length;
  const inactiveCount = employeeLocations.filter(e => e.status === 'inactive').length;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setEmployeeLocations(prev => prev.map(emp => ({
        ...emp,
        lastUpdate: emp.status === 'active' ? 'Just now' : emp.lastUpdate
      })));
      setIsRefreshing(false);
    }, 600);
  };

  const selectedEmp = employeeLocations.find(e => e.id === selectedEmpId) || employeeLocations[0];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 glass-panel p-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 text-[10px] font-extrabold bg-sky-100 text-sky-800 border border-sky-200 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Radio className="w-3 h-3 text-sky-600 animate-pulse" />
              HRMS Geo Tracking Module
            </span>
            <span className="text-xs text-slate-500 font-mono font-medium">Real-time GPS Field Workforce Monitoring</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
            Geo Tracking & Live Location Map
          </h1>
        </div>

        {/* Refresh & SSE Status Badge */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SSE Connected</span>
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold rounded-2xl">
            <Activity className="w-3.5 h-3.5 text-sky-600" />
            <span>Live Data</span>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-2xl border border-slate-200 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-sky-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* SUB TABS NAVIGATION */}
      <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-fit">
        <button
          onClick={() => setGeoTab('live')}
          className={`flex items-center space-x-2 px-5 py-2 text-xs font-bold rounded-xl transition-all ${
            geoTab === 'live' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Live Tracking</span>
        </button>

        <button
          onClick={() => setGeoTab('timeline')}
          className={`flex items-center space-x-2 px-5 py-2 text-xs font-bold rounded-xl transition-all ${
            geoTab === 'timeline' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Timeline</span>
        </button>

        <button
          onClick={() => setGeoTab('dashboard')}
          className={`flex items-center space-x-2 px-5 py-2 text-xs font-bold rounded-xl transition-all ${
            geoTab === 'dashboard' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setGeoTab('settings')}
          className={`flex items-center space-x-2 px-5 py-2 text-xs font-bold rounded-xl transition-all ${
            geoTab === 'settings' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Settings</span>
        </button>
      </div>

      {/* METRIC CARDS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Employees</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">{employeeLocations.length}</div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">Registered workforce</div>
        </div>

        <div className="glass-panel p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Active Now
            </span>
            <Navigation className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600 mt-2">{activeCount}</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">Live GPS Sharing</div>
        </div>

        <div className="glass-panel p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Recent
            </span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-600 mt-2">{recentCount}</div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">Updated in last 30m</div>
        </div>

        <div className="glass-panel p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Inactive
            </span>
            <AlertCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-3xl font-black text-rose-600 mt-2">{inactiveCount}</div>
          <div className="text-[11px] text-rose-700 font-semibold mt-1">Logged off / Offline</div>
        </div>

      </div>

      {/* TAB 1: LIVE TRACKING MAP & EMPLOYEE LIST */}
      {geoTab === 'live' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* SIMULATED MAP DISPLAY */}
          <div className="lg:col-span-2 glass-panel p-6 flex flex-col justify-between relative overflow-hidden min-h-[28rem]">
            
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-sky-600" />
                <h2 className="text-base font-bold text-slate-900">
                  Live Employee Location Map (Hyderabad Region)
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-mono">Last updated: Just now</span>
            </div>

            {/* MAP STYLING CANVAS GRID */}
            <div className="my-4 rounded-2xl bg-slate-50 border border-slate-200 p-6 relative overflow-hidden flex-1 flex flex-col justify-between">
              
              {/* Map grid lines simulation */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 pointer-events-none" />

              {/* Map Pins for Employees */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 my-auto">
                {employeeLocations.map((emp) => {
                  const isSelected = emp.id === selectedEmpId;
                  return (
                    <div
                      key={emp.id}
                      onClick={() => setSelectedEmpId(emp.id)}
                      className={`p-3.5 rounded-2xl border transition cursor-pointer backdrop-blur-md ${
                        isSelected
                          ? 'bg-sky-50/90 border-sky-500 ring-2 ring-sky-500/20 shadow-md'
                          : 'bg-white/90 border-slate-200 hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            emp.status === 'active' ? 'bg-emerald-500 animate-pulse' : emp.status === 'recent' ? 'bg-amber-500' : 'bg-rose-500'
                          }`} />
                          <h4 className="text-xs font-bold text-slate-900">{emp.name}</h4>
                        </div>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-slate-100 text-sky-800 rounded border border-slate-200">
                          {emp.kartId || emp.role.toUpperCase()}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-700 mt-1 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-sky-600 shrink-0" />
                        <span>{emp.area}</span>
                      </p>

                      <div className="mt-2 text-[10px] text-slate-500 font-mono flex justify-between items-center border-t border-slate-100 pt-1.5">
                        <span>Lat/Lng: {emp.lat}, {emp.lng}</span>
                        <span className="text-slate-700 font-semibold">{emp.lastUpdate}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Footer Status Bar */}
              <div className="relative z-10 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Status: <strong className="text-emerald-700">Connected</strong></span>
                <span>Data Source: <strong className="text-sky-700">redis_live_gps</strong></span>
                <span>Geofence: <strong className="text-slate-800">500m Active</strong></span>
              </div>

            </div>

          </div>

          {/* EMPLOYEE LOCATION DETAIL & SELECTOR */}
          <div className="glass-panel p-6 flex flex-col justify-between space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-sky-600" />
                Selected Employee Geo Info
              </h2>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900 text-sm">{selectedEmp.name}</span>
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                    selectedEmp.status === 'active' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'
                  }`}>
                    {selectedEmp.statusLabel}
                  </span>
                </div>

                <div className="space-y-2 text-slate-700">
                  <p>Role: <strong className="uppercase font-mono text-sky-700">{selectedEmp.role}</strong></p>
                  <p>Current Area: <strong className="text-slate-900">{selectedEmp.area}</strong></p>
                  <p>Device Battery: <strong className="text-emerald-700 font-mono">{selectedEmp.battery}</strong></p>
                  <p>GPS Coordinates: <strong className="font-mono text-sky-700">{selectedEmp.lat}° N, {selectedEmp.lng}° E</strong></p>
                  <p>Last Ping: <strong className="text-slate-800 font-mono">{selectedEmp.lastUpdate}</strong></p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <button
                onClick={handleRefresh}
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-sky-600/20 transition flex items-center justify-center space-x-2"
              >
                <Radio className="w-4 h-4" />
                <span>Ping Selected Device GPS</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: TIMELINE */}
      {geoTab === 'timeline' && (
        <div className="glass-panel p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-600" />
            Field BDA Movement & Check-In Timeline
          </h2>
          
          <div className="space-y-3 text-xs">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start space-x-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0 border border-emerald-200">
                1
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Rahul Verma (BDA) — Arrived at Aparna Sarovar Kart TK-004</h4>
                <p className="text-slate-600 mt-0.5">Location: Gachibowli • GPS Geofence Check-In Verified</p>
                <div className="text-[10px] text-slate-500 font-mono mt-1">Time: Today, 09:45 AM</div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start space-x-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold shrink-0 border border-sky-200">
                2
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Vikram Singh (BDA) — Arrived at Inorbit Mall Kart TK-002</h4>
                <p className="text-slate-600 mt-0.5">Location: Kondapur • GPS Coordinates logged</p>
                <div className="text-[10px] text-slate-500 font-mono mt-1">Time: Today, 10:05 AM</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DASHBOARD */}
      {geoTab === 'dashboard' && (
        <div className="glass-panel p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Geofence Compliance & Field Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="font-bold text-slate-700">Kart Geofence Adherence Rate</span>
              <div className="text-3xl font-black text-emerald-600 mt-2">98.4%</div>
              <p className="text-[11px] text-slate-500 mt-1">BDAs remained within 500m of assigned kart locations during active shift hours.</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="font-bold text-slate-700">Average GPS Ping Latency</span>
              <div className="text-3xl font-black text-sky-600 mt-2">1.2s</div>
              <p className="text-[11px] text-slate-500 mt-1">Real-time Redis SSE stream latency.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SETTINGS */}
      {geoTab === 'settings' && (
        <div className="glass-panel p-6 space-y-4 max-w-xl text-xs">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-sky-600" />
            Geo Tracking Configuration
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">GPS Update Interval</label>
              <select className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2 focus:bg-white focus:border-sky-500 focus:outline-none">
                <option value="realtime">Real-time (SSE Stream - Every 5s)</option>
                <option value="1m">Every 1 minute</option>
                <option value="5m">Every 5 minutes</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Kart Geofence Radius (Meters)</label>
              <input type="number" defaultValue={500} className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2 focus:bg-white focus:border-sky-500 focus:outline-none" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
