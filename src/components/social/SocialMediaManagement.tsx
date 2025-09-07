import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar,
  Send,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  TrendingUp,
  Users,
  BarChart3,
  Edit,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export function SocialMediaManagement() {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [newPost, setNewPost] = useState("");
  const { toast } = useToast();

  const socialPlatforms = [
    {
      name: "LinkedIn",
      followers: "12.5K",
      engagement: "4.8%",
      posts: 23,
      reach: "45.2K",
      color: "bg-blue-500"
    },
    {
      name: "Twitter",
      followers: "8.9K",
      engagement: "3.2%",
      posts: 45,
      reach: "28.7K",
      color: "bg-sky-400"
    },
    {
      name: "Facebook",
      followers: "15.2K",
      engagement: "5.1%",
      posts: 18,
      reach: "52.3K",
      color: "bg-blue-600"
    },
    {
      name: "Instagram",
      followers: "9.8K",
      engagement: "6.7%",
      posts: 31,
      reach: "38.9K",
      color: "bg-pink-500"
    }
  ];

  const recentPosts = [
    {
      id: 1,
      platform: "LinkedIn",
      content: "🚀 Revolutionizing industrial power with AI-driven solutions. Our latest generators are 30% more efficient...",
      scheduledFor: "2024-01-15 10:00 AM",
      status: "published",
      engagement: { likes: 156, comments: 23, shares: 12 },
      reach: 4250
    },
    {
      id: 2,
      platform: "Twitter",
      content: "Did you know? Our AI-powered generators can predict maintenance needs 2 weeks in advance, reducing downtime by 40%! #AITech #Industry40",
      scheduledFor: "2024-01-15 02:30 PM",
      status: "scheduled",
      engagement: { likes: 89, comments: 15, shares: 8 },
      reach: 2100
    },
    {
      id: 3,
      platform: "Facebook",
      content: "Customer Spotlight: How Rajasthan Textiles reduced their power costs by 25% with our smart generator solutions...",
      scheduledFor: "2024-01-14 06:00 PM",
      status: "published",
      engagement: { likes: 203, comments: 34, shares: 19 },
      reach: 5890
    },
    {
      id: 4,
      platform: "Instagram",
      content: "Behind the scenes at our manufacturing facility where innovation meets reliability 🏭⚡ #Manufacturing #PowerSolutions",
      scheduledFor: "2024-01-16 11:00 AM",
      status: "draft",
      engagement: { likes: 0, comments: 0, shares: 0 },
      reach: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-success text-success-foreground';
      case 'scheduled':
        return 'bg-enterprise-blue text-white';
      case 'draft':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return CheckCircle;
      case 'scheduled':
        return Clock;
      case 'draft':
        return Edit;
      default:
        return AlertCircle;
    }
  };

  const handleSchedulePost = () => {
    toast({
      title: "Post Scheduled",
      description: "Your social media post has been scheduled successfully.",
    });
    setShowScheduleDialog(false);
    setNewPost("");
  };

  const handlePublishNow = (postId: number) => {
    toast({
      title: "Post Published",
      description: `Post ${postId} has been published across selected platforms.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Social Media Management</h2>
        <Button 
          onClick={() => setShowScheduleDialog(true)}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Send className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Platform Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {socialPlatforms.map((platform, index) => (
          <Card key={index} className="border-enterprise-gray-light shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{platform.name}</h3>
                <div className={`w-3 h-3 rounded-full ${platform.color}`} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Followers</span>
                  <span className="font-medium">{platform.followers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Engagement</span>
                  <span className="font-medium text-success">{platform.engagement}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Posts</span>
                  <span className="font-medium">{platform.posts}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reach</span>
                  <span className="font-medium text-enterprise-blue">{platform.reach}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Posts */}
      <Card className="border-enterprise-gray-light shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Recent Posts & Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.map((post) => {
              const StatusIcon = getStatusIcon(post.status);
              
              return (
                <div key={post.id} className="p-4 rounded-lg border border-enterprise-gray-light hover:shadow-card transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(post.status)}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {post.status}
                      </Badge>
                      <span className="text-sm font-medium text-enterprise-blue">{post.platform}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{post.scheduledFor}</div>
                  </div>
                  
                  <p className="text-sm text-foreground mb-3 line-clamp-2">{post.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {post.engagement.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.engagement.comments}
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="w-4 h-4" />
                        {post.engagement.shares}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.reach.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedPost(post)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                      {post.status !== 'published' && (
                        <Button 
                          size="sm" 
                          onClick={() => handlePublishNow(post.id)}
                          className="bg-gradient-primary hover:opacity-90"
                        >
                          <Send className="w-4 h-4 mr-1" />
                          Publish Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Post Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="bg-card border-enterprise-gray-light max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Post Content</label>
              <Textarea
                placeholder="What's happening in the world of industrial power?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Schedule Date</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Schedule Time</label>
                <Input type="time" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Platforms</label>
              <div className="flex gap-2 flex-wrap">
                {socialPlatforms.map((platform) => (
                  <Badge key={platform.name} variant="outline" className="cursor-pointer hover:bg-enterprise-blue hover:text-white">
                    {platform.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleSchedulePost}
                className="flex-1 bg-gradient-primary hover:opacity-90"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Post
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handlePublishNow(0)}
                className="flex-1"
              >
                <Send className="w-4 h-4 mr-2" />
                Publish Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Post Details Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="bg-card border-enterprise-gray-light max-w-2xl">
          <DialogHeader>
            <DialogTitle>Post Analytics - {selectedPost?.platform}</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">{selectedPost.content}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-enterprise-gray-light rounded-lg">
                  <h4 className="font-medium mb-2">Engagement</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Likes:</span>
                      <span className="font-medium">{selectedPost.engagement.likes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Comments:</span>
                      <span className="font-medium">{selectedPost.engagement.comments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shares:</span>
                      <span className="font-medium">{selectedPost.engagement.shares}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-enterprise-gray-light rounded-lg">
                  <h4 className="font-medium mb-2">Performance</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Reach:</span>
                      <span className="font-medium">{selectedPost.reach.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className={getStatusColor(selectedPost.status)}>
                        {selectedPost.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}