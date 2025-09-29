'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Play, Pause, Square, Package, MapPin, Bell, Settings, Calendar, Clock9, Zap, User, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AmazonFlexCredentials {
  email: string;
  password: string;
  isConfigured: boolean;
}

export default function RobotDashboard() {
  const [status, setStatus] = useState('inactive');
  const [isAutoSearchEnabled, setIsAutoSearchEnabled] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [selectedStations, setSelectedStations] = useState<string[]>([]);
  const [credentials, setCredentials] = useState<AmazonFlexCredentials>({
    email: '',
    password: '',
    isConfigured: false
  });
  const [showCredentialsForm, setShowCredentialsForm] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const stations = [
    { id: 'station1', name: 'Downtown Station' },
    { id: 'station2', name: 'North Station' },
    { id: 'station3', name: 'South Station' },
    { id: 'station4', name: 'East Station' },
    { id: 'station5', name: 'West Station' }
  ];

  const daysOfWeek = [
    { id: 0, name: 'Sunday' },
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' }
  ];

  // Cargar credenciales guardadas al iniciar
  useEffect(() => {
    const savedCredentials = localStorage.getItem('amazonFlexCredentials');
    if (savedCredentials) {
      setCredentials(JSON.parse(savedCredentials));
    }
  }, []);

  const handleStart = () => {
    if (!credentials.isConfigured) {
      setShowCredentialsForm(true);
      return;
    }
    setStatus('active');
  };

  const handlePause = () => {
    setStatus('paused');
  };

  const handleStop = () => {
    setStatus('inactive');
  };

  const handleSaveCredentials = () => {
    if (credentials.email && credentials.password) {
      const newCredentials = {
        ...credentials,
        isConfigured: true
      };
      setCredentials(newCredentials);
      localStorage.setItem('amazonFlexCredentials', JSON.stringify(newCredentials));
      setShowCredentialsForm(false);
      setTestResult(null);
    }
  };

  const handleTestCredentials = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    // Simular prueba de credenciales
    setTimeout(() => {
      const success = Math.random() > 0.3;
      setTestResult(success ? 'success' : 'error');
      setIsTesting(false);
    }, 2000);
  };

  const handleClearCredentials = () => {
    setCredentials({ email: '', password: '', isConfigured: false });
    localStorage.removeItem('amazonFlexCredentials');
    setStatus('inactive');
    setIsAutoSearchEnabled(false);
  };

  const getStatusVariant = () => {
    switch (status) {
      case 'active': return 'default';
      case 'paused': return 'secondary';
      case 'inactive': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'active': return 'Active';
      case 'paused': return 'Paused';
      case 'inactive': return 'Inactive';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-background">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Control Panel - AutoFlex</h1>
            <p className="text-muted-foreground">Automated system for Amazon Flex block capture</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={getStatusVariant()} className="text-sm">
              {getStatusText()}
            </Badge>
            {!credentials.isConfigured && (
              <Badge variant="destructive" className="text-sm">
                Credentials Required
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Amazon Flex Credentials */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <User className="mr-2 h-5 w-5" />
                Amazon Flex Account
              </CardTitle>
              <CardDescription>
                {credentials.isConfigured 
                  ? 'Your Amazon Flex account is connected and ready' 
                  : 'Connect your Amazon Flex account to start capturing blocks'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!credentials.isConfigured || showCredentialsForm ? (
                <div className="space-y-4">
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      Your credentials are encrypted and stored securely. We only use them to automate block captures.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="amazon-email" className="text-foreground">
                        Amazon Flex Email
                      </Label>
                      <Input
                        id="amazon-email"
                        type="email"
                        placeholder="tu.email@ejemplo.com"
                        value={credentials.email}
                        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amazon-password" className="text-foreground">
                        Amazon Flex Password
                      </Label>
                      <Input
                        id="amazon-password"
                        type="password"
                        placeholder="••••••••"
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={handleTestCredentials}
                      disabled={!credentials.email || !credentials.password || isTesting}
                      variant="outline"
                      className="flex-1"
                    >
                      {isTesting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Test Connection
                        </>
                      )}
                    </Button>

                    <Button 
                      onClick={handleSaveCredentials}
                      disabled={!credentials.email || !credentials.password}
                      className="flex-1"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Save Credentials
                    </Button>
                  </div>

                  {testResult && (
                    <Alert variant={testResult === 'success' ? 'default' : 'destructive'}>
                      {testResult === 'success' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <AlertDescription>
                        {testResult === 'success' 
                          ? 'Credentials verified successfully! You can now save and start using the bot.'
                          : 'Failed to verify credentials. Please check your email and password.'
                        }
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Account connected successfully. The bot can now capture blocks for you.
                    </AlertDescription>
                  </Alert>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Connected Account</p>
                      <p className="text-sm text-muted-foreground">{credentials.email}</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Connected
                    </Badge>
                  </div>

                  <Button 
                    onClick={handleClearCredentials}
                    variant="outline"
                    size="sm"
                  >
                    Change Account
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Zap className="mr-2 h-5 w-5" />
                System Status
              </CardTitle>
              <CardDescription>Current status and basic configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-search" className="flex flex-col space-y-1">
                  <span className="text-foreground">Auto Search</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    Enable to automatically search for blocks
                  </span>
                </Label>
                <Switch
                  id="auto-search"
                  checked={isAutoSearchEnabled}
                  onCheckedChange={setIsAutoSearchEnabled}
                  disabled={!credentials.isConfigured}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="flex flex-col space-y-1">
                  <span className="text-foreground">Notifications</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    Receive alerts for new blocks
                  </span>
                </Label>
                <Switch
                  id="notifications"
                  checked={notificationEnabled}
                  onCheckedChange={setNotificationEnabled}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Battery</span>
                  <span className="text-sm">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Blocks Captured</span>
                <span className="text-sm font-medium">0</span>
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Controls</CardTitle>
              <CardDescription>Manage system operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={handleStart}
                  className="flex-1"
                  variant={status === 'active' ? 'default' : 'outline'}
                  disabled={!isAutoSearchEnabled || !credentials.isConfigured}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start
                </Button>
                
                <Button 
                  onClick={handlePause}
                  className="flex-1"
                  variant={status === 'paused' ? 'secondary' : 'outline'}
                  disabled={status !== 'active'}
                >
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </Button>
                
                <Button 
                  onClick={handleStop}
                  className="flex-1"
                  variant={status === 'inactive' ? 'destructive' : 'outline'}
                  disabled={status === 'inactive'}
                >
                  <Square className="mr-2 h-4 w-4" />
                  Stop
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-10">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button variant="outline" className="h-10">
                  <MapPin className="mr-2 h-4 w-4" />
                  Stations
                </Button>
              </div>

              {!credentials.isConfigured && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please configure your Amazon Flex credentials to start the bot.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Work Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Clock9 className="mr-2 h-5 w-5" />
                Work Schedule
              </CardTitle>
              <CardDescription>Configure preferred block schedules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground">Activation Schedule</Label>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <Input
                    type="time"
                    defaultValue="08:00"
                    className="flex-1"
                  />
                  <span className="text-muted-foreground">to</span>
                  <Input
                    type="time"
                    defaultValue="17:00"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-foreground">Work Days</Label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map(day => (
                    <Button
                      key={day.id}
                      variant="outline"
                      size="sm"
                      className="flex-1 min-w-[60px]"
                    >
                      {day.name.substring(0, 3)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <MapPin className="mr-2 h-5 w-5" />
                Search Preferences
              </CardTitle>
              <CardDescription>Preferred stations and block types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground">Preferred Stations</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {stations.map(station => (
                    <Button
                      key={station.id}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      {station.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-foreground">Block Types</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    Instant Delivery
                  </Button>
                  <Button variant="outline" size="sm">
                    Scheduled Delivery
                  </Button>
                  <Button variant="outline" size="sm">
                    Logistics
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-foreground">Minimum Rate per Hour</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">$</span>
                  <Input
                    type="number"
                    min="18"
                    max="50"
                    defaultValue="22"
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">USD</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Calendar className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Block capture history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No recent activity</h3>
              <p className="text-muted-foreground">
                {credentials.isConfigured 
                  ? 'Start the bot to begin capturing blocks' 
                  : 'Configure your Amazon Flex account to get started'
                }
              </p>
              <Button 
                className="mt-4" 
                onClick={handleStart} 
                disabled={!isAutoSearchEnabled || !credentials.isConfigured}
              >
                <Play className="mr-2 h-4 w-4" />
                Start Search
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* System Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Bell className="mr-2 h-5 w-5" />
              System Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <div className="bg-primary/10 p-2 rounded-full">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {credentials.isConfigured 
                    ? 'System configured successfully' 
                    : 'Amazon Flex account required'
                  }
                </p>
                <p className="text-sm text-muted-foreground">
                  {credentials.isConfigured 
                    ? 'Your system is ready to start searching for blocks. Enable auto search to begin.'
                    : 'Please configure your Amazon Flex credentials to enable the bot.'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
