/**
 * Reusable helper client for uploading files to Supabase Storage.
 * If NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are not present,
 * it returns a simulated mock URL for local development/testing.
 */
export async function uploadToSupabase(file: File, bucket: string = 'properties'): Promise<string> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase environment variables are missing. Using mock simulated file upload.');
    // Simulate slight network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Return a clean local object URL or realistic mock URL
    // For images, we can return the native browser object URL so it shows up in preview,
    // or a realistic mock path.
    const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    if (file.type.startsWith('image/')) {
      // In the browser, we can generate a temporary URL that works in the active session:
      try {
        return URL.createObjectURL(file);
      } catch (e) {
        return `https://supabase.co/storage/v1/object/public/${bucket}/${uniqueName}`;
      }
    }
    return `https://supabase.co/storage/v1/object/public/${bucket}/${uniqueName}`;
  }

  // Sanitize file path
  const sanitizedFileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
  const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucket}/${sanitizedFileName}`;

  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(`Failed to upload to Supabase: ${errorMsg}`);
  }

  // Return the public URL for the uploaded object
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${sanitizedFileName}`;
}
