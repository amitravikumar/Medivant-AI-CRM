import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Truck, 
  MapPin, 
  Package, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Settings,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  Search,
  Filter,
  Calendar,
  BarChart3,
  Navigation
} from "lucide-react";

interface Shipment {
  id: string;
  orderId: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'delayed';
  origin: string;
  destination: string;
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  items: { name: string; quantity: number; }[];
  cost: number;
  priority: 'standard' | 'express' | 'urgent';
}

export function ShipmentsModule() {
  const [activeTab, setActiveTab] = useState("shipments");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const { toast } = useToast();

  // Configuration Settings
  const [shipmentConfig, setShipmentConfig] = useState({
    autoTracking: true,
    emailNotifications: true,
    smsAlerts: false,
    defaultCarrier: "Greaves Logistics",
    expressThreshold: 50000,
    urgentThreshold: 100000,
    autoInsurance: true,
    trackingInterval: 4, // hours
    deliveryWindow: "9AM-6PM"
  });

  // Sample shipments data
  const shipments: Shipment[] = [
    {
      id: "SHP-001",
      orderId: "ORD-001",
      status: "in-transit",
      origin: "Mumbai Warehouse",
      destination: "Delhi Manufacturing Hub",
      carrier: "Greaves Express",
      trackingNumber: "GEX123456789",
      estimatedDelivery: "2024-01-16",
      items: [{ name: "Engine Oil Filter", quantity: 50 }, { name: "Air Filter", quantity: 25 }],
      cost: 2500,
      priority: "express"
    },
    {
      id: "SHP-002",
      orderId: "ORD-002",
      status: "delivered",
      origin: "Chennai Parts Center",
      destination: "Bangalore Service Center",
      carrier: "Third Party Logistics",
      trackingNumber: "TPL987654321",
      estimatedDelivery: "2024-01-14",
      actualDelivery: "2024-01-14",
      items: [{ name: "Hydraulic Pump", quantity: 5 }],
      cost: 3200,
      priority: "urgent"
    },
    {
      id: "SHP-003",
      orderId: "ORD-003",
      status: "pending",
      origin: "Pune Distribution Center",
      destination: "Ahmedabad Dealer",
      carrier: "Standard Shipping",
      trackingNumber: "STD555666777",
      estimatedDelivery: "2024-01-18",
      items: [{ name: "Engine Gasket Set", quantity: 20 }],
      cost: 1800,
      priority: "standard"
    },
    {
      id: "SHP-004",
      orderId: "ORD-004",
      status: "delayed",
      origin: "Kolkata Hub",
      destination: "Guwahati Regional Office",
      carrier: "Regional Express",
      trackingNumber: "REX888999000",
      estimatedDelivery: "2024-01-15",
      items: [{ name: "Electrical Components", quantity: 15 }],
      cost: 4500,
      priority: "express"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500 text-white';
      case 'in-transit': return 'bg-blue-500 text-white';
      case 'delivered': return 'bg-green-500 text-white';
      case 'delayed': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-600 text-white';
      case 'express': return 'bg-orange-600 text-white';
      case 'standard': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const handleConfigSave = () => {
    toast({
      title: "Configuration Saved",
      description: "Shipment settings have been updated successfully",
    });
  };

  const handleExport = (format: string) => {
    toast({
      title: "Export Started",
      description: `Shipment data is being exported as ${format}`,
    });
  };

  const filteredShipments = shipments.filter(shipment => 
    shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.carrier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Shipments Management</h2>
        <p className="text-muted-foreground">Configure and track all shipments with real-time updates</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="shipments" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Active Shipments
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            Live Tracking
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="configuration" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configuration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shipments" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search shipments..." 
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" onClick={() => handleExport("Excel")}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Shipment
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredShipments.map((shipment) => (
                <Card key={shipment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{shipment.id}</h4>
                          <Badge className={getStatusColor(shipment.status)}>{shipment.status}</Badge>
                          <Badge className={getPriorityColor(shipment.priority)}>{shipment.priority}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Origin</p>
                            <p className="font-medium">{shipment.origin}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Destination</p>
                            <p className="font-medium">{shipment.destination}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Carrier</p>
                            <p className="font-medium">{shipment.carrier}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Est. Delivery</p>
                            <p className="font-medium">{shipment.estimatedDelivery}</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">
                            Items: {shipment.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Tracking: {shipment.trackingNumber} | Cost: ₹{shipment.cost.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Navigation className="w-4 h-4 mr-1" />
                        Track
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tracking" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Live Shipment Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">In-Transit Shipments</h4>
                  {shipments.filter(s => s.status === 'in-transit').map(shipment => (
                    <div key={shipment.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{shipment.id}</span>
                        <Badge className="bg-blue-500 text-white">Moving</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{shipment.origin} → {shipment.destination}</p>
                      <p className="text-xs text-muted-foreground mt-1">ETA: {shipment.estimatedDelivery}</p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Recent Deliveries</h4>
                  {shipments.filter(s => s.status === 'delivered').map(shipment => (
                    <div key={shipment.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{shipment.id}</span>
                        <Badge className="bg-green-500 text-white">Delivered</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{shipment.destination}</p>
                      <p className="text-xs text-muted-foreground mt-1">Delivered: {shipment.actualDelivery}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Alerts & Issues</h4>
                  {shipments.filter(s => s.status === 'delayed').map(shipment => (
                    <div key={shipment.id} className="p-3 border rounded-lg border-red-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{shipment.id}</span>
                        <Badge className="bg-red-500 text-white">Delayed</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{shipment.destination}</p>
                      <p className="text-xs text-red-600 mt-1">Delay expected</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">On-Time Delivery</p>
                    <p className="text-2xl font-bold text-green-600">94.2%</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Delivery Time</p>
                    <p className="text-2xl font-bold text-blue-600">2.8 days</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Shipments</p>
                    <p className="text-2xl font-bold text-purple-600">1,247</p>
                  </div>
                  <Package className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipment Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Delivered</span>
                    <span className="font-medium text-green-600">67%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>In Transit</span>
                    <span className="font-medium text-blue-600">23%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pending</span>
                    <span className="font-medium text-yellow-600">8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Delayed</span>
                    <span className="font-medium text-red-600">2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Carrier Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Greaves Express</span>
                    <span className="font-medium text-green-600">96.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Third Party Logistics</span>
                    <span className="font-medium text-blue-600">93.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Regional Express</span>
                    <span className="font-medium text-yellow-600">89.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Standard Shipping</span>
                    <span className="font-medium text-orange-600">87.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="configuration" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipment Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-tracking">Auto Tracking</Label>
                      <p className="text-sm text-muted-foreground">Automatically track all shipments</p>
                    </div>
                    <Switch 
                      id="auto-tracking"
                      checked={shipmentConfig.autoTracking}
                      onCheckedChange={(checked) => setShipmentConfig(prev => ({ ...prev, autoTracking: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send email updates to customers</p>
                    </div>
                    <Switch 
                      id="email-notifications"
                      checked={shipmentConfig.emailNotifications}
                      onCheckedChange={(checked) => setShipmentConfig(prev => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-alerts">SMS Alerts</Label>
                      <p className="text-sm text-muted-foreground">Send SMS updates for priority shipments</p>
                    </div>
                    <Switch 
                      id="sms-alerts"
                      checked={shipmentConfig.smsAlerts}
                      onCheckedChange={(checked) => setShipmentConfig(prev => ({ ...prev, smsAlerts: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-insurance">Auto Insurance</Label>
                      <p className="text-sm text-muted-foreground">Automatically insure high-value shipments</p>
                    </div>
                    <Switch 
                      id="auto-insurance"
                      checked={shipmentConfig.autoInsurance}
                      onCheckedChange={(checked) => setShipmentConfig(prev => ({ ...prev, autoInsurance: checked }))}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="default-carrier">Default Carrier</Label>
                    <Select value={shipmentConfig.defaultCarrier} onValueChange={(value) => setShipmentConfig(prev => ({ ...prev, defaultCarrier: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Greaves Logistics">Greaves Logistics</SelectItem>
                        <SelectItem value="Greaves Express">Greaves Express</SelectItem>
                        <SelectItem value="Third Party Logistics">Third Party Logistics</SelectItem>
                        <SelectItem value="Regional Express">Regional Express</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tracking-interval">Tracking Update Interval (hours)</Label>
                    <Input 
                      id="tracking-interval"
                      type="number"
                      value={shipmentConfig.trackingInterval}
                      onChange={(e) => setShipmentConfig(prev => ({ ...prev, trackingInterval: parseInt(e.target.value) }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="delivery-window">Delivery Time Window</Label>
                    <Input 
                      id="delivery-window"
                      value={shipmentConfig.deliveryWindow}
                      onChange={(e) => setShipmentConfig(prev => ({ ...prev, deliveryWindow: e.target.value }))}
                    />
                  </div>
                </div>

                <Button onClick={handleConfigSave} className="w-full">
                  Save Configuration
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Priority Thresholds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="express-threshold">Express Shipping Threshold (₹)</Label>
                  <Input 
                    id="express-threshold"
                    type="number"
                    value={shipmentConfig.expressThreshold}
                    onChange={(e) => setShipmentConfig(prev => ({ ...prev, expressThreshold: parseInt(e.target.value) }))}
                  />
                  <p className="text-sm text-muted-foreground mt-1">Orders above this value get express shipping</p>
                </div>

                <div>
                  <Label htmlFor="urgent-threshold">Urgent Shipping Threshold (₹)</Label>
                  <Input 
                    id="urgent-threshold"
                    type="number"
                    value={shipmentConfig.urgentThreshold}
                    onChange={(e) => setShipmentConfig(prev => ({ ...prev, urgentThreshold: parseInt(e.target.value) }))}
                  />
                  <p className="text-sm text-muted-foreground mt-1">Orders above this value get urgent shipping</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">How Shipment Configuration Works:</h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>• <strong>Auto Tracking:</strong> Automatically updates shipment status using carrier APIs</p>
                    <p>• <strong>Priority System:</strong> Orders are classified based on value thresholds</p>
                    <p>• <strong>Notifications:</strong> Customers receive updates via email/SMS at key milestones</p>
                    <p>• <strong>Carrier Selection:</strong> System selects optimal carrier based on destination and priority</p>
                    <p>• <strong>Insurance:</strong> High-value shipments are automatically insured</p>
                    <p>• <strong>Tracking Intervals:</strong> System checks carrier APIs for updates at configured intervals</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">Integration Status</h5>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Greaves Logistics API</span>
                      <Badge className="bg-green-500 text-white">Connected</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>SMS Gateway</span>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Email Service</span>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}