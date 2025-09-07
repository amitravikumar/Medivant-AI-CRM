import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CorporateLayout } from "@/components/ui/corporate-layout";
import { ServiceTicketForm } from "@/components/ServiceTicketForm";
import { CustomerTicketOptions } from "@/components/forms/CustomerTicketOptions";
import { ServiceTicketDetails } from "@/components/details/ServiceTicketDetails";
import { LiveEquipmentMonitor } from "./LiveEquipmentMonitor";
import { PartsCatalog } from "@/components/catalog/PartsCatalog";
import { WarrantyClaims } from "@/components/warranty/WarrantyClaims";
import { useToast } from "@/hooks/use-toast";
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Package, 
  Users,
  TrendingUp,
  Calendar,
  Plus,
  Edit,
  Settings,
  Phone,
  Eye,
  Shield
} from "lucide-react";

interface ServiceDashboardProps {
  userRole: 'customer' | 'dealer' | 'mechanic';
}

import { EnhancedDealerDashboard } from "./EnhancedDealerDashboard";

export function EnhancedServiceDashboard({ userRole }: ServiceDashboardProps) {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showTicketOptions, setShowTicketOptions] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showPartsDialog, setShowPartsDialog] = useState(false);
  const [showTrackStatus, setShowTrackStatus] = useState(false);
  const [showPartsCatalog, setShowPartsCatalog] = useState(false);
  const [showWarrantyClaims, setShowWarrantyClaims] = useState(false);
  const { toast } = useToast();

  const getStatsForRole = () => {
    switch (userRole) {
      case 'customer':
        return [
          { title: "Active Tickets", value: "3", icon: Wrench, color: "text-enterprise-blue" },
          { title: "Pending Claims", value: "1", icon: Clock, color: "text-warning" },
          { title: "Equipment Status", value: "Online", icon: CheckCircle, color: "text-success" },
          { title: "Parts Orders", value: "2", icon: Package, color: "text-primary" },
        ];
      case 'dealer':
        return [
          { title: "Total Tickets", value: "24", icon: Wrench, color: "text-enterprise-blue" },
          { title: "Technicians", value: "8", icon: Users, color: "text-primary" },
          { title: "Parts Inventory", value: "145", icon: Package, color: "text-success" },
          { title: "SLA Compliance", value: "94%", icon: TrendingUp, color: "text-success" },
        ];
      case 'mechanic':
        return [
          { title: "Assigned Tickets", value: "6", icon: Wrench, color: "text-enterprise-blue" },
          { title: "Completed Today", value: "3", icon: CheckCircle, color: "text-success" },
          { title: "Parts Requests", value: "2", icon: Package, color: "text-warning" },
          { title: "Avg Resolution", value: "2.5h", icon: Clock, color: "text-primary" },
        ];
      default:
        return [];
    }
  };

  const getRecentActivity = () => {
    switch (userRole) {
      case 'customer':
        return [
          { id: "TKT-001", title: "Generator Oil Change", status: "In Progress", priority: "Medium", lastUpdate: "2 hours ago" },
          { id: "TKT-002", title: "Fuel System Check", status: "Pending", priority: "High", lastUpdate: "1 day ago" },
          { id: "CLM-001", title: "Warranty Claim - Engine", status: "Under Review", priority: "High", lastUpdate: "3 hours ago" },
        ];
      case 'dealer':
        return [
          { id: "TKT-023", title: "Emergency Repair - Mumbai", status: "Assigned", priority: "Critical", technician: "Raj Kumar" },
          { id: "TKT-024", title: "Scheduled Maintenance", status: "Completed", priority: "Low", technician: "Amit Singh" },
          { id: "TKT-025", title: "Parts Replacement", status: "In Progress", priority: "Medium", technician: "Suresh Patel" },
        ];
      case 'mechanic':
        return [
          { id: "TKT-015", title: "Engine Diagnostics", status: "In Progress", priority: "High", customer: "ABC Industries", eta: "2 hours" },
          { id: "TKT-016", title: "Filter Replacement", status: "Pending Parts", priority: "Medium", customer: "XYZ Manufacturing", eta: "Pending" },
          { id: "TKT-017", title: "Control Panel Fix", status: "Completed", priority: "Low", customer: "PQR Textiles", eta: "Completed" },
        ];
      default:
        return [];
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-destructive text-destructive-foreground';
      case 'High':
        return 'bg-warning text-warning-foreground';
      case 'Medium':
        return 'bg-enterprise-blue text-white';
      case 'Low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-success text-success-foreground';
      case 'In Progress':
        return 'bg-primary text-primary-foreground';
      case 'Pending':
      case 'Pending Parts':
        return 'bg-warning text-warning-foreground';
      case 'Under Review':
        return 'bg-enterprise-blue text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const stats = getStatsForRole();
  const recentActivity = getRecentActivity();

  const handleNewServiceRequest = () => {
    if (userRole === 'customer') {
      setShowTicketOptions(true);
    } else {
      setShowTicketForm(true);
    }
  };

  const handleUpdateStatus = () => {
    setShowStatusDialog(true);
  };

  const handleRequestParts = () => {
    setShowPartsDialog(true);
  };

  const handleStatusUpdate = (ticketId: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Ticket ${ticketId} status updated to ${newStatus}`,
    });
    setShowStatusDialog(false);
  };

  const handlePartsRequest = (parts: string[]) => {
    toast({
      title: "Parts Requested",
      description: `Requested ${parts.length} parts items`,
    });
    setShowPartsDialog(false);
  };

  const renderCustomerDashboard = () => (
    <CorporateLayout
      title="Customer Service Portal"
      subtitle="Welcome to Greaves Customer Service. Get support, track your equipment, and manage service requests."
      headerActions={
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setShowTrackStatus(true)}>
            <TrendingUp className="w-4 h-4 mr-2" />
            Track Status
          </Button>
          <Button onClick={handleNewServiceRequest} className="bg-gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Raise Ticket
          </Button>
        </div>
      }
    >
      <Tabs defaultValue="equipment" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="equipment">Live Equipment</TabsTrigger>
          <TabsTrigger value="tickets">Service Tickets</TabsTrigger>
          <TabsTrigger value="parts">Parts & Warranty</TabsTrigger>
        </TabsList>

      <TabsContent value="equipment">
        <LiveEquipmentMonitor />
      </TabsContent>

      <TabsContent value="tickets" className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Equipment Status</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 Online</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Warranty Claims</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">1 pending approval</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Parts Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">In transit</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Service Tickets */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Support & Service Options</CardTitle>
              <Button 
                onClick={() => setShowTicketOptions(true)}
                className="bg-gradient-primary hover:opacity-90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Get Support
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.slice(0, 3).map((ticket) => (
                <div 
                  key={ticket.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">#{ticket.id}</span>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{ticket.title}</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      Priority: {ticket.priority} • Last Update: {ticket.lastUpdate}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Track Status Card */}
        <Card>
          <CardHeader>
            <CardTitle>Track Service Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Get real-time updates on your service requests and equipment status.
              </p>
              <Button 
                className="w-full bg-primary text-white hover:bg-primary/90"
                onClick={() => setShowTrackStatus(true)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Track Status
              </Button>
              <div className="text-xs text-muted-foreground">
                <strong>When you click Track Status:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>View active ticket progress and timeline</li>
                  <li>Get real-time updates from assigned technicians</li>
                  <li>Track parts delivery and availability</li>
                  <li>Contact service team directly</li>
                  <li>Monitor equipment status and health</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="parts" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Parts Store</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Browse and order genuine Greaves parts</p>
              <Button 
                className="w-full"
                onClick={() => setShowPartsCatalog(true)}
              >
                <Package className="w-4 h-4 mr-2" />
                Browse Parts Catalog
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Warranty Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Submit and track warranty claims</p>
              <Button 
                className="w-full"
                onClick={() => setShowWarrantyClaims(true)}
              >
                <Shield className="w-4 h-4 mr-2" />
                Submit Warranty Claim
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
    </CorporateLayout>
  );

  const renderOtherRoles = () => (
    <CorporateLayout
      title="Service Dashboard"
      subtitle={`${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Portal`}
      headerActions={
        <div className="flex gap-2">
          {userRole === 'mechanic' && (
            <>
              <Button variant="outline" onClick={handleUpdateStatus}>
                <Edit className="w-4 h-4 mr-2" />
                Update Status
              </Button>
              <Button variant="outline" onClick={handleRequestParts}>
                <Package className="w-4 h-4 mr-2" />
                Request Parts
              </Button>
              <Button onClick={handleNewServiceRequest} className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                New Service Request
              </Button>
            </>
          )}
          {userRole !== 'mechanic' && userRole !== 'customer' && (
            <Button onClick={handleNewServiceRequest} className="bg-gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-6">

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-enterprise-gray-light shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="border-enterprise-gray-light shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((item, index) => (
              <div key={index} className="p-4 rounded-lg border border-enterprise-gray-light hover:shadow-card transition-shadow cursor-pointer"
                   onClick={() => setSelectedTicket(item)}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                    <span className="font-medium text-sm text-muted-foreground">{item.id}</span>
                  </div>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    {userRole === 'dealer' && item.technician && (
                      <p className="text-sm text-muted-foreground">Technician: {item.technician}</p>
                    )}
                    {userRole === 'mechanic' && item.customer && (
                      <p className="text-sm text-muted-foreground">Customer: {item.customer}</p>
                    )}
                    {userRole === 'customer' && item.lastUpdate && (
                      <p className="text-sm text-muted-foreground">Last Update: {item.lastUpdate}</p>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </CorporateLayout>
  );

  if (userRole === 'dealer') {
    return <EnhancedDealerDashboard />;
  }

  return (
    <div className="space-y-6">
      {userRole === 'customer' ? renderCustomerDashboard() : renderOtherRoles()}

      {/* Status Update Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent className="bg-card border-enterprise-gray-light">
          <DialogHeader>
            <DialogTitle>Update Ticket Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Current Assigned Tickets</h4>
              {recentActivity.filter(item => item.status !== 'Completed').map((ticket) => (
                <div key={ticket.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{ticket.id} - {ticket.title}</p>
                      <p className="text-sm text-muted-foreground">Current: {ticket.status}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(ticket.id, 'In Progress')}>
                        In Progress
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(ticket.id, 'Completed')}>
                        Complete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Parts Request Dialog */}
      <Dialog open={showPartsDialog} onOpenChange={setShowPartsDialog}>
        <DialogContent className="bg-card border-enterprise-gray-light">
          <DialogHeader>
            <DialogTitle>Request Parts</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Common Parts</h4>
              <div className="grid grid-cols-2 gap-2">
                {['Oil Filter', 'Air Filter', 'Spark Plugs', 'Fuel Filter', 'Gasket Set', 'Belts'].map((part) => (
                  <Button key={part} variant="outline" size="sm" onClick={() => handlePartsRequest([part])}>
                    {part}
                  </Button>
                ))}
              </div>
            </div>
            <Button onClick={() => handlePartsRequest(['Custom Parts'])} className="w-full">
              Request Custom Parts
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Track Status Dialog */}
      <Dialog open={showTrackStatus} onOpenChange={setShowTrackStatus}>
        <DialogContent className="bg-card border-enterprise-gray-light max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Service Ticket Tracking
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Active Tickets Tracking */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg">Active Service Tickets</h4>
              {recentActivity.filter(item => item.status !== 'Completed').map((ticket) => (
                <Card key={ticket.id} className="border-enterprise-gray-light">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h5 className="font-semibold text-foreground">{ticket.id} - {ticket.title}</h5>
                        <p className="text-sm text-muted-foreground">Priority: {ticket.priority}</p>
                      </div>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                    
                    {/* Progress Timeline */}
                    <div className="space-y-3">
                      <h6 className="font-medium text-sm">Service Progress:</h6>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-success"></div>
                          <span className="text-sm">Ticket Raised</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Completed</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${ticket.status === 'In Progress' ? 'bg-success' : 'bg-warning'}`}></div>
                          <span className="text-sm">Technician Assigned</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {ticket.status === 'In Progress' ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${ticket.status === 'In Progress' ? 'bg-warning' : 'bg-muted'}`}></div>
                          <span className="text-sm">Service in Progress</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {ticket.status === 'In Progress' ? 'Current Step' : 'Pending'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-muted"></div>
                          <span className="text-sm">Quality Check</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Pending</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-muted"></div>
                          <span className="text-sm">Service Completed</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Pending</span>
                      </div>
                    </div>
                    
                    {/* Real-time Updates */}
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                      <h6 className="font-medium text-sm mb-2">Latest Updates:</h6>
                      <div className="space-y-1 text-sm">
                        <p>• Technician Raj Kumar assigned to your case</p>
                        <p>• Service scheduled for today between 2:00 PM - 4:00 PM</p>
                        <p>• Estimated completion time: 2 hours</p>
                        {ticket.status === 'In Progress' && (
                          <p className="text-enterprise-blue font-medium">• Technician is currently on-site</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Contact Options */}
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-1" />
                        Call Technician
                      </Button>
                      <Button size="sm" variant="outline">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Report Issue
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setSelectedTicket(ticket)}>
                        View Full Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Equipment Status */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg">Equipment Status Monitor</h4>
              <Card className="border-enterprise-gray-light">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-success/10 rounded-lg">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2 text-success" />
                      <p className="font-medium text-success">Online</p>
                      <p className="text-sm text-muted-foreground">Generator Set 500KVA</p>
                    </div>
                    <div className="text-center p-3 bg-warning/10 rounded-lg">
                      <Clock className="w-8 h-8 mx-auto mb-2 text-warning" />
                      <p className="font-medium text-warning">Maintenance Due</p>
                      <p className="text-sm text-muted-foreground">Generator Set 250KVA</p>
                    </div>
                    <div className="text-center p-3 bg-muted/10 rounded-lg">
                      <Settings className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="font-medium text-muted-foreground">Offline</p>
                      <p className="text-sm text-muted-foreground">Control Panel Unit</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Service Ticket Form Modal */}
      {showTicketForm && (
        <ServiceTicketForm 
          onSubmit={(ticket) => {
            toast({
              title: "Service Ticket Created",
              description: `Ticket ${ticket.id} has been created successfully`,
            });
            setShowTicketForm(false);
          }}
          onCancel={() => setShowTicketForm(false)}
          userRole={userRole}
        />
      )}

      {/* Customer Ticket Options */}
      <CustomerTicketOptions
        isOpen={showTicketOptions}
        onClose={() => setShowTicketOptions(false)}
      />

      {/* Service Ticket Details Modal */}
      {selectedTicket && (
        <ServiceTicketDetails
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          userRole={userRole}
        />
      )}

      {/* Parts Catalog */}
      <PartsCatalog
        isOpen={showPartsCatalog}
        onClose={() => setShowPartsCatalog(false)}
      />

      {/* Warranty Claims */}
      <WarrantyClaims
        isOpen={showWarrantyClaims}
        onClose={() => setShowWarrantyClaims(false)}
      />
    </div>
  );
}