import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    clientId: process.env.GOOGLE_CLIENT_ID?.slice(0, 20) + '...' || 'NOT SET',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ? 'SET (hidden)' : 'NOT SET',
    authUrl: process.env.AUTH_URL || 'NOT SET',
    nodeEnv: process.env.NODE_ENV,
  });
}