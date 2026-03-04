import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SEO } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedSection";
import { TrainingCard } from "@/components/TrainingCard";
import { HeroCarousel } from "@/components/HeroCarousel";

interface Training {
  id: string;
  title: string;
  description: string;
  duration: string;
  outline: string[];
}

const Training = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("trainings")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) {
        setTrainings(data.map(t => ({ ...t, outline: (t.outline as any) || [] })));
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Training Programs - SPSS, STATA, Excel & Project Management"
        description="Professional training in SPSS, STATA, Excel, Microsoft Project, and ODK Kobo mobile data collection."
        keywords="SPSS training Tanzania, STATA training, Excel training, Microsoft Project training, ODK Kobo training"
        canonicalUrl="https://kathecoconsultancy.com/training"
      />
      <Navbar />
      
      <HeroCarousel className="text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Training Programs</h1>
          <p className="text-xl text-center text-primary-foreground/90 max-w-3xl mx-auto">
            Professional training programs designed to enhance your research and project management skills
          </p>
        </div>
      </HeroCarousel>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-muted-foreground py-12">Loading trainings...</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
              {trainings.map((training, index) => (
                <AnimatedSection key={training.id} animation="fade-up" delay={index * 100}>
                  <TrainingCard {...training} />
                </AnimatedSection>
              ))}
            </div>
          )}

          <AnimatedSection animation="fade-up" delay={500} className="mt-12 max-w-4xl mx-auto bg-muted/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Training Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p><strong className="text-foreground">Training Formats:</strong> We offer both in-person and online training sessions.</p>
              <p><strong className="text-foreground">Group Discounts:</strong> Special rates for groups of 5 or more.</p>
              <p><strong className="text-foreground">Customization:</strong> All programs can be customized to your needs.</p>
              <p><strong className="text-foreground">Certification:</strong> Participants receive a certificate of completion.</p>
              <p><strong className="text-foreground">Materials:</strong> All training materials and practice datasets provided.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Training;
