// app/admin/users/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, DollarSign, Package, Activity, Search, Download, Menu, X } from 'lucide-react';

interface FlexUser {
  id: string;
  username: string;
  email: string;
  registrationDate: string;
  blocksCaptured: number;
  totalEarnings: number;
  lastActivity: string;
  status: 'active' | 'inactive';
  amazonFlexAccount: string;
  subscription: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<FlexUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Datos de ejemplo - reemplazar con API real
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simular carga de datos
        setTimeout(() => {
          setUsers([
            {
              id: '1',
              username: 'john_doe',
              email: 'john@example.com',
              registrationDate: '15/01/2024',
              blocksCaptured: 45,
              totalEarnings: 1250,
              lastActivity: 'Hoy',
              status: 'active',
              amazonFlexAccount: 'john_doe_flex',
              subscription: 'Premium'
            },
            {
              id: '2',
              username: 'jane_smith',
              email: 'jane@example.com',
              registrationDate: '20/01/2024',
              blocksCaptured: 32,
              totalEarnings: 890,
              lastActivity: 'Ayer',
              status: 'active',
              amazonFlexAccount: 'jane_smith_flex',
              subscription: 'Básico'
            },
            {
              id: '3',
              username: 'mike_wilson',
              email: 'mike@example.com',
              registrationDate: '10/01/2024',
              blocksCaptured: 0,
              totalEarnings: 0,
              lastActivity: '5 días',
              status: 'inactive',
              amazonFlexAccount: 'mike_wilson_flex',
              subscription: 'Ninguna'
            },
            {
              id: '4',
              username: 'sarah_johnson',
              email: 'sarah@example.com',
              registrationDate: '25/01/2024',
              blocksCaptured: 28,
              totalEarnings: 720,
              lastActivity: 'Hoy',
              status: 'active',
              amazonFlexAccount: 'sarah_j_flex',
              subscription: 'Premium'
            },
            {
              id: '5',
              username: 'alex_garcia',
              email: 'alex@example.com',
              registrationDate: '05/01/2024',
              blocksCaptured: 67,
              totalEarnings: 1850,
              lastActivity: '2 días',
              status: 'active',
              amazonFlexAccount: 'alex_g_flex',
              subscription: 'Premium'
            }
          ]);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error loading users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.amazonFlexAccount.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const totalBlocks = users.reduce((sum, user) => sum + user.blocksCaptured, 0);
  const totalEarnings = users.reduce((sum, user) => sum + user.totalEarnings, 0);

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

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
              <h1 className="text-xl font-bold text-foreground">Gestión de Usuarios</h1>
              <p className="text-sm text-muted-foreground">Usuarios de Amazon Flex</p>
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
            <a href="/admin/users" className="flex items-center space-x-3 py-2 px-3 text-blue-600 bg-blue-50 rounded-lg">
              <span>👥</span>
              <span>Usuarios</span>
            </a>
            <a href="/admin/subscriptions" className="flex items-center space-x-3 py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-lg">
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
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Gestión de Usuarios</h1>
            <p className="text-muted-foreground">Usuarios de Amazon Flex</p>
          </div>
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar Reporte
          </Button>
        </div>

        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="w-full">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Total Usuarios</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground truncate">{totalUsers}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 ml-3">
                  <Users className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Usuarios Activos</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground truncate">{activeUsers}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 ml-3">
                  <Activity className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Bloques Capturados</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground truncate">{totalBlocks}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 ml-3">
                  <Package className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Ganancias Totales</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground truncate">${totalEarnings}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 ml-3">
                  <DollarSign className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table - Responsive */}
        <Card className="w-full">
          <CardHeader className="px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-foreground text-lg sm:text-xl">Lista de Usuarios</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar usuario..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2 sm:hidden">
                  <Download className="w-4 h-4" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0 sm:px-6 pb-4">
            {/* Table para desktop */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Usuario</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Fecha Inscripción</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Bloques</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Ganancias</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actividad</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Suscripción</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Estado</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-accent/50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-foreground">{user.username}</p>
                          <p className="text-xs text-muted-foreground">{user.amazonFlexAccount}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-3 px-4 text-muted-foreground">{user.registrationDate}</td>
                      <td className="py-3 px-4 text-foreground font-medium">{user.blocksCaptured}</td>
                      <td className="py-3 px-4 text-foreground font-medium">${user.totalEarnings}</td>
                      <td className="py-3 px-4 text-muted-foreground">{user.lastActivity}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className="text-xs">
                          {user.subscription}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={user.status === 'active' ? 'default' : 'secondary'}
                          className={user.status === 'active' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }
                        >
                          {user.status === 'active' ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          Ver Detalles
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards para móviles y tablets */}
            <div className="lg:hidden space-y-4 px-4 sm:px-6">
              {filteredUsers.map((user) => (
                <div key={user.id} className="border border-border rounded-lg p-4 space-y-3">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground truncate">{user.username}</p>
                        <Badge 
                          variant={user.status === 'active' ? 'default' : 'secondary'}
                          className={user.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                          }
                        >
                          {user.status === 'active' ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                      <p className="text-xs text-muted-foreground">Cuenta: {user.amazonFlexAccount}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Fecha Registro</p>
                      <p className="font-medium">{user.registrationDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Suscripción</p>
                      <Badge variant="secondary" className="text-xs">
                        {user.subscription}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Bloques</p>
                      <p className="font-medium">{user.blocksCaptured}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ganancias</p>
                      <p className="font-medium">${user.totalEarnings}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      Actividad: {user.lastActivity}
                    </span>
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Estado vacío */}
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No se encontraron usuarios</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay usuarios registrados'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}