import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceTicketForm } from "@/components/ServiceTicketForm";
import { ServiceTicketDetails } from "@/components/details/ServiceTicketDetails";
import { useToast } from "@/hooks/use-toast";
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Package, 
  Users,
  TrendingUp,
  Calendar
} from "lucide-react";

interface ServiceDashboardProps {
  userRole: 'customer' | 'dealer' | 'mechanic' | 'retailer';
}

export function ServiceDashboard({ userRole }: ServiceDashboardProps) {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
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
      case 'retailer':
        return [
          { title: "Parts Stock", value: "1,234", icon: Package, color: "text-enterprise-blue" },
          { title: "Orders Today", value: "18", icon: TrendingUp, color: "text-success" },
          { title: "Low Stock Items", value: "5", icon: AlertTriangle, color: "text-warning" },
          { title: "Revenue", value: "₹2.4L", icon: TrendingUp, color: "text-success" },
        ];
      default:
        return [];
    }
  };

  const getRecentActivity = () => {
    switch (userRole) {
      case 'customer':
        return [
          { id: "TKT-001", title: "Generator Oil Change", status: "In Progress", priority: "Medium" },
          { id: "TKT-002", title: "Fuel System Check", status: "Pending", priority: "High" },
          { id: "CLM-001", title: "Warranty Claim - Engine", status: "Under Review", priority: "High" },
        ];
      case 'dealer':
        return [
          { id: "TKT-023", title: "Emergency Repair - Mumbai", status: "Assigned", priority: "Critical" },
          { id: "TKT-024", title: "Scheduled Maintenance", status: "Completed", priority: "Low" },
          { id: "TKT-025", title: "Parts Replacement", status: "In Progress", priority: "Medium" },
        ];
      case 'mechanic':
        return [
          { id: "TKT-015", title: "Engine Diagnostics", status: "In Progress", priority: "High" },
          { id: "TKT-016", title: "Filter Replacement", status: "Pending Parts", priority: "Medium" },
          { id: "TKT-017", title: "Control Panel Fix", status: "Completed", priority: "Low" },
        ];
      case 'retailer':
        return [
          { id: "ORD-089", title: "Oil Filter Set - 50pcs", status: "Shipped", priority: "Medium" },
          { id: "ORD-090", title: "Spark Plugs - 20pcs", status: "Processing", priority: "Low" },
          { id: "ORD-091", title: "Air Filter - 30pcs", status: "Pending", priority: "High" },
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
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleTicketSubmit = (ticket: any) => {
    toast({
      title: "Service Ticket Created Successfully!",
      description: `Ticket ${ticket.id} has been submitted and assigned for processing.`,
    });
    setShowTicketForm(false);
  };

  const stats = getStatsForRole();
  const recentActivity = getRecentActivity();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Service Dashboard</h1>
          <p className="text-muted-foreground capitalize">{userRole} Portal</p>
        </div>
        <Button 
          onClick={() => setShowTicketForm(true)}
          className="bg-gradient-primary hover:opacity-90"
        >
          {userRole === 'customer' ? 'Raise Ticket' : 
           userRole === 'dealer' ? 'New Service Request' :
           userRole === 'mechanic' ? 'Update Status' :
           'Manage Inventory'}
        </Button>
      </div>

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
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm text-muted-foreground">{item.id}</span>
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.status}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedTicket(item)}>
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Ticket Form Modal */}
      {showTicketForm && (
        <ServiceTicketForm
          userRole={userRole}
          onSubmit={handleTicketSubmit}
          onCancel={() => setShowTicketForm(false)}
        />
      )}

      {/* Service Ticket Details Modal */}
      {selectedTicket && (
        <ServiceTicketDetails
          ticket={selectedTicket}
          userRole={userRole}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}