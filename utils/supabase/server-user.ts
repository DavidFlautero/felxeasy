// utils/supabase/server-user.ts
import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createUserClient() {
  const cookieStore = cookies();
  return createServerClient(url, anon, {
    cookies: {
      get(name: string) { return cookieStore.get(name)?.value; },
    },
  });
}
