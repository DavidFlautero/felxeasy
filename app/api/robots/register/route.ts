import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    
    const { userId, driverData } = await request.json();
    
    const { data, error } = await supabase
      .from('robot_sessions')
      .upsert({
        user_id: userId,
        status: 'online',
        last_ping: new Date().toISOString(),
        commands: { commands: [] },
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in robot register:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}