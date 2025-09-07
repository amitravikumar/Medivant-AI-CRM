import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MousePointer, 
  DollarSign,
  Eye,
  Share2,
  Mail,
  Search,
  Smartphone,
  Globe,
  Target,
  CheckCircle
} from "lucide-react";

export function MarketingChannelPerformance() {
  const channelData = [
    {
      channel: "Google Ads",
      icon: Search,
      leads: 156,
      conversions: 23,
      spend: "₹2,45,000",
      cpl: "₹1,571",
      quality: 8.7,
      trend: "up",
      trendValue: "+12%",
      impressions: "45,890",
      clicks: "2,134",
      ctr: "4.65%",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      channel: "LinkedIn",
      icon: Users,
      leads: 89,
      conversions: 18,
      spend: "₹1,78,000",
      cpl: "₹2,000",
      quality: 9.2,
      trend: "up",
      trendValue: "+8%",
      impressions: "28,450",
      clicks: "1,432",
      ctr: "5.04%",
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600"
    },
    {
      channel: "Email Marketing",
      icon: Mail,
      leads: 134,
      conversions: 12,
      spend: "₹45,000",
      cpl: "₹336",
      quality: 6.8,
      trend: "down",
      trendValue: "-3%",
      impressions: "15,670",
      clicks: "987",
      ctr: "6.30%",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      channel: "Website Organic",
      icon: Globe,
      leads: 201,
      conversions: 31,
      spend: "₹0",
      cpl: "₹0",
      quality: 7.9,
      trend: "up",
      trendValue: "+15%",
      impressions: "67,890",
      clicks: "3,456",
      ctr: "5.09%",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      channel: "Social Media",
      icon: Share2,
      leads: 76,
      conversions: 8,
      spend: "₹89,000",
      cpl: "₹1,171",
      quality: 5.4,
      trend: "up",
      trendValue: "+5%",
      impressions: "34,220",
      clicks: "1,876",
      ctr: "5.48%",
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600"
    }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-success" : "text-destructive";
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 8) return "text-success";
    if (quality >= 6) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Marketing Channel Performance</h2>
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </div>

      <div className="space-y-6">
        {channelData.map((channel, index) => {
          const Icon = channel.icon;
          const TrendIcon = getTrendIcon(channel.trend);
          
          return (
            <div key={index} className={`relative overflow-hidden rounded-xl ${channel.bgColor} ${channel.borderColor} border-2 shadow-lg`}>
              {/* Header with Gradient */}
              <div className={`bg-gradient-to-r ${channel.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{channel.channel}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <TrendIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{channel.trendValue}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">Quality Score</div>
                    <div className="text-2xl font-bold">{channel.quality}</div>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="p-6">
                {/* Primary Metrics */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Performance Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-lg bg-white border border-gray-200">
                      <Users className="w-5 h-5 mx-auto mb-2 text-enterprise-blue" />
                      <p className="text-2xl font-bold text-foreground">{channel.leads}</p>
                      <p className="text-sm text-muted-foreground">Total Leads</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white border border-gray-200">
                      <CheckCircle className="w-5 h-5 mx-auto mb-2 text-success" />
                      <p className="text-2xl font-bold text-success">{channel.conversions}</p>
                      <p className="text-sm text-muted-foreground">Conversions</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white border border-gray-200">
                      <DollarSign className="w-5 h-5 mx-auto mb-2 text-warning" />
                      <p className="text-2xl font-bold text-foreground">{channel.spend}</p>
                      <p className="text-sm text-muted-foreground">Total Spend</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white border border-gray-200">
                      <Target className="w-5 h-5 mx-auto mb-2 text-enterprise-blue" />
                      <p className="text-2xl font-bold text-enterprise-blue">{channel.cpl}</p>
                      <p className="text-sm text-muted-foreground">Cost per Lead</p>
                    </div>
                  </div>
                </div>

                {/* Engagement Metrics */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Engagement Metrics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-white border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">Impressions</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">{channel.impressions}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <MousePointer className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">Clicks</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">{channel.clicks}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">CTR</span>
                      </div>
                      <p className="text-xl font-bold text-enterprise-blue">{channel.ctr}</p>
                    </div>
                  </div>
                </div>

                {/* Conversion Funnel */}
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Conversion Funnel</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Conversion Rate</span>
                      <span className="font-semibold">{((channel.conversions / channel.leads) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={(channel.conversions / channel.leads) * 100} 
                        className="h-3"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{channel.leads} Leads</span>
                      <span>{channel.conversions} Conversions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}