/**
 * Supabase client and file upload helper.
 * Uses the official @supabase/supabase-js client for reliable storage uploads.
 * Falls back to a mock URL if env vars are missing (local dev without Supabase).
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Lazily created client — only instantiated when env vars are present
let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!supabaseUrl || !supabaseKey) return null;
  if (!_client) {
    _client = createClient(supabaseUrl, supabaseKey);
  }
  return _client;
}

// Track buckets we've already verified to avoid redundant API calls
const _verifiedBuckets = new Set<string>();

/**
 * Ensures the given bucket exists and is public.
 * Creates it if it doesn't exist yet (idempotent).
 */
async function ensureBucket(client: ReturnType<typeof createClient>, bucket: string) {
  if (_verifiedBuckets.has(bucket)) return;

  const { error } = await client.storage.createBucket(bucket, {
    public: true,
    allowedMimeTypes: ['image/*', 'application/pdf'],
    fileSizeLimit: 10485760, // 10MB
  });

  // "already exists" is not an error we care about
  if (error && !error.message.toLowerCase().includes('already exists')) {
    console.warn(`Could not create bucket "${bucket}": ${error.message}`);
  }

  _verifiedBuckets.add(bucket);
}

export async function uploadToSupabase(file: File, bucket: string = 'properties'): Promise<string> {
  const client = getClient();

  // ── Mock fallback for local dev without Supabase ────────────────────────────
  if (!client) {
    console.warn('Supabase env vars missing — using mock file URL.');
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (file.type.startsWith('image/')) {
      try {
        return URL.createObjectURL(file);
      } catch {
        // fall through
      }
    }
    const name = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    return `https://supabase.co/storage/v1/object/public/${bucket}/${name}`;
  }

  // ── Ensure bucket exists ─────────────────────────────────────────────────────
  await ensureBucket(client, bucket);

  // ── Real upload via Supabase SDK ─────────────────────────────────────────────
  const sanitizedFileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;

  const { error } = await client.storage.from(bucket).upload(sanitizedFileName, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  // Return the public URL
  const { data } = client.storage.from(bucket).getPublicUrl(sanitizedFileName);
  return data.publicUrl;
}
