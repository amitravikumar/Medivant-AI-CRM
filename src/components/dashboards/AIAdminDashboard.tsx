import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Database, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Settings,
  Eye,
  Users,
  Zap,
  Shield,
  Clock,
  TrendingUp
} from "lucide-react";

export function AIAdminDashboard() {
  const stats = [
    { title: "Active AI Agents", value: "12", icon: Brain, color: "text-enterprise-blue" },
    { title: "Data Sources", value: "8", icon: Database, color: "text-success" },
    { title: "HITL Reviews", value: "23", icon: Users, color: "text-warning" },
    { title: "System Health", value: "98%", icon: Activity, color: "text-success" },
  ];

  const aiAgents = [
    {
      id: "AGT-001",
      name: "Lead Scoring Engine",
      function: "Sales Lead Prioritization",
      status: "Active",
      performance: 94,
      decisions: 1247,
      overrides: 12,
      lastUpdate: "2 min ago"
    },
    {
      id: "AGT-002",
      name: "Service Ticket Classifier",
      function: "Service Request Routing",
      status: "Active", 
      performance: 87,
      decisions: 342,
      overrides: 8,
      lastUpdate: "5 min ago"
    },
    {
      id: "AGT-003",
      name: "Marketing Qualifier",
      function: "Lead Qualification Automation",
      status: "Active",
      performance: 91,
      decisions: 892,
      overrides: 15,
      lastUpdate: "1 min ago"
    },
    {
      id: "AGT-004",
      name: "Warranty Analyzer",
      function: "Claims Processing",
      status: "Training",
      performance: 78,
      decisions: 156,
      overrides: 23,
      lastUpdate: "15 min ago"
    },
  ];

  const dataSources = [
    { name: "CRM Database", status: "Connected", health: 98, lastSync: "2 min ago" },
    { name: "Parts Inventory", status: "Connected", health: 95, lastSync: "5 min ago" },
    { name: "Warranty System", status: "Connected", health: 92, lastSync: "3 min ago" },
    { name: "Marketing Platform", status: "Warning", health: 78, lastSync: "25 min ago" },
    { name: "Service Portal", status: "Connected", health: 96, lastSync: "1 min ago" },
    { name: "Sales Pipeline", status: "Connected", health: 100, lastSync: "30 sec ago" },
  ];

  const hitlCases = [
    {
      id: "HITL-001",
      agent: "Lead Scoring Engine",
      case: "High-value lead scoring anomaly",
      priority: "High",
      timeWaiting: "2h 15m",
      confidence: 0.73
    },
    {
      id: "HITL-002", 
      agent: "Service Ticket Classifier",
      case: "Complex warranty claim classification",
      priority: "Medium",
      timeWaiting: "45m",
      confidence: 0.68
    },
    {
      id: "HITL-003",
      agent: "Marketing Qualifier",
      case: "Unusual lead qualification pattern",
      priority: "Low",
      timeWaiting: "1h 30m",
      confidence: 0.71
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success text-success-foreground';
      case 'Training':
        return 'bg-warning text-warning-foreground';
      case 'Connected':
        return 'bg-success text-success-foreground';
      case 'Warning':
        return 'bg-warning text-warning-foreground';
      case 'Error':
        return 'bg-destructive text-destructive-foreground';
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
        return 'bg-enterprise-blue text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 95) return "text-success";
    if (health >= 85) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Admin Dashboard</h1>
          <p className="text-muted-foreground">Agentic AI System Monitoring & Control</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-enterprise-blue text-enterprise-blue">
            <Settings className="w-4 h-4 mr-2" />
            AI Config
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Shield className="w-4 h-4 mr-2" />
            Security Audit
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

      {/* AI Agents Status */}
      <Card className="border-enterprise-gray-light shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Active AI Agents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiAgents.map((agent, index) => (
              <div key={index} className="p-4 rounded-lg border border-enterprise-gray-light hover:shadow-card transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(agent.status)}>
                      {agent.status}
                    </Badge>
                    <span className="font-medium text-sm text-muted-foreground">{agent.id}</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <span className="text-sm font-semibold text-success">
                        {agent.performance}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Last Update</div>
                    <div className="text-xs text-primary">{agent.lastUpdate}</div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-foreground mb-1">{agent.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{agent.function}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-enterprise-blue">{agent.decisions}</div>
                    <div className="text-xs text-muted-foreground">Decisions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-warning">{agent.overrides}</div>
                    <div className="text-xs text-muted-foreground">Overrides</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-success">{agent.performance}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Progress value={agent.performance} className="flex-1 mr-4 h-2" />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Monitor
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Sources Health */}
        <Card className="border-enterprise-gray-light shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Data Sources Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dataSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(source.status)}>
                      {source.status}
                    </Badge>
                    <span className="font-medium text-sm">{source.name}</span>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${getHealthColor(source.health)}`}>
                      {source.health}%
                    </div>
                    <div className="text-xs text-muted-foreground">{source.lastSync}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Human-in-the-Loop Cases */}
        <Card className="border-enterprise-gray-light shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Pending HITL Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hitlCases.map((case_, index) => (
                <div key={index} className="p-3 rounded-lg border border-enterprise-gray-light hover:shadow-card transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(case_.priority)}>
                        {case_.priority}
                      </Badge>
                      <span className="font-medium text-xs text-muted-foreground">{case_.id}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {case_.timeWaiting}
                    </div>
                  </div>
                  <h5 className="font-medium text-sm text-foreground">{case_.case}</h5>
                  <p className="text-xs text-muted-foreground mb-2">{case_.agent}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs">
                      Confidence: <span className="font-medium">{(case_.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs border-enterprise-blue text-enterprise-blue">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}