'use client';

import { useState } from 'react';
import { Search, Filter, MessageCircle, Plus, Edit, Trash2 } from 'lucide-react';

const MOCK_TEMPLATES = [
  { id: 'TPL-1', name: 'booking_confirmation_v1', category: 'UTILITY', language: 'en_US', status: 'APPROVED' },
  { id: 'TPL-2', name: 'booking_cancellation', category: 'UTILITY', language: 'en_US', status: 'APPROVED' },
  { id: 'TPL-3', name: 'summer_promo_discount', category: 'MARKETING', language: 'en_US', status: 'PENDING' },
  { id: 'TPL-4', name: 'payment_reminder', category: 'UTILITY', language: 'en_US', status: 'REJECTED' },
  { id: 'TPL-5', name: 'otp_verification', category: 'AUTHENTICATION', language: 'en_US', status: 'APPROVED' },
];

export default function WhatsAppPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 md:p-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="page-title">WhatsApp Integration</h1>
          <p className="page-subtitle">Manage Meta Business Manager templates and categories</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <MessageCircle size={20} />
            </div>
            <h3 className="card-title">Sync New Template</h3>
          </div>
          
          <form className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Template Name (from Meta)</label>
              <input type="text" placeholder="e.g. booking_confirmation_v1" className="form-input w-full" />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Category</label>
              <select className="form-input bg-white w-full">
                <option>UTILITY</option>
                <option>MARKETING</option>
                <option>AUTHENTICATION</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Language</label>
              <select className="form-input bg-white w-full">
                <option>en_US (English - US)</option>
                <option>en_GB (English - UK)</option>
                <option>hi (Hindi)</option>
              </select>
            </div>
            <button type="button" className="w-full mt-2 py-2.5 bg-[#cca35e] text-white font-bold rounded-lg hover:bg-[#b58c49] transition-colors flex items-center justify-center gap-2">
              <Plus size={16} /> Sync Template
            </button>
          </form>
        </div>

        <div className="card lg:col-span-2 overflow-hidden flex flex-col">
          <div className="card-header bg-slate-50 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="card-title">Approved Templates</h3>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search templates..." 
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
                  <th className="px-6 py-4">Template Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Language</th>
                  <th className="px-6 py-4">Meta Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {MOCK_TEMPLATES.map((tpl) => (
                  <tr key={tpl.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-700">{tpl.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
                        {tpl.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{tpl.language}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        tpl.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 
                        tpl.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {tpl.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
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
