import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { MarketingChannelPerformance } from "@/components/details/MarketingChannelPerformance";
import { SocialMediaManagement } from "@/components/social/SocialMediaManagement";
import { MarketingLeadDetails } from "@/components/details/MarketingLeadDetails";
import { CorporateLayout } from "@/components/ui/corporate-layout";
import { 
  Megaphone, 
  Users, 
  TrendingUp, 
  Target,
  Brain,
  Phone,
  Bot,
  CheckCircle,
  Clock,
  PhoneCall,
  FileText,
  BarChart3,
  Share2
} from "lucide-react";

export function EnhancedMarketingDashboard() {
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [callingInProgress, setCallingInProgress] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const stats = [
    { title: "AI Qualified Leads", value: "68", icon: Users, color: "text-enterprise-blue" },
    { title: "Auto Calls Made", value: "234", icon: Phone, color: "text-success" },
    { title: "Qualification Rate", value: "72%", icon: Target, color: "text-enterprise-blue-light" },
    { title: "Passed to Sales", value: "49", icon: TrendingUp, color: "text-success" },
  ];

  const qualificationQueue = [
    {
      id: "QLF-001",
      company: "Rajasthan Textiles",
      contact: "Suresh Agarwal",
      phone: "+91 98765 43210",
      source: "Website Form",
      aiScore: 8.7,
      status: "AI Qualified",
      qualificationScript: "Hello Mr. Agarwal, this is regarding your power backup inquiry. I'd like to understand your current setup and requirements..."
    },
    {
      id: "QLF-002",
      company: "Karnataka Steel",
      contact: "Deepa Reddy", 
      phone: "+91 87654 32109",
      source: "LinkedIn",
      aiScore: 7.9,
      status: "Manual Review",
      qualificationScript: "Hi Ms. Reddy, thank you for connecting with us on LinkedIn. Could you tell me about your current power infrastructure..."
    },
    {
      id: "QLF-003",
      company: "Haryana Auto Parts",
      contact: "Vikram Singh",
      phone: "+91 76543 21098", 
      source: "Cold Call",
      aiScore: 6.4,
      status: "Pending Call",
      qualificationScript: "Good morning Mr. Singh, I'm calling from GreavesAI regarding industrial power solutions..."
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AI Qualified':
        return 'bg-success text-success-foreground';
      case 'Manual Review':
        return 'bg-warning text-warning-foreground';
      case 'Pending Call':
        return 'bg-enterprise-blue text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleAutoCall = (lead: any) => {
    setSelectedLead(lead);
    setShowCallDialog(true);
    setCallingInProgress(true);
    
    // Simulate auto calling process
    setTimeout(() => {
      setCallingInProgress(false);
      toast({
        title: "Call Completed",
        description: `AI qualification call with ${lead.contact} completed successfully.`,
      });
    }, 3000);
  };

  const handlePassToSales = (leadId: string) => {
    toast({
      title: "Lead Passed to Sales",
      description: `Qualified lead ${leadId} has been passed to the sales team.`,
    });
  };

  return (
    <CorporateLayout 
      title="Marketing Dashboard" 
      subtitle="AI-Powered Lead Qualification & Channel Management"
      variant="marketing"
      headerActions={
        <Button variant="outline" className="border-enterprise-blue text-enterprise-blue">
          <Brain className="w-4 h-4 mr-2" />
          AI Config
        </Button>
      }
    >

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Lead Qualification
          </TabsTrigger>
          <TabsTrigger value="channels" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Channel Performance
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Social Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">

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

      {/* AI Qualification Queue */}
      <Card className="border-enterprise-gray-light shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI Qualification Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {qualificationQueue.map((lead, index) => (
              <div key={index} className="p-4 rounded-lg border border-enterprise-gray-light hover:shadow-card transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                    <span className="font-medium text-sm text-muted-foreground">{lead.id}</span>
                    <div className="flex items-center gap-1">
                      <Brain className="w-4 h-4 text-enterprise-blue-light" />
                      <span className="text-sm font-semibold text-success">{lead.aiScore}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">{lead.source}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{lead.company}</h4>
                    <p className="text-sm text-muted-foreground">{lead.contact} • {lead.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    {lead.status === 'AI Qualified' && (
                      <Button 
                        size="sm" 
                        onClick={() => handlePassToSales(lead.id)}
                        className="bg-gradient-primary hover:opacity-90"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Pass to Sales
                      </Button>
                    )}
                    {lead.status !== 'AI Qualified' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleAutoCall(lead)}
                      >
                        <PhoneCall className="w-4 h-4 mr-1" />
                        Auto Call
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedLead(lead);
                        setShowLeadDetails(true);
                      }}
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-1" />
                      Manual Call
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
        </TabsContent>

        <TabsContent value="channels" className="mt-6">
          <MarketingChannelPerformance />
        </TabsContent>

        <TabsContent value="social" className="mt-6">
          <SocialMediaManagement />
        </TabsContent>
      </Tabs>

      {/* Lead Details Dialog */}
      <MarketingLeadDetails 
        lead={selectedLead}
        open={showLeadDetails}
        onOpenChange={setShowLeadDetails}
      />

      {/* Auto Call Dialog */}
      <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
        <DialogContent className="bg-card border-enterprise-gray-light max-w-2xl">
          <DialogHeader>
            <DialogTitle>AI Auto Call - {selectedLead?.company}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {callingInProgress ? (
              <div className="text-center py-8">
                <div className="animate-pulse">
                  <PhoneCall className="w-16 h-16 mx-auto mb-4 text-enterprise-blue" />
                  <p className="text-lg font-medium">AI is calling {selectedLead?.contact}...</p>
                  <p className="text-sm text-muted-foreground mt-2">Running qualification script</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Qualification Script:</h4>
                  <p className="text-sm">{selectedLead?.qualificationScript}</p>
                </div>
                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <h4 className="font-medium text-success mb-2">Call Result:</h4>
                  <p className="text-sm">✓ Contact reached and engaged</p>
                  <p className="text-sm">✓ Requirements confirmed</p>
                  <p className="text-sm">✓ Decision maker identified</p>
                  <p className="text-sm">✓ Timeline established</p>
                </div>
                <Button 
                  onClick={() => handlePassToSales(selectedLead?.id)}
                  className="w-full bg-gradient-primary hover:opacity-90"
                >
                  Mark as Qualified & Pass to Sales
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </CorporateLayout>
  );
}