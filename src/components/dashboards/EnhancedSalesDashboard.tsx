import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CorporateLayout } from "@/components/ui/corporate-layout";
import { LeadDetails } from "@/components/details/LeadDetails";
import { EnhancedSalesFunnelChart } from "@/components/charts/EnhancedSalesFunnelChart";
import { SalesAnalyticsCharts } from "@/components/charts/SalesAnalyticsCharts";
import { AIAgentPanel } from "@/components/ai/AIAgentPanel";
import { LiveAIAgents } from "@/components/ai/LiveAIAgents";
import { AddLeadForm } from "@/components/forms/AddLeadForm";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign,
  Phone,
  Mail,
  Calendar,
  Star,
  Brain,
  BarChart3,
  Filter,
  Plus
} from "lucide-react";

interface SalesDashboardProps {
  userRole: 'sales-agent' | 'sales-manager';
}

export function EnhancedSalesDashboard({ userRole }: SalesDashboardProps) {
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showAddLead, setShowAddLead] = useState(false);
  const [selectedView, setSelectedView] = useState<'dashboard' | 'funnel' | 'analytics'>('dashboard');
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showPersonDetails, setShowPersonDetails] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [callNotes, setCallNotes] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [currentLead, setCurrentLead] = useState<any>(null);
  const { toast } = useToast();

  const getStatsForRole = () => {
    if (userRole === 'sales-agent') {
      return [
        { title: "Active Leads", value: "24", icon: Users, color: "text-enterprise-blue", change: "+12%" },
        { title: "This Month Sales", value: "₹8.5L", icon: DollarSign, color: "text-success", change: "+18%" },
        { title: "Conversion Rate", value: "24%", icon: Target, color: "text-primary", change: "+5%" },
        { title: "AI Score Avg", value: "8.2", icon: Brain, color: "text-enterprise-blue-light", change: "+0.8" },
      ];
    } else {
      return [
        { title: "Team Leads", value: "156", icon: Users, color: "text-enterprise-blue", change: "+23%" },
        { title: "Monthly Revenue", value: "₹45.2L", icon: DollarSign, color: "text-success", change: "+15%" },
        { title: "Team Performance", value: "87%", icon: TrendingUp, color: "text-success", change: "+8%" },
        { title: "AI Efficiency", value: "92%", icon: Brain, color: "text-enterprise-blue-light", change: "+12%" },
      ];
    }
  };

  const getLeads = () => {
    return [
      { 
        id: "LD-001", 
        company: "Mumbai Industries", 
        contact: "Raj Patel", 
        value: "₹12.5L", 
        score: 9.2, 
        source: "Website",
        status: "Hot",
        lastContact: "2 hours ago",
        nextAction: "Demo scheduled",
        assignedTo: "Self"
      },
      { 
        id: "LD-002", 
        company: "Gujarat Power", 
        contact: "Priya Shah", 
        value: "₹8.3L", 
        score: 7.8, 
        source: "Referral",
        status: "Warm",
        lastContact: "1 day ago",
        nextAction: "Follow-up call",
        assignedTo: "Amit Kumar"
      },
      { 
        id: "LD-003", 
        company: "Delhi Manufacturing", 
        contact: "Amit Kumar", 
        value: "₹15.2L", 
        score: 8.9, 
        source: "Cold Call",
        status: "Hot",
        lastContact: "3 hours ago",
        nextAction: "Proposal review",
        assignedTo: "Self"
      },
    ];
  };

  const getPerformanceData = () => {
    if (userRole === 'sales-manager') {
      return {
        territories: [
          { name: "North India", revenue: "₹18.2L", growth: "+22%", leads: 68, conversion: "28%" },
          { name: "West India", revenue: "₹15.8L", growth: "+18%", leads: 52, conversion: "31%" },
          { name: "South India", revenue: "₹11.4L", growth: "+15%", leads: 36, conversion: "25%" }
        ],
        salespeople: [
          { name: "Raj Kumar", revenue: "₹8.5L", leads: 24, conversion: "24%", aiEfficiency: "89%" },
          { name: "Priya Singh", revenue: "₹7.2L", leads: 19, conversion: "29%", aiEfficiency: "92%" },
          { name: "Amit Patel", revenue: "₹6.8L", leads: 18, conversion: "26%", aiEfficiency: "87%" }
        ]
      };
    }
    return null;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return "text-success";
    if (score >= 7) return "text-warning";
    return "text-muted-foreground";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot':
        return 'bg-destructive text-destructive-foreground';
      case 'Warm':
        return 'bg-warning text-warning-foreground';
      case 'Cold':
        return 'bg-enterprise-blue text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleCallLead = (lead: any) => {
    setCurrentLead(lead);
    setShowCallDialog(true);
  };

  const handleEmailLead = (lead: any) => {
    setCurrentLead(lead);
    setEmailSubject(`Follow-up: ${lead.company} - ${lead.nextAction}`);
    setEmailContent(`Hi ${lead.contact},\n\nI hope this email finds you well. I wanted to follow up on our recent discussion regarding ${lead.company}'s equipment needs.\n\nBest regards`);
    setShowEmailDialog(true);
  };

  const handleMakeCall = () => {
    toast({
      title: "Call Initiated",
      description: `Calling ${currentLead?.contact} at ${currentLead?.company}`,
    });
    setShowCallDialog(false);
    setCallNotes("");
  };

  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: `Email sent to ${currentLead?.contact} at ${currentLead?.company}`,
    });
    setShowEmailDialog(false);
    setEmailSubject("");
    setEmailContent("");
  };

  const handleViewPersonDetails = (person: any) => {
    setSelectedPerson(person);
    setShowPersonDetails(true);
  };

  const stats = getStatsForRole();
  const leads = getLeads();
  const performanceData = getPerformanceData();

  return (
    <CorporateLayout
      title="Sales Dashboard"
      subtitle={`${userRole.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Portal`}
      headerActions={
        <div className="flex gap-2">
          <Button 
            variant={selectedView === 'dashboard' ? 'default' : 'outline'} 
            onClick={() => setSelectedView('dashboard')}
          >
            Dashboard
          </Button>
          <Button 
            variant={selectedView === 'funnel' ? 'default' : 'outline'} 
            onClick={() => setSelectedView('funnel')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Funnel
          </Button>
          <Button 
            variant={selectedView === 'analytics' ? 'default' : 'outline'} 
            onClick={() => setSelectedView('analytics')}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline" onClick={() => setShowAIPanel(!showAIPanel)}>
            <Brain className="w-4 h-4 mr-2" />
            AI Agents
          </Button>
          <Button onClick={() => setShowAddLead(true)} className="bg-gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
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
                  <p className="text-sm text-success font-medium">{stat.change}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedView === 'dashboard' && (
        <>
          {/* Sales Pipeline */}
          <Card className="border-enterprise-gray-light shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Sales Pipeline (AI-Enhanced)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Pipeline Progress</span>
                  <span>₹48.2L / ₹60L Target</span>
                </div>
                <Progress value={80} className="h-3" />
                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-enterprise-blue">32</div>
                    <div className="text-sm text-muted-foreground">Prospects</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-warning">18</div>
                    <div className="text-sm text-muted-foreground">Qualified</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Proposals</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-success">8</div>
                    <div className="text-sm text-muted-foreground">Closing</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* High-Priority Leads */}
          <Card className="border-enterprise-gray-light shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                AI-Prioritized Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.map((lead, index) => (
                  <div key={index} className="p-4 rounded-lg border border-enterprise-gray-light hover:shadow-card transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                        <span className="font-medium text-sm text-muted-foreground">{lead.id}</span>
                        <div className="flex items-center gap-1">
                          <Brain className="w-4 h-4 text-enterprise-blue-light" />
                          <span className={`text-sm font-semibold ${getScoreColor(lead.score)}`}>
                            {lead.score}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-success">{lead.value}</div>
                        <div className="text-xs text-muted-foreground">{lead.source}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{lead.company}</h4>
                        <p className="text-sm text-muted-foreground">{lead.contact}</p>
                        <p className="text-xs text-muted-foreground">Next: {lead.nextAction}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCallLead(lead)}
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEmailLead(lead)}
                        >
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setSelectedLead(lead)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Manager Performance View */}
          {userRole === 'sales-manager' && performanceData && (
            <>
              <Card className="border-enterprise-gray-light shadow-card">
                <CardHeader>
                  <CardTitle>Territory Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceData.territories.map((territory, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold">{territory.name}</h4>
                            <p className="text-sm text-muted-foreground">{territory.leads} leads • {territory.conversion} conversion</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-success">{territory.revenue}</p>
                            <p className="text-sm text-success">{territory.growth}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-enterprise-gray-light shadow-card">
                <CardHeader>
                  <CardTitle>Sales Team Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceData.salespeople.map((person, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold">{person.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {person.leads} leads • {person.conversion} conversion • AI: {person.aiEfficiency}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-success">{person.revenue}</p>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewPersonDetails(person)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}

      {selectedView === 'funnel' && <EnhancedSalesFunnelChart />}

      {selectedView === 'analytics' && <SalesAnalyticsCharts />}

      {/* AI Agent Panel */}
      {showAIPanel && <LiveAIAgents />}

      {/* Add Lead Form */}
      <AddLeadForm isOpen={showAddLead} onClose={() => setShowAddLead(false)} />

      {/* Call Dialog */}
      <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Call {currentLead?.contact}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Company</div>
              <div className="font-medium">{currentLead?.company}</div>
              <div className="text-sm text-muted-foreground mt-2">Contact</div>
              <div className="font-medium">{currentLead?.contact}</div>
              <div className="text-sm text-muted-foreground mt-2">Lead Value</div>
              <div className="font-medium text-success">{currentLead?.value}</div>
            </div>
            <div>
              <label className="text-sm font-medium">Call Notes</label>
              <Textarea
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                placeholder="Add notes about the call..."
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleMakeCall} className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Start Call
              </Button>
              <Button variant="outline" onClick={() => setShowCallDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Email to {currentLead?.contact}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">To</div>
              <div className="font-medium">{currentLead?.contact} ({currentLead?.company})</div>
            </div>
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Email subject"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Email content..."
                rows={6}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSendEmail} className="flex-1">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Person Details Dialog */}
      <Dialog open={showPersonDetails} onOpenChange={setShowPersonDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Sales Performance - {selectedPerson?.name}</DialogTitle>
          </DialogHeader>
          {selectedPerson && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                    <div className="text-2xl font-bold text-success">{selectedPerson.revenue}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Active Leads</div>
                    <div className="text-2xl font-bold text-primary">{selectedPerson.leads}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Conversion Rate</div>
                    <div className="text-2xl font-bold text-enterprise-blue">{selectedPerson.conversion}</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>AI Efficiency Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Overall AI Efficiency</span>
                      <span className="font-bold text-lg text-success">{selectedPerson.aiEfficiency}</span>
                    </div>
                    <Progress value={parseInt(selectedPerson.aiEfficiency)} className="h-3" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Lead Scoring Accuracy</div>
                        <Progress value={92} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">92%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Call Script Optimization</div>
                        <Progress value={88} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">88%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Email Response Rate</div>
                        <Progress value={76} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">76%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Follow-up Timing</div>
                        <Progress value={94} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">94%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="w-4 h-4 text-blue-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">Call with Delhi Manufacturing</div>
                        <div className="text-xs text-muted-foreground">2 hours ago - Demo scheduled</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Mail className="w-4 h-4 text-green-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">Follow-up email sent</div>
                        <div className="text-xs text-muted-foreground">5 hours ago - Mumbai Industries</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Target className="w-4 h-4 text-orange-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">Proposal submitted</div>
                        <div className="text-xs text-muted-foreground">1 day ago - Gujarat Power</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule 1-on-1
                </Button>
                <Button variant="outline" onClick={() => setShowPersonDetails(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Lead Details Modal */}
      {selectedLead && (
        <LeadDetails
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
      </div>
    </CorporateLayout>
  );
}