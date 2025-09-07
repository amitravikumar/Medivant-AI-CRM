import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield,
  Upload,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Download,
  Plus,
  Camera
} from "lucide-react";

interface WarrantyClaim {
  id: string;
  claimNumber: string;
  equipmentModel: string;
  serialNumber: string;
  issueDescription: string;
  claimType: string;
  status: 'submitted' | 'under-review' | 'approved' | 'rejected' | 'resolved';
  submittedDate: string;
  lastUpdate: string;
  estimatedResolution: string;
  attachments: string[];
  notes?: string;
}

interface WarrantyClaimsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WarrantyClaims({ isOpen, onClose }: WarrantyClaimsProps) {
  const [activeTab, setActiveTab] = useState("new-claim");
  const [selectedClaim, setSelectedClaim] = useState<WarrantyClaim | null>(null);
  const [showClaimDetails, setShowClaimDetails] = useState(false);
  const { toast } = useToast();

  // Form state for new claim
  const [formData, setFormData] = useState({
    equipmentModel: '',
    serialNumber: '',
    purchaseDate: '',
    issueDescription: '',
    claimType: '',
    customerName: '',
    contactEmail: '',
    contactPhone: '',
    dealerName: '',
    urgency: 'medium'
  });

  const [attachments, setAttachments] = useState<File[]>([]);

  const mockClaims: WarrantyClaim[] = [
    {
      id: "WC001",
      claimNumber: "WC-2024-001",
      equipmentModel: "GX-1000",
      serialNumber: "GX1000-2024-001234",
      issueDescription: "Engine overheating after 200 hours of operation",
      claimType: "Engine Defect",
      status: "under-review",
      submittedDate: "2024-01-15",
      lastUpdate: "2024-01-18",
      estimatedResolution: "2024-01-25",
      attachments: ["engine_photos.jpg", "error_log.pdf"],
      notes: "Technician scheduled for on-site inspection"
    },
    {
      id: "WC002",
      claimNumber: "WC-2024-002",
      equipmentModel: "GX-750",
      serialNumber: "GX750-2024-005678",
      issueDescription: "Control panel display malfunction",
      claimType: "Electronics Defect",
      status: "approved",
      submittedDate: "2024-01-10",
      lastUpdate: "2024-01-17",
      estimatedResolution: "2024-01-20",
      attachments: ["panel_video.mp4", "warranty_card.pdf"],
      notes: "Replacement part approved and shipped"
    },
    {
      id: "WC003",
      claimNumber: "WC-2024-003",
      equipmentModel: "GX-500",
      serialNumber: "GX500-2023-009876",
      issueDescription: "Fuel pump failure within warranty period",
      claimType: "Component Failure",
      status: "resolved",
      submittedDate: "2024-01-05",
      lastUpdate: "2024-01-16",
      estimatedResolution: "2024-01-15",
      attachments: ["fuel_pump_photos.jpg", "invoice.pdf"],
      notes: "Fuel pump replaced successfully. Case closed."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'resolved':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <FileText className="w-4 h-4" />;
      case 'under-review':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <AlertTriangle className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setAttachments(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitClaim = () => {
    // Validation
    if (!formData.equipmentModel || !formData.serialNumber || !formData.issueDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newClaimNumber = `WC-2024-${(mockClaims.length + 1).toString().padStart(3, '0')}`;
    
    toast({
      title: "Warranty Claim Submitted",
      description: `Your claim ${newClaimNumber} has been submitted successfully. You will receive updates via email.`,
    });

    // Reset form
    setFormData({
      equipmentModel: '',
      serialNumber: '',
      purchaseDate: '',
      issueDescription: '',
      claimType: '',
      customerName: '',
      contactEmail: '',
      contactPhone: '',
      dealerName: '',
      urgency: 'medium'
    });
    setAttachments([]);
    setActiveTab("existing-claims");
  };

  const viewClaimDetails = (claim: WarrantyClaim) => {
    setSelectedClaim(claim);
    setShowClaimDetails(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Warranty Claims Management
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="new-claim">Submit New Claim</TabsTrigger>
            <TabsTrigger value="existing-claims">My Claims</TabsTrigger>
            <TabsTrigger value="warranty-info">Warranty Information</TabsTrigger>
          </TabsList>

          <TabsContent value="new-claim" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit Warranty Claim</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="equipmentModel">Equipment Model *</Label>
                    <Select value={formData.equipmentModel} onValueChange={(value) => handleInputChange('equipmentModel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select equipment model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GX-500">GX-500</SelectItem>
                        <SelectItem value="GX-750">GX-750</SelectItem>
                        <SelectItem value="GX-1000">GX-1000</SelectItem>
                        <SelectItem value="GX-1500">GX-1500</SelectItem>
                        <SelectItem value="GX-2000">GX-2000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="serialNumber">Serial Number *</Label>
                    <Input
                      id="serialNumber"
                      value={formData.serialNumber}
                      onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                      placeholder="Enter equipment serial number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="purchaseDate">Purchase Date</Label>
                    <Input
                      id="purchaseDate"
                      type="date"
                      value={formData.purchaseDate}
                      onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="claimType">Claim Type</Label>
                    <Select value={formData.claimType} onValueChange={(value) => handleInputChange('claimType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select claim type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engine Defect">Engine Defect</SelectItem>
                        <SelectItem value="Electronics Defect">Electronics Defect</SelectItem>
                        <SelectItem value="Component Failure">Component Failure</SelectItem>
                        <SelectItem value="Performance Issue">Performance Issue</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      placeholder="Enter customer name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      placeholder="Enter contact email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      placeholder="Enter contact phone"
                    />
                  </div>

                  <div>
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="issueDescription">Issue Description *</Label>
                  <Textarea
                    id="issueDescription"
                    value={formData.issueDescription}
                    onChange={(e) => handleInputChange('issueDescription', e.target.value)}
                    placeholder="Describe the issue in detail..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Attachments</Label>
                  <div className="space-y-2">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png,.pdf,.mp4,.mov"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          Images, videos, PDFs (max 10MB each)
                        </p>
                      </label>
                    </div>
                    
                    {attachments.length > 0 && (
                      <div className="space-y-2">
                        {attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">{file.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAttachment(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button onClick={handleSubmitClaim} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Warranty Claim
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="existing-claims" className="space-y-4">
            <div className="grid gap-4">
              {mockClaims.map((claim) => (
                <Card key={claim.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{claim.claimNumber}</h3>
                        <p className="text-sm text-muted-foreground">
                          {claim.equipmentModel} • {claim.serialNumber}
                        </p>
                      </div>
                      <Badge className={getStatusColor(claim.status)}>
                        {getStatusIcon(claim.status)}
                        <span className="ml-1 capitalize">{claim.status.replace('-', ' ')}</span>
                      </Badge>
                    </div>
                    
                    <p className="text-sm mb-3 line-clamp-2">{claim.issueDescription}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground mb-4">
                      <div>
                        <span className="font-medium">Submitted:</span>
                        <br />
                        {new Date(claim.submittedDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Last Update:</span>
                        <br />
                        {new Date(claim.lastUpdate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span>
                        <br />
                        {claim.claimType}
                      </div>
                      <div>
                        <span className="font-medium">Est. Resolution:</span>
                        <br />
                        {new Date(claim.estimatedResolution).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {claim.attachments.map((attachment, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            {attachment}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewClaimDetails(claim)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="warranty-info" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Warranty Coverage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Engine:</span>
                    <span className="font-medium">2 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Alternator:</span>
                    <span className="font-medium">2 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Control Panel:</span>
                    <span className="font-medium">1 year</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Parts & Labor:</span>
                    <span className="font-medium">1 year</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Claim Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center mt-0.5">1</div>
                    <div>
                      <p className="font-medium">Submit Claim</p>
                      <p className="text-muted-foreground">Fill out the claim form with detailed information</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center mt-0.5">2</div>
                    <div>
                      <p className="font-medium">Technical Review</p>
                      <p className="text-muted-foreground">Our team reviews your claim and may request additional information</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center mt-0.5">3</div>
                    <div>
                      <p className="font-medium">Approval & Resolution</p>
                      <p className="text-muted-foreground">Approved claims are processed and resolved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">For All Claims:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Original purchase invoice</li>
                      <li>• Equipment serial number</li>
                      <li>• Photos of the defect/issue</li>
                      <li>• Detailed problem description</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Additional (if applicable):</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Service maintenance records</li>
                      <li>• Error logs or diagnostic reports</li>
                      <li>• Video documentation</li>
                      <li>• Third-party inspection reports</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Claim Details Modal */}
        <Dialog open={showClaimDetails} onOpenChange={setShowClaimDetails}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Claim Details - {selectedClaim?.claimNumber}</DialogTitle>
            </DialogHeader>
            {selectedClaim && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Equipment:</span>
                    <p>{selectedClaim.equipmentModel}</p>
                  </div>
                  <div>
                    <span className="font-medium">Serial Number:</span>
                    <p>{selectedClaim.serialNumber}</p>
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>
                    <Badge className={getStatusColor(selectedClaim.status)}>
                      {selectedClaim.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Claim Type:</span>
                    <p>{selectedClaim.claimType}</p>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-sm">Issue Description:</span>
                  <p className="text-sm mt-1">{selectedClaim.issueDescription}</p>
                </div>
                
                {selectedClaim.notes && (
                  <div>
                    <span className="font-medium text-sm">Latest Notes:</span>
                    <p className="text-sm mt-1 text-muted-foreground">{selectedClaim.notes}</p>
                  </div>
                )}
                
                <div>
                  <span className="font-medium text-sm">Attachments:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedClaim.attachments.map((attachment, index) => (
                      <Button key={index} variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        {attachment}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}