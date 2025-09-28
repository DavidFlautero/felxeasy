// app/admin/subscriptions/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menu, X, Construction } from 'lucide-react';
import { useState } from 'react';

export default function SubscriptionsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-full">
      {/* Header Móvil Mejorado */}
      <div className="lg:hidden bg-card border-b border-border p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-accent"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Suscripciones</h1>
              <p className="text-sm text-muted-foreground">Gestión de suscripciones</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-b border-border p-4 mb-6">
          <nav className="space-y-2">
            <a href="/admin" className="flex items-center space-x-3 py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <span>📊</span>
              <span>Dashboard</span>
            </a>
            <a href="/admin/users" className="flex items-center space-x-3 py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <span>👥</span>
              <span>Usuarios</span>
            </a>
            <a href="/admin/subscriptions" className="flex items-center space-x-3 py-2 px-3 text-blue-600 bg-blue-50 rounded-lg">
              <span>💳</span>
              <span>Suscripciones</span>
            </a>
          </nav>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
        {/* Header Desktop */}
        <div className="hidden lg:flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pt-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Suscripciones</h1>
            <p className="text-muted-foreground">Gestión de suscripciones</p>
          </div>
        </div>

        {/* Mensaje de construcción */}
        <Card className="w-full">
          <CardContent className="p-12">
            <div className="text-center">
              <Construction className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Página en construcción</h2>
              <p className="text-muted-foreground mb-6">
                Estamos trabajando en esta sección. Vuelve pronto para ver las actualizaciones.
              </p>
              <Button onClick={() => window.history.back()}>
                Volver atrás
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}