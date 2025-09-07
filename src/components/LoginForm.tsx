import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface LoginFormProps {
  role: string;
  onBack: () => void;
  onLogin: (credentials: { email: string; password: string }) => void;
}

export function LoginForm({ role, onBack, onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-enterprise">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </div>
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/539dba86-2de1-4138-8020-98e2533cba5d.png" 
              alt="Industry AI CRM Logo" 
              className="w-12 h-12"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center bg-gradient-primary bg-clip-text text-transparent">
            {role} Login
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Access your Industry AI CRM portal
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-enterprise-gray-light focus:border-enterprise-blue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-enterprise-gray-light focus:border-enterprise-blue"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity duration-300"
            >
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            Demo credentials: demo@industryai.com / demo123
          </div>
        </CardContent>
      </Card>
    </div>
  );
}