import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SEO } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroBg from "@/assets/hero-bg.jpg";

interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  sort_order: number;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) {
        setServices(data.map(s => ({ ...s, benefits: (s.benefits as any) || [] })));
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const handleGetService = (serviceName: string) => {
    const message = `Hello KATHECO, I need consultancy for: ${serviceName}`;
    window.open(`https://wa.me/255755521203?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Our Services - Research, Data Analysis & Project Management"
        description="Comprehensive consultancy services including project proposal writing, research support, dissertation help, monitoring & evaluation, data analysis, and concept note writing in Tanzania."
        keywords="project proposal writing, research consultation, dissertation help, monitoring evaluation services, data analysis Tanzania, concept note writing, field work assistance, research write-up"
        canonicalUrl="https://kathecoconsultancy.com/services"
      />
      <Navbar />
      
      <section 
        className="relative text-primary-foreground py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Services</h1>
          <p className="text-xl text-center text-primary-foreground/90 max-w-3xl mx-auto">
            Comprehensive consultancy services tailored to meet your research, academic, and project management needs
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-muted-foreground py-12">Loading services...</p>
          ) : (
            <div className="grid gap-8 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <AnimatedSection key={service.id} animation="fade-up" delay={index * 50}>
                  <Card className="border-border/50 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-2xl text-foreground">{service.title}</CardTitle>
                      <CardDescription className="text-muted-foreground text-base">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {service.benefits.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">What You Get:</h4>
                          <ul className="space-y-2">
                            {service.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary mt-1">✓</span>
                                <span className="text-muted-foreground">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <Button variant="service" size="lg" onClick={() => handleGetService(service.title)} className="w-full md:w-auto">
                        Get Service
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Services;
