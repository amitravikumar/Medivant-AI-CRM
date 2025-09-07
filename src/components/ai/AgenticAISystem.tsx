import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  Bot, 
  Brain, 
  Zap, 
  Play, 
  Pause, 
  CheckCircle, 
  AlertCircle,
  Clock,
  TrendingUp,
  Users,
  Wrench,
  ShoppingCart,
  FileText,
  Settings,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Calendar,
  Target,
  BarChart3
} from "lucide-react";

interface AgenticTask {
  id: string;
  type: 'maintenance-scheduling' | 'parts-ordering' | 'claim-processing' | 'customer-communication' | 'inventory-management';
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'awaiting-approval' | 'paused';
  confidence: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedCompletion: string;
  humanApprovalRequired: boolean;
  createdAt: string;
  data?: any;
  recommendation?: string;
}

interface AIAgent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'paused' | 'learning';
  tasksCompleted: number;
  accuracy: number;
  efficiency: number;
  currentTask?: string;
}

export function AgenticAISystem() {
  const [tasks, setTasks] = useState<AgenticTask[]>([]);
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [selectedTask, setSelectedTask] = useState<AgenticTask | null>(null);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [humanFeedback, setHumanFeedback] = useState('');
  const [aiEnabled, setAiEnabled] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize with sample data
    const initialTasks: AgenticTask[] = [
      {
        id: 'task-001',
        type: 'maintenance-scheduling',
        title: 'Schedule Preventive Maintenance',
        description: 'AI detected 3 excavators due for scheduled maintenance based on usage patterns',
        status: 'awaiting-approval',
        confidence: 95,
        priority: 'high',
        estimatedCompletion: '2024-01-16',
        humanApprovalRequired: true,
        createdAt: '2024-01-15 14:30',
        data: {
          equipmentIds: ['EXC-001', 'EXC-005', 'EXC-012'],
          maintenanceType: 'Preventive',
          suggestedDate: '2024-01-18'
        },
        recommendation: 'Schedule maintenance during low-activity period (weekends) to minimize downtime'
      },
      {
        id: 'task-002',
        type: 'parts-ordering',
        title: 'Auto-Order Critical Parts',
        description: 'Inventory analysis suggests ordering hydraulic filters before stock-out',
        status: 'running',
        confidence: 88,
        priority: 'medium',
        estimatedCompletion: '2024-01-15 16:00',
        humanApprovalRequired: false,
        createdAt: '2024-01-15 15:15',
        data: {
          parts: [
            { partNumber: 'HF-001', quantity: 25, supplier: 'Greaves Parts' },
            { partNumber: 'HF-002', quantity: 15, supplier: 'Greaves Parts' }
          ],
          totalValue: 15750
        }
      },
      {
        id: 'task-003',
        type: 'claim-processing',
        title: 'Process Warranty Claims',
        description: 'Automated validation of 2 warranty claims with supporting documentation',
        status: 'awaiting-approval',
        confidence: 92,
        priority: 'medium',
        estimatedCompletion: '2024-01-16',
        humanApprovalRequired: true,
        createdAt: '2024-01-15 13:45',
        data: {
          claimIds: ['CLM-005', 'CLM-006'],
          totalAmount: 32000,
          validationResults: 'All documentation verified, claims eligible for approval'
        }
      },
      {
        id: 'task-004',
        type: 'customer-communication',
        title: 'Send Service Completion Updates',
        description: 'Notify customers about completed service requests with feedback forms',
        status: 'completed',
        confidence: 98,
        priority: 'low',
        estimatedCompletion: '2024-01-15 15:30',
        humanApprovalRequired: false,
        createdAt: '2024-01-15 15:00',
        data: {
          customersNotified: 5,
          completedServices: ['SR-008', 'SR-009', 'SR-010', 'SR-011', 'SR-012']
        }
      }
    ];

    const initialAgents: AIAgent[] = [
      {
        id: 'agent-001',
        name: 'MaintenanceBot',
        type: 'Predictive Maintenance',
        status: 'active',
        tasksCompleted: 156,
        accuracy: 94,
        efficiency: 87,
        currentTask: 'Analyzing equipment sensor data'
      },
      {
        id: 'agent-002',
        name: 'OrderOptimizer',
        type: 'Inventory Management',
        status: 'active',
        tasksCompleted: 89,
        accuracy: 91,
        efficiency: 93,
        currentTask: 'Processing parts order for optimal delivery'
      },
      {
        id: 'agent-003',
        name: 'ClaimValidator',
        type: 'Claims Processing',
        status: 'active',
        tasksCompleted: 67,
        accuracy: 96,
        efficiency: 85,
        currentTask: 'Validating warranty documentation'
      },
      {
        id: 'agent-004',
        name: 'CustomerAssist',
        type: 'Communication',
        status: 'paused',
        tasksCompleted: 234,
        accuracy: 89,
        efficiency: 91,
        currentTask: 'Awaiting approval for bulk notifications'
      }
    ];

    setTasks(initialTasks);
    setAgents(initialAgents);
  }, []);

  useEffect(() => {
    if (!aiEnabled) return;

    const interval = setInterval(() => {
      // Simulate AI creating new tasks
      if (Math.random() > 0.8) {
        const newTask: AgenticTask = {
          id: `task-${Date.now()}`,
          type: ['maintenance-scheduling', 'parts-ordering', 'customer-communication'][Math.floor(Math.random() * 3)] as any,
          title: 'New AI-Generated Task',
          description: 'AI has identified a new optimization opportunity',
          status: Math.random() > 0.7 ? 'awaiting-approval' : 'running',
          confidence: Math.floor(Math.random() * 20) + 80,
          priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
          estimatedCompletion: new Date(Date.now() + Math.random() * 86400000).toLocaleDateString(),
          humanApprovalRequired: Math.random() > 0.6,
          createdAt: new Date().toLocaleString()
        };

        setTasks(prev => [newTask, ...prev.slice(0, 9)]);
      }

      // Update running tasks
      setTasks(prev => prev.map(task => {
        if (task.status === 'running' && Math.random() > 0.7) {
          return { ...task, status: Math.random() > 0.8 ? 'completed' : 'awaiting-approval' };
        }
        return task;
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, [aiEnabled]);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'maintenance-scheduling': return Wrench;
      case 'parts-ordering': return ShoppingCart;
      case 'claim-processing': return FileText;
      case 'customer-communication': return MessageSquare;
      case 'inventory-management': return BarChart3;
      default: return Bot;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-500 text-white';
      case 'running': return 'bg-blue-500 text-white';
      case 'completed': return 'bg-green-500 text-white';
      case 'awaiting-approval': return 'bg-orange-500 text-white';
      case 'paused': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-600 text-white';
      case 'medium': return 'bg-yellow-600 text-white';
      case 'low': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const handleApproveTask = (taskId: string, approved: boolean) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: approved ? 'running' : 'paused' }
        : task
    ));

    toast({
      title: approved ? "Task Approved" : "Task Rejected",
      description: `AI task has been ${approved ? 'approved and will proceed' : 'rejected and paused'}`,
    });

    setShowApprovalDialog(false);
    setSelectedTask(null);
    setHumanFeedback('');
  };

  const toggleAgent = (agentId: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: agent.status === 'active' ? 'paused' : 'active' }
        : agent
    ));
  };

  const pendingApprovals = tasks.filter(task => task.status === 'awaiting-approval').length;
  const activeTasks = tasks.filter(task => task.status === 'running').length;
  const completedToday = tasks.filter(task => task.status === 'completed').length;

  return (
    <div className="p-6 space-y-6">
      {/* AI System Overview */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Agentic AI System</h2>
          <p className="text-muted-foreground">Autonomous AI agents with human oversight</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="ai-enabled" 
              checked={aiEnabled} 
              onCheckedChange={setAiEnabled}
            />
            <Label htmlFor="ai-enabled">AI Automation</Label>
          </div>
          {pendingApprovals > 0 && (
            <Badge className="bg-orange-500 text-white">
              {pendingApprovals} Awaiting Approval
            </Badge>
          )}
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Tasks</p>
                <p className="text-2xl font-bold text-blue-500">{activeTasks}</p>
              </div>
              <Zap className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold text-orange-500">{pendingApprovals}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
                <p className="text-2xl font-bold text-green-500">{completedToday}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Efficiency</p>
                <p className="text-2xl font-bold text-purple-500">89%</p>
              </div>
              <Brain className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Agents Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              AI Agents Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-primary text-white">
                        <Brain className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{agent.name}</h4>
                      <p className="text-sm text-muted-foreground">{agent.type}</p>
                      <p className="text-xs text-muted-foreground">{agent.currentTask}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStatusColor(agent.status)}>{agent.status}</Badge>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleAgent(agent.id)}
                      >
                        {agent.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p>Tasks: {agent.tasksCompleted}</p>
                      <p>Accuracy: {agent.accuracy}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              AI Tasks Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {tasks.slice(0, 6).map((task) => {
                const IconComponent = getTaskIcon(task.type);
                return (
                  <div key={task.id} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-primary" />
                        <h4 className="font-medium text-sm">{task.title}</h4>
                      </div>
                      <div className="flex gap-1">
                        <Badge className={getPriorityColor(task.priority)} variant="outline">
                          {task.priority}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{task.estimatedCompletion}</span>
                        <span>•</span>
                        <span>{task.confidence}% confidence</span>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedTask(task);
                            setShowApprovalDialog(true);
                          }}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        {task.status === 'awaiting-approval' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleApproveTask(task.id, true)}
                            >
                              <ThumbsUp className="w-3 h-3 text-green-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleApproveTask(task.id, false)}
                            >
                              <ThumbsDown className="w-3 h-3 text-red-600" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    {task.status === 'running' && (
                      <Progress value={Math.floor(Math.random() * 100)} className="mt-2 h-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Human-in-the-Loop Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Human-in-the-Loop Review
            </DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Task Type</Label>
                  <p className="text-sm text-muted-foreground capitalize">{selectedTask.type.replace('-', ' ')}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Confidence Level</Label>
                  <p className="text-sm text-muted-foreground">{selectedTask.confidence}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Priority</Label>
                  <Badge className={getPriorityColor(selectedTask.priority)}>{selectedTask.priority}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Estimated Completion</Label>
                  <p className="text-sm text-muted-foreground">{selectedTask.estimatedCompletion}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-muted-foreground">{selectedTask.description}</p>
              </div>

              {selectedTask.recommendation && (
                <div>
                  <Label className="text-sm font-medium">AI Recommendation</Label>
                  <p className="text-sm text-muted-foreground">{selectedTask.recommendation}</p>
                </div>
              )}

              {selectedTask.data && (
                <div>
                  <Label className="text-sm font-medium">Task Data</Label>
                  <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                    {JSON.stringify(selectedTask.data, null, 2)}
                  </pre>
                </div>
              )}

              <div>
                <Label htmlFor="feedback">Human Feedback (Optional)</Label>
                <Textarea 
                  id="feedback"
                  placeholder="Provide feedback or instructions for the AI..."
                  value={humanFeedback}
                  onChange={(e) => setHumanFeedback(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleApproveTask(selectedTask.id, false)}
                >
                  <ThumbsDown className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button 
                  onClick={() => handleApproveTask(selectedTask.id, true)}
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}