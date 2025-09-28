// app/auth/signout/route.ts
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function POST() {
  try {
    const supabase = createClient();
    
    // Cerrar sesión en Supabase
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error al cerrar sesión:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Redirigir al login de admin
    return redirect('/admin-login');
  } catch (error) {
    console.error('Error inesperado al cerrar sesión:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}