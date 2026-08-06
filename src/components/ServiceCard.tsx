import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";

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
    <article className="surface-card hover-lift group relative flex h-full flex-col overflow-hidden p-6">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "hsl(var(--secondary) / 0.18)" }}
      />
      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-card">
        <Icon className="h-6 w-6 text-primary-foreground" />
      </div>
      <h3 className="relative mt-5 font-display text-lg font-bold leading-snug text-foreground">
        {title}
      </h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <Button
        variant="ghost"
        onClick={handleClick}
        className="relative mt-6 justify-start px-0 text-secondary hover:bg-transparent hover:text-primary"
      >
        Get Service
        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </Button>
    </article>
  );
};
