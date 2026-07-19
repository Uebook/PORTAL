'use client';

import { useState } from 'react';
import { Search, Link as LinkIcon, Plus, Edit, Trash2, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const MOCK_LINKS = [
  { id: 'LNK-1', title: 'About Us', url: '/about-us', group: 'Company', status: 'ACTIVE' },
  { id: 'LNK-2', title: 'Terms & Conditions', url: '/terms', group: 'Legal', status: 'ACTIVE' },
  { id: 'LNK-3', title: 'Privacy Policy', url: '/privacy', group: 'Legal', status: 'ACTIVE' },
  { id: 'LNK-4', title: 'Contact Support', url: '/contact', group: 'Support', status: 'ACTIVE' },
];

const MOCK_SOCIALS = [
  { id: 'SOC-1', platform: 'Instagram', url: 'https://instagram.com/tolidaytrip', icon: Instagram },
  { id: 'SOC-2', platform: 'Facebook', url: 'https://facebook.com/tolidaytrip', icon: Facebook },
  { id: 'SOC-3', platform: 'Twitter', url: 'https://twitter.com/tolidaytrip', icon: Twitter },
  { id: 'SOC-4', platform: 'YouTube', url: 'https://youtube.com/tolidaytrip', icon: Youtube },
];

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('links');

  return (
    <div className="p-6 md:p-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="page-title">Footer & Social</h1>
          <p className="page-subtitle">Manage website footer links and social media profiles</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-border mb-8">
        <button 
          onClick={() => setActiveTab('links')}
          className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'links' ? 'border-[#cca35e] text-[#cca35e]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <LinkIcon size={16} /> Footer Links
        </button>
        <button 
          onClick={() => setActiveTab('socials')}
          className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'socials' ? 'border-[#cca35e] text-[#cca35e]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Instagram size={16} /> Social Media
        </button>
      </div>

      {activeTab === 'links' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card p-6 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <LinkIcon size={20} />
              </div>
              <h3 className="card-title">Add Footer Link</h3>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Link Title</label>
                <input type="text" placeholder="e.g. About Us" className="form-input w-full" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">URL Path</label>
                <input type="text" placeholder="e.g. /about" className="form-input w-full" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Group / Column</label>
                <select className="form-input bg-white w-full">
                  <option>Company</option>
                  <option>Legal</option>
                  <option>Support</option>
                  <option>Quick Links</option>
                </select>
              </div>
              <button type="button" className="w-full mt-2 py-2.5 bg-[#cca35e] text-white font-bold rounded-lg hover:bg-[#b58c49] transition-colors flex items-center justify-center gap-2">
                <Plus size={16} /> Save Link
              </button>
            </form>
          </div>

          <div className="card lg:col-span-2 overflow-hidden flex flex-col">
            <div className="card-header bg-slate-50 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="card-title">Manage Links</h3>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search links..." 
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
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Path</th>
                    <th className="px-6 py-4">Group</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {MOCK_LINKS.map((link) => (
                    <tr key={link.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">{link.title}</td>
                      <td className="px-6 py-4 text-slate-500">{link.url}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
                          {link.group}
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
      )}

      {activeTab === 'socials' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_SOCIALS.map((social) => (
            <div key={social.id} className="card p-6 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600">
                <social.icon size={32} />
              </div>
              <div>
                <h3 className="font-bold text-slate-700 mb-1">{social.platform}</h3>
                <p className="text-xs text-slate-500 truncate max-w-[150px]">{social.url}</p>
              </div>
              <div className="w-full flex gap-2 mt-2">
                <button className="flex-1 py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors">
                  Edit
                </button>
                <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer py-2 border border-border rounded-lg">
                  <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded text-emerald-600 focus:ring-emerald-500" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Active</span>
                </label>
              </div>
            </div>
          ))}
          <div className="card p-6 flex flex-col items-center justify-center text-center gap-4 border-dashed border-2 bg-transparent hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Plus size={24} />
            </div>
            <p className="text-sm font-bold text-slate-600">Add Social Profile</p>
          </div>
        </div>
      )}
    </div>
  );
}
