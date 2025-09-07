import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  User,
  Building,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Brain,
  TrendingUp,
  FileText,
  MessageSquare,
  Clock,
  CheckCircle,
  Star,
  Target,
  DollarSign
} from "lucide-react";

interface MarketingLeadDetailsProps {
  lead: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MarketingLeadDetails({ lead, open, onOpenChange }: MarketingLeadDetailsProps) {
  const [notes, setNotes] = useState("");
  const [showAddNote, setShowAddNote] = useState(false);
  const { toast } = useToast();

  if (!lead) return null;

  const leadActivities = [
    {
      type: "ai_qualification",
      description: "AI completed initial qualification call",
      timestamp: "2024-01-15 10:30 AM",
      result: "Qualified - High Intent",
      score: 8.7
    },
    {
      type: "form_submission",
      description: "Submitted power backup inquiry form",
      timestamp: "2024-01-14 03:45 PM",
      details: "Interested in 500kW backup solution"
    },
    {
      type: "website_visit",
      description: "Visited product pages",
      timestamp: "2024-01-14 03:30 PM",
      pages: ["Industrial Generators", "Pricing", "Case Studies"]
    },
    {
      type: "email_open",
      description: "Opened welcome email",
      timestamp: "2024-01-14 04:00 PM",
      engagement: "High"
    }
  ];

  const requirements = {
    powerCapacity: "500-750 kW",
    application: "Manufacturing Backup",
    timeline: "Q2 2024",
    budget: "₹45-60 Lakhs",
    decisionMaker: "Yes",
    currentSolution: "Diesel Generator (20 years old)"
  };

  const aiInsights = [
    "High purchase intent based on urgency indicators",
    "Budget confirmed during qualification call", 
    "Decision maker engaged in conversation",
    "Existing solution is aging and unreliable",
    "Company showing growth trajectory",
    "Similar profile to recent successful conversions"
  ];

  const handleAddNote = () => {
    if (notes.trim()) {
      toast({
        title: "Note Added",
        description: "Your note has been added to the lead record.",
      });
      setNotes("");
      setShowAddNote(false);
    }
  };

  const handlePassToSales = () => {
    toast({
      title: "Lead Passed to Sales",
      description: `${lead.company} has been passed to the sales team with full context.`,
    });
    onOpenChange(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "ai_qualification":
        return Brain;
      case "form_submission":
        return FileText;
      case "website_visit":
        return TrendingUp;
      case "email_open":
        return Mail;
      default:
        return Clock;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-enterprise-gray-light max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Lead Details - {lead.company}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Lead Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card className="border-enterprise-gray-light">
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Person</p>
                      <p className="font-medium">{lead.contact}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="font-medium">{lead.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{lead.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">suresh.agarwal@rajasthantextiles.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="border-enterprise-gray-light">
              <CardHeader>
                <CardTitle className="text-lg">Requirements & Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Power Capacity</p>
                    <p className="font-medium">{requirements.powerCapacity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Application</p>
                    <p className="font-medium">{requirements.application}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Timeline</p>
                    <p className="font-medium">{requirements.timeline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Budget Range</p>
                    <p className="font-medium text-success">{requirements.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Decision Maker</p>
                    <Badge className="bg-success text-success-foreground">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {requirements.decisionMaker}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Solution</p>
                    <p className="font-medium">{requirements.currentSolution}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Timeline */}
            <Card className="border-enterprise-gray-light">
              <CardHeader>
                <CardTitle className="text-lg">Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadActivities.map((activity, index) => {
                    const ActivityIcon = getActivityIcon(activity.type);
                    
                    return (
                      <div key={index} className="flex gap-4 p-3 rounded-lg border border-enterprise-gray-light">
                        <div className="p-2 rounded-full bg-enterprise-blue/10">
                          <ActivityIcon className="w-4 h-4 text-enterprise-blue" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-sm">{activity.description}</p>
                            <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                          </div>
                          {activity.result && (
                            <Badge className="bg-success text-success-foreground mb-2">
                              {activity.result} (Score: {activity.score})
                            </Badge>
                          )}
                          {activity.details && (
                            <p className="text-sm text-muted-foreground">{activity.details}</p>
                          )}
                          {activity.pages && (
                            <div className="text-sm text-muted-foreground">
                              Pages: {activity.pages.join(", ")}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Insights & Actions */}
          <div className="space-y-6">
            {/* Lead Score */}
            <Card className="border-enterprise-gray-light">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">{lead.aiScore}</div>
                  <Progress value={(lead.aiScore / 10) * 100} className="mb-3" />
                  <Badge className="bg-success text-success-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    High Quality Lead
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="border-enterprise-gray-light">
              <CardHeader>
                <CardTitle className="text-lg">AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-enterprise-gray-light">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handlePassToSales}
                  className="w-full bg-gradient-primary hover:opacity-90"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Pass to Sales Team
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowAddNote(true)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Note
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Call
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </CardContent>
            </Card>

            {/* Add Note Dialog */}
            <Dialog open={showAddNote} onOpenChange={setShowAddNote}>
              <DialogContent className="bg-card border-enterprise-gray-light">
                <DialogHeader>
                  <DialogTitle>Add Note</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Add your notes about this lead..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleAddNote} className="flex-1">
                      Save Note
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddNote(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}