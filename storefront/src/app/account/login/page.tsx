'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { Lock, User, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuthStore();
  const { showToast } = useToast();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('rohan.sharma@elemental.in');
  const [password, setPassword] = useState('••••••••••••');
  const [firstName, setFirstName] = useState('Rohan');
  const [lastName, setLastName] = useState('Sharma');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        showToast(`Welcome back, ${email.split('@')[0]}!`);
      } else {
        await register(firstName, lastName, email, password);
        showToast('Client account created successfully!');
      }
      router.push('/account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setIsLoading(true);
    await login('rohan.sharma@elemental.in', 'demo');
    showToast('Authenticated as VIP Client Demo');
    setIsLoading(false);
    router.push('/account');
  };

  return (
    <div className="py-16 sm:py-24 bg-stone-50/50 min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 shadow-sm space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-serif font-bold tracking-[0.2em] uppercase text-stone-400">
            Client Member Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-light text-stone-950">
            {mode === 'login' ? 'Client Identification' : 'Request Membership'}
          </h1>
          <p className="text-xs text-stone-500">
            Access Pan-India order tracking, saved addresses, and private seasonal releases.
          </p>
        </div>

        {/* 1-Click Demo Client Banner */}
        <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-xl space-y-2 text-left">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-900 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Demo Showcase Fast-Pass
            </span>
            <span className="text-[10px] bg-amber-200/70 text-amber-950 px-1.5 py-0.5 rounded font-mono font-bold">1-Click</span>
          </div>
          <p className="text-xs text-amber-800">
            Click below to instantly log in as pre-configured VIP client Rohan Sharma with active order history and saved addresses in Mumbai & Bengaluru.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleQuickDemoLogin}
            className="w-full bg-white hover:bg-amber-100/50 border-amber-300 text-xs text-amber-950 font-semibold"
          >
            Authenticate with Demo Profile
          </Button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-stone-200">
          <button
            onClick={() => setMode('login')}
            className={clsx(
              'flex-1 pb-3 text-xs font-semibold uppercase tracking-wider transition-colors',
              mode === 'login'
                ? 'text-stone-950 border-b-2 border-stone-950'
                : 'text-stone-400 hover:text-stone-700'
            )}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={clsx(
              'flex-1 pb-3 text-xs font-semibold uppercase tracking-wider transition-colors',
              mode === 'register'
                ? 'text-stone-950 border-b-2 border-stone-950'
                : 'text-stone-400 hover:text-stone-700'
            )}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Rohan"
              />
              <Input
                label="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Sharma"
              />
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="rohan.sharma@elemental.in"
            leftIcon={<User className="w-4 h-4" />}
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full shadow-md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {mode === 'login' ? 'Sign In to Account' : 'Create Member Profile'}
          </Button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
            <span>Medusa Customer Auth & encrypted token sessions</span>
          </p>
        </div>

      </div>
    </div>
  );
}
