import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CorporateLayout } from "@/components/ui/corporate-layout";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Calendar,
  Download
} from "lucide-react";

export function LeadershipDashboard() {
  const kpiStats = [
    { title: "Monthly Revenue", value: "₹2.4Cr", change: "+12.5%", icon: DollarSign, color: "text-success" },
    { title: "Active Tickets", value: "142", change: "-8%", icon: Clock, color: "text-enterprise-blue" },
    { title: "SLA Compliance", value: "94%", change: "+3%", icon: CheckCircle, color: "text-success" },
    { title: "Collections", value: "87%", change: "+5%", icon: Target, color: "text-success" },
  ];

  const operationalMetrics = [
    { metric: "Service Response Time", current: "2.4h", target: "2h", progress: 80, status: "warning" },
    { metric: "Parts Inventory Turnover", current: "12.3x", target: "15x", progress: 82, status: "good" },
    { metric: "Customer Satisfaction", current: "4.6/5", target: "4.8/5", progress: 92, status: "good" },
    { metric: "Technician Utilization", current: "78%", target: "85%", progress: 92, status: "good" },
  ];

  const salesMetrics = [
    { region: "Mumbai", revenue: 48.5, growth: 15.2, conversion: 24 },
    { region: "Delhi", revenue: 42.3, growth: 8.7, conversion: 22 },
    { region: "Bangalore", revenue: 38.9, growth: 22.1, conversion: 28 },
    { region: "Chennai", revenue: 35.2, growth: 12.4, conversion: 26 },
  ];

  const receivables = [
    { category: "0-30 days", amount: 15.2, percentage: 45 },
    { category: "31-60 days", amount: 8.7, percentage: 26 },
    { category: "61-90 days", amount: 6.3, percentage: 19 },
    { category: "90+ days", amount: 3.4, percentage: 10 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getChangeColor = (change: string) => {
    return change.startsWith('+') ? 'text-success' : 'text-destructive';
  };

  return (
    <CorporateLayout 
      title="Leadership Dashboard" 
      subtitle="Executive Overview & Strategic Insights"
      variant="leadership"
      headerActions={
        <div className="flex gap-2">
          <Button variant="outline" className="border-enterprise-blue text-enterprise-blue">
            <Calendar className="w-4 h-4 mr-2" />
            Custom Period
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      }
    >

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiStats.map((stat, index) => (
          <Card key={index} className="border-enterprise-gray-light shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-sm font-medium ${getChangeColor(stat.change)}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Operational Metrics */}
        <Card className="border-enterprise-gray-light shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Operational Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {operationalMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{metric.metric}</span>
                    <span className={`text-sm font-semibold ${getStatusColor(metric.status)}`}>
                      {metric.current} / {metric.target}
                    </span>
                  </div>
                  <Progress value={metric.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales Performance by Region */}
        <Card className="border-enterprise-gray-light shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Sales by Region (₹L)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesMetrics.map((region, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{region.region}</span>
                    <span className="text-enterprise-blue font-bold">₹{region.revenue}L</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Growth: </span>
                      <span className="text-success font-medium">+{region.growth}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Conversion: </span>
                      <span className="text-primary font-medium">{region.conversion}%</span>
                    </div>
                  </div>
                  <Progress value={region.revenue * 2} className="h-2 mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <Card className="border-enterprise-gray-light shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Revenue Growth Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-secondary rounded-lg border border-enterprise-blue/20">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-enterprise-blue mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-enterprise-blue mb-2">Revenue Analytics</h3>
                <p className="text-foreground">Interactive charts and trend analysis</p>
                <p className="text-sm text-success mt-2 font-medium">+15.2% QoQ Growth</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collections & Receivables */}
        <Card className="border-enterprise-gray-light shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Receivables Aging
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {receivables.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm font-semibold text-enterprise-blue">₹{item.amount}L</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                  <div className="text-right text-xs text-muted-foreground">
                    {item.percentage}% of total
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-enterprise-gray-light">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Outstanding</span>
                  <span className="font-bold text-enterprise-blue">₹33.6L</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">Collection Rate</span>
                  <span className="text-sm font-semibold text-success">87%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI-Driven Insights */}
      <Card className="border-enterprise-gray-light shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            AI-Driven Business Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <CheckCircle className="w-8 h-8 text-success mb-2" />
              <h4 className="font-semibold text-success mb-1">Growth Opportunity</h4>
              <p className="text-sm text-muted-foreground">
                Bangalore region showing 22% growth. Consider expanding service capacity.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <AlertTriangle className="w-8 h-8 text-warning mb-2" />
              <h4 className="font-semibold text-warning mb-1">Attention Needed</h4>
              <p className="text-sm text-muted-foreground">
                Service response times trending upward. Review technician allocation.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-enterprise-blue/10 border border-enterprise-blue/20">
              <Users className="w-8 h-8 text-enterprise-blue mb-2" />
              <h4 className="font-semibold text-enterprise-blue mb-1">AI Recommendation</h4>
              <p className="text-sm text-muted-foreground">
                Implement predictive maintenance to reduce emergency calls by 15%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </CorporateLayout>
  );
}