import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from('robot_sessions')
      .select('commands')
      .eq('user_id', userId)
      .single();

    if (error) {
      return NextResponse.json({ commands: [] });
    }

    return NextResponse.json(data?.commands || { commands: [] });
  } catch (error) {
    console.error('Error in get commands:', error);
    return NextResponse.json({ commands: [] });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, command, parameters } = await request.json();
    
    const supabase = createClient();
    const newCommand = {
      command,
      parameters,
      timestamp: new Date().toISOString()
    };

    const { error } = await supabase
      .from('robot_sessions')
      .update({ 
        commands: { commands: [newCommand] },
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating commands:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in post command:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}