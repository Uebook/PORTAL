'use client';

import { useState } from 'react';
import { Search, Filter, Ban, RefreshCcw, Eye } from 'lucide-react';

const MOCK_CANCELLATIONS = [
  { id: 'CX-1001', guest: 'Rahul Sharma', hotel: 'The Grand Palace', date: '2026-07-20', refundStatus: 'PROCESSED', refundAmount: 12000, reason: 'Change of plans' },
  { id: 'CX-1002', guest: 'Anita Desai', hotel: 'Sunset Resort & Spa', date: '2026-07-19', refundStatus: 'PENDING', refundAmount: 4500, reason: 'Medical emergency' },
  { id: 'CX-1003', guest: 'Vikram Singh', hotel: 'City Center Inn', date: '2026-07-18', refundStatus: 'NO REFUND', refundAmount: 0, reason: 'Late cancellation' },
  { id: 'CX-1004', guest: 'Priya Patel', hotel: 'Mountain View Lodge', date: '2026-07-15', refundStatus: 'PROCESSED', refundAmount: 8500, reason: 'Flight cancelled' },
];

export default function CancellationsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 md:p-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="page-title">Cancellations</h1>
          <p className="page-subtitle">Manage cancelled bookings and refunds</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card p-6 border-l-4 border-l-red-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Cancellations</p>
              <h2 className="text-3xl font-bold font-serif">145</h2>
            </div>
            <div className="p-3 bg-red-50 text-red-500 rounded-xl">
              <Ban size={24} />
            </div>
          </div>
          <p className="text-sm text-slate-500">In the last 30 days</p>
        </div>

        <div className="card p-6 border-l-4 border-l-amber-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Refunds</p>
              <h2 className="text-3xl font-bold font-serif">₹ 3,45,000</h2>
            </div>
            <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
              <RefreshCcw size={24} />
            </div>
          </div>
          <p className="text-sm text-slate-500">Processed in the last 30 days</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="card-header bg-slate-50 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="card-title">Cancellation List</h3>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search bookings..." 
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
                <th className="px-6 py-4">Ref ID</th>
                <th className="px-6 py-4">Guest</th>
                <th className="px-6 py-4">Hotel</th>
                <th className="px-6 py-4">Date Cancelled</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Refund Status</th>
                <th className="px-6 py-4 text-right">Amount (₹)</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_CANCELLATIONS.map((cx) => (
                <tr key={cx.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">{cx.id}</td>
                  <td className="px-6 py-4 font-bold">{cx.guest}</td>
                  <td className="px-6 py-4 text-slate-500">{cx.hotel}</td>
                  <td className="px-6 py-4 text-slate-500">{cx.date}</td>
                  <td className="px-6 py-4 truncate max-w-[150px]">{cx.reason}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      cx.refundStatus === 'PROCESSED' ? 'bg-emerald-100 text-emerald-700' :
                      cx.refundStatus === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {cx.refundStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-700">
                    {cx.refundAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye size={16} />
                    </button>
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
