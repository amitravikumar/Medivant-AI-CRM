import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";
import { EnhancedServiceDashboard } from "@/components/dashboards/EnhancedServiceDashboard";
import { EnhancedSalesDashboard } from "@/components/dashboards/EnhancedSalesDashboard";
import { EnhancedMarketingDashboard } from "@/components/dashboards/EnhancedMarketingDashboard";
import { EnhancedDealerDashboard } from "@/components/dashboards/EnhancedDealerDashboard";
import { EnhancedMechanicDashboard } from "@/components/dashboards/EnhancedMechanicDashboard";
import { AIAdminDashboard } from "@/components/dashboards/AIAdminDashboard";
import { LeadershipDashboard } from "@/components/dashboards/LeadershipDashboard";

export default function CRMDashboard() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Set user name based on role
    const names: Record<string, string> = {
      customer: "Rajesh Kumar",
      dealer: "Mumbai Service Center",
      mechanic: "Suresh Technician",
      retailer: "Parts Express",
      "sales-agent": "Priya Sales",
      "sales-manager": "Amit Manager",
      marketing: "Digital Team",
      "ai-admin": "System Admin",
      leadership: "Executive Team"
    };
    setUserName(names[role || ""] || "User");
  }, [role]);

  const handleLogout = () => {
    navigate("/");
  };

  const renderDashboard = () => {
    switch (role) {
      case 'customer':
        return <EnhancedServiceDashboard userRole={role as any} />;
      case 'dealer':
        return <EnhancedDealerDashboard />;
      case 'mechanic':
        return <EnhancedMechanicDashboard />;
      case 'sales-agent':
      case 'sales-manager':
        return <EnhancedSalesDashboard userRole={role as any} />;
      case 'marketing':
        return <EnhancedMarketingDashboard />;
      case 'ai-admin':
        return <AIAdminDashboard />;
      case 'leadership':
        return <LeadershipDashboard />;
      default:
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-destructive mb-4">Invalid Role</h1>
              <Button onClick={handleLogout}>Return to Login</Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-enterprise-gray-light bg-card shadow-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Industry AI CRM
            </div>
            <div className="text-sm text-muted-foreground">
              Welcome, {userName}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-enterprise-gray text-enterprise-gray hover:bg-enterprise-gray hover:text-white"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      {renderDashboard()}
    </div>
  );
}