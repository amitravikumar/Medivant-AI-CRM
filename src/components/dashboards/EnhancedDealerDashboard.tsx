import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { DealerModules } from "@/components/dealer/DealerModules";
import { ShipmentsModule } from "@/components/dealer/ShipmentsModule";
import { BillingReportsModule } from "@/components/dealer/BillingReportsModule";
import { EquipmentCatalogModule } from "@/components/dealer/EquipmentCatalogModule";
import { AdminModule } from "@/components/dealer/AdminModule";
import { CorporateLayout } from "@/components/ui/corporate-layout";
import { AgenticAISystem } from "@/components/ai/AgenticAISystem";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingCart,
  MapPin,
  FileText,
  Package,
  TrendingUp,
  Users,
  Wrench,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  Bot,
  Zap,
  ChevronDown,
  Building,
  Calendar
} from "lucide-react";

export function EnhancedDealerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const { toast } = useToast();

  const dealerStats = [
    { title: "SE To Be Attended SR(s)", value: "0", icon: AlertTriangle, color: "bg-teal-500" },
    { title: "To Be Approved SO(s)", value: "27", icon: CheckCircle, color: "bg-teal-500" },
    { title: "Claims To Be Approved", value: "0", icon: FileText, color: "bg-teal-500" },
    { title: "AMC Due List", value: "124", icon: Calendar, color: "bg-teal-500" }
  ];

  const orderValues = [
    { label: "Year-to-Month Target Value", value: "₹ 0", status: "neutral" },
    { label: "Year-to-Month Order Booked Value", value: "₹ 158805.27", status: "positive" },
    { label: "Year-to-Date Dispatch Value", value: "₹ 0", status: "neutral" },
    { label: "Order Backlog Value", value: "₹ 0", status: "neutral" },
    { label: "Net Outstanding Value", value: "₹ -511.26", status: "negative" }
  ];

  const sidebarItems = [
    { title: "Orders", icon: ShoppingCart, hasSubmenu: true, key: "orders" },
    { title: "Billing", icon: FileText, hasSubmenu: true, key: "billing" },
    { title: "Shipments", icon: Package, hasSubmenu: true, key: "shipments" },
    { title: "Catalog", icon: FileText, hasSubmenu: false, key: "catalog" },
    { title: "Service Request", icon: Wrench, hasSubmenu: false, key: "service-request" },
    { title: "Service Order", icon: CheckCircle, hasSubmenu: false, key: "service-order" },
    { title: "Claims", icon: AlertTriangle, hasSubmenu: false, key: "claims" },
    { title: "Equipment", icon: Building, hasSubmenu: false, key: "equipment" },
    { title: "Contracts", icon: FileText, hasSubmenu: false, key: "contracts" },
    { title: "Reports", icon: TrendingUp, hasSubmenu: false, key: "reports" },
    { title: "Greaves Care", icon: Users, hasSubmenu: false, key: "greaves-care" },
    { title: "Options", icon: Users, hasSubmenu: false, key: "options" }
  ];

  const downloads = [
    { title: "Product Scheme", icon: Download, type: "product" },
    { title: "Parts Catalogue", icon: Download, type: "parts" },
    { title: "Technical Publications", icon: Download, type: "technical" },
    { title: "Service Circulars", icon: Download, type: "service" }
  ];

  const handleAIAutomate = async (action: string) => {
    setAiProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "AI Action Completed",
      description: `AI agent has successfully automated: ${action}`,
    });
    
    setAiProcessing(false);
    setShowAIDialog(false);
  };

  const quickActions = [
    { 
      title: "Quick Order", 
      icon: ShoppingCart, 
      action: "Create optimized bulk orders based on historical data and current inventory levels"
    },
    { 
      title: "Track Order", 
      icon: MapPin, 
      action: "Real-time tracking with predictive delivery updates and automatic customer notifications"
    },
    { 
      title: "Auto Service Requests", 
      icon: Wrench, 
      action: "Generate service requests based on equipment health monitoring and usage patterns"
    },
    { 
      title: "Smart Claims Processing", 
      icon: FileText, 
      action: "Automated claim validation, documentation, and approval workflow"
    }
  ];

  return (
    <CorporateLayout variant="dealer">
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-white flex flex-col">
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm">Hello,</p>
              <p className="font-medium">HEMANT SINGH</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              <div 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                onClick={() => {
                  toast({
                    title: `${item.title} Selected`,
                    description: `Opening ${item.title} module with full functionality`,
                  });
                  
                  // Navigate to specific modules based on menu selection
                  if (item.key === "orders" || item.key === "service-request" || item.key === "claims") {
                    setActiveTab("modules");
                  } else if (item.key === "billing" || item.key === "reports") {
                    setActiveTab("billing-reports");
                  } else if (item.key === "shipments") {
                    setActiveTab("shipments");
                  } else if (item.key === "equipment" || item.key === "contracts" || item.key === "catalog") {
                    setActiveTab("equipment-catalog");
                  } else if (item.key === "greaves-care" || item.key === "options") {
                    setActiveTab("admin");
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.title}</span>
                </div>
                {item.hasSubmenu && <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/20">
          <Button 
            variant="ghost" 
            className="w-full text-white hover:bg-white/10 justify-start"
            onClick={() => setActiveTab("ai-system")}
          >
            <Bot className="w-4 h-4 mr-3" />
            AI Assistant
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Dealer Portal</h1>
              <p className="text-muted-foreground">Comprehensive dealer management system</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={activeTab === "modules" ? "default" : "outline"}
                onClick={() => setActiveTab("modules")}
              >
                Service & Orders
              </Button>
              <Button 
                variant={activeTab === "shipments" ? "default" : "outline"}
                onClick={() => setActiveTab("shipments")}
              >
                Shipments
              </Button>
              <Button 
                variant={activeTab === "billing-reports" ? "default" : "outline"}
                onClick={() => setActiveTab("billing-reports")}
              >
                Billing & Reports
              </Button>
              <Button 
                variant={activeTab === "equipment-catalog" ? "default" : "outline"}
                onClick={() => setActiveTab("equipment-catalog")}
              >
                Equipment & Catalog
              </Button>
              <Button 
                variant={activeTab === "admin" ? "default" : "outline"}
                onClick={() => setActiveTab("admin")}
              >
                Admin
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "dashboard" && (
          <div className="p-6 space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-primary text-white rounded-lg flex items-center justify-center">
                        <action.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{action.title}</h3>
                        <p className="text-xs text-muted-foreground mt-2">{action.action}</p>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          if (action.title.includes("Order")) setActiveTab("modules");
                          else if (action.title.includes("Service")) setActiveTab("modules");
                          else if (action.title.includes("Claims")) setActiveTab("modules");
                          else handleAIAutomate(action.title);
                        }}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        {action.title.includes("AI") ? "AI Automate" : "Open Module"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dealerStats.map((stat, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{stat.title}</p>
                            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                          </div>
                          <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                            <stat.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs"
                            onClick={() => {
                              setActiveTab("modules");
                              toast({
                                title: "Opening Module",
                                description: `Accessing ${stat.title} details`,
                              });
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Values Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Values</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                       {orderValues.map((item, index) => (
                         <div key={index}>
                           <div className="flex justify-between items-center py-2">
                             <span className="text-sm text-muted-foreground">{item.label}</span>
                             <div className="flex items-center gap-2">
                               <span className={`font-medium ${
                                 item.status === 'positive' ? 'text-green-600' :
                                 item.status === 'negative' ? 'text-red-600' : 'text-foreground'
                               }`}>
                                 {item.value}
                               </span>
                               <Button 
                                 size="sm" 
                                 variant="ghost" 
                                 className="text-xs h-6 px-2"
                                 onClick={() => {
                                   const moduleType = item.label.includes('Target') || item.label.includes('Order') ? 'modules' :
                                                    item.label.includes('Dispatch') ? 'shipments' :
                                                    item.label.includes('Outstanding') ? 'billing-reports' : 'modules';
                                   setActiveTab(moduleType);
                                   toast({
                                     title: "Order Details",
                                     description: `Viewing detailed ${item.label.toLowerCase()} information`,
                                   });
                                 }}
                               >
                                 Details
                               </Button>
                             </div>
                           </div>
                           {index < orderValues.length - 1 && <Separator />}
                         </div>
                       ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Downloads Section */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Downloads
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {downloads.map((download, index) => (
                        <Button 
                          key={index}
                          variant="ghost" 
                          className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10"
                          onClick={() => {
                            toast({
                              title: "Download Started",
                              description: `${download.title} is being downloaded`,
                            });
                          }}
                        >
                          <download.icon className="w-4 h-4 mr-2" />
                          {download.title}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Insights */}
                <Card className="border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-primary" />
                      AI Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                           onClick={() => setActiveTab("ai-system")}>
                        <p className="text-sm font-medium text-blue-900">Equipment Alert</p>
                        <p className="text-xs text-blue-700">3 units require preventive maintenance</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                           onClick={() => setActiveTab("ai-system")}>
                        <p className="text-sm font-medium text-green-900">Order Opportunity</p>
                        <p className="text-xs text-green-700">Optimal time to reorder 5 parts</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
                           onClick={() => setActiveTab("ai-system")}>
                        <p className="text-sm font-medium text-orange-900">Service Efficiency</p>
                        <p className="text-xs text-orange-700">Response time improved by 23%</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={() => setActiveTab("ai-system")}
                    >
                      View AI System
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === "modules" && <DealerModules />}
        {activeTab === "shipments" && <ShipmentsModule />}
        {activeTab === "billing-reports" && <BillingReportsModule />}
        {activeTab === "equipment-catalog" && <EquipmentCatalogModule />}
        {activeTab === "admin" && <AdminModule />}
        {activeTab === "ai-system" && <AgenticAISystem />}
      </div>

      {/* AI Assistant Dialog */}
      <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-primary" />
              AI Assistant - Automated Actions
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Select an action for AI to automate based on your current workflow and data patterns.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Auto-generate service requests for equipment due for maintenance",
                "Process pending warranty claims with document verification", 
                "Create optimized parts orders based on usage analytics",
                "Schedule technician assignments for urgent service requests",
                "Generate customer notifications for service completion",
                "Update inventory levels and trigger reorder alerts"
              ].map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 text-left"
                  onClick={() => handleAIAutomate(action)}
                  disabled={aiProcessing}
                >
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">{action}</span>
                  </div>
                </Button>
              ))}
            </div>
            {aiProcessing && (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3 text-sm text-muted-foreground">AI is processing your request...</span>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </CorporateLayout>
  );
}