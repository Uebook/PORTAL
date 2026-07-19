'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
  ArrowLeft, User, History, Building2, Mail, Phone, 
  MapPin, ShieldCheck, CheckCircle2, XCircle, Calendar, 
  CreditCard, Clock 
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'bookings' ? 'bookings' : 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['staff-detail', params.id],
    queryFn: async () => {
      try {
        const res = await api.get(`/staff/${params.id}`);
        return res.data;
      } catch (err) {
        return null;
      }
    }
  });

  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ['user-bookings', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await api.get(`/public/bookings/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  if (userLoading) {
    return (
      <div className="p-8 h-full flex items-center justify-center">
        <div className="animate-pulse text-slate-400 font-bold uppercase tracking-widest text-sm">Loading Identity...</div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 animate-fadeIn max-w-[1200px] min-h-full">
      <Link href="/admin/users" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 font-bold text-sm">
        <ArrowLeft size={16} /> Back to Directory
      </Link>

      {/* Header Card */}
      <div className="card p-8 mb-8 border-t-4 border-t-indigo-600">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-3xl">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-bold font-serif text-slate-800">{user?.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                  {user?.role}
                </span>
                <span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${
                  user?.isActive ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  {user?.isActive ? <CheckCircle2 size={14} /> : <XCircle size={14} />} 
                  {user?.isActive ? 'Active Access' : 'Access Revoked'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 bg-black/[0.02] dark:bg-white/[0.02] p-1.5 rounded-2xl shadow-inner border border-border/10 w-fit">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'profile' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-800 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
              }`}
            >
              PROFILE INFO
            </button>
            <button 
              onClick={() => setActiveTab('bookings')}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'bookings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-800 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
              }`}
            >
              BOOKING LEDGER
            </button>
          </div>
        </div>
      </div>

      {/* TAB CONTENT: PROFILE */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
          <div className="card p-8">
            <h3 className="font-bold font-serif text-xl text-slate-800 mb-6 flex items-center gap-2">
              <Mail className="text-slate-400" size={20} /> Contact Details
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Email Address</label>
                <div className="font-bold text-slate-700">{user?.email}</div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Phone Number</label>
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Phone size={14} className="text-slate-400" /> {user?.contactNumber || 'Not provided'}
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Assigned Entity</label>
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Building2 size={14} className="text-slate-400" />
                  {user?.hotel?.name || user?.tourPartner?.companyName || user?.busVendor?.companyName || 'Global Management (Admin)'}
                </div>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <h3 className="font-bold font-serif text-xl text-slate-800 mb-6 flex items-center gap-2">
              <ShieldCheck className="text-slate-400" size={20} /> Module Permissions
            </h3>
            {user?.permissions ? (
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(user.permissions).map(([key, hasAccess]) => (
                  <div key={key} className={`p-3 rounded-xl border flex items-center gap-3 ${hasAccess ? 'bg-emerald-50/50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
                    {hasAccess ? <CheckCircle2 size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-slate-300" />}
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${hasAccess ? 'text-emerald-700' : 'text-slate-400'}`}>
                      {key.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm font-semibold text-slate-500">No specific permissions set for this identity.</p>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="card overflow-hidden animate-fadeIn">
          <div className="card-header bg-slate-50 border-b border-border">
            <h3 className="card-title">Booking Ledger</h3>
            <p className="text-sm text-slate-500 font-semibold mt-1">Recent reservations and transactions for this identity.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-border">
                <tr>
                  <th className="px-6 py-4">Booking ID / Date</th>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Stay Dates</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bookingsLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-slate-400 font-semibold">
                      Loading bookings...
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-slate-400 font-semibold">
                      No bookings found for this identity.
                    </td>
                  </tr>
                ) : bookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-700">{booking.id}</div>
                      <div className="text-xs text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
                        <Clock size={12} /> {new Date(booking.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-700 flex items-center gap-2">
                        <Building2 size={14} className="text-slate-400" /> {booking.hotel?.name || 'Unknown Property'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-slate-600 font-bold flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg w-max">
                        <Calendar size={12} className="text-slate-500" /> 
                        {new Date(booking.checkInDate).toLocaleDateString()} <span className="text-slate-400">→</span> {new Date(booking.checkOutDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-slate-800">
                      ₹{booking.totalAmount}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        booking.status === 'CONFIRMED' || booking.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                        booking.status === 'PENDING' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
