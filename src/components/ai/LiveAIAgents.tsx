import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Phone, 
  Mail, 
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Target,
  Calendar,
  BarChart3,
  Pause,
  Play,
  Settings
} from "lucide-react";

interface AIAgent {
  id: string;
  name: string;
  type: 'lead-scoring' | 'email-automation' | 'call-analysis' | 'follow-up' | 'data-enrichment';
  status: 'active' | 'paused' | 'learning';
  performance: number;
  tasksCompleted: number;
  efficiency: number;
  currentTask?: string;
  lastAction?: string;
  timeActive: string;
}

export function LiveAIAgents() {
  const [agents, setAgents] = useState<AIAgent[]>([
    {
      id: 'agent-001',
      name: 'LeadScorer Pro',
      type: 'lead-scoring',
      status: 'active',
      performance: 94,
      tasksCompleted: 1247,
      efficiency: 89,
      currentTask: 'Analyzing 15 new leads from website',
      lastAction: 'Scored lead from Mumbai Industries: 9.2/10',
      timeActive: '12:34:56'
    },
    {
      id: 'agent-002',
      name: 'Email Assistant',
      type: 'email-automation',
      status: 'active',
      performance: 87,
      tasksCompleted: 892,
      efficiency: 92,
      currentTask: 'Drafting follow-up emails for warm leads',
      lastAction: 'Sent personalized email to Gujarat Power',
      timeActive: '11:28:42'
    },
    {
      id: 'agent-003',
      name: 'Call Analyzer',
      type: 'call-analysis',
      status: 'active',
      performance: 91,
      tasksCompleted: 456,
      efficiency: 85,
      currentTask: 'Processing call recording from demo session',
      lastAction: 'Identified 3 buying signals in recent call',
      timeActive: '09:15:23'
    },
    {
      id: 'agent-004',
      name: 'Follow-up Bot',
      type: 'follow-up',
      status: 'learning',
      performance: 76,
      tasksCompleted: 234,
      efficiency: 78,
      currentTask: 'Learning from successful follow-up patterns',
      lastAction: 'Scheduled callback for Delhi Manufacturing',
      timeActive: '02:45:17'
    },
    {
      id: 'agent-005',
      name: 'Data Enricher',
      type: 'data-enrichment',
      status: 'paused',
      performance: 83,
      tasksCompleted: 1089,
      efficiency: 81,
      currentTask: 'Waiting for API rate limit reset',
      lastAction: 'Updated 25 lead profiles with company data',
      timeActive: '00:00:00'
    }
  ]);

  const [liveActivities, setLiveActivities] = useState([
    { time: '14:32:15', agent: 'LeadScorer Pro', action: 'Scored new lead from Chennai Tech: 8.7/10', type: 'success' },
    { time: '14:31:42', agent: 'Email Assistant', action: 'Sent follow-up email to Bangalore Industries', type: 'info' },
    { time: '14:30:58', agent: 'Call Analyzer', action: 'Detected positive sentiment in client call', type: 'success' },
    { time: '14:30:12', agent: 'Follow-up Bot', action: 'Scheduled demo for next Tuesday 3PM', type: 'info' },
    { time: '14:29:35', agent: 'Data Enricher', action: 'Updated lead with latest company revenue data', type: 'info' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live activity updates
      const newActivity = {
        time: new Date().toLocaleTimeString(),
        agent: agents[Math.floor(Math.random() * agents.length)].name,
        action: getRandomAction(),
        type: Math.random() > 0.7 ? 'success' : 'info'
      };
      
      setLiveActivities(prev => [newActivity, ...prev.slice(0, 9)]);
      
      // Update agent performance randomly
      setAgents(prev => prev.map(agent => ({
        ...agent,
        tasksCompleted: agent.status === 'active' ? agent.tasksCompleted + Math.floor(Math.random() * 3) : agent.tasksCompleted
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, [agents]);

  const getRandomAction = () => {
    const actions = [
      'Analyzed new lead from Pune Manufacturing',
      'Sent personalized email template',
      'Detected buying signal in conversation',
      'Updated lead score based on website activity',
      'Scheduled follow-up reminder',
      'Enriched lead data with company insights',
      'Generated call summary with key points',
      'Prioritized hot leads for immediate attention'
    ];
    return actions[Math.floor(Math.random() * actions.length)];
  };

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'lead-scoring': return Brain;
      case 'email-automation': return Mail;
      case 'call-analysis': return Phone;
      case 'follow-up': return Calendar;
      case 'data-enrichment': return BarChart3;
      default: return Brain;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'paused': return 'bg-warning text-warning-foreground';
      case 'learning': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getActivityIcon = (type: string) => {
    return type === 'success' ? CheckCircle : AlertCircle;
  };

  const toggleAgentStatus = (agentId: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: agent.status === 'active' ? 'paused' : 'active' }
        : agent
    ));
  };

  return (
    <div className="space-y-6">
      {/* AI Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Agents</p>
                <p className="text-2xl font-bold text-success">3</p>
                <p className="text-xs text-muted-foreground">2 learning, 1 paused</p>
              </div>
              <Brain className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tasks Today</p>
                <p className="text-2xl font-bold text-primary">1,247</p>
                <p className="text-xs text-success">+18% vs yesterday</p>
              </div>
              <Zap className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-enterprise-blue">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Efficiency</p>
                <p className="text-2xl font-bold text-enterprise-blue">89%</p>
                <p className="text-xs text-success">+5% this week</p>
              </div>
              <TrendingUp className="w-8 h-8 text-enterprise-blue" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Time Saved</p>
                <p className="text-2xl font-bold text-warning">34.5h</p>
                <p className="text-xs text-muted-foreground">this week</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Agents Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Live AI Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agents.map((agent) => {
                const IconComponent = getAgentIcon(agent.type);
                return (
                  <div key={agent.id} className="p-4 rounded-lg border border-muted hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-primary text-white">
                            <IconComponent className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-sm">{agent.name}</h4>
                          <Badge className={getStatusColor(agent.status)} variant="outline">
                            {agent.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleAgentStatus(agent.id)}
                        >
                          {agent.status === 'active' ? 
                            <Pause className="w-4 h-4" /> : 
                            <Play className="w-4 h-4" />
                          }
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Performance</span>
                        <span>{agent.performance}%</span>
                      </div>
                      <Progress value={agent.performance} className="h-2" />
                    </div>

                    <div className="text-xs space-y-1">
                      <p className="text-muted-foreground">
                        <strong>Current:</strong> {agent.currentTask}
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Last Action:</strong> {agent.lastAction}
                      </p>
                      <div className="flex justify-between mt-2">
                        <span className="text-muted-foreground">Tasks: {agent.tasksCompleted}</span>
                        <span className="text-muted-foreground">Uptime: {agent.timeActive}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Live Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Live Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {liveActivities.map((activity, index) => {
                const IconComponent = getActivityIcon(activity.type);
                return (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <IconComponent className={`w-4 h-4 mt-0.5 ${
                      activity.type === 'success' ? 'text-success' : 'text-primary'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-primary">{activity.agent}</span>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                      <p className="text-sm text-foreground">{activity.action}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            AI Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-muted-foreground">LEAD PROCESSING</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Leads Scored Today</span>
                  <span className="font-semibold">147</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Avg Processing Time</span>
                  <span className="font-semibold">2.3s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Accuracy Rate</span>
                  <span className="font-semibold text-success">94.2%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-muted-foreground">COMMUNICATION</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Emails Sent</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Response Rate</span>
                  <span className="font-semibold text-success">67%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Follow-ups Scheduled</span>
                  <span className="font-semibold">34</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-muted-foreground">INSIGHTS</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Opportunities Identified</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Risk Alerts</span>
                  <span className="font-semibold text-warning">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Data Points Enriched</span>
                  <span className="font-semibold">256</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}