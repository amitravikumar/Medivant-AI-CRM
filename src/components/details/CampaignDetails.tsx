import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  X, 
  Megaphone, 
  TrendingUp, 
  Target, 
  Calendar,
  DollarSign,
  Users,
  Brain,
  BarChart3,
  MapPin,
  Clock,
  Mail,
  Phone,
  MessageSquare
} from "lucide-react";

interface CampaignDetailsProps {
  campaign: {
    id: string;
    name: string;
    type: string;
    leads: number;
    qualified: number;
    budget: string;
    performance: number;
    status: string;
  };
  onClose: () => void;
}

export function CampaignDetails({ campaign, onClose }: CampaignDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success text-success-foreground';
      case 'Paused':
        return 'bg-warning text-warning-foreground';
      case 'Completed':
        return 'bg-enterprise-blue text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Mock detailed data for demonstration
  const mockCampaignDetails = {
    ...campaign,
    description: "Targeted outreach to manufacturing companies in Mumbai Industrial Zone requiring backup power solutions for their operations.",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    targetAudience: {
      industry: "Manufacturing & Industrial",
      company_size: "100-1000 employees",
      location: "Mumbai, Pune, Nashik",
      budget_range: "₹5L - ₹50L",
      decision_makers: "COO, Plant Manager, CFO"
    },
    channels: [
      { name: "LinkedIn Ads", leads: 89, cost: "₹1.2L", conversion: "18%" },
      { name: "Google Ads", leads: 45, cost: "₹0.8L", conversion: "24%" },
      { name: "Industry Events", leads: 22, cost: "₹1.5L", conversion: "41%" },
      { name: "Cold Email", leads: 0, cost: "₹0.5L", conversion: "0%" }
    ],
    aiInsights: {
      topPerformingKeywords: ["backup power", "industrial generator", "DG set Mumbai"],
      bestPerformingTimes: "Tuesday-Thursday, 10 AM - 12 PM",
      audienceInsights: "Manufacturing companies with 250+ employees show 3x higher conversion",
      optimizationSuggestions: [
        "Increase budget for Industry Events channel (+41% conversion)",
        "Pause cold email campaigns (0% conversion)",
        "Target companies during 10 AM - 12 PM window",
        "Focus on 250+ employee companies"
      ]
    },
    topLeads: [
      {
        company: "Maharashtra Steel Works",
        contact: "Suresh Agarwal",
        score: 9.1,
        value: "₹18.5L",
        source: "Industry Events"
      },
      {
        company: "Pune Textiles Ltd",
        contact: "Deepa Reddy", 
        score: 8.7,
        value: "₹12.3L",
        source: "LinkedIn Ads"
      },
      {
        company: "Nashik Auto Parts",
        contact: "Vikram Singh",
        score: 8.2,
        value: "₹9.8L",
        source: "Google Ads"
      }
    ],
    metrics: {
      totalSpend: "₹4.0L",
      costPerLead: "₹2,564",
      costPerQualifiedLead: "₹5,882",
      expectedRevenue: "₹2.4Cr",
      roi: "600%"
    },
    activities: [
      {
        timestamp: "2024-01-15 2:00 PM",
        activity: "Campaign Performance Review",
        details: "Industry Events showing exceptional 41% conversion rate",
        type: "analysis"
      },
      {
        timestamp: "2024-01-14 10:30 AM", 
        activity: "Budget Adjustment",
        details: "Increased Industry Events budget by ₹50K due to high performance",
        type: "optimization"
      },
      {
        timestamp: "2024-01-13 4:15 PM",
        activity: "New Lead Qualified",
        details: "Maharashtra Steel Works - High priority lead (Score: 9.1)",
        type: "lead"
      },
      {
        timestamp: "2024-01-12 11:45 AM",
        activity: "Cold Email Campaign Paused",
        details: "Zero conversions after 2 weeks, budget reallocated to LinkedIn",
        type: "optimization"
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
                <Megaphone className="w-6 h-6" />
                <div>
                  <CardTitle className="text-xl">{mockCampaignDetails.name}</CardTitle>
                  <p className="text-white/90 text-sm">Campaign ID: {mockCampaignDetails.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-white text-white">
                  {mockCampaignDetails.type}
                </Badge>
                <Badge className={getStatusColor(mockCampaignDetails.status)}>
                  {mockCampaignDetails.status}
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
                {/* Campaign Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Campaign Overview
                  </h3>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-foreground leading-relaxed mb-4">{mockCampaignDetails.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p className="font-medium text-foreground">{mockCampaignDetails.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">End Date</p>
                        <p className="font-medium text-foreground">{mockCampaignDetails.endDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Target Audience */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Target Audience
                  </h3>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Industry</p>
                        <p className="font-medium text-foreground">{mockCampaignDetails.targetAudience.industry}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Company Size</p>
                        <p className="font-medium text-foreground">{mockCampaignDetails.targetAudience.company_size}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium text-foreground">{mockCampaignDetails.targetAudience.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Budget Range</p>
                        <p className="font-medium text-foreground">{mockCampaignDetails.targetAudience.budget_range}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground">Decision Makers</p>
                      <p className="font-medium text-foreground">{mockCampaignDetails.targetAudience.decision_makers}</p>
                    </div>
                  </div>
                </div>

                {/* Channel Performance */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Channel Performance
                  </h3>
                  <div className="space-y-3">
                    {mockCampaignDetails.channels.map((channel, index) => (
                      <div key={index} className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-foreground">{channel.name}</h4>
                          <Badge variant="outline" className="border-success text-success">
                            {channel.conversion} conversion
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Leads</p>
                            <p className="font-semibold text-enterprise-blue">{channel.leads}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Cost</p>
                            <p className="font-semibold text-foreground">{channel.cost}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Conversion</p>
                            <p className="font-semibold text-success">{channel.conversion}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Insights */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Performance Insights
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-enterprise-blue/10 border border-enterprise-blue/20 rounded-lg">
                      <h4 className="font-semibold text-enterprise-blue mb-2">Top Performing Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {mockCampaignDetails.aiInsights.topPerformingKeywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="border-enterprise-blue text-enterprise-blue">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                        <h4 className="font-semibold text-success mb-2">Best Times</h4>
                        <p className="text-sm text-foreground">{mockCampaignDetails.aiInsights.bestPerformingTimes}</p>
                      </div>
                      <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                        <h4 className="font-semibold text-warning mb-2">Audience Insight</h4>
                        <p className="text-sm text-foreground">{mockCampaignDetails.aiInsights.audienceInsights}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">AI Optimization Suggestions</h4>
                      <ul className="space-y-1">
                        {mockCampaignDetails.aiInsights.optimizationSuggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm text-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-enterprise-blue rounded-full"></div>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Top Leads */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Top Generated Leads
                  </h3>
                  <div className="space-y-3">
                    {mockCampaignDetails.topLeads.map((lead, index) => (
                      <div key={index} className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-foreground">{lead.company}</h4>
                            <p className="text-sm text-muted-foreground">{lead.contact}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-success">{lead.value}</p>
                            <p className="text-sm text-muted-foreground">Score: {lead.score}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-enterprise-blue text-enterprise-blue">
                          {lead.source}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activities
                  </h3>
                  <div className="space-y-3">
                    {mockCampaignDetails.activities.map((activity, index) => (
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
                {/* Key Metrics */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Financial Metrics
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded">
                      <p className="text-sm text-muted-foreground">Total Spend</p>
                      <p className="font-semibold text-foreground">{mockCampaignDetails.metrics.totalSpend}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <p className="text-sm text-muted-foreground">Cost per Lead</p>
                      <p className="font-semibold text-foreground">{mockCampaignDetails.metrics.costPerLead}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <p className="text-sm text-muted-foreground">Cost per Qualified Lead</p>
                      <p className="font-semibold text-foreground">{mockCampaignDetails.metrics.costPerQualifiedLead}</p>
                    </div>
                    <div className="p-3 bg-success/10 rounded">
                      <p className="text-sm text-muted-foreground">Expected Revenue</p>
                      <p className="font-semibold text-success">{mockCampaignDetails.metrics.expectedRevenue}</p>
                    </div>
                    <div className="p-3 bg-success/10 rounded">
                      <p className="text-sm text-muted-foreground">Projected ROI</p>
                      <p className="font-semibold text-success">{mockCampaignDetails.metrics.roi}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Campaign Progress */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Campaign Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Overall Performance</span>
                        <span className="text-sm font-medium">{mockCampaignDetails.performance}%</span>
                      </div>
                      <Progress value={mockCampaignDetails.performance} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Lead Qualification</span>
                        <span className="text-sm font-medium">{Math.round((mockCampaignDetails.qualified / mockCampaignDetails.leads) * 100)}%</span>
                      </div>
                      <Progress value={(mockCampaignDetails.qualified / mockCampaignDetails.leads) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Budget Utilization</span>
                        <span className="text-sm font-medium">76%</span>
                      </div>
                      <Progress value={76} className="h-2" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Quick Actions */}
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Optimize Campaign
                  </Button>
                  <Button variant="outline" className="w-full border-enterprise-blue text-enterprise-blue">
                    <Users className="w-4 h-4 mr-2" />
                    View All Leads
                  </Button>
                  <Button variant="outline" className="w-full border-enterprise-blue text-enterprise-blue">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Review
                  </Button>
                  <Button variant="outline" className="w-full border-warning text-warning">
                    Pause Campaign
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