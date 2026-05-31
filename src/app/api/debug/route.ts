import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return NextResponse.json({
    hasUrl: !!url,
    urlPrefix: url ? url.substring(0, 20) + '...' : null,
    hasServiceKey: !!serviceKey,
    serviceKeyPrefix: serviceKey ? serviceKey.substring(0, 12) + '...' : null,
    hasAnonKey: !!anonKey,
    nodeEnv: process.env.NODE_ENV,
  });
}
