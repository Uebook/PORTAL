'use client';

import { useState } from 'react';
import { Search, Filter, Download, Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';

const MOCK_LOGS = [
  { id: 'LOG-5001', actor: 'System Admin (admin@gmail.com)', action: 'UPDATE_COMMISSION', resource: 'Global Settings', timestamp: '2026-07-19 14:32:10', status: 'SUCCESS', details: 'Changed default rate to 15%' },
  { id: 'LOG-5002', actor: 'Vansh (vansh@gmail.com)', action: 'REVOKE_ACCESS', resource: 'User: rahul@hotel.com', timestamp: '2026-07-19 12:15:05', status: 'SUCCESS', details: 'Manual revocation' },
  { id: 'LOG-5003', actor: 'System', action: 'PAYOUT_FAILED', resource: 'Settlement: PAY-1002', timestamp: '2026-07-19 10:00:00', status: 'FAILURE', details: 'Bank API timeout' },
  { id: 'LOG-5004', actor: 'System Admin (admin@gmail.com)', action: 'CREATE_TAX_RULE', resource: 'Tax Rules', timestamp: '2026-07-18 16:45:22', status: 'SUCCESS', details: 'Added UAE VAT (5%)' },
  { id: 'LOG-5005', actor: 'Unknown IP (192.168.1.45)', action: 'LOGIN_ATTEMPT', resource: 'Admin Portal', timestamp: '2026-07-18 03:15:00', status: 'FAILURE', details: 'Invalid credentials' },
];

export default function AuditPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 md:p-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="page-title">Audit Log</h1>
          <p className="page-subtitle">Track system events, administrative actions, and security alerts</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Download size={16} /> Export Logs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card p-6 border-l-4 border-l-indigo-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Events (24h)</p>
              <h2 className="text-3xl font-bold font-serif">1,204</h2>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Activity size={24} />
            </div>
          </div>
          <p className="text-sm text-slate-500">System operations and user actions</p>
        </div>

        <div className="card p-6 border-l-4 border-l-red-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Security Flags (24h)</p>
              <h2 className="text-3xl font-bold font-serif">12</h2>
            </div>
            <div className="p-3 bg-red-50 text-red-500 rounded-xl">
              <ShieldAlert size={24} />
            </div>
          </div>
          <p className="text-sm text-slate-500">Failed logins or unauthorized attempts</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="card-header bg-slate-50 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="card-title">Event Ledger</h3>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search events..." 
                className="form-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-white border border-border rounded-lg text-slate-600 hover:bg-slate-50">
              <Filter size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-border">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Actor</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Resource</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{log.actor}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-600">{log.resource}</td>
                  <td className="px-6 py-4 text-slate-500 truncate max-w-[200px]">{log.details}</td>
                  <td className="px-6 py-4">
                    {log.status === 'SUCCESS' ? (
                      <span className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                        <CheckCircle2 size={14} /> Success
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-red-500 font-bold text-xs uppercase tracking-wider">
                        <ShieldAlert size={14} /> Failed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
