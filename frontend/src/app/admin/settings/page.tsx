'use client';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  Globe, Shield, CreditCard, BellRing, Database, Save, Lock, Smartphone, Mail, MessageSquare
} from 'lucide-react';

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState('identity');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('System configurations updated successfully');
    }, 1000);
  };

  const tabs = [
    { id: 'identity', icon: Globe, label: 'Platform Identity', sub: 'BRANDING & SEO', color: 'text-blue-600' },
    { id: 'payments', icon: CreditCard, label: 'Payment Gateways', sub: 'STRIPE, RAZORPAY', color: 'text-slate-500' },
    { id: 'security', icon: Shield, label: 'Security & Compliance', sub: '2FA, SESSION LIMITS', color: 'text-slate-500' },
    { id: 'communication', icon: BellRing, label: 'Communication', sub: 'EMAIL & SMS CONFIG', color: 'text-slate-500' },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 md:space-y-8 animate-fadeIn max-w-[1200px] min-h-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="page-title">Global Configurations</h1>
          <p className="page-subtitle">Manage platform-wide settings, branding, and integrations</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="form-input bg-white w-40">
            <option>Hotels</option>
            <option>Cabs</option>
            <option>Packages</option>
          </select>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 bg-[#cca35e] text-white font-bold rounded-lg hover:bg-[#b58c49] transition-colors flex items-center gap-2"
          >
            <Save size={16} /> {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Navigation */}
        <div className="lg:col-span-1 flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-left transition-all ${
                activeTab === tab.id 
                  ? 'bg-white shadow-sm border border-slate-100' 
                  : 'bg-transparent hover:bg-black/5 border border-transparent'
              }`}
            >
              <tab.icon size={20} className={activeTab === tab.id ? tab.color : 'text-slate-400'} />
              <div>
                <div className={`text-sm font-black ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-600'}`}>
                  {tab.label}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {tab.sub}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* TAB: IDENTITY */}
          {activeTab === 'identity' && (
            <>
              <div className="card p-8 border-t-4 border-t-blue-600">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold font-serif text-slate-800 mb-2">Platform Identity</h2>
                  <p className="text-sm font-semibold text-slate-500">These settings affect how your brand is displayed publicly.</p>
                </div>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Platform Name</label>
                      <input type="text" defaultValue="Toliday Extranet" className="form-input w-full font-bold" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Support Email</label>
                      <input type="email" defaultValue="support@toliday.in" className="form-input w-full font-bold" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Global Commission Rate (%)</label>
                    <p className="text-xs font-semibold text-slate-500 mb-3">This is the default commission taken from all vendors unless overridden at the vendor level.</p>
                    <input type="number" defaultValue="15" className="form-input w-full md:w-1/3 font-black text-blue-600 text-lg" />
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-black text-slate-800">Maintenance Mode</div>
                      <div className="text-xs font-bold text-slate-500 mt-1">Suspend all public access temporarily</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Database size={20} />
                  </div>
                  <h2 className="text-xl font-bold font-serif text-slate-800">Database & Storage</h2>
                </div>
                
                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <div className="font-black text-slate-800 text-sm">System Cache</div>
                    <div className="text-xs font-bold text-slate-500 mt-1">Clear Redis cache for pricing and availability</div>
                  </div>
                  <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-colors">
                    Purge Cache
                  </button>
                </div>
              </div>
            </>
          )}

          {/* TAB: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="card p-8 border-t-4 border-t-emerald-500">
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-serif text-slate-800 mb-2">Payment Gateways</h2>
                <p className="text-sm font-semibold text-slate-500">Manage payment processor integrations and API keys.</p>
              </div>

              <div className="space-y-6">
                <div className="p-6 border border-slate-100 rounded-2xl bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-black text-slate-800 text-lg">Razorpay Integration</h3>
                      <p className="text-xs font-bold text-slate-500 mt-1">Primary payment gateway for INR transactions</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full">Active</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Key ID</label>
                      <input type="text" defaultValue="rzp_live_xXXXXxxxXXXXxx" className="form-input w-full font-mono text-sm" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Key Secret</label>
                      <input type="password" defaultValue="*************************" className="form-input w-full font-mono text-sm" />
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-slate-100 rounded-2xl bg-white opacity-60">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-black text-slate-800 text-lg">Stripe Integration</h3>
                      <p className="text-xs font-bold text-slate-500 mt-1">International payments gateway</p>
                    </div>
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-full">Inactive</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Publishable Key</label>
                      <input type="text" placeholder="pk_test_..." className="form-input w-full font-mono text-sm" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Secret Key</label>
                      <input type="password" placeholder="sk_test_..." className="form-input w-full font-mono text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SECURITY */}
          {activeTab === 'security' && (
            <div className="card p-8 border-t-4 border-t-amber-500">
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-serif text-slate-800 mb-2">Security & Compliance</h2>
                <p className="text-sm font-semibold text-slate-500">Manage admin authentication and session policies.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 border border-slate-100 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
                      <Lock size={24} />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800">Two-Factor Authentication</h3>
                      <p className="text-xs font-bold text-slate-500 mt-1">Require 2FA for all administrator accounts</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                <div className="p-6 border border-slate-100 rounded-2xl">
                  <h3 className="font-black text-slate-800 mb-4">Session Management</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Admin Session Timeout (Minutes)</label>
                      <select className="form-input w-full md:w-1/2">
                        <option>15 Minutes</option>
                        <option>30 Minutes</option>
                        <option>1 Hour</option>
                        <option>4 Hours</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Max Failed Login Attempts</label>
                      <select className="form-input w-full md:w-1/2">
                        <option>3 Attempts</option>
                        <option>5 Attempts</option>
                        <option>10 Attempts</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: COMMUNICATION */}
          {activeTab === 'communication' && (
            <div className="card p-8 border-t-4 border-t-purple-500">
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-serif text-slate-800 mb-2">Communication Config</h2>
                <p className="text-sm font-semibold text-slate-500">Setup SMTP, SMS gateways, and system notifications.</p>
              </div>

              <div className="space-y-6">
                <div className="p-6 border border-slate-100 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                    <Mail className="text-purple-500" size={20} />
                    <h3 className="font-black text-slate-800">SMTP Configuration</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">SMTP Host</label>
                      <input type="text" defaultValue="smtp.sendgrid.net" className="form-input w-full" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Port</label>
                      <input type="text" defaultValue="587" className="form-input w-full" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">API Key / Password</label>
                      <input type="password" defaultValue="*******************" className="form-input w-full" />
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-slate-100 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                    <MessageSquare className="text-blue-500" size={20} />
                    <h3 className="font-black text-slate-800">SMS Gateway (Twilio/AWS SNS)</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Provider</label>
                      <select className="form-input w-full">
                        <option>Twilio</option>
                        <option>AWS SNS</option>
                        <option>MessageBird</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Sender ID</label>
                      <input type="text" defaultValue="TOLIDAY" className="form-input w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
