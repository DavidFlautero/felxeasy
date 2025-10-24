import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const { userId, status, metrics, capturedBlocks } = await request.json();
    
    const supabase = createClient();
    
    const { error: sessionError } = await supabase
      .from('robot_sessions' as any)
      .update({
        status,
        metrics,
        last_ping: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (sessionError) {
      console.error('Error updating session:', sessionError);
    }

    if (capturedBlocks && capturedBlocks.length > 0) {
      const blocksData = capturedBlocks.map((block: any) => ({
        user_id: userId,
        block_id: block.blockId,
        amount: block.amount,
        location: block.location,
        schedule: block.schedule,
        captured_at: new Date(block.captured_at * 1000).toISOString()
      }));

      const { error: blocksError } = await supabase
        .from('block_captures' as any)
        .insert(blocksData);

      if (blocksError) {
        console.error('Error inserting blocks:', blocksError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in status update:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}