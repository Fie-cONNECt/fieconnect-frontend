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
      className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 border ${
        selected
          ? 'bg-brand-green text-white border-brand-green scale-[1.02] shadow-sm'
          : 'bg-background border-border text-foreground hover:border-brand-green/40 hover:bg-brand-green-light'
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
      className={`rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
        selected
          ? 'border-brand-green bg-brand-green-light shadow-sm scale-[1.02]'
          : 'border-border bg-background hover:border-brand-green/30'
      }`}
    >
      <Home className={`h-5 w-5 mb-2 ${selected ? 'text-brand-green' : 'text-muted-foreground'}`} />
      <span className="font-semibold text-sm">{label}</span>
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
      <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === step ? 'bg-brand-green' : i < step ? 'bg-brand-green/50' : 'bg-border'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {step + 1} of {steps.length}
        </span>
      </div>

      <div key={step} className="animate-in fade-in slide-in-from-right-2 duration-300 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
            <Icon className="h-5 w-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {current.title}
          </h1>
          <p className="text-muted-foreground">{current.subtitle}</p>
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
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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

      <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between sticky bottom-4 bg-background/90 backdrop-blur-sm py-3 rounded-2xl border border-border/60 px-3">
        <button
          type="button"
          onClick={handleSkip}
          disabled={saving}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors order-2 sm:order-1 px-2 py-2"
        >
          Skip for now — I’ll explore first
        </button>
        <div className="flex gap-2 order-1 sm:order-2 justify-end">
          {step > 0 && (
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={() => setStep((s) => s - 1)}
              disabled={saving}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button
              type="button"
              className="rounded-xl bg-brand-green hover:bg-brand-green/90 text-white"
              onClick={() => setStep((s) => s + 1)}
              disabled={saving}
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button
              type="button"
              className="rounded-xl bg-brand-green hover:bg-brand-green/90 text-white"
              onClick={handleFinish}
              disabled={saving}
            >
              {saving ? 'Saving…' : 'See my matches'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
