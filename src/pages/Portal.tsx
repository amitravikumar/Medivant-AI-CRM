import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoleCard } from "@/components/ui/role-card";
import { LoginForm } from "@/components/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Wrench, 
  UserCheck, 
  Package, 
  TrendingUp, 
  Megaphone, 
  Brain, 
  BarChart3,
  Building,
  Scale,
  ChartLine,
  Settings,
  Zap,
  Shield,
  Globe
} from "lucide-react";
// Logo removed as per user request - updated
import corporateOffice from "@/assets/corporate-office.jpg";
import industrialTech from "@/assets/industrial-tech.jpg";

interface Role {
  id: string;
  title: string;
  description: string;
  icon: typeof Users;
  category: string;
}

const roleCategories = {
  sales: [
    {
      id: "sales-agent",
      title: "Sales Agent",
      description: "Manage leads with AI-enhanced scoring and track opportunities",
      icon: TrendingUp
    },
    {
      id: "sales-manager", 
      title: "Sales Manager",
      description: "Oversee sales team performance and analyze conversion metrics",
      icon: BarChart3
    }
  ],
  marketing: [
    {
      id: "marketing",
      title: "Marketing Team",
      description: "AI-driven lead capture and campaign management",
      icon: Megaphone
    }
  ],
  service: [
    {
      id: "customer",
      title: "Customer Portal",
      description: "Access your service requests, warranties, and parts store",
      icon: Users
    },
    {
      id: "dealer",
      title: "Dealer Portal",
      description: "Submit service tickets and manage service operations",
      icon: Wrench
    },
    {
      id: "mechanic",
      title: "Mechanic Portal", 
      description: "Access assigned tickets and update service status",
      icon: UserCheck
    }
  ]
};

export default function Portal() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleDemoLogin = (roleId: string) => {
    navigate(`/dashboard/${roleId}`);
  };

  const handleLogin = (credentials: { email: string; password: string }) => {
    // Demo login - in production this would validate against backend
    if (credentials.email && credentials.password) {
      navigate(`/dashboard/${selectedRole}`);
    }
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  if (selectedRole) {
    const allRoles = Object.values(roleCategories).flat();
    const role = allRoles.find(r => r.id === selectedRole);
    return (
      <LoginForm 
        role={role?.title || selectedRole}
        onBack={handleBack}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${corporateOffice})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <div className="border-b border-white/20 bg-black/20 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src="/lovable-uploads/9923946c-04e9-4be7-b9a4-5c6428c4dbfa.png" 
                    alt="medivant Logo" 
                    className="w-8 h-8"
                  />
                  <div className="text-3xl font-bold text-white">Medivant AI CRM</div>
                </div>
                <Badge className="bg-white/20 text-white border-white/30">
                  Enterprise Portal Access
                </Badge>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex items-center">
            <div className="container mx-auto px-6 py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Side - Content */}
                <div className="text-white space-y-8">
                  <div className="space-y-6">
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                      Enterprise
                      <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Portal Access
                      </span>
                    </h1>
                    <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                      Advanced AI-powered platform for comprehensive business operations, 
                      service management, and industrial solutions across all organizational levels.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">AI-Powered</h3>
                        <p className="text-sm text-white/70">Intelligent automation</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Secure Access</h3>
                        <p className="text-sm text-white/70">Enterprise security</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Multi-Location</h3>
                        <p className="text-sm text-white/70">Global operations</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Real-time Analytics</h3>
                        <p className="text-sm text-white/70">Live insights</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Portal Selection */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      Choose Your Access Portal
                    </h2>
                    <p className="text-muted-foreground">
                      Select your role to access specialized tools and dashboards
                    </p>
                  </div>

                  <Tabs defaultValue="sales" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="sales" className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Sales
                      </TabsTrigger>
                      <TabsTrigger value="marketing" className="flex items-center gap-2">
                        <Megaphone className="w-4 h-4" />
                        Marketing
                      </TabsTrigger>
                      <TabsTrigger value="service" className="flex items-center gap-2">
                        <Wrench className="w-4 h-4" />
                        Service
                      </TabsTrigger>
                    </TabsList>

                    {Object.entries(roleCategories).map(([category, roles]) => (
                      <TabsContent key={category} value={category}>
                        <div className="space-y-3">
                          {roles.map((role) => (
                            <Card key={role.id} className="hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary/20">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                      <role.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                      <h3 className="font-semibold text-foreground">{role.title}</h3>
                                      <p className="text-sm text-muted-foreground">{role.description}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button 
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleRoleSelect(role.id)}
                                    >
                                      Login
                                    </Button>
                                    <Button 
                                      size="sm"
                                      onClick={() => handleDemoLogin(role.id)}
                                    >
                                      Demo
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Section with Industrial Background */}
      <div className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${industrialTech})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Trusted by Industry Leaders</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join thousands of businesses leveraging our AI-powered enterprise platform 
              for operational excellence and sustainable growth.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-white/80">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100K+</div>
                <div className="text-white/80">Units Deployed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-white/80">Service Centers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">99.5%</div>
                <div className="text-white/80">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8">
        <div className="container mx-auto px-6 text-center">
         <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="/lovable-uploads/9923946c-04e9-4be7-b9a4-5c6428c4dbfa.png" 
              alt="medivant Logo" 
              className="w-6 h-6"
            />
            <div className="text-lg font-bold">Medivant AI CRM</div>
          </div>
          <p className="text-white/70 mb-2">
            Leading industrial solutions provider with AI-powered enterprise platforms
          </p>
          <p className="text-sm text-white/50">
            © 2024 doodleblue innovations. All rights reserved. | Enterprise Portal Access
          </p>
        </div>
      </footer>
    </div>
  );
}