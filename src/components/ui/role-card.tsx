import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  onDemoLogin: () => void;
  className?: string;
}

export function RoleCard({ title, description, icon: Icon, onClick, onDemoLogin, className }: RoleCardProps) {
  return (
    <Card className={cn(
      "group cursor-pointer transition-all duration-300 hover:shadow-enterprise hover:scale-105 border-enterprise-gray-light hover:border-enterprise-blue-light",
      className
    )}>
      <CardContent className="p-6 text-center">
        <div className="mb-4 mx-auto w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:shadow-glow transition-shadow duration-300">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-card-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {description}
        </p>
        <div className="space-y-2">
          <Button 
            onClick={onDemoLogin}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity duration-300"
          >
            Demo Login
          </Button>
          <Button 
            onClick={onClick}
            variant="outline" 
            className="w-full border-enterprise-blue text-enterprise-blue hover:bg-enterprise-blue hover:text-white transition-colors duration-300"
          >
            Login with Credentials
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}