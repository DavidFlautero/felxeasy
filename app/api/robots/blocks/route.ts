import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const { userId, blockData } = await request.json();

    const supabase = createClient();
    const { data, error } = await supabase
      .from('block_captures')
      .insert({
        user_id: userId,
        block_id: blockData.block_id,
        amount: blockData.amount,
        location: blockData.location,
        schedule: blockData.schedule,
        captured_at: new Date(blockData.captured_at * 1000).toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting block:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in block capture:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}