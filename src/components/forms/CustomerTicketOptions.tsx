import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ServiceTicketForm } from "@/components/ServiceTicketForm";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink,
  Users,
  Clock,
  Zap
} from "lucide-react";

interface CustomerTicketOptionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerTicketOptions({ isOpen, onClose }: CustomerTicketOptionsProps) {
  const [showPreChecks, setShowPreChecks] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [preChecksCompleted, setPreChecksCompleted] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const contactMethods = [
    {
      id: "whatsapp",
      title: "WhatsApp Support",
      description: "Chat with our support team on WhatsApp for quick assistance",
      icon: MessageSquare,
      color: "bg-green-500",
      action: "Chat Now",
      availability: "24/7",
      responseTime: "< 5 minutes"
    },
    {
      id: "call",
      title: "Phone Support",
      description: "Speak directly with our technical support team",
      icon: Phone,
      color: "bg-blue-500",
      action: "Call Now",
      availability: "9 AM - 6 PM",
      responseTime: "Immediate"
    },
    {
      id: "email",
      title: "Email Support",
      description: "Send detailed queries via email with attachments",
      icon: Mail,
      color: "bg-purple-500",
      action: "Send Email",
      availability: "24/7",
      responseTime: "< 4 hours"
    },
    {
      id: "form",
      title: "Service Ticket",
      description: "Create a detailed service ticket for complex issues",
      icon: FileText,
      color: "bg-orange-500",
      action: "Create Ticket",
      availability: "24/7",
      responseTime: "< 2 hours"
    }
  ];

  const preCheckItems = [
    {
      id: "equipment_status",
      title: "Equipment Status Checked",
      description: "I have verified that the equipment is properly connected and powered on",
      category: "Basic Checks"
    },
    {
      id: "error_messages",
      title: "Error Messages Documented",
      description: "I have noted down any error codes, warning lights, or unusual sounds",
      category: "Documentation"
    },
    {
      id: "recent_changes",
      title: "Recent Changes Identified",
      description: "I have considered any recent maintenance, modifications, or environmental changes",
      category: "Context"
    },
    {
      id: "basic_troubleshooting",
      title: "Basic Troubleshooting Attempted",
      description: "I have tried restarting the equipment and checking basic settings",
      category: "Troubleshooting"
    },
    {
      id: "safety_measures",
      title: "Safety Measures Confirmed",
      description: "I have ensured the work area is safe and all safety protocols are followed",
      category: "Safety"
    },
    {
      id: "documentation_ready",
      title: "Documentation Available",
      description: "I have equipment serial numbers, warranty information, and maintenance records ready",
      category: "Documentation"
    }
  ];

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    if (methodId === "form") {
      setShowPreChecks(true);
    } else {
      handleContactMethod(methodId);
    }
  };

  const handleContactMethod = (methodId: string) => {
    const method = contactMethods.find(m => m.id === methodId);
    
    switch (methodId) {
      case "whatsapp":
        window.open("https://wa.me/919876543210?text=Hello, I need technical support for my Greaves equipment.", "_blank");
        break;
      case "call":
        window.open("tel:+919876543210", "_self");
        break;
      case "email":
        window.open("mailto:support@greaves.com?subject=Technical Support Request&body=Dear Support Team,%0A%0AI need assistance with my Greaves equipment.%0A%0AEquipment Details:%0A- Model: %0A- Serial Number: %0A- Issue Description: %0A%0AThank you.", "_self");
        break;
    }

    toast({
      title: `${method?.title} Initiated`,
      description: `Opening ${method?.title.toLowerCase()} for support`,
    });
  };

  const handlePreCheckChange = (itemId: string, checked: boolean) => {
    setPreChecksCompleted(prev => ({
      ...prev,
      [itemId]: checked
    }));
  };

  const canProceedToForm = () => {
    return preCheckItems.every(item => preChecksCompleted[item.id]);
  };

  const handleProceedToForm = () => {
    if (!canProceedToForm()) {
      toast({
        title: "Pre-checks Required",
        description: "Please complete all pre-checks before proceeding",
        variant: "destructive"
      });
      return;
    }
    setShowPreChecks(false);
    setShowTicketForm(true);
  };

  const handleTicketSubmit = (ticket: any) => {
    toast({
      title: "Service Ticket Created",
      description: `Ticket ${ticket.id} has been created successfully`,
    });
    setShowTicketForm(false);
    onClose();
  };

  const groupedPreChecks = preCheckItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, Array<{
    id: string;
    title: string;
    description: string;
    category: string;
  }>>);

  return (
    <>
      <Dialog open={isOpen && !showPreChecks && !showTicketForm} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Users className="w-6 h-6" />
              Customer Support Options
            </DialogTitle>
            <p className="text-muted-foreground">
              Choose the best way to get technical support for your Greaves equipment
            </p>
          </DialogHeader>

          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-semibold">24/7</span>
                </div>
                <p className="text-sm text-muted-foreground">Support Available</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-success" />
                  <span className="font-semibold">&lt; 5 min</span>
                </div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="font-semibold">98.5%</span>
                </div>
                <p className="text-sm text-muted-foreground">Resolution Rate</p>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactMethods.map((method) => (
                <Card 
                  key={method.id} 
                  className="border-2 hover:shadow-lg transition-all cursor-pointer hover:border-primary/50"
                  onClick={() => handleMethodSelect(method.id)}
                >
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-lg ${method.color} text-white`}>
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{method.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mb-3">
                          {method.description}
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {method.availability}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {method.responseTime}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button className="w-full" variant="outline">
                      <method.icon className="w-4 h-4 mr-2" />
                      {method.action}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Emergency Contact */}
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="w-5 h-5" />
                  Emergency Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  For critical equipment failures affecting safety or production:
                </p>
                <div className="flex gap-3">
                  <Button 
                    variant="destructive" 
                    onClick={() => window.open("tel:+919876543200", "_self")}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency Hotline
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.open("https://wa.me/919876543200?text=EMERGENCY: Critical equipment failure", "_blank")}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Emergency WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pre-checks Dialog */}
      <Dialog open={showPreChecks} onOpenChange={(open) => !open && setShowPreChecks(false)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Service Request Pre-checks
            </DialogTitle>
            <p className="text-muted-foreground">
              Please complete these pre-checks to help us serve you better and faster
            </p>
          </DialogHeader>

          <div className="space-y-6">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-primary/5 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100">Why Pre-checks?</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Completing these checks helps our technicians understand your situation better, 
                    leading to faster diagnosis and resolution of your equipment issues.
                  </p>
                </div>
              </div>
            </div>

            {Object.entries(groupedPreChecks).map(([category, items]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-lg">{category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <Checkbox
                        id={item.id}
                        checked={preChecksCompleted[item.id] || false}
                        onCheckedChange={(checked) => handlePreCheckChange(item.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label 
                          htmlFor={item.id} 
                          className="font-medium cursor-pointer block"
                        >
                          {item.title}
                        </label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </div>
                      {preChecksCompleted[item.id] && (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}

            <div className="flex gap-3 justify-end pt-4 border-t">
              <Button variant="outline" onClick={() => setShowPreChecks(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleProceedToForm}
                disabled={!canProceedToForm()}
                className="bg-gradient-primary hover:opacity-90"
              >
                <FileText className="w-4 h-4 mr-2" />
                Create Service Ticket
              </Button>
            </div>
            
            {!canProceedToForm() && (
              <p className="text-sm text-muted-foreground text-center">
                Complete all pre-checks to proceed with creating a service ticket
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Service Ticket Form */}
      {showTicketForm && (
        <ServiceTicketForm
          userRole="customer"
          onSubmit={handleTicketSubmit}
          onCancel={() => setShowTicketForm(false)}
        />
      )}
    </>
  );
}