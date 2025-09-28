// app/auth/signout/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    console.log('🔄 Iniciando proceso de cierre de sesión...');
    
    const supabase = createClient();
    
    // Verificar si hay una sesión activa primero
    const { data: { user } } = await supabase.auth.getUser();
    console.log('👤 Usuario actual:', user?.email);
    
    if (!user) {
      console.log('⚠️ No hay usuario autenticado, redirigiendo...');
      return NextResponse.redirect(new URL('/admin-login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
    }

    // Cerrar sesión en Supabase
    console.log('🚪 Cerrando sesión de Supabase...');
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('❌ Error al cerrar sesión en Supabase:', error);
      return NextResponse.json(
        { error: `Error de Supabase: ${error.message}` },
        { status: 400 }
      );
    }

    console.log('✅ Sesión cerrada exitosamente');
    
    // Redirigir al login de admin
    const response = NextResponse.redirect(
      new URL('/admin-login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
    );
    
    // Limpiar cookies adicionales si es necesario
    response.headers.set('Set-Cookie', 'sb-access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax');
    response.headers.set('Set-Cookie', 'sb-refresh-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax');
    
    return response;

  } catch (error) {
    console.error('💥 Error inesperado al cerrar sesión:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al cerrar sesión' },
      { status: 500 }
    );
  }
}