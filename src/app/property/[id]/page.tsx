'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PropertyDetailView } from '@/components/property/property-detail-view';
import { PublicNavbarSkeleton } from '@/components/layout';

export default function PropertyPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!id) return;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      router.replace(`/app/property/${id}`);
      return;
    }
    setReady(true);
  }, [id, router]);

  if (!ready) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground font-sans animate-pulse">
        <PublicNavbarSkeleton />
      </div>
    );
  }

  return <PropertyDetailView variant="public" />;
}
