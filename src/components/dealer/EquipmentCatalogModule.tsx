import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Building, 
  Package, 
  FileText, 
  Search,
  Plus,
  Edit,
  Eye,
  Download,
  Settings,
  Calendar,
  MapPin,
  Wrench,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export function EquipmentCatalogModule() {
  const [activeTab, setActiveTab] = useState("equipment");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const equipment = [
    { id: "EQ-001", name: "Excavator GE-450", model: "GE-450", serialNumber: "GE450001", location: "Mumbai Site", status: "active", lastMaintenance: "2024-01-10" },
    { id: "EQ-002", name: "Loader GL-300", model: "GL-300", serialNumber: "GL300002", location: "Delhi Hub", status: "maintenance", lastMaintenance: "2024-01-05" },
    { id: "EQ-003", name: "Generator GG-200", model: "GG-200", serialNumber: "GG200003", location: "Chennai Center", status: "active", lastMaintenance: "2024-01-08" },
    { id: "EQ-004", name: "Compactor GC-150", model: "GC-150", serialNumber: "GC150004", location: "Bangalore Office", status: "retired", lastMaintenance: "2023-12-15" }
  ];

  const catalogItems = [
    { id: "CAT-001", partNumber: "GT-45001", name: "Engine Oil Filter", category: "Filters", price: 450, stock: 150, supplier: "Greaves Parts" },
    { id: "CAT-002", partNumber: "GT-45002", name: "Air Filter Assembly", category: "Filters", price: 680, stock: 89, supplier: "Greaves Parts" },
    { id: "CAT-003", partNumber: "GT-45003", name: "Hydraulic Pump", category: "Hydraulics", price: 15000, stock: 12, supplier: "Premium Components" },
    { id: "CAT-004", partNumber: "GT-45004", name: "Engine Gasket Set", category: "Engine Parts", price: 1200, stock: 45, supplier: "OEM Supplier" }
  ];

  const contracts = [
    { id: "CON-001", type: "Service Agreement", customer: "Mumbai Industries", startDate: "2024-01-01", endDate: "2024-12-31", value: 250000, status: "active" },
    { id: "CON-002", type: "Parts Supply Contract", customer: "Delhi Infrastructure", startDate: "2023-06-01", endDate: "2024-05-31", value: 180000, status: "active" },
    { id: "CON-003", type: "Maintenance Contract", customer: "Chennai Motors", startDate: "2024-02-01", endDate: "2025-01-31", value: 320000, status: "pending" },
    { id: "CON-004", type: "Equipment Lease", customer: "Bangalore Roads", startDate: "2023-01-01", endDate: "2023-12-31", value: 420000, status: "expired" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-white';
      case 'maintenance': return 'bg-yellow-500 text-white';
      case 'retired': return 'bg-gray-500 text-white';
      case 'pending': return 'bg-orange-500 text-white';
      case 'expired': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleAction = (action: string, item: any) => {
    toast({
      title: `${action} Action`,
      description: `${action} performed on ${item.id || item.name}`,
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Equipment & Catalog Management</h2>
        <p className="text-muted-foreground">Manage equipment, parts catalog, and contracts</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="equipment" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Equipment
          </TabsTrigger>
          <TabsTrigger value="catalog" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Parts Catalog
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Contracts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="equipment" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search equipment..." 
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Equipment
              </Button>
            </div>

            <div className="grid gap-4">
              {equipment.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{item.name}</h4>
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Model</p>
                            <p className="font-medium">{item.model}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Serial Number</p>
                            <p className="font-medium">{item.serialNumber}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Location</p>
                            <p className="font-medium">{item.location}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Last Maintenance</p>
                            <p className="font-medium">{item.lastMaintenance}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleAction('View Details', item)}>
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction('Schedule Maintenance', item)}>
                        <Wrench className="w-4 h-4 mr-1" />
                        Maintenance
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction('Edit', item)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="catalog" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search parts..." 
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleAction('Export Catalog', {})}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Part
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {catalogItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{item.name}</h4>
                          <Badge variant="outline">{item.category}</Badge>
                          <Badge className={item.stock > 50 ? 'bg-green-500 text-white' : item.stock > 20 ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}>
                            Stock: {item.stock}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Part Number</p>
                            <p className="font-medium">{item.partNumber}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Price</p>
                            <p className="font-medium">₹{item.price.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Supplier</p>
                            <p className="font-medium">{item.supplier}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Category</p>
                            <p className="font-medium">{item.category}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleAction('View Specifications', item)}>
                        <Eye className="w-4 h-4 mr-1" />
                        Specs
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction('Order Part', item)}>
                        <Package className="w-4 h-4 mr-1" />
                        Order
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction('Edit Part', item)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search contracts..." 
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Contract
              </Button>
            </div>

            <div className="grid gap-4">
              {contracts.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{item.type}</h4>
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Customer</p>
                            <p className="font-medium">{item.customer}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Start Date</p>
                            <p className="font-medium">{item.startDate}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">End Date</p>
                            <p className="font-medium">{item.endDate}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Value</p>
                            <p className="font-medium">₹{item.value.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleAction('View Contract', item)}>
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction('Download PDF', item)}>
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction('Renew Contract', item)}>
                        <Calendar className="w-4 h-4 mr-1" />
                        Renew
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}