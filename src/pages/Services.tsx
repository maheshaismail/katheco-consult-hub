import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SEO } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { Check, ArrowRight } from "lucide-react";
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
      
      <PageHero
        eyebrow="Services"
        title={<>Consultancy built around your <span className="text-gradient">research goals</span></>}
        subtitle="Comprehensive consultancy services tailored to meet your research, academic, and project management needs."
        image={heroBg}
        imageAlt="KATHECO consultancy services"
      />

      <section className="bg-background py-16 md:py-24">
        <div className="section-shell">
          {loading ? (
            <p className="py-12 text-center text-muted-foreground">Loading services...</p>
          ) : (
            <div className="mx-auto grid max-w-5xl gap-6">
              {services.map((service, index) => (
                <AnimatedSection key={service.id} animation="fade-up" delay={index * 50}>
                  <article className="surface-card hover-lift p-7 md:p-9">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">
                        Service {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-display text-2xl font-bold text-foreground">{service.title}</h2>
                      <p className="text-base leading-relaxed text-muted-foreground">{service.description}</p>
                    </div>

                    {service.benefits.length > 0 && (
                      <div className="mt-7">
                        <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          What you get
                        </h3>
                        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                          {service.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/80">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/15">
                                <Check className="h-3 w-3 text-secondary" />
                              </span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button
                      variant="service"
                      size="lg"
                      onClick={() => handleGetService(service.title)}
                      className="mt-8 w-full md:w-auto"
                    >
                      Get Service <ArrowRight />
                    </Button>
                  </article>
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
