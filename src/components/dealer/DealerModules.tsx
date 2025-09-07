import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingCart,
  Package,
  FileText,
  Wrench,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Plus,
  Filter,
  Search,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Download,
  Upload,
  X
} from "lucide-react";

interface OrderItem {
  id: string;
  partNumber: string;
  description: string;
  quantity: number;
  price: number;
  status: 'pending' | 'approved' | 'shipped' | 'delivered';
  requestDate: string;
}

interface ServiceRequest {
  id: string;
  equipment: string;
  issue: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'assigned' | 'in-progress' | 'completed';
  technician?: string;
  requestDate: string;
  customerName: string;
  location: string;
}

interface Claim {
  id: string;
  claimType: 'warranty' | 'parts' | 'service';
  equipment: string;
  amount: number;
  status: 'submitted' | 'under-review' | 'approved' | 'rejected';
  submitDate: string;
  description: string;
}

export function DealerModules() {
  const [activeModule, setActiveModule] = useState<string>('orders');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Mock data
  const orders: OrderItem[] = [
    { id: 'ORD-001', partNumber: 'GT-45001', description: 'Engine Oil Filter', quantity: 50, price: 2500, status: 'pending', requestDate: '2024-01-15' },
    { id: 'ORD-002', partNumber: 'GT-45002', description: 'Air Filter Assembly', quantity: 25, price: 1875, status: 'approved', requestDate: '2024-01-14' },
    { id: 'ORD-003', partNumber: 'GT-45003', description: 'Hydraulic Pump', quantity: 5, price: 15000, status: 'shipped', requestDate: '2024-01-13' },
    { id: 'ORD-004', partNumber: 'GT-45004', description: 'Engine Gasket Set', quantity: 20, price: 4000, status: 'delivered', requestDate: '2024-01-12' }
  ];

  const serviceRequests: ServiceRequest[] = [
    { id: 'SR-001', equipment: 'Excavator GE-450', issue: 'Hydraulic leak in main boom', priority: 'high', status: 'open', requestDate: '2024-01-15', customerName: 'Mumbai Construction', location: 'Mumbai' },
    { id: 'SR-002', equipment: 'Loader GL-300', issue: 'Engine overheating', priority: 'urgent', status: 'assigned', technician: 'Raj Kumar', requestDate: '2024-01-14', customerName: 'Delhi Infrastructure', location: 'Delhi' },
    { id: 'SR-003', equipment: 'Generator GG-200', issue: 'Electrical fault in control panel', priority: 'medium', status: 'in-progress', technician: 'Amit Singh', requestDate: '2024-01-13', customerName: 'Chennai Motors', location: 'Chennai' },
    { id: 'SR-004', equipment: 'Compactor GC-150', issue: 'Vibration system malfunction', priority: 'low', status: 'completed', technician: 'Priya Sharma', requestDate: '2024-01-12', customerName: 'Bangalore Roads', location: 'Bangalore' }
  ];

  const claims: Claim[] = [
    { id: 'CLM-001', claimType: 'warranty', equipment: 'Excavator GE-450', amount: 25000, status: 'submitted', submitDate: '2024-01-15', description: 'Engine replacement under warranty' },
    { id: 'CLM-002', claimType: 'parts', equipment: 'Loader GL-300', amount: 15000, status: 'under-review', submitDate: '2024-01-14', description: 'Hydraulic pump failure - parts claim' },
    { id: 'CLM-003', claimType: 'service', equipment: 'Generator GG-200', amount: 8000, status: 'approved', submitDate: '2024-01-13', description: 'Emergency repair service claim' },
    { id: 'CLM-004', claimType: 'warranty', equipment: 'Compactor GC-150', amount: 12000, status: 'rejected', submitDate: '2024-01-12', description: 'Wear part replacement - not covered' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': case 'open': case 'submitted': return 'bg-yellow-500 text-white';
      case 'approved': case 'assigned': case 'under-review': return 'bg-blue-500 text-white';
      case 'shipped': case 'in-progress': return 'bg-orange-500 text-white';
      case 'delivered': case 'completed': return 'bg-green-500 text-white';
      case 'rejected': return 'bg-red-500 text-white';
      case 'urgent': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-600 text-white';
      case 'medium': return 'bg-yellow-600 text-white';
      case 'low': return 'bg-blue-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleAction = (action: string, item: any) => {
    toast({
      title: `${action} Action`,
      description: `${action} performed on ${item.id}`,
    });
  };

  const filteredOrders = orders.filter(order => 
    order.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.partNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredServiceRequests = serviceRequests.filter(sr => 
    sr.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sr.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sr.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClaims = claims.filter(claim => 
    claim.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderOrdersTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search orders..." 
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold">{order.id} - {order.description}</h4>
                  <p className="text-sm text-muted-foreground">Part: {order.partNumber}</p>
                  <p className="text-sm text-muted-foreground">Qty: {order.quantity} | ₹{order.price.toLocaleString()}</p>
                </div>
                <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Requested: {order.requestDate}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => { setSelectedItem(order); setShowDialog(true); }}>
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAction('Edit', order)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAction('Track', order)}>
                    <MapPin className="w-4 h-4 mr-1" />
                    Track
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderServiceRequestsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search service requests..." 
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredServiceRequests.map((sr) => (
          <Card key={sr.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{sr.id} - {sr.equipment}</h4>
                    <Badge className={getStatusColor(sr.priority)}>{sr.priority}</Badge>
                    <Badge className={getStatusColor(sr.status)}>{sr.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{sr.issue}</p>
                  <p className="text-sm text-muted-foreground">Customer: {sr.customerName} | Location: {sr.location}</p>
                  {sr.technician && <p className="text-sm text-muted-foreground">Technician: {sr.technician}</p>}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Requested: {sr.requestDate}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => { setSelectedItem(sr); setShowDialog(true); }}>
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAction('Assign', sr)}>
                    <Wrench className="w-4 h-4 mr-1" />
                    Assign
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAction('Contact', sr)}>
                    <Phone className="w-4 h-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderClaimsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search claims..." 
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Claim
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredClaims.map((claim) => (
          <Card key={claim.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{claim.id} - {claim.equipment}</h4>
                    <Badge variant="outline">{claim.claimType}</Badge>
                    <Badge className={getStatusColor(claim.status)}>{claim.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{claim.description}</p>
                  <p className="text-sm font-medium text-green-600">Amount: ₹{claim.amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Submitted: {claim.submitDate}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => { setSelectedItem(claim); setShowDialog(true); }}>
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAction('Upload Documents', claim)}>
                    <Upload className="w-4 h-4 mr-1" />
                    Documents
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAction('Download Report', claim)}>
                    <Download className="w-4 h-4 mr-1" />
                    Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Dealer Management Modules</h2>
        <p className="text-muted-foreground">Comprehensive dealer portal with full functionality</p>
      </div>

      <Tabs value={activeModule} onValueChange={setActiveModule} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="service" className="flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Service
          </TabsTrigger>
          <TabsTrigger value="claims" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Claims
          </TabsTrigger>
          <TabsTrigger value="shipments" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Shipments
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          {renderOrdersTab()}
        </TabsContent>

        <TabsContent value="service" className="mt-6">
          {renderServiceRequestsTab()}
        </TabsContent>

        <TabsContent value="claims" className="mt-6">
          {renderClaimsTab()}
        </TabsContent>

        <TabsContent value="shipments" className="mt-6">
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Shipments management module</p>
            <Button className="mt-4">Configure Shipments</Button>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Billing and invoicing module</p>
            <Button className="mt-4">View Invoices</Button>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Reports and analytics module</p>
            <Button className="mt-4">Generate Reports</Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Detail View Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Item Details</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(selectedItem).map(([key, value]) => (
                  <div key={key}>
                    <Label className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                    <p className="text-sm text-muted-foreground">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add New Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New {activeModule.slice(0, -1)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter title" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter description" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
              <Button onClick={() => {
                toast({ title: "Success", description: `New ${activeModule.slice(0, -1)} created successfully` });
                setShowAddDialog(false);
              }}>
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}