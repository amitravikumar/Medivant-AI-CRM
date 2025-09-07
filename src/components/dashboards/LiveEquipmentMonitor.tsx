import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RefreshCw, AlertTriangle, Thermometer, Clock, Settings, Zap } from "lucide-react";

interface EquipmentData {
  id: string;
  name: string;
  location: string;
  status: 'Operational' | 'Warning' | 'Critical' | 'Offline';
  healthScore: number;
  temperature: string;
  runtime: string;
  alerts: number;
}

export function LiveEquipmentMonitor() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentData | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
  const equipmentData: EquipmentData[] = [
    {
      id: "1",
      name: "Diesel Generator Set",
      location: "Manufacturing Plant A",
      status: "Operational",
      healthScore: 92,
      temperature: "78°C",
      runtime: "2847h",
      alerts: 0
    },
    {
      id: "2", 
      name: "Water Pump Engine",
      location: "Site B - Irrigation",
      status: "Warning",
      healthScore: 75,
      temperature: "85°C",
      runtime: "4523h",
      alerts: 2
    },
    {
      id: "3",
      name: "Power Tiller Engine", 
      location: "Farm Equipment",
      status: "Critical",
      healthScore: 45,
      temperature: "95°C",
      runtime: "6789h",
      alerts: 2
    },
    {
      id: "4",
      name: "Construction Engine",
      location: "Construction Site C", 
      status: "Operational",
      healthScore: 88,
      temperature: "72°C",
      runtime: "1256h",
      alerts: 0
    },
    {
      id: "5",
      name: "Marine Engine",
      location: "Fishing Vessel",
      status: "Offline",
      healthScore: 0,
      temperature: "0°C",
      runtime: "3421h",
      alerts: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational': return 'bg-green-500';
      case 'Warning': return 'bg-yellow-500';
      case 'Critical': return 'bg-red-500';
      case 'Offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  const handleViewDetails = (equipment: EquipmentData) => {
    setSelectedEquipment(equipment);
    setShowDetailsDialog(true);
  };

  const stats = {
    total: equipmentData.length,
    operational: equipmentData.filter(e => e.status === 'Operational').length,
    needsAttention: equipmentData.filter(e => e.status === 'Warning').length,
    offline: equipmentData.filter(e => e.status === 'Offline').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-primary p-6 rounded-lg text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Live Equipment Health Monitor</h2>
            <p className="text-white/90 mt-1">Real-time IoT monitoring of your Greaves Cotton equipment</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm font-medium"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Equipment</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Operational</div>
            <div className="text-2xl font-bold text-green-600">{stats.operational}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Needs Attention</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.needsAttention}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Offline</div>
            <div className="text-2xl font-bold text-gray-600">{stats.offline}</div>
          </CardContent>
        </Card>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipmentData.map((equipment) => (
          <Card key={equipment.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{equipment.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{equipment.location}</p>
                </div>
                <Badge className={`${getStatusColor(equipment.status)} text-white`}>
                  {equipment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Health Score</span>
                  <span className={`font-bold ${getHealthScoreColor(equipment.healthScore)}`}>
                    {equipment.healthScore}%
                  </span>
                </div>
                <Progress value={equipment.healthScore} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Temperature</div>
                  <div className="font-semibold">{equipment.temperature}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Runtime</div>
                  <div className="font-semibold">{equipment.runtime}</div>
                </div>
              </div>

              {equipment.alerts > 0 && (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">{equipment.alerts} alert(s)</span>
                </div>
              )}

              <Button 
                className="w-full bg-primary text-white hover:bg-primary/90"
                size="sm"
                onClick={() => handleViewDetails(equipment)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SLA Promise */}
      <Card className="bg-gradient-secondary border-enterprise-blue/20">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-enterprise-blue">Our Service Level Agreement (SLA) Promise</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-enterprise-blue mb-1">4 Hours</div>
              <div className="text-sm font-medium text-foreground">Critical Issue Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-enterprise-blue mb-1">24 Hours</div>
              <div className="text-sm font-medium text-foreground">Standard Issue Resolution</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-enterprise-blue mb-1">99.5%</div>
              <div className="text-sm font-medium text-foreground">Equipment Uptime Guarantee</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground text-center">
        Last updated: {lastUpdated.toLocaleString()}
      </div>

      {/* Equipment Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              {selectedEquipment?.name} - Detailed Information
            </DialogTitle>
          </DialogHeader>
          {selectedEquipment && (
            <div className="space-y-6">
              {/* Status Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${getStatusColor(selectedEquipment.status)} text-white`}>
                        {selectedEquipment.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">Current Status</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="w-4 h-4 text-red-500" />
                      <span className="text-lg font-bold">{selectedEquipment.temperature}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Temperature</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-lg font-bold">{selectedEquipment.runtime}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Total Runtime</div>
                  </CardContent>
                </Card>
              </div>

              {/* Health Score Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Health Score Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Overall Health Score</span>
                      <span className={`font-bold text-xl ${getHealthScoreColor(selectedEquipment.healthScore)}`}>
                        {selectedEquipment.healthScore}%
                      </span>
                    </div>
                    <Progress value={selectedEquipment.healthScore} className="h-3" />
                    
                    {/* Component Health Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Engine Performance</div>
                        <Progress value={selectedEquipment.healthScore + 5} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">{selectedEquipment.healthScore + 5}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Cooling System</div>
                        <Progress value={selectedEquipment.healthScore - 10} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">{selectedEquipment.healthScore - 10}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Electrical System</div>
                        <Progress value={selectedEquipment.healthScore + 3} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">{selectedEquipment.healthScore + 3}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Fuel System</div>
                        <Progress value={selectedEquipment.healthScore} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">{selectedEquipment.healthScore}%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location & Maintenance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Location Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-muted-foreground">Location:</span>
                        <div className="font-medium">{selectedEquipment.location}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Equipment ID:</span>
                        <div className="font-medium">{selectedEquipment.id}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Last Service:</span>
                        <div className="font-medium">2 weeks ago</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Active Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedEquipment.alerts > 0 ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-yellow-600">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm">High temperature detected</span>
                        </div>
                        {selectedEquipment.alerts > 1 && (
                          <div className="flex items-center gap-2 text-red-600">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-sm">Maintenance due</span>
                          </div>
                        )}
                        <div className="mt-3">
                          <Button size="sm" variant="outline">
                            <Zap className="w-4 h-4 mr-2" />
                            Create Service Ticket
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-green-600 text-sm">No active alerts</div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  Schedule Maintenance
                </Button>
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}