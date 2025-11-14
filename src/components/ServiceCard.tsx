import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  serviceName?: string;
}

export const ServiceCard = ({ icon: Icon, title, description, href, serviceName }: ServiceCardProps) => {
  const handleClick = () => {
    const message = serviceName 
      ? `Hello KATHECO, I need consultancy for: ${serviceName}`
      : "Hello KATHECO, I need your consultancy service";
    const url = href || `https://wa.me/255755521203?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Card className="border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-muted/30">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-xl text-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="service" size="default" onClick={handleClick} className="w-full">
          Get Service
        </Button>
      </CardContent>
    </Card>
  );
};
