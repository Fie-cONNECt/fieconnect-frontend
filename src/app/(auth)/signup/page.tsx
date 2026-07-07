'use client';

import SignUpForm from '@/components/forms/SignUpForm';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Create an account</h1>
        <p className="mt-2 text-sm text-zinc-400">Sign up here to join fieConnect</p>
      </div>

      <SignUpForm />

      <div className="flex items-center justify-between mt-8 text-xs text-zinc-400">
        <div>
          Have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-white underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </div>
        <Link href="#" className="hover:text-white transition-colors">
          Terms & Conditions
        </Link>
      </div>
    </div>
  );
}
