import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Corporate background images for different sections
const backgroundImages = {
  service: new URL("@/assets/corporate-service.jpg", import.meta.url).href,
  sales: new URL("@/assets/corporate-sales.jpg", import.meta.url).href,
  marketing: new URL("@/assets/corporate-marketing.jpg", import.meta.url).href,
  mechanics: new URL("@/assets/corporate-mechanics.jpg", import.meta.url).href,
  dealer: new URL("@/assets/corporate-dealer.jpg", import.meta.url).href,
  leadership: new URL("@/assets/corporate-leadership.jpg", import.meta.url).href,
  default: new URL("@/assets/corporate-meeting.jpg", import.meta.url).href,
};

interface CorporateLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  headerActions?: ReactNode;
  variant?: 'service' | 'sales' | 'marketing' | 'mechanics' | 'dealer' | 'leadership' | 'default';
}

export function CorporateLayout({ 
  children, 
  title, 
  subtitle, 
  className, 
  headerActions,
  variant = 'default'
}: CorporateLayoutProps) {
  const backgroundImage = backgroundImages[variant];
  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden",
      className
    )}>
      {/* Corporate Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {/* Professional Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-enterprise-blue/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--enterprise-blue)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,hsl(var(--enterprise-blue)/0.05)_50%,transparent_60%)]" />
      
      <div className="relative">
        {(title || subtitle || headerActions) && (
          <div className="border-b border-enterprise-blue/20 bg-background/90 backdrop-blur-md shadow-enterprise">
            <div className="container mx-auto px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  {title && (
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-enterprise-blue to-enterprise-blue-light bg-clip-text text-transparent">
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className="text-enterprise-gray text-xl font-medium">
                      {subtitle}
                    </p>
                  )}
                </div>
                {headerActions && (
                  <div className="flex items-center gap-4">
                    {headerActions}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="container mx-auto px-6 py-8">
          <div className="bg-background/95 backdrop-blur-sm rounded-2xl shadow-enterprise border border-enterprise-blue/10 p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}