'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { MapPin, Home, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { requestGQL } from '@/lib/graphql-client';
import { SAVE_PREFERENCES_MUTATION, SKIP_PREFERENCES_MUTATION } from '@/graphql/operations';
import {
  REGIONS,
  PROPERTY_TYPES,
  RENT_RANGES,
  BEDROOM_OPTIONS,
  ONBOARDING_AMENITIES,
  DISTRICTS_BY_REGION,
} from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { BrandLogoLink } from '@/components/layout/brand-logo';
import { useUser } from '../layout';
import { isTenant } from '@/lib/utils';

function toggleInList(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 border touch-manipulation active:scale-[0.98] ${
        selected
          ? 'bg-brand-green text-white border-brand-green shadow-sm'
          : 'bg-background/80 border-border text-foreground active:bg-brand-green-light'
      }`}
    >
      {label}
    </button>
  );
}

function TypeCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[4.5rem] flex-col justify-center rounded-2xl border-2 p-3.5 sm:p-4 text-left transition-colors duration-200 touch-manipulation active:scale-[0.98] ${
        selected
          ? 'border-brand-green bg-brand-green-light shadow-sm'
          : 'border-border bg-background/80 active:bg-muted/40'
      }`}
    >
      <Home className={`h-5 w-5 mb-2 ${selected ? 'text-brand-green' : 'text-muted-foreground'}`} />
      <span className="font-semibold text-xs sm:text-sm leading-tight">{label}</span>
    </button>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: userLoading, refreshUser } = useUser();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  const [regions, setRegions] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState<string[]>([]);
  const [rentIndex, setRentIndex] = useState(0);
  const [amenities, setAmenities] = useState<string[]>([]);

  const districtOptions = useMemo(() => {
    const set = new Set<string>();
    for (const region of regions) {
      for (const d of DISTRICTS_BY_REGION[region] || []) set.add(d);
    }
    return [...set];
  }, [regions]);

  React.useEffect(() => {
    if (userLoading) return;
    if (!user) return;
    if (!isTenant(user)) {
      router.replace('/app');
      return;
    }
    const status = user.preferences?.onboardingStatus;
    if (status === 'COMPLETED' || status === 'SKIPPED') {
      router.replace('/app/properties');
    }
  }, [user, userLoading, router]);

  React.useEffect(() => {
    setDistricts((prev) => prev.filter((d) => districtOptions.includes(d)));
  }, [districtOptions]);

  const goExplore = () => router.push('/app/properties');

  const handleSkip = async () => {
    setSaving(true);
    try {
      await requestGQL(SKIP_PREFERENCES_MUTATION as any);
      await refreshUser();
      toast.message('All good — explore at your own pace.');
      goExplore();
    } catch (e: any) {
      toast.error(e.message || 'Could not skip right now.');
    } finally {
      setSaving(false);
    }
  };

  const handleFinish = async () => {
    setSaving(true);
    try {
      const range = RENT_RANGES[rentIndex];
      await requestGQL(SAVE_PREFERENCES_MUTATION as any, {
        input: {
          regions,
          districts,
          types,
          bedrooms,
          amenities,
          minPrice: range?.min ?? null,
          maxPrice: range?.max ?? null,
        },
      });
      await refreshUser();
      toast.success('We’ll tune your feed.');
      goExplore();
    } catch (e: any) {
      toast.error(e.message || 'Could not save preferences.');
    } finally {
      setSaving(false);
    }
  };

  const steps = [
    {
      title: 'Where do you want to live?',
      subtitle: 'Pick a region — districts are optional.',
      icon: MapPin,
    },
    {
      title: 'What’s your vibe?',
      subtitle: 'Home style, bedrooms, and budget. Skip anything.',
      icon: Home,
    },
    {
      title: 'Anything nice to have?',
      subtitle: 'Totally optional — tap what you like.',
      icon: Sparkles,
    },
  ];

  const current = steps[step];
  const Icon = current.icon;

  if (userLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-brand-green-light via-background to-background px-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-br from-brand-green-light/60 via-background to-background pt-[env(safe-area-inset-top)]">
      <header className="shrink-0 px-4 pt-5 pb-3 sm:px-10 sm:pt-8 sm:pb-4">
        <BrandLogoLink href="/app/properties" size="sm" linkClassName="sm:hidden" />
        <BrandLogoLink href="/app/properties" size="md" linkClassName="hidden sm:inline-flex" />
      </header>

      <div className="flex-1 overflow-y-auto overscroll-y-contain px-4 pb-[calc(9.5rem+env(safe-area-inset-bottom))] sm:px-10 sm:pb-32">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-6 flex items-center justify-between sm:mb-8">
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i === step ? 'bg-brand-green' : i < step ? 'bg-brand-green/50' : 'bg-border'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">
              {step + 1} of {steps.length}
            </span>
          </div>

          <div
            key={step}
            className="animate-in fade-in slide-in-from-right-2 duration-300 space-y-5 sm:space-y-6"
          >
            <div className="space-y-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
                <Icon className="h-5 w-5" />
              </div>
              <h1 className="text-[1.625rem] leading-tight sm:text-4xl font-bold tracking-tight text-foreground">
                {current.title}
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {current.subtitle}
              </p>
            </div>

            {step === 0 && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map((region) => (
                    <Chip
                      key={region}
                      label={region}
                      selected={regions.includes(region)}
                      onClick={() => setRegions((prev) => toggleInList(prev, region))}
                    />
                  ))}
                </div>
                {districtOptions.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">Any favorite areas?</p>
                    <div className="flex flex-wrap gap-2">
                      {districtOptions.map((d) => (
                        <Chip
                          key={d}
                          label={d}
                          selected={districts.includes(d)}
                          onClick={() => setDistricts((prev) => toggleInList(prev, d))}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
                  {PROPERTY_TYPES.map((type) => (
                    <TypeCard
                      key={type}
                      label={type}
                      selected={types.includes(type)}
                      onClick={() => setTypes((prev) => toggleInList(prev, type))}
                    />
                  ))}
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium">Bedrooms</p>
                  <div className="flex flex-wrap gap-2">
                    {BEDROOM_OPTIONS.map((b) => (
                      <Chip
                        key={b}
                        label={b === '5+' ? '5+' : `${b} bed`}
                        selected={bedrooms.includes(b)}
                        onClick={() => setBedrooms((prev) => toggleInList(prev, b))}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium">Monthly budget (GHS)</p>
                  <div className="flex flex-wrap gap-2">
                    {RENT_RANGES.map((range, i) => (
                      <Chip
                        key={range.label}
                        label={range.label}
                        selected={rentIndex === i}
                        onClick={() => setRentIndex(i)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-wrap gap-2">
                {ONBOARDING_AMENITIES.map((a) => (
                  <Chip
                    key={a}
                    label={a
                      .replace('Gated Community with 24/7 Security', 'Gated security')
                      .replace('Private Parking Garage', 'Parking')
                      .replace('24/7 Standby Generator', 'Generator')
                      .replace('Water Reservoir (Polytank)', 'Polytank')
                      .replace('Fully Fitted Kitchen', 'Fitted kitchen')
                      .replace('High-speed WiFi', 'WiFi')
                      .replace('Air Conditioning', 'AC')
                      .replace('Swimming Pool', 'Pool')
                      .replace('Spacious Balcony', 'Balcony')}
                    selected={amenities.includes(a)}
                    onClick={() => setAmenities((prev) => toggleInList(prev, a))}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-10 border-t border-border/60 bg-background/95 backdrop-blur-md px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:px-10 sm:py-4">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
          <div className="flex gap-2">
            {step > 0 && (
              <Button
                type="button"
                variant="outline"
                className="h-11 min-w-11 shrink-0 rounded-xl px-3 sm:px-4 touch-manipulation"
                onClick={() => setStep((s) => s - 1)}
                disabled={saving}
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button
                type="button"
                className="h-11 flex-1 rounded-xl bg-brand-green hover:bg-brand-green/90 text-white touch-manipulation"
                onClick={() => setStep((s) => s + 1)}
                disabled={saving}
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                type="button"
                className="h-11 flex-1 rounded-xl bg-brand-green hover:bg-brand-green/90 text-white touch-manipulation"
                onClick={handleFinish}
                disabled={saving}
              >
                {saving ? 'Saving…' : 'See my matches'}
              </Button>
            )}
          </div>
          <button
            type="button"
            onClick={handleSkip}
            disabled={saving}
            className="min-h-11 w-full text-center text-sm text-muted-foreground transition-colors active:text-foreground touch-manipulation sm:text-left"
          >
            <span className="sm:hidden">Skip for now</span>
            <span className="hidden sm:inline">Skip for now — I’ll explore first</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
