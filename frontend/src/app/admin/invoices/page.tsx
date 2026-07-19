'use client';

import { useState } from 'react';
import { Search, Filter, Download, FileText, Plus, Eye } from 'lucide-react';

const MOCK_INVOICES = [
  { id: 'INV-2026-001', hotel: 'The Grand Palace', date: '2026-07-01', amount: 45000, status: 'PAID' },
  { id: 'INV-2026-002', hotel: 'Sunset Resort & Spa', date: '2026-07-02', amount: 12500, status: 'UNPAID' },
  { id: 'INV-2026-003', hotel: 'City Center Inn', date: '2026-07-05', amount: 8900, status: 'PAID' },
];

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState('tax');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 md:p-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="page-title">Invoices & Notes</h1>
          <p className="page-subtitle">Manage tax invoices, credit and debit notes</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#cca35e] text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#b58c49] transition-colors">
            <Plus size={16} /> Issue New Note
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-border mb-8">
        <button 
          onClick={() => setActiveTab('tax')}
          className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'tax' ? 'border-[#cca35e] text-[#cca35e]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileText size={16} /> Tax Invoices
        </button>
        <button 
          onClick={() => setActiveTab('credit')}
          className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'credit' ? 'border-[#cca35e] text-[#cca35e]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileText size={16} /> Credit Notes
        </button>
        <button 
          onClick={() => setActiveTab('debit')}
          className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'debit' ? 'border-[#cca35e] text-[#cca35e]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileText size={16} /> Debit Notes
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="card-header bg-slate-50 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="card-title">Document Ledger</h3>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search documents..." 
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
                <th className="px-6 py-4">Document ID</th>
                <th className="px-6 py-4">Issue Date</th>
                <th className="px-6 py-4">Hotel Partner</th>
                <th className="px-6 py-4">Amount (₹)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">{inv.id}</td>
                  <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                  <td className="px-6 py-4 font-bold">{inv.hotel}</td>
                  <td className="px-6 py-4 font-bold">
                    {inv.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Document">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Download PDF">
                        <Download size={16} />
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
  );
}
