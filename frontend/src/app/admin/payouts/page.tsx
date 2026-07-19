'use client';

import { useState } from 'react';
import { Search, Filter, Download, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

const MOCK_PAYOUTS = [
  { id: 'PAY-1001', hotel: 'The Grand Palace', amount: 45000, status: 'DUE', dueDate: '2026-07-20', lastPayout: '2026-07-15' },
  { id: 'PAY-1002', hotel: 'Sunset Resort & Spa', amount: 12500, status: 'PROCESSING', dueDate: '2026-07-19', lastPayout: '2026-07-10' },
  { id: 'PAY-1003', hotel: 'City Center Inn', amount: 8900, status: 'PAID', dueDate: '2026-07-18', lastPayout: '2026-07-18' },
  { id: 'PAY-1004', hotel: 'Mountain View Lodge', amount: 32000, status: 'DUE', dueDate: '2026-07-21', lastPayout: '2026-07-05' },
  { id: 'PAY-1005', hotel: 'Beachfront Villas', amount: 56000, status: 'DUE', dueDate: '2026-07-20', lastPayout: '2026-07-12' },
];

export default function PayoutsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 md:p-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="page-title">Payouts</h1>
          <p className="page-subtitle">Manage hotel settlements and payables</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card p-6 border-l-4 border-l-blue-600">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Due for payout</p>
              <h2 className="text-3xl font-bold font-serif">₹ 89,000</h2>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Clock size={24} />
            </div>
          </div>
          <p className="text-sm text-slate-500">Based on recent check-outs</p>
        </div>

        <div className="card p-6 border-l-4 border-l-emerald-600">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">All-time hotel payable</p>
              <h2 className="text-3xl font-bold font-serif">₹ 14,25,500</h2>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 size={24} />
            </div>
          </div>
          <p className="text-sm text-slate-500">Total settlements processed</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="card-header bg-slate-50 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="card-title">Settlement Ledger</h3>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search hotels..." 
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
                <th className="px-6 py-4">Payout ID</th>
                <th className="px-6 py-4">Hotel Name</th>
                <th className="px-6 py-4">Amount Due</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Last Payout</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_PAYOUTS.map((payout) => (
                <tr key={payout.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">{payout.id}</td>
                  <td className="px-6 py-4 font-bold">{payout.hotel}</td>
                  <td className="px-6 py-4 font-semibold">₹ {payout.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      payout.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' :
                      payout.status === 'PROCESSING' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {payout.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{payout.dueDate}</td>
                  <td className="px-6 py-4 text-slate-500">{payout.lastPayout}</td>
                  <td className="px-6 py-4 text-right">
                    {payout.status === 'DUE' ? (
                      <button className="px-4 py-1.5 bg-[#cca35e] text-white font-bold rounded-lg hover:bg-[#b58c49] transition-colors inline-flex items-center gap-2">
                        Pay Now <ArrowRight size={14} />
                      </button>
                    ) : (
                      <button className="px-4 py-1.5 bg-slate-100 text-slate-500 font-bold rounded-lg hover:bg-slate-200 transition-colors">
                        View Details
                      </button>
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
