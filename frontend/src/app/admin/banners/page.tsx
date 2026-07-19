'use client';

import { useState } from 'react';
import { Search, Image as ImageIcon, Upload, Trash2, Eye } from 'lucide-react';

const MOCK_BANNERS = [
  { id: 'BAN-1', name: 'Summer Sale 2026', slot: 'Leaderboard', position: 'Home Page', status: 'ACTIVE', clicks: 1205 },
  { id: 'BAN-2', name: 'Diwali Special', slot: 'Grid Item', position: 'Hotels Page', status: 'INACTIVE', clicks: 450 },
  { id: 'BAN-3', name: 'New User Promo', slot: 'Popup', position: 'All Pages', status: 'ACTIVE', clicks: 3200 },
];

export default function BannersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 md:p-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="page-title">Banners</h1>
          <p className="page-subtitle">Manage promotional banners and ad slots</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Upload size={20} />
            </div>
            <h3 className="card-title">Upload New Banner</h3>
          </div>
          
          <form className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Banner Name</label>
              <input type="text" placeholder="e.g. Summer Sale" className="form-input w-full" />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Target URL</label>
              <input type="text" placeholder="https://" className="form-input w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Slot</label>
                <select className="form-input bg-white w-full">
                  <option>Leaderboard</option>
                  <option>Grid Item</option>
                  <option>Popup</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Position</label>
                <select className="form-input bg-white w-full">
                  <option>Home Page</option>
                  <option>Hotels Page</option>
                  <option>All Pages</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Image File</label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <ImageIcon size={24} className="text-slate-400 mb-2" />
                <p className="text-sm font-bold text-slate-600">Click to upload</p>
                <p className="text-xs text-slate-400">JPG, PNG (Max 2MB)</p>
              </div>
            </div>
            <button type="button" className="w-full mt-2 py-2.5 bg-[#cca35e] text-white font-bold rounded-lg hover:bg-[#b58c49] transition-colors flex items-center justify-center gap-2">
              <Upload size={16} /> Publish Banner
            </button>
          </form>
        </div>

        <div className="card lg:col-span-2 overflow-hidden flex flex-col">
          <div className="card-header bg-slate-50 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="card-title">Active Banners</h3>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search banners..." 
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
                  <th className="px-6 py-4">Preview</th>
                  <th className="px-6 py-4">Banner Details</th>
                  <th className="px-6 py-4">Placement</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {MOCK_BANNERS.map((banner) => (
                  <tr key={banner.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-20 h-12 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400">
                        <ImageIcon size={16} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700">{banner.name}</p>
                      <p className="text-xs text-slate-500">{banner.clicks} Clicks</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold">{banner.slot}</p>
                      <p className="text-xs text-slate-500">{banner.position}</p>
                    </td>
                    <td className="px-6 py-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked={banner.status === 'ACTIVE'} className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{banner.status}</span>
                      </label>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} />
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
