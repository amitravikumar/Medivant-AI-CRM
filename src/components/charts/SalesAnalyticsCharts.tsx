import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Brain,
  Users,
  DollarSign,
  Calendar,
  ArrowUpRight
} from "lucide-react";

export function SalesAnalyticsCharts() {
  // Monthly sales data
  const monthlySalesData = [
    { month: 'Jan', revenue: 35, leads: 120, conversion: 22 },
    { month: 'Feb', revenue: 42, leads: 135, conversion: 25 },
    { month: 'Mar', revenue: 38, leads: 128, conversion: 24 },
    { month: 'Apr', revenue: 45, leads: 150, conversion: 28 },
    { month: 'May', revenue: 52, leads: 165, conversion: 30 },
    { month: 'Jun', revenue: 48, leads: 142, conversion: 27 }
  ];

  // Lead source performance
  const leadSourceData = [
    { name: 'Website', value: 35, leads: 145, conversion: 28, color: '#3b82f6' },
    { name: 'Referrals', value: 25, leads: 98, conversion: 35, color: '#10b981' },
    { name: 'Cold Calls', value: 20, leads: 78, conversion: 18, color: '#f59e0b' },
    { name: 'Social Media', value: 12, leads: 52, conversion: 22, color: '#8b5cf6' },
    { name: 'Events', value: 8, leads: 28, conversion: 45, color: '#ef4444' }
  ];

  // AI Impact data
  const aiImpactData = [
    { metric: 'Lead Scoring', before: 15, after: 28, improvement: '+87%' },
    { metric: 'Response Time', before: 24, after: 8, improvement: '+67%' },
    { metric: 'Conversion Rate', before: 18, after: 28, improvement: '+56%' },
    { metric: 'Follow-up Efficiency', before: 45, after: 78, improvement: '+73%' }
  ];

  // Sales funnel conversion
  const funnelData = [
    { stage: 'Prospects', count: 420, percentage: 100 },
    { stage: 'Qualified', count: 210, percentage: 50 },
    { stage: 'Demo', count: 126, percentage: 30 },
    { stage: 'Proposal', count: 84, percentage: 20 },
    { stage: 'Negotiation', count: 42, percentage: 10 },
    { stage: 'Closed Won', count: 25, percentage: 6 }
  ];

  // Weekly performance trend
  const weeklyTrendData = [
    { week: 'W1', calls: 45, meetings: 12, deals: 3 },
    { week: 'W2', calls: 52, meetings: 15, deals: 4 },
    { week: 'W3', calls: 48, meetings: 18, deals: 5 },
    { week: 'W4', calls: 61, meetings: 22, deals: 7 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Growth</p>
                <p className="text-2xl font-bold text-success">+24.5%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-xs text-success">vs last month</span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pipeline Value</p>
                <p className="text-2xl font-bold text-primary">₹48.2L</p>
                <div className="flex items-center gap-1 mt-1">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-xs text-primary">80% of target</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-enterprise-blue">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Efficiency</p>
                <p className="text-2xl font-bold text-enterprise-blue">92%</p>
                <div className="flex items-center gap-1 mt-1">
                  <Brain className="w-4 h-4 text-enterprise-blue" />
                  <span className="text-xs text-enterprise-blue">+12% this month</span>
                </div>
              </div>
              <Brain className="w-8 h-8 text-enterprise-blue" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Leads</p>
                <p className="text-2xl font-bold text-warning">156</p>
                <div className="flex items-center gap-1 mt-1">
                  <Users className="w-4 h-4 text-warning" />
                  <span className="text-xs text-warning">+18 this week</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Revenue & Conversion Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="1" 
                  stroke="hsl(var(--success))" 
                  fill="hsl(var(--success) / 0.3)"
                  name="Revenue (₹L)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="conversion" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Conversion %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Lead Sources Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {leadSourceData.map((source, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: source.color }}
                    />
                    <span>{source.name}</span>
                  </div>
                  <div className="flex gap-4 text-muted-foreground">
                    <span>{source.leads} leads</span>
                    <span className="text-success">{source.conversion}% conv</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Impact Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Impact Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiImpactData.map((item, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{item.metric}</span>
                    <Badge variant="outline" className="text-success border-success">
                      {item.improvement}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Before: {item.before}%</span>
                    <ArrowUpRight className="w-4 h-4 text-success" />
                    <span>After: {item.after}%</span>
                  </div>
                  <Progress value={item.after} className="mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Activity Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Weekly Activity Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calls" fill="hsl(var(--primary))" name="Calls" />
                <Bar dataKey="meetings" fill="hsl(var(--warning))" name="Meetings" />
                <Bar dataKey="deals" fill="hsl(var(--success))" name="Deals Closed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sales Funnel Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Sales Funnel Conversion Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funnelData.map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{stage.stage}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">{stage.count} leads</span>
                    <Badge variant="outline">{stage.percentage}%</Badge>
                  </div>
                </div>
                <Progress value={stage.percentage} className="h-3" />
                {index < funnelData.length - 1 && (
                  <div className="flex justify-center my-2">
                    <TrendingDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}