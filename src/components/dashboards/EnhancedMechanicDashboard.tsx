import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { CorporateLayout } from "@/components/ui/corporate-layout";
import { LiveEquipmentMonitor } from "./LiveEquipmentMonitor";
import { useToast } from "@/hooks/use-toast";
import { 
  Wrench, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  Phone,
  Camera,
  FileText,
  Navigation,
  Bot,
  Zap,
  PlayCircle,
  PauseCircle,
  Settings
} from "lucide-react";

export function EnhancedMechanicDashboard() {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showNavigationDialog, setShowNavigationDialog] = useState(false);
  const [showEquipmentDialog, setShowEquipmentDialog] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateNotes, setUpdateNotes] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const { toast } = useToast();

  const mechanicStats = [
    { title: "Today's Assignments", value: "6", icon: Wrench, color: "text-enterprise-blue", change: "+2" },
    { title: "Completed Today", value: "3", icon: CheckCircle, color: "text-success", change: "+3" },
    { title: "In Progress", value: "2", icon: Clock, color: "text-warning", change: "0" },
    { title: "Emergency Calls", value: "1", icon: AlertTriangle, color: "text-destructive", change: "+1" },
  ];

  const assignedTickets = [
    {
      id: "TKT-015",
      title: "Engine Diagnostics",
      customer: "ABC Industries",
      location: "Mumbai, Andheri East",
      priority: "High",
      status: "In Progress",
      estimatedTime: "2 hours",
      equipment: "Diesel Generator DG-450",
      description: "Engine overheating issue, requires immediate diagnostics",
      customerContact: "+91 98765 43210",
      address: "Plot 123, Industrial Area, Andheri East, Mumbai - 400069",
      coordinates: { lat: 19.1176, lng: 72.8697 },
      aiSuggestions: [
        "Check coolant levels and radiator condition",
        "Inspect thermostat functionality", 
        "Verify cooling fan operation",
        "Test temperature sensors"
      ]
    },
    {
      id: "TKT-018",
      title: "Parts Replacement",
      customer: "XYZ Manufacturing",
      location: "Mumbai, Powai",
      priority: "Medium",
      status: "Assigned",
      estimatedTime: "4 hours",
      equipment: "Air Compressor AC-200",
      description: "Replace worn out pistons and seals",
      customerContact: "+91 87654 32109",
      address: "Building 45, Tech Park, Powai, Mumbai - 400076",
      coordinates: { lat: 19.1197, lng: 72.9056 },
      aiSuggestions: [
        "Carry spare piston rings and seals",
        "Bring torque wrench for proper assembly",
        "Check oil levels before starting",
        "Test compression after replacement"
      ]
    },
    {
      id: "TKT-021",
      title: "Preventive Maintenance",
      customer: "PQR Textiles",
      location: "Mumbai, Kurla",
      priority: "Low",
      status: "Scheduled",
      estimatedTime: "3 hours",
      equipment: "Boiler Unit BU-150",
      description: "Quarterly maintenance and safety inspection",
      customerContact: "+91 76543 21098",
      address: "Mill Road, Kurla Industrial Estate, Mumbai - 400070",
      coordinates: { lat: 19.0728, lng: 72.8826 },
      aiSuggestions: [
        "Check pressure relief valves",
        "Inspect boiler tubes for scaling",
        "Test safety systems",
        "Update maintenance log"
      ]
    }
  ];

  const quickActions = [
    {
      title: "Start Work",
      icon: PlayCircle,
      action: "start_work",
      description: "Mark current ticket as in progress"
    },
    {
      title: "Complete Task",
      icon: CheckCircle,
      action: "complete_task",
      description: "Mark task as completed with report"
    },
    {
      title: "Request Parts",
      icon: Settings,
      action: "request_parts",
      description: "Request additional parts for current job"
    },
    {
      title: "Emergency Call",
      icon: AlertTriangle,
      action: "emergency_call",
      description: "Report emergency situation"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-warning text-warning-foreground';
      case 'Completed':
        return 'bg-success text-success-foreground';
      case 'Assigned':
        return 'bg-enterprise-blue text-white';
      case 'Scheduled':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-destructive text-destructive-foreground';
      case 'Medium':
        return 'bg-warning text-warning-foreground';
      case 'Low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: "Action Initiated",
      description: `${action.replace('_', ' ')} has been processed successfully.`,
    });
  };

  const handleUpdateTicket = () => {
    if (!updateStatus) {
      toast({
        title: "Error",
        description: "Please select a status",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Ticket Updated",
      description: `Ticket ${selectedTicket?.id} has been updated to ${updateStatus}`,
    });
    
    setShowUpdateDialog(false);
    setUpdateStatus("");
    setUpdateNotes("");
  };

  const handleNavigate = (ticket: any) => {
    setSelectedLocation(ticket);
    setShowNavigationDialog(true);
    
    // Simulate GPS navigation
    setTimeout(() => {
      toast({
        title: "Navigation Started",
        description: `GPS navigation to ${ticket.customer} has been initiated.`,
      });
      setShowNavigationDialog(false);
    }, 2000);
  };

  const handleCallCustomer = (phone: string) => {
    toast({
      title: "Calling Customer",
      description: `Initiating call to ${phone}`,
    });
  };

  return (
    <CorporateLayout 
      title="Mechanic Dashboard" 
      subtitle="Field Service Portal"
      variant="mechanics"
      headerActions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Bot className="w-4 h-4 mr-2" />
            AI Assistant
          </Button>
          <Button variant="outline">
            <Camera className="w-4 h-4 mr-2" />
            Capture Photo
          </Button>
        </div>
      }
    >

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mechanicStats.map((stat, index) => (
          <Card key={index} className="border-enterprise-gray-light shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-success font-medium">{stat.change}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-enterprise-gray-light shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => handleQuickAction(action.action)}
              >
                <action.icon className="w-8 h-8 text-primary" />
                <div className="text-center">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assigned Tickets */}
      <Card className="border-enterprise-gray-light shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            Today's Assignments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignedTickets.map((ticket, index) => (
              <div key={index} className="p-4 rounded-lg border border-enterprise-gray-light hover:shadow-card transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <span className="font-medium text-sm text-muted-foreground">{ticket.id}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {ticket.estimatedTime}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground">{ticket.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{ticket.equipment}</p>
                    <p className="text-sm text-foreground mb-3">{ticket.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{ticket.customer}</span>
                      </div>
                      <div className="text-sm text-muted-foreground ml-6">
                        {ticket.address}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Bot className="w-4 h-4 text-primary" />
                        AI Suggestions
                      </h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {ticket.aiSuggestions.map((suggestion, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-primary">•</span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm" 
                    onClick={() => handleNavigate(ticket)}
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    <Navigation className="w-4 h-4 mr-1" />
                    Navigate
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCallCustomer(ticket.customerContact)}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call Customer
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setShowUpdateDialog(true);
                    }}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Update Status
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Equipment Monitor */}
      <LiveEquipmentMonitor />

      {/* Update Status Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Ticket Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select value={updateStatus} onValueChange={setUpdateStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Parts Required">Parts Required</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                value={updateNotes}
                onChange={(e) => setUpdateNotes(e.target.value)}
                placeholder="Add any notes or observations..."
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleUpdateTicket} className="flex-1">
                Update Status
              </Button>
              <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Navigation Dialog */}
      <Dialog open={showNavigationDialog} onOpenChange={setShowNavigationDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>GPS Navigation</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <div className="animate-pulse">
              <Navigation className="w-16 h-16 mx-auto mb-4 text-primary" />
              <p className="text-lg font-medium">Starting Navigation...</p>
              <p className="text-sm text-muted-foreground mt-2">
                Calculating route to {selectedLocation?.customer}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </CorporateLayout>
  );
}