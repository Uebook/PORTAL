'use client';

import Link from 'next/link';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Topbar from '@/components/layout/Topbar';
import api from '@/lib/api';
import {
       Users, Search, Shield, Building2,
       Mail, Phone, ShieldCheck, ShieldAlert,
       MoreVertical, AlertCircle, UserPlus,
       Lock, Unlock, MapPin, Zap, Download, Eye, History
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function AdminUsersPage() {
       const queryClient = useQueryClient();
       const [filter, setFilter] = useState('');
       const [roleFilter, setRoleFilter] = useState('ALL');
       const [statusFilter, setStatusFilter] = useState('ALL');

       const { data: users = [], isLoading } = useQuery({
              queryKey: ['staff'],
              queryFn: async () => {
                     const res = await api.get('/staff');
                     return res.data;
              }
       });

       const toggleStatusMutation = useMutation({
              mutationFn: async ({ id, active }: { id: string, active: boolean }) => {
                     return api.patch(`/staff/${id}`, { isActive: !active });
              },
              onSuccess: () => {
                     queryClient.invalidateQueries({ queryKey: ['staff'] });
                     toast.success('User access status updated');
              }
       });

       const [isModalOpen, setIsModalOpen] = useState(false);
       const [formData, setFormData] = useState({
              name: '', email: '', password: '', role: 'ADMIN', serviceType: 'global',
              permissions: {
                     global_dashboard: false,
                     hotels_manage: false,
                     tours_manage: false,
                     buses_manage: false,
                     cabs_manage: false,
                     finance_manage: false,
                     users_manage: false,
              }
       });

       const createStaffMutation = useMutation({
              mutationFn: async (data: any) => {
                     return api.post('/staff', data);
              },
              onSuccess: () => {
                     queryClient.invalidateQueries({ queryKey: ['staff'] });
                     toast.success('Admin registered successfully');
                     setIsModalOpen(false);
                     setFormData({
                            name: '', email: '', password: '', role: 'ADMIN', serviceType: 'global',
                            permissions: {
                                   global_dashboard: false, hotels_manage: false, tours_manage: false,
                                   buses_manage: false, cabs_manage: false, finance_manage: false, users_manage: false
                            }
                     });
              },
              onError: (err: any) => {
                     toast.error(err.response?.data?.message || 'Failed to register admin');
              }
       });

       const handleCreateStaff = (e: React.FormEvent) => {
              e.preventDefault();
              createStaffMutation.mutate(formData);
       };

       const filteredUsers = users.filter((u: any) => {
              const matchesSearch = (u.name || '').toLowerCase().includes(filter.toLowerCase()) ||
                     (u.email || '').toLowerCase().includes(filter.toLowerCase()) ||
                     (u.hotel?.name || '').toLowerCase().includes(filter.toLowerCase()) ||
                     (u.role || '').toLowerCase().includes(filter.toLowerCase());
              const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
              const matchesStatus = statusFilter === 'ALL' || (statusFilter === 'ACTIVE' && u.isActive) || (statusFilter === 'INACTIVE' && !u.isActive);
              return matchesSearch && matchesRole && matchesStatus;
       });

       const exportToCSV = () => {
              if (!filteredUsers.length) {
                     toast.error('No users to export');
                     return;
              }
              const headers = ['Name', 'Email', 'Role', 'Status', 'Service Type'];
              const rows = filteredUsers.map((u: any) => [
                     u.name || '',
                     u.email || '',
                     u.role || '',
                     u.isActive ? 'Active' : 'Inactive',
                     u.serviceType || ''
              ]);
              const csvContent = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
              const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `users_export_${new Date().toISOString().slice(0, 10)}.csv`;
              link.click();
              URL.revokeObjectURL(url);
              toast.success(`Exported ${filteredUsers.length} users`);
       };

       if (isLoading) {
              return <div className="p-20 text-center font-black text-muted-foreground animate-pulse uppercase tracking-[0.3em]">Decoding User Matrix...</div>;
       }

  return (
    <div className="p-6 md:p-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="page-title">Identity Directory</h1>
          <p className="page-subtitle">Manage permissions and system access for all staff and admins</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[#cca35e] text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#b58c49] transition-colors">
            <UserPlus size={16} /> Register Admin
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white border border-border rounded-2xl p-8 w-full max-w-lg shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-serif text-slate-800">Register New Admin</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><AlertCircle size={24} /></button>
            </div>
            <form onSubmit={handleCreateStaff} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="form-input w-full" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Email Address</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="form-input w-full" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Temporary Password</label>
                <input required type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="form-input w-full" />
              </div>
              
              <div className="pt-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Module Access Permissions</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(formData.permissions).map((key) => (
                    <label key={key} className="flex items-center gap-2 p-2 rounded-lg border border-slate-100 bg-slate-50 cursor-pointer hover:border-slate-300 transition-colors">
                      <input
                        type="checkbox"
                        checked={(formData.permissions as any)[key]}
                        onChange={(e) => setFormData({
                          ...formData,
                          permissions: { ...formData.permissions, [key]: e.target.checked }
                        })}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <span className="text-[10px] font-bold text-slate-600 capitalize">
                        {key.replace('_', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-500 font-bold rounded-lg hover:bg-slate-200">CANCEL</button>
                <button type="submit" disabled={createStaffMutation.isPending} className="flex-1 py-3 bg-[#cca35e] text-white font-bold rounded-lg hover:bg-[#b58c49]">
                  {createStaffMutation.isPending ? 'CREATING...' : 'REGISTER'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="card-header bg-slate-50 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="card-title">User Directory</h3>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search Identities..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="form-input bg-white w-32">
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="OWNER">Owner</option>
              <option value="MANAGER">Manager</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="form-input bg-white w-32">
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
            <button onClick={exportToCSV} className="p-2.5 bg-white border border-border rounded-lg text-slate-600 hover:bg-slate-50" title="Export CSV">
              <Download size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-border">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Entity / Group</th>
                <th className="px-6 py-4">Access Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-semibold">
                    No identities matching your query
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user: any) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-700">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Building2 size={14} className="text-slate-400" />
                        <span className="font-semibold text-xs">
                          {user.hotel?.name || user.tourPartner?.companyName || user.busVendor?.companyName || 'Global Management'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        user.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {user.isActive ? 'Active' : 'Revoked'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Link href={`/admin/users/${user.id}?tab=profile`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Profile">
                          <Eye size={16} />
                        </Link>
                        <Link href={`/admin/users/${user.id}?tab=bookings`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Booking History">
                          <History size={16} />
                        </Link>
                        <button
                          onClick={() => toggleStatusMutation.mutate({ id: user.id, active: user.isActive })}
                          disabled={toggleStatusMutation.isPending}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 ${
                            user.isActive
                              ? 'text-red-500 hover:bg-red-50'
                              : 'text-emerald-500 hover:bg-emerald-50'
                          }`}
                        >
                          {user.isActive ? <Lock size={12} /> : <Unlock size={12} />}
                          {user.isActive ? 'Revoke' : 'Authorize'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
