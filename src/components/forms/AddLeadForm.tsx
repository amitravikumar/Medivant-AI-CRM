import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { X, Plus, Brain, Phone, Mail, Building, Mic, MicOff, Volume2, Play, Pause } from "lucide-react";

interface AddLeadFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddLeadForm({ isOpen, onClose }: AddLeadFormProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    designation: "",
    industry: "",
    location: "",
    source: "",
    requirements: "",
    estimatedValue: "",
    timeline: "",
    priority: "Medium"
  });
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [speechField, setSpeechField] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const recognition = useRef<any>(null);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const startSpeechRecognition = (field: string) => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    
    if (!SpeechRecognition) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Try Chrome or Edge.",
        variant: "destructive"
      });
      return;
    }

    recognition.current = new SpeechRecognition();
    recognition.current.continuous = false;
    recognition.current.interimResults = false;
    recognition.current.lang = 'en-IN';

    recognition.current.onstart = () => {
      setIsRecording(true);
      setSpeechField(field);
      toast({
        title: "🎤 Listening...",
        description: `Speak now to add content to ${field}`,
      });
    };

    recognition.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      
      const currentValue = formData[field as keyof typeof formData] as string;
      const newValue = currentValue ? `${currentValue} ${transcript}` : transcript;
      
      handleInputChange(field, newValue);
      
      toast({
        title: "✅ Speech Captured",
        description: `Added: "${transcript.substring(0, 50)}${transcript.length > 50 ? '...' : ''}"`,
      });
    };

    recognition.current.onerror = (event: any) => {
      toast({
        title: "Speech Recognition Error",
        description: "Could not recognize speech. Please try again.",
        variant: "destructive"
      });
      setIsRecording(false);
    };

    recognition.current.onend = () => {
      setIsRecording(false);
      setSpeechField("");
    };

    recognition.current.start();
  };

  const stopSpeechRecognition = () => {
    if (recognition.current) {
      recognition.current.stop();
    }
    setIsRecording(false);
  };

  const demonstrateSpeech = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(
        "Try saying: Acme Manufacturing Company, contact person John Smith, email john@acme.com, phone nine one two three four five six seven eight nine zero. They need three 500 KVA diesel generators for their new production facility with immediate timeline."
      );
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    } else {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleAIAnalysis = async () => {
    if (!formData.companyName || !formData.requirements) {
      toast({
        title: "Missing Information",
        description: "Please provide company name and requirements for AI analysis.",
        variant: "destructive"
      });
      return;
    }

    setAiAnalyzing(true);
    
    setTimeout(() => {
      setAiInsights({
        score: 8.4,
        category: "High Potential",
        reasoning: [
          "Company size and industry indicate strong financial capability",
          "Requirements align well with our product offerings",
          "Timeline suggests urgent need - good conversion potential"
        ],
        recommendations: [
          "Schedule demo within 48 hours",
          "Prepare custom pricing proposal",
          "Assign senior sales representative"
        ],
        estimatedDealSize: "₹12-18L",
        conversionProbability: "72%"
      });
      setAiAnalyzing(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLead = {
      ...formData,
      id: `LD-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      aiScore: aiInsights?.score || Math.floor(Math.random() * 3) + 7,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    toast({
      title: "Lead Added Successfully",
      description: `${formData.companyName} has been added to your pipeline with AI score ${aiInsights?.score || 'pending'}.`,
    });

    onClose();
  };

  const speechSupported = !!(window as any).webkitSpeechRecognition || !!(window as any).SpeechRecognition;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="card-enterprise max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg p-6 -m-6 mb-6">
          <DialogTitle className="flex items-center justify-between text-xl">
            <div className="flex items-center gap-2">
              <Plus className="w-6 h-6" />
              Add New Lead
            </div>
            {speechSupported && (
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Mic className="w-3 h-3 mr-1" />
                Voice Enabled
              </Badge>
            )}
          </DialogTitle>
          <p className="text-primary-foreground/80 text-sm">
            Capture lead information quickly using voice input or manual entry
          </p>
        </DialogHeader>

        {speechSupported && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Speech-to-Text Demo
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={demonstrateSpeech}
                className="text-blue-700 border-blue-300 hover:bg-blue-100"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3 mr-1" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 mr-1" />
                    Try Example
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Click the microphone icon next to any field and speak naturally. 
              Works best with clear speech in a quiet environment.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Information */}
            <Card className="card-enterprise">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-primary">
                  <Building className="w-5 h-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="companyName" className="text-sm font-medium">Company Name *</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      required
                      className="flex-1"
                      placeholder="Enter company name"
                    />
                    {speechSupported && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => startSpeechRecognition('companyName')}
                        disabled={isRecording}
                        className={`${isRecording && speechField === 'companyName' ? 'bg-red-50 border-red-300 text-red-600 animate-pulse' : ''}`}
                      >
                        {isRecording && speechField === 'companyName' ? (
                          <MicOff className="w-4 h-4" />
                        ) : (
                          <Mic className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="industry" className="text-sm font-medium">Industry</Label>
                  <Select onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="textiles">Textiles</SelectItem>
                      <SelectItem value="automotive">Automotive</SelectItem>
                      <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                      <SelectItem value="food-processing">Food Processing</SelectItem>
                      <SelectItem value="chemicals">Chemicals</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, State"
                      className="flex-1"
                    />
                    {speechSupported && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => startSpeechRecognition('location')}
                        disabled={isRecording}
                        className={`${isRecording && speechField === 'location' ? 'bg-red-50 border-red-300 text-red-600 animate-pulse' : ''}`}
                      >
                        {isRecording && speechField === 'location' ? (
                          <MicOff className="w-4 h-4" />
                        ) : (
                          <Mic className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="card-enterprise">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-primary">
                  <Phone className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contactPerson" className="text-sm font-medium">Contact Person *</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      required
                      className="flex-1"
                      placeholder="Enter contact person name"
                    />
                    {speechSupported && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => startSpeechRecognition('contactPerson')}
                        disabled={isRecording}
                        className={`${isRecording && speechField === 'contactPerson' ? 'bg-red-50 border-red-300 text-red-600 animate-pulse' : ''}`}
                      >
                        {isRecording && speechField === 'contactPerson' ? (
                          <MicOff className="w-4 h-4" />
                        ) : (
                          <Mic className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="designation" className="text-sm font-medium">Designation</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => handleInputChange('designation', e.target.value)}
                      placeholder="e.g., Plant Manager"
                      className="flex-1"
                    />
                    {speechSupported && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => startSpeechRecognition('designation')}
                        disabled={isRecording}
                        className={`${isRecording && speechField === 'designation' ? 'bg-red-50 border-red-300 text-red-600 animate-pulse' : ''}`}
                      >
                        {isRecording && speechField === 'designation' ? (
                          <MicOff className="w-4 h-4" />
                        ) : (
                          <Mic className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="flex-1"
                      placeholder="email@company.com"
                    />
                    {speechSupported && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => startSpeechRecognition('email')}
                        disabled={isRecording}
                        className={`${isRecording && speechField === 'email' ? 'bg-red-50 border-red-300 text-red-600 animate-pulse' : ''}`}
                      >
                        {isRecording && speechField === 'email' ? (
                          <MicOff className="w-4 h-4" />
                        ) : (
                          <Mic className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="flex-1"
                    />
                    {speechSupported && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => startSpeechRecognition('phone')}
                        disabled={isRecording}
                        className={`${isRecording && speechField === 'phone' ? 'bg-red-50 border-red-300 text-red-600 animate-pulse' : ''}`}
                      >
                        {isRecording && speechField === 'phone' ? (
                          <MicOff className="w-4 h-4" />
                        ) : (
                          <Mic className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lead Details */}
          <Card className="card-enterprise">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Lead Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="source" className="text-sm font-medium">Lead Source</Label>
                  <Select onValueChange={(value) => handleInputChange('source', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="cold-call">Cold Call</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="trade-show">Trade Show</SelectItem>
                      <SelectItem value="advertisement">Advertisement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="estimatedValue" className="text-sm font-medium">Estimated Value</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="estimatedValue"
                      value={formData.estimatedValue}
                      onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                      placeholder="₹ XX Lakhs"
                      className="flex-1"
                    />
                    {speechSupported && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => startSpeechRecognition('estimatedValue')}
                        disabled={isRecording}
                        className={`${isRecording && speechField === 'estimatedValue' ? 'bg-red-50 border-red-300 text-red-600 animate-pulse' : ''}`}
                      >
                        {isRecording && speechField === 'estimatedValue' ? (
                          <MicOff className="w-4 h-4" />
                        ) : (
                          <Mic className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="timeline" className="text-sm font-medium">Expected Timeline</Label>
                  <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (less than 1 month)</SelectItem>
                      <SelectItem value="short">Short term (1-3 months)</SelectItem>
                      <SelectItem value="medium">Medium term (3-6 months)</SelectItem>
                      <SelectItem value="long">Long term (6+ months)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="requirements" className="text-sm font-medium">Requirements Description</Label>
                  {speechSupported && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => startSpeechRecognition('requirements')}
                      disabled={isRecording}
                      className={`${isRecording && speechField === 'requirements' ? 'bg-red-50 border-red-300 text-red-600 animate-pulse' : ''}`}
                    >
                      {isRecording && speechField === 'requirements' ? (
                        <>
                          <MicOff className="w-3 h-3 mr-1" />
                          Recording...
                        </>
                      ) : (
                        <>
                          <Mic className="w-3 h-3 mr-1" />
                          Voice Input
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  rows={4}
                  placeholder="Describe the customer's power requirements, current setup, and specific needs..."
                  className="mt-2 resize-none"
                />
                {isRecording && speechField === 'requirements' && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded flex items-center gap-2 text-sm">
                    <Volume2 className="w-4 h-4 text-red-600 animate-pulse" />
                    <span className="text-red-600">Listening for requirements description...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis Section */}
          <Card className="card-enterprise">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <Brain className="w-5 h-5" />
                AI Lead Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!aiInsights ? (
                <div className="text-center py-6">
                  <Button 
                    type="button"
                    onClick={handleAIAnalysis}
                    disabled={aiAnalyzing}
                    className="btn-enterprise"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    {aiAnalyzing ? 'Analyzing...' : 'Generate AI Insights'}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-success/10 border border-success/20 rounded-lg">
                      <p className="text-2xl font-bold text-success">{aiInsights.score}</p>
                      <p className="text-sm text-muted-foreground">AI Score</p>
                    </div>
                    <div className="text-center p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <p className="text-lg font-semibold">{aiInsights.estimatedDealSize}</p>
                      <p className="text-sm text-muted-foreground">Est. Deal Size</p>
                    </div>
                    <div className="text-center p-4 bg-warning/10 border border-warning/20 rounded-lg">
                      <p className="text-lg font-semibold">{aiInsights.conversionProbability}</p>
                      <p className="text-sm text-muted-foreground">Conversion Prob.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="font-semibold mb-2">AI Reasoning</h4>
                      <ul className="space-y-1 text-sm">
                        {aiInsights.reasoning.map((reason: string, index: number) => (
                          <li key={index} className="text-muted-foreground">• {reason}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Recommendations</h4>
                      <ul className="space-y-1 text-sm">
                        {aiInsights.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="text-muted-foreground">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Section */}
          <div className="flex gap-4 justify-between items-center border-t pt-6">
            {isRecording && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                Listening for {speechField}... Click microphone again to stop
              </div>
            )}
            
            <div className="flex gap-4 ml-auto">
              <Button type="button" variant="outline" onClick={onClose}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit" className="btn-enterprise">
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}