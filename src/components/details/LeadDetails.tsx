import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  X, 
  TrendingUp, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  DollarSign,
  Star,
  Brain,
  Building,
  Clock,
  Target
} from "lucide-react";

interface LeadDetailsProps {
  lead: {
    id: string;
    company: string;
    contact: string;
    value: string;
    score: number;
    source: string;
    status: string;
    lastContact: string;
  };
  onClose: () => void;
}

export function LeadDetails({ lead, onClose }: LeadDetailsProps) {
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

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return "text-success";
    if (score >= 7) return "text-warning";
    return "text-muted-foreground";
  };

  // Mock detailed data for demonstration
  const mockLeadDetails = {
    ...lead,
    fullContactInfo: {
      name: lead.contact,
      title: "Chief Operations Officer",
      phone: "+91 9876543210",
      email: "contact@mumbaiindustries.com",
      linkedin: "linkedin.com/in/rajpatel-coo"
    },
    companyDetails: {
      name: lead.company,
      industry: "Manufacturing & Textiles",
      employees: "500-1000",
      revenue: "₹250Cr annually",
      website: "www.mumbaiindustries.com",
      address: "Plot 45, MIDC Industrial Area, Andheri East, Mumbai - 400093"
    },
    requirementDetails: {
      powerRequirement: "750 KVA",
      backupDuration: "12 hours continuous",
      fuelType: "Diesel",
      installationLocation: "Factory Floor - Building B",
      urgency: "Within 2 months",
      budget: "₹12.5L - ₹15L",
      decisionMakers: ["Raj Patel (COO)", "Priya Shah (CFO)", "Amit Kumar (Plant Manager)"]
    },
    aiInsights: {
      score: lead.score,
      buyingSignals: [
        "Visited pricing page 3 times",
        "Downloaded technical specifications",
        "Inquired about installation timeline",
        "Asked for maintenance contracts"
      ],
      riskFactors: [
        "No direct communication in 3 days",
        "Competitor evaluation mentioned"
      ],
      recommendations: [
        "Schedule technical consultation within 48 hours",
        "Prepare customized proposal with installation timeline",
        "Highlight 5-year comprehensive warranty advantage"
      ]
    },
    activities: [
      {
        timestamp: "2024-01-15 3:30 PM",
        activity: "Website Visit",
        details: "Spent 12 minutes on product comparison page",
        type: "system"
      },
      {
        timestamp: "2024-01-15 2:15 PM",
        activity: "Email Opened",
        details: "Opened our product brochure email, clicked on technical specs",
        type: "email"
      },
      {
        timestamp: "2024-01-14 11:00 AM",
        activity: "Phone Call",
        details: "45-minute discussion about power requirements and backup needs",
        type: "call"
      },
      {
        timestamp: "2024-01-13 4:20 PM",
        activity: "Form Submission",
        details: "Submitted inquiry form with detailed requirements",
        type: "form"
      }
    ]
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-enterprise">
        <Card className="border-0">
          <CardHeader className="bg-gradient-primary text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6" />
                <div>
                  <CardTitle className="text-xl">{mockLeadDetails.company}</CardTitle>
                  <p className="text-white/90 text-sm">Lead ID: {mockLeadDetails.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(mockLeadDetails.status)}>
                  {mockLeadDetails.status}
                </Badge>
                <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded">
                  <Brain className="w-4 h-4" />
                  <span className={`font-semibold ${getScoreColor(mockLeadDetails.score)}`}>
                    {mockLeadDetails.score}
                  </span>
                </div>
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
                {/* Company Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Company Details
                  </h3>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Industry</p>
                        <p className="font-medium text-foreground">{mockLeadDetails.companyDetails.industry}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Employees</p>
                        <p className="font-medium text-foreground">{mockLeadDetails.companyDetails.employees}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Annual Revenue</p>
                        <p className="font-medium text-foreground">{mockLeadDetails.companyDetails.revenue}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Website</p>
                        <p className="font-medium text-enterprise-blue">{mockLeadDetails.companyDetails.website}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium text-foreground">{mockLeadDetails.companyDetails.address}</p>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Requirements & Budget
                  </h3>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Power Requirement</p>
                        <p className="font-medium text-foreground">{mockLeadDetails.requirementDetails.powerRequirement}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Backup Duration</p>
                        <p className="font-medium text-foreground">{mockLeadDetails.requirementDetails.backupDuration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Fuel Type</p>
                        <p className="font-medium text-foreground">{mockLeadDetails.requirementDetails.fuelType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Timeline</p>
                        <p className="font-medium text-foreground">{mockLeadDetails.requirementDetails.urgency}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">Budget Range</p>
                      <p className="font-medium text-success text-lg">{mockLeadDetails.requirementDetails.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Decision Makers</p>
                      <div className="flex flex-wrap gap-2">
                        {mockLeadDetails.requirementDetails.decisionMakers.map((dm, index) => (
                          <Badge key={index} variant="outline" className="border-enterprise-blue text-enterprise-blue">
                            {dm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Insights */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI-Driven Insights
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                      <h4 className="font-semibold text-success mb-2">Buying Signals</h4>
                      <ul className="space-y-1">
                        {mockLeadDetails.aiInsights.buyingSignals.map((signal, index) => (
                          <li key={index} className="text-sm text-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                            {signal}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                      <h4 className="font-semibold text-warning mb-2">Risk Factors</h4>
                      <ul className="space-y-1">
                        {mockLeadDetails.aiInsights.riskFactors.map((risk, index) => (
                          <li key={index} className="text-sm text-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-enterprise-blue/10 border border-enterprise-blue/20 rounded-lg">
                      <h4 className="font-semibold text-enterprise-blue mb-2">AI Recommendations</h4>
                      <ul className="space-y-1">
                        {mockLeadDetails.aiInsights.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-enterprise-blue rounded-full"></div>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Engagement History
                  </h3>
                  <div className="space-y-3">
                    {mockLeadDetails.activities.map((activity, index) => (
                      <div key={index} className="flex gap-4 p-3 bg-muted/30 rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-enterprise-blue rounded-full mt-2"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-foreground">{activity.activity}</h4>
                            <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                          </div>
                          <p className="text-sm text-foreground">{activity.details}</p>
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
                    Primary Contact
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-foreground">{mockLeadDetails.fullContactInfo.name}</p>
                      <p className="text-sm text-muted-foreground">{mockLeadDetails.fullContactInfo.title}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{mockLeadDetails.fullContactInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{mockLeadDetails.fullContactInfo.email}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Lead Metrics */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Lead Score Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Engagement Level</span>
                        <span className="text-sm font-medium">9.2/10</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Budget Fit</span>
                        <span className="text-sm font-medium">8.5/10</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Timeline Match</span>
                        <span className="text-sm font-medium">7.8/10</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Quick Actions */}
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Call
                  </Button>
                  <Button variant="outline" className="w-full border-enterprise-blue text-enterprise-blue">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Proposal
                  </Button>
                  <Button variant="outline" className="w-full border-enterprise-blue text-enterprise-blue">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Demo
                  </Button>
                  <Button variant="outline" className="w-full border-warning text-warning">
                    <Target className="w-4 h-4 mr-2" />
                    Update Status
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}