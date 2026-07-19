'use client';

import Link from 'next/link';
import { Hotel, Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function LoginPage() {
       const router = useRouter();
       const [isLoading, setIsLoading] = useState(false);
       const [email, setEmail] = useState('');
       const [password, setPassword] = useState('');
       const [showPassword, setShowPassword] = useState(false);
       const [error, setError] = useState('');

       const handleLogin = async (e: React.FormEvent) => {
              e.preventDefault();
              setIsLoading(true);
              setError('');

              try {
                     const res = await api.post('/auth/login', { email, password });
                     localStorage.setItem('token', res.data.token);
                     router.push('/hotel/dashboard');
              } catch (err: any) {
                     setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
              } finally {
                     setIsLoading(false);
              }
       };

       return (
              <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#1c3c34] dark:bg-[#1c3c34]">
                     {/* Gorgeous iOS Ambient Background Blur */}
                     <div className="absolute top-[-15%] left-[-15%] w-[50%] h-[50%] rounded-full bg-[#cca35e]/10 dark:bg-[#cca35e]/10 blur-[140px] pointer-events-none" />
                     <div className="absolute bottom-[-15%] right-[-15%] w-[50%] h-[50%] rounded-full bg-[#cca35e]/10 dark:bg-[#cca35e]/10 blur-[140px] pointer-events-none" />

                     <div className="w-full max-w-[440px] z-10 animate-fadeIn">
                            {/* Logo & Header */}
                            <div className="text-center mb-8">
                                   <div
                                          className="inline-flex items-center justify-center w-16 h-16 rounded-[22px] mb-6 shadow-xl transition-transform hover:scale-105 active:scale-95 duration-300"
                                          style={{
                                                 background: 'linear-gradient(135deg, #cca35e, #b58c49)',
                                                 boxShadow: '0 8px 30px rgba(204, 163, 94, 0.35)'
                                          }}
                                   >
                                          <Hotel size={30} color="white" />
                                   </div>
                                   <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Welcome Back</h1>
                                   <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Toliday Hotel Supplier Portal</p>
                            </div>

                            {/* iOS Style Glass Card */}
                            <div className="bg-black/20 backdrop-blur-2xl p-8 md:p-10 rounded-[32px] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative">
                                   <form onSubmit={handleLogin} className="space-y-5">
                                          {error && (
                                                 <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-destructive/10 border border-destructive/15 text-destructive text-xs font-semibold">
                                                        <AlertCircle size={16} />
                                                        {error}
                                                 </div>
                                          )}
                                          <div className="space-y-2">
                                                 <label className="text-xs font-bold text-zinc-400 tracking-wide ml-1 uppercase">Email Address</label>
                                                 <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="name@company.com"
                                                        className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/5 focus:bg-[#1c3c34] focus:ring-4 focus:ring-[#cca35e]/20 focus:border-[#cca35e]/50 outline-none text-sm font-medium text-white transition-all duration-300"
                                                        required
                                                 />
                                          </div>

                                          <div className="space-y-2">
                                                 <div className="flex justify-between items-center px-1">
                                                        <label className="text-xs font-bold text-zinc-400 tracking-wide uppercase">Password</label>
                                                        <Link
                                                               href="/hotel/forgot-password"
                                                               className="text-xs font-bold text-[#cca35e] hover:underline"
                                                        >
                                                               Forgot?
                                                        </Link>
                                                 </div>
                                                 <div className="relative">
                                                        <input
                                                               type={showPassword ? 'text' : 'password'}
                                                               value={password}
                                                               onChange={(e) => setPassword(e.target.value)}
                                                               placeholder="••••••••"
                                                               className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-white/[0.03] border border-white/5 focus:bg-[#1c3c34] focus:ring-4 focus:ring-[#cca35e]/20 focus:border-[#cca35e]/50 outline-none text-sm font-medium text-white transition-all duration-300"
                                                               required
                                                        />
                                                        <button
                                                               type="button"
                                                               onClick={() => setShowPassword(!showPassword)}
                                                               className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#cca35e] transition-colors"
                                                        >
                                                               {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                        </button>
                                                 </div>
                                          </div>

                                          <button
                                                 type="submit"
                                                 disabled={isLoading}
                                                 className="w-full bg-[#cca35e] hover:bg-[#b58c49] text-white font-bold rounded-2xl py-4 transition-all duration-300 shadow-[0_8px_25px_rgba(204,163,94,0.25)] flex items-center justify-center gap-2 mt-3 cursor-pointer"
                                          >
                                                 {isLoading ? (
                                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                 ) : (
                                                        <>
                                                               Sign In <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                                                        </>
                                                 )}
                                          </button>
                                          

                                   </form>
                            </div>

                            <p className="text-center mt-8 text-sm text-zinc-400">
                                   Don't have an account? {' '}
                                   <Link href="/hotel/signup" className="text-[#cca35e] font-bold hover:underline transition-all">
                                          Create Supplier Account
                                   </Link>
                            </p>
                     </div>
              </div>
       );
}
