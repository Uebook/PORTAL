'use client';

import { useState } from 'react';
import { Search, Filter, Percent, Plus, Edit, Trash2 } from 'lucide-react';

const MOCK_TAXES = [
  { id: 'TX-01', country: 'India', label: 'GST (Hotel)', rate: 12, split: 'SGST (6%) + CGST (6%)', status: 'ACTIVE' },
  { id: 'TX-02', country: 'India', label: 'GST (Luxury)', rate: 18, split: 'SGST (9%) + CGST (9%)', status: 'ACTIVE' },
  { id: 'TX-03', country: 'United Arab Emirates', label: 'VAT', rate: 5, split: 'None', status: 'ACTIVE' },
  { id: 'TX-04', country: 'Singapore', label: 'GST', rate: 8, split: 'None', status: 'ACTIVE' },
  { id: 'TX-05', country: 'Thailand', label: 'VAT', rate: 7, split: 'None', status: 'INACTIVE' },
];

export default function TaxesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 md:p-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="page-title">Tax Rules</h1>
          <p className="page-subtitle">Manage global taxation and splitting rules</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Percent size={20} />
            </div>
            <h3 className="card-title">Add New Rule</h3>
          </div>
          
          <form className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Country</label>
              <select className="form-input bg-white w-full">
                <option>India</option>
                <option>United Arab Emirates</option>
                <option>Singapore</option>
                <option>Thailand</option>
                <option>United States</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Tax Label</label>
              <input type="text" placeholder="e.g. GST (Luxury)" className="form-input w-full" />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Total Rate (%)</label>
              <input type="number" placeholder="18" className="form-input w-full" />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Splitting Configuration</label>
              <input type="text" placeholder="e.g. SGST (9%) + CGST (9%)" className="form-input w-full" />
            </div>
            <button type="button" className="w-full mt-2 py-2.5 bg-[#cca35e] text-white font-bold rounded-lg hover:bg-[#b58c49] transition-colors flex items-center justify-center gap-2">
              <Plus size={16} /> Save Rule
            </button>
          </form>
        </div>

        <div className="card lg:col-span-2 overflow-hidden flex flex-col">
          <div className="card-header bg-slate-50 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="card-title">Global Tax Rules</h3>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search rules..." 
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
                  <th className="px-6 py-4">Country</th>
                  <th className="px-6 py-4">Label</th>
                  <th className="px-6 py-4">Rate</th>
                  <th className="px-6 py-4">Split Config</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {MOCK_TAXES.map((tax) => (
                  <tr key={tax.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-700">{tax.country}</td>
                    <td className="px-6 py-4">{tax.label}</td>
                    <td className="px-6 py-4 font-bold">{tax.rate}%</td>
                    <td className="px-6 py-4 text-slate-500">{tax.split}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        tax.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {tax.status}
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
