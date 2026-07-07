'use client';

import LoginForm from '@/components/forms/loginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-zinc-400">Sign in to access your dashboard</p>
      </div>

      <LoginForm />

      <div className="flex items-center justify-between mt-8 text-xs text-zinc-400">
        <div>
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-semibold text-white underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </div>
        <Link href="#" className="hover:text-white transition-colors">
          Terms & Conditions
        </Link>
      </div>
    </div>
  );
}
