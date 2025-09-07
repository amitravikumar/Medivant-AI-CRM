import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Target, TrendingUp, Users, DollarSign, ArrowDown, Eye, Phone, Mail, Edit, FileText, User } from "lucide-react";
import { useState } from "react";

interface FunnelStage {
  name: string;
  count: number;
  value: string;
  color: string;
  conversionRate: number;
  width: number;
  details: Array<{company: string, value: string, status: string}>;
}

export function EnhancedSalesFunnelChart() {
  const [selectedStage, setSelectedStage] = useState<FunnelStage | null>(null);
  const [showProspectDetails, setShowProspectDetails] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<any>(null);
  const [contactMethod, setContactMethod] = useState<'call' | 'email'>('call');
  const [updateNotes, setUpdateNotes] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const { toast } = useToast();
  
  const funnelData: FunnelStage[] = [
    { 
      name: "Prospects", 
      count: 480, 
      value: "₹240L", 
      color: "bg-enterprise-blue", 
      conversionRate: 100,
      width: 100,
      details: [
        { company: "Mumbai Industries", value: "₹12.5L", status: "New" },
        { company: "Gujarat Power", value: "₹8.3L", status: "Contacted" },
        { company: "Delhi Manufacturing", value: "₹15.2L", status: "Interested" }
      ]
    },
    { 
      name: "Qualified Leads", 
      count: 156, 
      value: "₹156L", 
      color: "bg-primary", 
      conversionRate: 32.5,
      width: 80,
      details: [
        { company: "Rajasthan Steel", value: "₹18.7L", status: "Qualified" },
        { company: "Chennai Motors", value: "₹11.4L", status: "Demo Scheduled" },
        { company: "Bangalore Tech", value: "₹9.8L", status: "Needs Analysis" }
      ]
    },
    { 
      name: "Proposals Sent", 
      count: 89, 
      value: "₹134L", 
      color: "bg-warning", 
      conversionRate: 57.1,
      width: 65,
      details: [
        { company: "Hyderabad Industries", value: "₹22.1L", status: "Proposal Sent" },
        { company: "Kolkata Manufacturing", value: "₹14.5L", status: "Under Review" },
        { company: "Pune Auto", value: "₹16.8L", status: "Pricing Discussion" }
      ]
    },
    { 
      name: "Negotiations", 
      count: 34, 
      value: "₹89L", 
      color: "bg-success", 
      conversionRate: 38.2,
      width: 45,
      details: [
        { company: "Kerala Textiles", value: "₹19.3L", status: "Price Negotiation" },
        { company: "Haryana Steel", value: "₹13.7L", status: "Terms Discussion" },
        { company: "Goa Industries", value: "₹11.2L", status: "Final Review" }
      ]
    },
    { 
      name: "Closed Won", 
      count: 18, 
      value: "₹56L", 
      color: "bg-success-dark", 
      conversionRate: 52.9,
      width: 25,
      details: [
        { company: "Tamil Nadu Power", value: "₹25.4L", status: "Won" },
        { company: "Andhra Machines", value: "₹18.9L", status: "Contract Signed" },
        { company: "Odisha Industries", value: "₹11.7L", status: "Implementation" }
      ]
    }
  ];

  const handleViewDetails = (stage: FunnelStage) => {
    setSelectedStage(stage);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Won':
      case 'Contract Signed':
        return 'bg-success text-success-foreground';
      case 'Price Negotiation':
      case 'Terms Discussion':
        return 'bg-warning text-warning-foreground';
      case 'Proposal Sent':
      case 'Under Review':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleViewProspect = (prospect: any) => {
    setSelectedProspect(prospect);
    setShowProspectDetails(true);
  };

  const handleContactProspect = (prospect: any, method: 'call' | 'email') => {
    setSelectedProspect(prospect);
    setContactMethod(method);
    setShowContactDialog(true);
  };

  const handleUpdateProspect = (prospect: any) => {
    setSelectedProspect(prospect);
    setUpdateStatus(prospect.status);
    setUpdateNotes("");
    setShowUpdateDialog(true);
  };

  const handleMakeContact = () => {
    const action = contactMethod === 'call' ? 'Call initiated' : 'Email sent';
    toast({
      title: action,
      description: `${action} to ${selectedProspect?.company}`,
    });
    setShowContactDialog(false);
  };

  const handleSaveUpdate = () => {
    toast({
      title: "Prospect Updated",
      description: `${selectedProspect?.company} has been updated`,
    });
    setShowUpdateDialog(false);
    setUpdateNotes("");
  };

  return (
    <div className="space-y-6">
      <Card className="border-enterprise-gray-light shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Interactive Sales Funnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Visual Funnel */}
            <div className="relative">
              {funnelData.map((stage, index) => (
                <div key={stage.name} className="mb-6 last:mb-0">
                  {/* Funnel Stage */}
                  <div className="flex items-center justify-between mb-2">
                    <div 
                      className={`relative h-16 ${stage.color} flex items-center justify-between px-6 text-white cursor-pointer hover:opacity-90 transition-opacity`}
                      style={{ 
                        width: `${stage.width}%`,
                        clipPath: index === funnelData.length - 1 
                          ? 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)'
                          : 'polygon(0 0, calc(100% - 40px) 0, 100% 50%, calc(100% - 40px) 100%, 0 100%, 20px 50%)'
                      }}
                      onClick={() => handleViewDetails(stage)}
                    >
                      <div>
                        <div className="font-semibold text-lg">{stage.name}</div>
                        <div className="text-sm opacity-90">{stage.count} leads</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{stage.value}</div>
                        <div className="text-sm opacity-90">{stage.conversionRate}%</div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewDetails(stage)}
                      className="ml-4"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                  
                  {/* Conversion Rate Arrow */}
                  {index < funnelData.length - 1 && (
                    <div className="flex items-center justify-center py-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <ArrowDown className="w-4 h-4" />
                        <span className="text-sm">
                          {((funnelData[index + 1].count / stage.count) * 100).toFixed(1)}% conversion
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stage Details */}
            {selectedStage && (
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{selectedStage.name} Details</h3>
                  <Button variant="outline" size="sm" onClick={() => setSelectedStage(null)}>
                    Close
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedStage.details.map((detail, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{detail.company}</h4>
                        <Badge className={getStatusColor(detail.status)}>
                          {detail.status}
                        </Badge>
                      </div>
                      <p className="text-lg font-bold text-success">{detail.value}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" onClick={() => handleViewProspect(detail)}>
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleContactProspect(detail, 'call')}>
                          <Phone className="w-3 h-3 mr-1" />
                          Contact
                        </Button>
                        <Button size="sm" onClick={() => handleUpdateProspect(detail)}>
                          <Edit className="w-3 h-3 mr-1" />
                          Update
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
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

      {/* Prospect Details Dialog */}
      <Dialog open={showProspectDetails} onOpenChange={setShowProspectDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {selectedProspect?.company} Details
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company</label>
                  <p className="font-semibold">{selectedProspect?.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Deal Value</label>
                  <p className="text-lg font-bold text-success">{selectedProspect?.value}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={getStatusColor(selectedProspect?.status)}>
                    {selectedProspect?.status}
                  </Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Contact Person</label>
                  <p className="font-semibold">John Smith</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-sm">john.smith@{selectedProspect?.company?.toLowerCase().replace(' ', '')}.com</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-sm">+91 98765 43210</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Recent Activity</label>
              <div className="mt-2 p-3 bg-muted rounded-lg">
                <p className="text-sm">Last contacted 2 days ago via email. Expressed interest in our enterprise solutions. Follow-up scheduled for this week.</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => {
                setShowProspectDetails(false);
                handleContactProspect(selectedProspect, 'call');
              }}>
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              <Button variant="outline" onClick={() => {
                setShowProspectDetails(false);
                handleContactProspect(selectedProspect, 'email');
              }}>
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" onClick={() => {
                setShowProspectDetails(false);
                handleUpdateProspect(selectedProspect);
              }}>
                <Edit className="w-4 h-4 mr-2" />
                Update Status
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {contactMethod === 'call' ? <Phone className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
              {contactMethod === 'call' ? 'Call' : 'Email'} {selectedProspect?.company}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Company</div>
              <div className="font-medium">{selectedProspect?.company}</div>
              <div className="text-sm text-muted-foreground mt-2">Deal Value</div>
              <div className="font-bold text-success">{selectedProspect?.value}</div>
            </div>
            
            {contactMethod === 'call' ? (
              <div>
                <label className="text-sm font-medium">Call Notes</label>
                <Textarea 
                  placeholder="Add notes about the call..."
                  className="mt-1"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input 
                    defaultValue={`Follow-up: ${selectedProspect?.company}`}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea 
                    placeholder="Compose your email..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button onClick={handleMakeContact} className="flex-1">
                {contactMethod === 'call' ? 'Start Call' : 'Send Email'}
              </Button>
              <Button variant="outline" onClick={() => setShowContactDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Update Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Update {selectedProspect?.company}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Company</div>
              <div className="font-medium">{selectedProspect?.company}</div>
              <div className="text-sm text-muted-foreground mt-2">Current Value</div>
              <div className="font-bold text-success">{selectedProspect?.value}</div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Status</label>
              <select 
                className="w-full mt-1 p-2 border rounded-md"
                value={updateStatus}
                onChange={(e) => setUpdateStatus(e.target.value)}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Interested">Interested</option>
                <option value="Qualified">Qualified</option>
                <option value="Demo Scheduled">Demo Scheduled</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Under Review">Under Review</option>
                <option value="Price Negotiation">Price Negotiation</option>
                <option value="Terms Discussion">Terms Discussion</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Update Notes</label>
              <Textarea 
                placeholder="Add notes about this update..."
                value={updateNotes}
                onChange={(e) => setUpdateNotes(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleSaveUpdate} className="flex-1">
                Save Update
              </Button>
              <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}