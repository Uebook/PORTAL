'use client';

import { useState } from 'react';
import { Search, Filter, Download, FileText, IndianRupee } from 'lucide-react';

const MOCK_LEDGERS = [
  { id: 'LED-9001', date: '2026-07-15', description: 'Booking commission (Ref: BK-12001)', credit: 1500, debit: 0, balance: 15000 },
  { id: 'LED-9002', date: '2026-07-16', description: 'Settlement payout', credit: 0, debit: 12000, balance: 3000 },
  { id: 'LED-9003', date: '2026-07-18', description: 'Booking commission (Ref: BK-12044)', credit: 3200, debit: 0, balance: 6200 },
  { id: 'LED-9004', date: '2026-07-19', description: 'Cancellation fee (Ref: CX-1200)', credit: 500, debit: 0, balance: 6700 },
  { id: 'LED-9005', date: '2026-07-20', description: 'Settlement payout', credit: 0, debit: 5000, balance: 1700 },
];

export default function LedgersPage() {
  const [activeTab, setActiveTab] = useState('booking');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 md:p-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="page-title">Ledgers</h1>
          <p className="page-subtitle">Track all financial transactions and balances</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#cca35e] text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#b58c49] transition-colors">
            <Download size={16} /> Export Statement
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-border mb-8">
        <button 
          onClick={() => setActiveTab('booking')}
          className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'booking' ? 'border-[#cca35e] text-[#cca35e]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileText size={16} /> Booking Ledger
        </button>
        <button 
          onClick={() => setActiveTab('payment')}
          className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'payment' ? 'border-[#cca35e] text-[#cca35e]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <IndianRupee size={16} /> Payment Ledger
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="card-header bg-slate-50 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="card-title">Transaction History</h3>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search transactions..." 
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
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Credit (₹)</th>
                <th className="px-6 py-4 text-right">Debit (₹)</th>
                <th className="px-6 py-4 text-right">Balance (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_LEDGERS.map((ledger) => (
                <tr key={ledger.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">{ledger.id}</td>
                  <td className="px-6 py-4 text-slate-500">{ledger.date}</td>
                  <td className="px-6 py-4">{ledger.description}</td>
                  <td className="px-6 py-4 text-right text-emerald-600 font-bold">
                    {ledger.credit > 0 ? `+${ledger.credit.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-6 py-4 text-right text-red-600 font-bold">
                    {ledger.debit > 0 ? `-${ledger.debit.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-800">
                    {ledger.balance.toLocaleString()}
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
