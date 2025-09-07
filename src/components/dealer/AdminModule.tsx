import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Settings, 
  Shield, 
  Bell,
  Mail,
  Phone,
  Globe,
  Database,
  Key,
  UserPlus,
  HeartHandshake,
  Headphones,
  BookOpen,
  Award,
  Clock
} from "lucide-react";

export function AdminModule() {
  const [activeTab, setActiveTab] = useState("greaves-care");
  const { toast } = useToast();

  const [systemSettings, setSystemSettings] = useState({
    notifications: true,
    autoBackup: true,
    maintenance: false,
    analytics: true,
    apiAccess: false
  });

  const careServices = [
    { 
      id: "care-001", 
      name: "24/7 Emergency Support", 
      description: "Round-the-clock technical support for critical issues",
      status: "active",
      responseTime: "< 30 minutes",
      coverage: "Nationwide"
    },
    { 
      id: "care-002", 
      name: "Preventive Maintenance Program", 
      description: "Scheduled maintenance to prevent equipment breakdowns",
      status: "active",
      responseTime: "48 hours",
      coverage: "Major Cities"
    },
    { 
      id: "care-003", 
      name: "Training & Certification", 
      description: "Operator training and certification programs",
      status: "active",
      responseTime: "1 week",
      coverage: "Regional Centers"
    },
    { 
      id: "care-004", 
      name: "Extended Warranty", 
      description: "Extended warranty coverage for peace of mind",
      status: "available",
      responseTime: "24 hours",
      coverage: "Pan-India"
    }
  ];

  const userPermissions = [
    { role: "Admin", users: 2, permissions: ["Full Access", "User Management", "System Config"] },
    { role: "Manager", users: 5, permissions: ["Reports", "User View", "Order Management"] },
    { role: "Operator", users: 12, permissions: ["Basic Access", "Service Requests", "Parts Orders"] },
    { role: "Viewer", users: 8, permissions: ["Read Only", "Reports View"] }
  ];

  const handleSettingChange = (setting: string, value: boolean) => {
    setSystemSettings(prev => ({ ...prev, [setting]: value }));
    toast({
      title: "Setting Updated",
      description: `${setting} has been ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleAction = (action: string, item?: any) => {
    toast({
      title: `${action} Action`,
      description: `${action} ${item ? `for ${item.name || item.role}` : ''} executed successfully`,
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Administration & Care</h2>
        <p className="text-muted-foreground">Manage Greaves Care services and system administration</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="greaves-care" className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4" />
            Greaves Care
          </TabsTrigger>
          <TabsTrigger value="user-management" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="system-settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            System Settings
          </TabsTrigger>
          <TabsTrigger value="options" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Options
          </TabsTrigger>
        </TabsList>

        <TabsContent value="greaves-care" className="mt-6">
          <div className="space-y-6">
            {/* Care Services Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Support Cases</p>
                      <p className="text-2xl font-bold text-green-600">23</p>
                    </div>
                    <Headphones className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Customer Satisfaction</p>
                      <p className="text-2xl font-bold text-blue-600">98.5%</p>
                    </div>
                    <Award className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                      <p className="text-2xl font-bold text-orange-600">18 min</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Care Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5" />
                  Greaves Care Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {careServices.map((service) => (
                    <div key={service.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{service.name}</h4>
                            <Badge className={service.status === 'active' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}>
                              {service.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Response Time: </span>
                              <span className="font-medium">{service.responseTime}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Coverage: </span>
                              <span className="font-medium">{service.coverage}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleAction('View Details', service)}>
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleAction('Manage Service', service)}>
                          Manage
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleAction('Contact Support', service)}>
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4" onClick={() => handleAction('Request Service Call')}>
                    <div className="text-center">
                      <Phone className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">Request Service Call</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4" onClick={() => handleAction('Schedule Training')}>
                    <div className="text-center">
                      <BookOpen className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">Schedule Training</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4" onClick={() => handleAction('View Knowledge Base')}>
                    <div className="text-center">
                      <Globe className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">Knowledge Base</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="user-management" className="mt-6">
          <div className="space-y-6">
            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {userPermissions.map((role, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{role.role}</h4>
                      <Badge variant="outline">{role.users} users</Badge>
                    </div>
                    <div className="space-y-1">
                      {role.permissions.map((permission, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground">• {permission}</div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => handleAction('Manage Role', role)}>
                      Manage
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* User Management Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Management Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-auto p-4" onClick={() => handleAction('Add New User')}>
                    <div className="text-center">
                      <UserPlus className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">Add New User</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4" onClick={() => handleAction('Manage Permissions')}>
                    <div className="text-center">
                      <Shield className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">Manage Permissions</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4" onClick={() => handleAction('Reset Passwords')}>
                    <div className="text-center">
                      <Key className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">Reset Passwords</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4" onClick={() => handleAction('View Activity Logs')}>
                    <div className="text-center">
                      <Database className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">Activity Logs</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system-settings" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications">Notifications</Label>
                      <p className="text-sm text-muted-foreground">Enable system notifications</p>
                    </div>
                    <Switch 
                      id="notifications"
                      checked={systemSettings.notifications}
                      onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-backup">Auto Backup</Label>
                      <p className="text-sm text-muted-foreground">Automatic data backup</p>
                    </div>
                    <Switch 
                      id="auto-backup"
                      checked={systemSettings.autoBackup}
                      onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable maintenance mode</p>
                    </div>
                    <Switch 
                      id="maintenance"
                      checked={systemSettings.maintenance}
                      onCheckedChange={(checked) => handleSettingChange('maintenance', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="analytics">Analytics</Label>
                      <p className="text-sm text-muted-foreground">Enable usage analytics</p>
                    </div>
                    <Switch 
                      id="analytics"
                      checked={systemSettings.analytics}
                      onCheckedChange={(checked) => handleSettingChange('analytics', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="api-access">API Access</Label>
                      <p className="text-sm text-muted-foreground">Enable API access</p>
                    </div>
                    <Switch 
                      id="api-access"
                      checked={systemSettings.apiAccess}
                      onCheckedChange={(checked) => handleSettingChange('apiAccess', checked)}
                    />
                  </div>
                </div>

                <Button onClick={() => handleAction('Save Settings')} className="w-full">
                  Save Configuration
                </Button>
              </CardContent>
            </Card>

            {/* System Information */}
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Version</p>
                    <p className="font-medium">v2.4.1</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Updated</p>
                    <p className="font-medium">2024-01-15</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Database Size</p>
                    <p className="font-medium">2.4 GB</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Active Users</p>
                    <p className="font-medium">27</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Server Status</p>
                    <Badge className="bg-green-500 text-white">Online</Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Backup</p>
                    <p className="font-medium">Today 03:00 AM</p>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleAction('Run System Check')}>
                    Run System Check
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleAction('Create Backup')}>
                    Create Backup
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleAction('View Logs')}>
                    View System Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="options" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Options */}
            <Card>
              <CardHeader>
                <CardTitle>General Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="Greaves Cotton Ltd" />
                </div>
                
                <div>
                  <Label htmlFor="time-zone">Time Zone</Label>
                  <Input id="time-zone" defaultValue="Asia/Kolkata" />
                </div>
                
                <div>
                  <Label htmlFor="date-format">Date Format</Label>
                  <Input id="date-format" defaultValue="DD/MM/YYYY" />
                </div>
                
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Input id="currency" defaultValue="INR" />
                </div>

                <Button onClick={() => handleAction('Save Options')} className="w-full">
                  Save Options
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" defaultValue="support@greavescotton.com" />
                </div>
                
                <div>
                  <Label htmlFor="support-phone">Support Phone</Label>
                  <Input id="support-phone" defaultValue="+91-1800-XXX-XXXX" />
                </div>
                
                <div>
                  <Label htmlFor="address">Company Address</Label>
                  <Textarea id="address" defaultValue="Greaves Cotton Limited, Mumbai, Maharashtra, India" />
                </div>

                <Button onClick={() => handleAction('Update Contact Info')} className="w-full">
                  Update Contact Info
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}