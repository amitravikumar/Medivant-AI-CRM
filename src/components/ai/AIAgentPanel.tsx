import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Mail, 
  Phone, 
  CheckCircle, 
  Clock, 
  Edit, 
  Send,
  Eye,
  Bot,
  TrendingUp
} from "lucide-react";

interface AIActivity {
  id: string;
  type: 'email' | 'call' | 'follow-up' | 'scoring';
  leadId: string;
  leadName: string;
  action: string;
  status: 'pending' | 'completed' | 'needs_approval';
  timestamp: string;
  content?: string;
  aiScore?: number;
}

export function AIAgentPanel() {
  const [selectedActivity, setSelectedActivity] = useState<AIActivity | null>(null);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const { toast } = useToast();

  const aiActivities: AIActivity[] = [
    {
      id: "AI-001",
      type: "email",
      leadId: "LD-001",
      leadName: "Mumbai Industries",
      action: "Follow-up email drafted",
      status: "needs_approval",
      timestamp: "2 minutes ago",
      content: "Dear Mr. Patel,\n\nI hope this email finds you well. Following up on our conversation about your generator requirements...",
      aiScore: 8.7
    },
    {
      id: "AI-002", 
      type: "call",
      leadId: "LD-003",
      leadName: "Delhi Manufacturing",
      action: "Scheduled follow-up call",
      status: "completed",
      timestamp: "1 hour ago",
      aiScore: 9.2
    },
    {
      id: "AI-003",
      type: "scoring",
      leadId: "LD-005",
      leadName: "Gujarat Power",
      action: "Lead score updated",
      status: "completed", 
      timestamp: "3 hours ago",
      aiScore: 7.8
    },
    {
      id: "AI-004",
      type: "follow-up",
      leadId: "LD-002",
      leadName: "Rajasthan Textiles",
      action: "Follow-up reminder set",
      status: "pending",
      timestamp: "5 hours ago",
      aiScore: 8.1
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'call': return Phone;
      case 'follow-up': return Clock;
      case 'scoring': return TrendingUp;
      default: return Brain;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'needs_approval': return 'bg-enterprise-blue text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleApprove = (activityId: string) => {
    toast({
      title: "AI Action Approved",
      description: "The AI-generated content has been approved and sent.",
    });
    setShowApprovalDialog(false);
    setSelectedActivity(null);
  };

  const handleEdit = (activity: AIActivity) => {
    setSelectedActivity(activity);
    setEditedContent(activity.content || "");
    setShowApprovalDialog(true);
  };

  const handleSendEdited = () => {
    toast({
      title: "Content Updated & Sent",
      description: "Your edited content has been sent successfully.",
    });
    setShowApprovalDialog(false);
    setSelectedActivity(null);
  };

  return (
    <div className="space-y-6">
      {/* AI Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-enterprise-gray-light shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active AI Agents</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
              <Bot className="w-8 h-8 text-enterprise-blue" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-enterprise-gray-light shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Actions Today</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <Brain className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-enterprise-gray-light shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approval Rate</p>
                <p className="text-2xl font-bold text-foreground">87%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-enterprise-gray-light shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Efficiency Gain</p>
                <p className="text-2xl font-bold text-foreground">340%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Activities */}
      <Card className="border-enterprise-gray-light shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Recent AI Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiActivities.map((activity) => {
              const TypeIcon = getTypeIcon(activity.type);
              return (
                <div key={activity.id} className="p-4 rounded-lg border border-enterprise-gray-light hover:shadow-card transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <TypeIcon className="w-5 h-5 text-enterprise-blue" />
                      <div>
                        <p className="font-medium text-foreground">{activity.leadName}</p>
                        <p className="text-sm text-muted-foreground">{activity.leadId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {activity.aiScore && (
                        <div className="flex items-center gap-1">
                          <Brain className="w-4 h-4 text-enterprise-blue-light" />
                          <span className="text-sm font-semibold text-success">{activity.aiScore}</span>
                        </div>
                      )}
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      {activity.content && (
                        <Button variant="outline" size="sm" onClick={() => setSelectedActivity(activity)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      )}
                      {activity.status === 'needs_approval' && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(activity)}>
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" onClick={() => handleApprove(activity.id)}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Content Preview Dialog */}
      <Dialog open={!!selectedActivity && !showApprovalDialog} onOpenChange={() => setSelectedActivity(null)}>
        <DialogContent className="bg-card border-enterprise-gray-light max-w-2xl">
          <DialogHeader>
            <DialogTitle>AI Generated Content - {selectedActivity?.leadName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{selectedActivity?.content}</pre>
            </div>
            {selectedActivity?.status === 'needs_approval' && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleEdit(selectedActivity)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Content
                </Button>
                <Button onClick={() => handleApprove(selectedActivity.id)}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve & Send
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Content Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="bg-card border-enterprise-gray-light max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit AI Content - {selectedActivity?.leadName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={8}
              className="resize-none"
            />
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendEdited}>
                <Send className="w-4 h-4 mr-2" />
                Send Updated Content
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}