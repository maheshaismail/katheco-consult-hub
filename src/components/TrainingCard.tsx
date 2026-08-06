import { Button } from "@/components/ui/button";
import { Check, Clock } from "lucide-react";

interface TrainingCardProps {
  title: string;
  description: string;
  duration: string;
  outline: string[];
}

export const TrainingCard = ({ title, description, duration, outline }: TrainingCardProps) => {
  const handleRegister = () => {
    const message = `Hello KATHECO, I want to register for: ${title}`;
    window.open(`https://wa.me/255755521203?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <article className="surface-card hover-lift flex h-full flex-col p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> {duration}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>

      {outline.length > 0 && (
        <div className="mt-6 flex-1">
          <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Course outline
          </h4>
          <ul className="mt-3 space-y-2">
            {outline.map((item, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm text-foreground/80">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-secondary/15">
                  <Check className="h-3 w-3 text-secondary" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button variant="service" size="lg" onClick={handleRegister} className="mt-7 w-full">
        Register Now
      </Button>
    </article>
  );
};
