import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  X, 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Package, 
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle,
  Wrench
} from "lucide-react";

interface ServiceTicketDetailsProps {
  ticket: {
    id: string;
    title: string;
    status: string;
    priority: string;
    description?: string;
    equipment?: string;
    location?: string;
    contactPerson?: string;
    contactPhone?: string;
    contactEmail?: string;
    createdAt?: string;
    assignedTo?: string;
    estimatedCompletion?: string;
    parts?: string[];
    activities?: Array<{
      timestamp: string;
      activity: string;
      user: string;
      notes?: string;
    }>;
  };
  userRole: string;
  onClose: () => void;
  onUpdate?: (ticket: any) => void;
}

export function ServiceTicketDetails({ ticket, userRole, onClose, onUpdate }: ServiceTicketDetailsProps) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-success text-success-foreground';
      case 'In Progress':
        return 'bg-enterprise-blue text-white';
      case 'Pending':
        return 'bg-warning text-warning-foreground';
      case 'Under Review':
        return 'bg-enterprise-blue-light text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Mock data for demonstration
  const mockTicket = {
    ...ticket,
    description: ticket.description || "Generator experiencing intermittent power fluctuations during peak load operations. Customer reports voltage irregularities and occasional shutdown warnings on the control panel.",
    equipment: ticket.equipment || "DG Set 500 KVA - Model: GV500",
    location: ticket.location || "Sector 18, Noida Industrial Area, Building A-23, Uttar Pradesh - 201301",
    contactPerson: ticket.contactPerson || "Rajesh Kumar (Site Manager)",
    contactPhone: ticket.contactPhone || "+91 9876543210",
    contactEmail: ticket.contactEmail || "rajesh.kumar@company.com",
    createdAt: ticket.createdAt || "2024-01-15 10:30 AM",
    assignedTo: ticket.assignedTo || "Suresh Technician (Expert Level)",
    estimatedCompletion: ticket.estimatedCompletion || "2024-01-16 2:00 PM",
    parts: ticket.parts || ["Voltage Regulator", "Control Module", "Oil Filter"],
    activities: ticket.activities || [
      {
        timestamp: "2024-01-15 10:30 AM",
        activity: "Ticket Created",
        user: "Rajesh Kumar (Customer)",
        notes: "Initial complaint logged"
      },
      {
        timestamp: "2024-01-15 11:15 AM",
        activity: "Assigned to Technician",
        user: "Mumbai Service Center",
        notes: "Assigned to Suresh - Expert Level"
      },
      {
        timestamp: "2024-01-15 2:30 PM",
        activity: "Site Visit Scheduled",
        user: "Suresh Technician",
        notes: "Preliminary diagnosis via phone. On-site visit scheduled for tomorrow."
      },
      {
        timestamp: "2024-01-16 9:00 AM",
        activity: "Diagnostic Started",
        user: "Suresh Technician",
        notes: "On-site inspection begun. Voltage regulator showing signs of wear."
      }
    ]
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-enterprise">
        <Card className="border-0">
          <CardHeader className="bg-gradient-primary text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wrench className="w-6 h-6" />
                <div>
                  <CardTitle className="text-xl">{mockTicket.title}</CardTitle>
                  <p className="text-white/90 text-sm">Ticket ID: {mockTicket.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(mockTicket.priority)}>
                  {mockTicket.priority}
                </Badge>
                <Badge className={getStatusColor(mockTicket.status)}>
                  {mockTicket.status}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Issue Description
                  </h3>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-foreground leading-relaxed">{mockTicket.description}</p>
                  </div>
                </div>

                {/* Equipment Details */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Equipment Information
                  </h3>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-medium text-foreground">{mockTicket.equipment}</p>
                    <p className="text-sm text-muted-foreground mt-1">Serial: GV500-2023-MH-001234</p>
                    <p className="text-sm text-muted-foreground">Installation Date: March 15, 2023</p>
                    <p className="text-sm text-muted-foreground">Warranty Status: Active (18 months remaining)</p>
                  </div>
                </div>

                {/* Parts Required */}
                {mockTicket.parts && mockTicket.parts.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Parts Required</h3>
                    <div className="flex flex-wrap gap-2">
                      {mockTicket.parts.map((part, index) => (
                        <Badge key={index} variant="outline" className="border-enterprise-blue text-enterprise-blue">
                          {part}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activity Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Activity Timeline
                  </h3>
                  <div className="space-y-4">
                    {mockTicket.activities?.map((activity, index) => (
                      <div key={index} className="flex gap-4 p-3 bg-muted/30 rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-enterprise-blue rounded-full mt-2"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-foreground">{activity.activity}</h4>
                            <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.user}</p>
                          {activity.notes && (
                            <p className="text-sm text-foreground mt-1">{activity.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Contact Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{mockTicket.contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{mockTicket.contactPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{mockTicket.contactEmail}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <span className="text-foreground">{mockTicket.location}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Timing Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Timeline
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="text-sm font-medium text-foreground">{mockTicket.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Assigned To</p>
                      <p className="text-sm font-medium text-foreground">{mockTicket.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Est. Completion</p>
                      <p className="text-sm font-medium text-foreground">{mockTicket.estimatedCompletion}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="space-y-3">
                  {userRole === 'customer' && (
                    <>
                      <Button className="w-full bg-gradient-primary hover:opacity-90">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Technician
                      </Button>
                      <Button variant="outline" className="w-full border-enterprise-blue text-enterprise-blue">
                        Track Status
                      </Button>
                    </>
                  )}
                  {userRole === 'mechanic' && (
                    <>
                      <Button className="w-full bg-gradient-primary hover:opacity-90">
                        Update Status
                      </Button>
                      <Button variant="outline" className="w-full border-enterprise-blue text-enterprise-blue">
                        Request Parts
                      </Button>
                    </>
                  )}
                  {(userRole === 'dealer' || userRole === 'retailer') && (
                    <>
                      <Button className="w-full bg-gradient-primary hover:opacity-90">
                        Assign Technician
                      </Button>
                      <Button variant="outline" className="w-full border-enterprise-blue text-enterprise-blue">
                        Update Priority
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}