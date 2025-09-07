import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Target, DollarSign } from "lucide-react";

interface FunnelStage {
  name: string;
  count: number;
  value: string;
  color: string;
  conversionRate?: number;
}

export function SalesFunnelChart() {
  const funnelData: FunnelStage[] = [
    { name: "Prospects", count: 480, value: "₹240L", color: "bg-enterprise-blue", conversionRate: 100 },
    { name: "Qualified Leads", count: 156, value: "₹156L", color: "bg-primary", conversionRate: 32.5 },
    { name: "Proposals Sent", count: 89, value: "₹134L", color: "bg-warning", conversionRate: 57.1 },
    { name: "Negotiations", count: 34, value: "₹89L", color: "bg-success", conversionRate: 38.2 },
    { name: "Closed Won", count: 18, value: "₹56L", color: "bg-success-dark", conversionRate: 52.9 }
  ];

  return (
    <Card className="border-enterprise-gray-light shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Sales Funnel Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {funnelData.map((stage, index) => (
            <div key={stage.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded ${stage.color}`}></div>
                  <span className="font-medium">{stage.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{stage.count} leads</p>
                  <p className="text-sm text-muted-foreground">{stage.value}</p>
                </div>
              </div>
              <div className="space-y-1">
                <Progress 
                  value={stage.conversionRate} 
                  className="h-3"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Conversion Rate: {stage.conversionRate}%</span>
                  {index > 0 && (
                    <span>From previous: {((stage.count / funnelData[index-1].count) * 100).toFixed(1)}%</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <div className="border-t pt-4 mt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-success">3.8%</p>
                <p className="text-sm text-muted-foreground">Overall Conversion</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-enterprise-blue">28 days</p>
                <p className="text-sm text-muted-foreground">Avg. Sales Cycle</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">₹3.1L</p>
                <p className="text-sm text-muted-foreground">Avg. Deal Size</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}