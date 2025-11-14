import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TrainingCardProps {
  title: string;
  description: string;
  duration: string;
  outline: string[];
}

export const TrainingCard = ({ title, description, duration, outline }: TrainingCardProps) => {
  const handleRegister = () => {
    window.open("https://wa.me/255755521203", "_blank");
  };

  return (
    <Card className="border-border/50 shadow-md hover:shadow-lg transition-all duration-300 bg-card">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
        <div className="mt-2">
          <span className="text-sm font-semibold text-primary">Duration: {duration}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Course Outline:</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {outline.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <Button variant="service" size="lg" onClick={handleRegister} className="w-full">
          Register Now
        </Button>
      </CardContent>
    </Card>
  );
};
