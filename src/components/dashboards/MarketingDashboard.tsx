import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CampaignDetails } from "@/components/details/CampaignDetails";
import { LeadDetails } from "@/components/details/LeadDetails";
import { 
  Megaphone, 
  Users, 
  TrendingUp, 
  Target,
  Brain,
  Phone,
  Mail,
  MessageSquare,
  BarChart3,
  Filter
} from "lucide-react";

export function MarketingDashboard() {
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const stats = [
    { title: "Campaign Leads", value: "847", icon: Users, color: "text-enterprise-blue" },
    { title: "Qualification Rate", value: "68%", icon: Target, color: "text-success" },
    { title: "AI Engagement", value: "234", icon: Brain, color: "text-enterprise-blue-light" },
    { title: "Conversion Rate", value: "32%", icon: TrendingUp, color: "text-success" },
  ];

  const campaigns = [
    {
      id: "CMP-001",
      name: "Mumbai Industrial Zone",
      type: "Digital",
      leads: 156,
      qualified: 68,
      budget: "₹5.2L",
      performance: 87,
      status: "Active"
    },
    {
      id: "CMP-002", 
      name: "Gujarat Manufacturing",
      type: "Referral",
      leads: 89,
      qualified: 45,
      budget: "₹3.8L",
      performance: 92,
      status: "Active"
    },
    {
      id: "CMP-003",
      name: "Delhi Power Solutions",
      type: "Cold Outreach",
      leads: 234,
      qualified: 89,
      budget: "₹7.5L",
      performance: 76,
      status: "Paused"
    },
  ];

  const qualificationQueue = [
    {
      id: "QLF-001",
      company: "Rajasthan Textiles",
      contact: "Suresh Agarwal",
      source: "Website Form",
      score: 8.7,
      status: "AI Qualified",
      responses: "5/7 answered"
    },
    {
      id: "QLF-002",
      company: "Karnataka Steel",
      contact: "Deepa Reddy",
      source: "LinkedIn",
      score: 7.9,
      status: "In Progress",
      responses: "3/7 answered"
    },
    {
      id: "QLF-003",
      company: "Haryana Auto Parts",
      contact: "Vikram Singh",
      source: "Cold Call",
      score: 6.4,
      status: "Pending",
      responses: "1/7 answered"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success text-success-foreground';
      case 'Paused':
        return 'bg-warning text-warning-foreground';
      case 'AI Qualified':
        return 'bg-enterprise-blue text-white';
      case 'In Progress':
        return 'bg-primary text-primary-foreground';
      case 'Pending':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-success";
    if (score >= 6.5) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Marketing Dashboard</h1>
          <p className="text-muted-foreground">AI-Powered Lead Generation & Qualification</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-enterprise-blue text-enterprise-blue">
            <Brain className="w-4 h-4 mr-2" />
            AI Insights
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Megaphone className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
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

      {/* Campaign Performance */}
      <Card className="border-enterprise-gray-light shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Campaign Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign, index) => (
              <div key={index} className="p-4 rounded-lg border border-enterprise-gray-light hover:shadow-card transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                    <span className="font-medium text-sm text-muted-foreground">{campaign.id}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-enterprise-gray-light text-enterprise-gray">
                      {campaign.type}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-enterprise-blue">{campaign.budget}</div>
                    <div className="text-xs text-muted-foreground">Budget</div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-foreground mb-2">{campaign.name}</h4>
                
                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-enterprise-blue">{campaign.leads}</div>
                    <div className="text-xs text-muted-foreground">Leads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-success">{campaign.qualified}</div>
                    <div className="text-xs text-muted-foreground">Qualified</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{campaign.performance}%</div>
                    <div className="text-xs text-muted-foreground">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-warning">{Math.round(campaign.qualified/campaign.leads*100)}%</div>
                    <div className="text-xs text-muted-foreground">Conversion</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Progress value={campaign.performance} className="flex-1 mr-4 h-2" />
                  <Button variant="outline" size="sm" onClick={() => setSelectedCampaign(campaign)}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Qualification Queue */}
      <Card className="border-enterprise-gray-light shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
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
                      <span className={`text-sm font-semibold ${getScoreColor(lead.score)}`}>
                        {lead.score}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">{lead.source}</div>
                    <div className="text-xs text-primary">{lead.responses}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{lead.company}</h4>
                    <p className="text-sm text-muted-foreground">{lead.contact}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                    <Button variant="outline" size="sm" className="border-enterprise-blue text-enterprise-blue">
                      <Brain className="w-4 h-4 mr-1" />
                      AI Engage
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

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <CampaignDetails
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}

      {/* Lead Details Modal */}
      {selectedLead && (
        <LeadDetails
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}