# 🚀 AutoFlex Easy

Plataforma SaaS para suscripciones y automatizaciones.  
Construida con **Next.js 14**, **TailwindCSS**, **Supabase** y **Stripe**.

## 🎉 Características

- 🔐 **Autenticación completa**: Registro, login y manejo de usuarios con Supabase.
- 💳 **Pagos con Stripe**: Suscripciones, planes y portal de facturación listo.
- 📊 **Dashboard de usuario**: Acceso seguro con vista de planes y facturación.
- 🤖 **Base para integración de robot**: Código estructurado para conectar automatizaciones.
- 🎨 **UI moderna**: TailwindCSS y componentes propios.
- 📘 **TypeScript**: Tipado fuerte para mantener calidad.
- ⚙️ **Listo para producción**: Deploy en Vercel, con variables de entorno configurables.

## 🎬 Demo de flujo

1. Registro/Login de usuario.  
2. Checkout con Stripe (planes reales).  
3. Retorno al dashboard.  
4. Acceso al portal de facturación.

## 📄 Quick Start

```bash
pnpm i
cp .env.example .env.local
pnpm dev
