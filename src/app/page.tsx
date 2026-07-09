'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { requestGQL } from '../lib/graphql-client';
import { REGISTER_MUTATION, LOGIN_MUTATION, ME_QUERY } from '../graphql/operations';
import { Button } from '../components/ui/button';
import { LogIn, UserPlus, LogOut, User as UserIcon, Mail, Lock, Sparkles } from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initLoading, setInitLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setInitLoading(false);
        return;
      }
      try {
        const data = await requestGQL(ME_QUERY);
        if (data.me) {
          setUser(data.me);
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Failed to load user info:', err);
        localStorage.removeItem('token');
      } finally {
        setInitLoading(false);
      }
    };
    fetchMe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const data = await requestGQL(LOGIN_MUTATION, { email, password });
        if (data.login) {
          localStorage.setItem('token', data.login.token);
          setUser(data.login.user);
        }
      } else {
        const spaceIndex = name.trim().indexOf(' ');
        const firstName = spaceIndex !== -1 ? name.trim().substring(0, spaceIndex) : name.trim();
        const lastName = spaceIndex !== -1 ? name.trim().substring(spaceIndex + 1) : '';

        const data = await requestGQL<any, any>(REGISTER_MUTATION as any, {
          firstName,
          lastName,
          email,
          password,
          userType: 'TENANT',
          phone: '+233 240000000',
        });
        if (data.register) {
          localStorage.setItem('token', data.register.token);
          setUser(data.register.user);
        }
      }
      // Reset form
      setName('');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (initLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-purple-600 border-zinc-800"></div>
          <p className="text-zinc-400 font-medium">Initializing fieConnect...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black px-4 py-12 text-white sm:px-6 lg:px-8">
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] left-[20%] h-[600px] w-[600px] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute -bottom-[30%] right-[10%] h-[500px] w-[500px] rounded-full bg-blue-900/20 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
            fieConnect
          </h1>
          <p className="mt-3 text-sm text-zinc-400">
            Secure, premium access powered by GraphQL & JWT Auth
          </p>
        </div>

        {user ? (
          /* Logged In Dashboard Card */
          <div className="border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <UserIcon size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-100">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-zinc-400">{user.email}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">User ID</span>
                <span className="font-mono text-zinc-300">{user.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Joined On</span>
                <span className="text-zinc-300">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-red-500/25 transition-all"
            >
              <LogOut size={18} />
              Sign Out
            </Button>
          </div>
        ) : (
          /* Login/Register Card */
          <div className="border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
            {/* Form Toggle buttons */}
            <div className="flex border-b border-zinc-800 pb-4 mb-6">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold transition-colors ${
                  isLogin
                    ? 'text-indigo-400 border-b-2 border-indigo-500'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <LogIn size={16} />
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold transition-colors ${
                  !isLogin
                    ? 'text-indigo-400 border-b-2 border-indigo-500'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <UserPlus size={16} />
                Create Account
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                      <UserIcon size={18} />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-zinc-950/80 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-950/80 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                    <Lock size={18} />
                  </span>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-950/80 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-medium rounded-lg shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-t-white border-zinc-500"></div>
                ) : isLogin ? (
                  <>
                    <LogIn size={18} />
                    Sign In
                  </>
                ) : (
                  <>
                    <UserPlus size={18} />
                    Register
                  </>
                )}
              </Button>
            </form>
          </div>
        )}

        <div className="text-center pt-4">
          <Link
            href="/components"
            className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-semibold transition-all border border-indigo-500/20 hover:border-indigo-500/40 bg-indigo-950/20 hover:bg-indigo-950/40 py-2.5 px-5 rounded-xl shadow-lg shadow-indigo-500/5"
          >
            <Sparkles size={16} />
            Explore Components Library
          </Link>
        </div>
      </div>
    </div>
  );
}
