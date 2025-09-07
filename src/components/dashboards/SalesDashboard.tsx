import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LeadDetails } from "@/components/details/LeadDetails";
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign,
  Phone,
  Mail,
  Calendar,
  Star,
  Brain
} from "lucide-react";

interface SalesDashboardProps {
  userRole: 'sales-agent' | 'sales-manager';
}

export function SalesDashboard({ userRole }: SalesDashboardProps) {
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const getStatsForRole = () => {
    if (userRole === 'sales-agent') {
      return [
        { title: "Active Leads", value: "24", icon: Users, color: "text-enterprise-blue" },
        { title: "This Month Sales", value: "₹8.5L", icon: DollarSign, color: "text-success" },
        { title: "Conversion Rate", value: "24%", icon: Target, color: "text-primary" },
        { title: "AI Score Avg", value: "8.2", icon: Brain, color: "text-enterprise-blue-light" },
      ];
    } else {
      return [
        { title: "Team Leads", value: "156", icon: Users, color: "text-enterprise-blue" },
        { title: "Monthly Revenue", value: "₹45.2L", icon: DollarSign, color: "text-success" },
        { title: "Team Performance", value: "87%", icon: TrendingUp, color: "text-success" },
        { title: "AI Efficiency", value: "92%", icon: Brain, color: "text-enterprise-blue-light" },
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
        lastContact: "2 hours ago"
      },
      { 
        id: "LD-002", 
        company: "Gujarat Power", 
        contact: "Priya Shah", 
        value: "₹8.3L", 
        score: 7.8, 
        source: "Referral",
        status: "Warm",
        lastContact: "1 day ago"
      },
      { 
        id: "LD-003", 
        company: "Delhi Manufacturing", 
        contact: "Amit Kumar", 
        value: "₹15.2L", 
        score: 8.9, 
        source: "Cold Call",
        status: "Hot",
        lastContact: "3 hours ago"
      },
    ];
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

  const stats = getStatsForRole();
  const leads = getLeads();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Dashboard</h1>
          <p className="text-muted-foreground capitalize">{userRole.replace('-', ' ')} Portal</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-enterprise-blue text-enterprise-blue">
            <Brain className="w-4 h-4 mr-2" />
            AI Insights
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            Add Lead
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
                    <p className="text-xs text-muted-foreground">Last contact: {lead.lastContact}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
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