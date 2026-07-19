'use client';

import { useState } from 'react';
import { Search, Filter, Bell, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  { id: 'NOT-1', title: 'System Maintenance', type: 'ALERT', target: 'All Users', date: '2026-07-20 10:00 AM', status: 'SENT' },
  { id: 'NOT-2', title: 'New Feature Launch', type: 'PROMO', target: 'Consumers', date: '2026-07-19 02:30 PM', status: 'SENT' },
  { id: 'NOT-3', title: 'Payment Reminder', type: 'SYSTEM', target: 'Vendors', date: '2026-07-18 09:15 AM', status: 'SENT' },
  { id: 'NOT-4', title: 'Weekend Offer', type: 'PROMO', target: 'All Users', date: '2026-07-21 10:00 AM', status: 'SCHEDULED' },
];

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 md:p-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">Send and manage system-wide push notifications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Send size={20} />
            </div>
            <h3 className="card-title">Compose Message</h3>
          </div>
          
          <form className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Title</label>
              <input type="text" placeholder="e.g. Flash Sale" className="form-input w-full" />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Message Body</label>
              <textarea placeholder="Enter your message here..." className="form-input w-full resize-none" rows={3}></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Type</label>
                <select className="form-input bg-white w-full">
                  <option>PROMO</option>
                  <option>ALERT</option>
                  <option>SYSTEM</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Target</label>
                <select className="form-input bg-white w-full">
                  <option>All Users</option>
                  <option>Consumers</option>
                  <option>Vendors</option>
                </select>
              </div>
            </div>
            <button type="button" className="w-full mt-2 py-2.5 bg-[#cca35e] text-white font-bold rounded-lg hover:bg-[#b58c49] transition-colors flex items-center justify-center gap-2">
              <Send size={16} /> Send Now
            </button>
          </form>
        </div>

        <div className="card lg:col-span-2 overflow-hidden flex flex-col">
          <div className="card-header bg-slate-50 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="card-title">Recent Broadcasts</h3>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search broadcasts..." 
                  className="form-input pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-border">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Target Audience</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {MOCK_NOTIFICATIONS.map((notif) => (
                  <tr key={notif.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-700">{notif.title}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                        notif.type === 'ALERT' ? 'bg-red-100 text-red-700' :
                        notif.type === 'PROMO' ? 'bg-purple-100 text-purple-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {notif.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-600">{notif.target}</td>
                    <td className="px-6 py-4 text-slate-500">{notif.date}</td>
                    <td className="px-6 py-4">
                      {notif.status === 'SENT' ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                          <CheckCircle2 size={14} /> Sent
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-amber-500 font-bold text-xs uppercase tracking-wider">
                          <AlertCircle size={14} /> Scheduled
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
    </div>
  );
}
