'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, X } from 'lucide-react';
import { requestGQL } from '@/lib/graphql-client';
import { SKIP_PREFERENCES_MUTATION } from '@/graphql/operations';
import { useUser } from '@/app/app/layout';
import { isTenant } from '@/lib/utils';
import { toast } from 'sonner';

const SESSION_KEY = 'fie_onboarding_nudge_dismissed';

export function OnboardingNudgeBanner() {
  const { user } = useUser();
  const [hidden, setHidden] = useState(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem(SESSION_KEY) === '1';
  });

  if (hidden || !user || !isTenant(user)) return null;
  if (user.preferences?.onboardingStatus !== 'PENDING') return null;

  const dismissSession = () => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setHidden(true);
  };

  const handleNotNow = async () => {
    try {
      await requestGQL(SKIP_PREFERENCES_MUTATION as any);
      dismissSession();
      window.location.reload();
    } catch (e: any) {
      toast.error(e.message || 'Something went wrong');
      dismissSession();
    }
  };

  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 mb-4 rounded-2xl border border-brand-green/20 bg-gradient-to-r from-brand-green-light to-background px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-8 w-8 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Want better matches?</p>
          <p className="text-xs text-muted-foreground">Takes under a minute — or skip anytime.</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:shrink-0">
        <button
          type="button"
          onClick={handleNotNow}
          className="text-xs text-muted-foreground hover:text-foreground px-2 py-1.5"
        >
          Not now
        </button>
        <Link
          href="/app/onboarding"
          className="inline-flex items-center rounded-xl bg-brand-green text-white text-xs font-semibold px-3 py-2 hover:bg-brand-green/90"
        >
          Continue
        </Link>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={dismissSession}
          className="p-1.5 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
