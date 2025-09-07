import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { 
  CalendarIcon, 
  Wrench, 
  AlertTriangle, 
  Clock, 
  MapPin,
  Phone,
  Mail,
  User,
  Package,
  FileText
} from "lucide-react";

interface ServiceTicketFormProps {
  userRole: 'customer' | 'dealer' | 'mechanic' | 'retailer';
  onSubmit: (ticket: any) => void;
  onCancel: () => void;
}

export function ServiceTicketForm({ userRole, onSubmit, onCancel }: ServiceTicketFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    category: "",
    equipment: "",
    location: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    preferredDate: undefined as Date | undefined,
    parts: [] as string[],
    warrantyClaimId: "",
    photos: [] as File[]
  });

  const priorityOptions = [
    { value: "critical", label: "Critical", color: "bg-destructive" },
    { value: "high", label: "High", color: "bg-warning" },
    { value: "medium", label: "Medium", color: "bg-enterprise-blue" },
    { value: "low", label: "Low", color: "bg-success" }
  ];

  const categoryOptions = [
    "Engine Issues",
    "Fuel System",
    "Electrical Problem",
    "Cooling System",
    "Control Panel",
    "Oil & Filters",
    "Preventive Maintenance",
    "Emergency Repair",
    "Warranty Service",
    "Parts Replacement"
  ];

  const equipmentOptions = [
    "DG Set 100 KVA",
    "DG Set 250 KVA", 
    "DG Set 500 KVA",
    "DG Set 750 KVA",
    "DG Set 1000 KVA",
    "DG Set 1500 KVA",
    "Control Panel",
    "Transfer Switch",
    "Fuel Tank",
    "Radiator"
  ];

  const partsOptions = [
    "Engine Oil Filter",
    "Fuel Filter",
    "Air Filter",
    "Spark Plugs",
    "Coolant",
    "Battery",
    "Alternator",
    "Starter Motor",
    "Fuel Pump",
    "Thermostat",
    "Radiator",
    "Control Module"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticket = {
      ...formData,
      id: `TKT-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      status: "Submitted",
      createdAt: new Date(),
      submittedBy: userRole
    };
    onSubmit(ticket);
  };

  const togglePart = (part: string) => {
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.includes(part) 
        ? prev.parts.filter(p => p !== part)
        : [...prev.parts, part]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-enterprise">
        <Card className="border-0">
          <CardHeader className="bg-gradient-primary text-white">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Wrench className="w-6 h-6" />
              Raise Service Ticket
              <Badge variant="outline" className="ml-auto border-white text-white">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Ticket Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Brief description of the issue"
                    required
                    className="border-enterprise-gray-light focus:border-enterprise-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Priority Level *
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                    required
                  >
                    <SelectTrigger className="border-enterprise-gray-light focus:border-enterprise-blue bg-background">
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-enterprise-gray-light shadow-enterprise z-50">
                      {priorityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="hover:bg-muted">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Equipment & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="equipment" className="text-sm font-medium flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Equipment Type *
                  </Label>
                  <Select
                    value={formData.equipment}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, equipment: value }))}
                    required
                  >
                    <SelectTrigger className="border-enterprise-gray-light focus:border-enterprise-blue bg-background">
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-enterprise-gray-light shadow-enterprise z-50">
                      {equipmentOptions.map((equipment) => (
                        <SelectItem key={equipment} value={equipment} className="hover:bg-muted">
                          {equipment}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium flex items-center gap-2">
                    <Wrench className="w-4 h-4" />
                    Service Category *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    required
                  >
                    <SelectTrigger className="border-enterprise-gray-light focus:border-enterprise-blue bg-background">
                      <SelectValue placeholder="Select service category" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-enterprise-gray-light shadow-enterprise z-50">
                      {categoryOptions.map((category) => (
                        <SelectItem key={category} value={category} className="hover:bg-muted">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Detailed Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide detailed description of the issue, symptoms, and any troubleshooting already performed"
                  rows={4}
                  required
                  className="border-enterprise-gray-light focus:border-enterprise-blue"
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson" className="text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Contact Person *
                  </Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                    placeholder="Primary contact name"
                    required
                    className="border-enterprise-gray-light focus:border-enterprise-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-sm font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                    placeholder="+91 9876543210"
                    required
                    className="border-enterprise-gray-light focus:border-enterprise-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="contact@company.com"
                    className="border-enterprise-gray-light focus:border-enterprise-blue"
                  />
                </div>
              </div>

              {/* Location & Preferred Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Service Location *
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Complete address with city, state"
                    required
                    className="border-enterprise-gray-light focus:border-enterprise-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Preferred Service Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-enterprise-gray-light",
                          !formData.preferredDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.preferredDate ? format(formData.preferredDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-background border border-enterprise-gray-light shadow-enterprise z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.preferredDate}
                        onSelect={(date) => setFormData(prev => ({ ...prev, preferredDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>


              {/* Warranty Claim ID (if applicable) */}
              {(formData.category === "Warranty Service" || userRole === "customer") && (
                <div className="space-y-2">
                  <Label htmlFor="warrantyClaimId" className="text-sm font-medium">
                    Warranty Claim ID (if applicable)
                  </Label>
                  <Input
                    id="warrantyClaimId"
                    value={formData.warrantyClaimId}
                    onChange={(e) => setFormData(prev => ({ ...prev, warrantyClaimId: e.target.value }))}
                    placeholder="WCL-XXXX-XXXX"
                    className="border-enterprise-gray-light focus:border-enterprise-blue"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-enterprise-gray-light">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="border-enterprise-gray text-enterprise-gray hover:bg-enterprise-gray hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-primary hover:opacity-90 px-8"
                >
                  Submit Service Ticket
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}