import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SEO } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedSection";
import AnnouncementsSection from "@/components/AnnouncementsSection";
import { HeroCarousel } from "@/components/HeroCarousel";
import kathecoLogo from "@/assets/katheco-logo.jpg";
import { 
  FileText, BookOpen, BarChart3, GraduationCap, Lightbulb, 
  ClipboardList, Users, TrendingUp, LucideIcon 
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "Research Proposal & Dissertation Consultation": FileText,
  "Project Proposal Write-up": ClipboardList,
  "Monitoring & Evaluation Consultation": TrendingUp,
  "SPSS, STATA & Excel Training": BarChart3,
  "Microsoft Project Training": GraduationCap,
  "ODK/Kobo Tools Training": Lightbulb,
  "Field Work Report Assistance": Users,
  "Concept Note Writing": BookOpen,
};

const Index = () => {
  const [services, setServices] = useState<Array<{ title: string; description: string }>>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("services")
        .select("title, description")
        .order("sort_order", { ascending: true })
        .limit(8);
      if (data && data.length > 0) setServices(data);
    };
    fetch();
  }, []);

  const handleGetConsultancy = () => {
    window.open("https://wa.me/255755521203", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Home - Professional Research & Project Management Consultancy"
        description="Expert consultancy in research, data analysis, project management, monitoring & evaluation, and academic support in Tanzania."
        keywords="research consultancy Tanzania, data analysis services, project management Dodoma, SPSS training, STATA training"
        canonicalUrl="https://kathecoconsultancy.com/"
      />
      <Navbar />
      
      {/* Hero Section */}
      <HeroCarousel className="text-primary-foreground py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-2xl bg-white p-4 mb-6">
              <img src={kathecoLogo} alt="KATHECO Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Professional Consultancy in Research, Data Analysis, and Project Management
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              Empowering your academic, research, and project success with expert support.
            </p>
            <div className="pt-6">
              <Button variant="hero" size="xl" onClick={handleGetConsultancy} className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Get Consultancy
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10"></div>
      </HeroCarousel>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive consultancy services tailored to your research and project needs
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <ServiceCard 
                  icon={ICON_MAP[service.title] || FileText}
                  title={service.title}
                  description={service.description}
                  serviceName={service.title}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <AnnouncementsSection />

      {/* WhatsApp Group Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="scale">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-card to-background rounded-2xl shadow-xl p-8 md:p-12 text-center border border-border/50">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Join Our WhatsApp Community</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Connect with other researchers, students, and professionals.
              </p>
              <Button variant="service" size="lg" onClick={() => window.open("https://chat.whatsapp.com/Gl4CqWOGNdT7cKXpyoaBR3", "_blank")} className="text-lg px-8">
                Join WhatsApp Group
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">Contact us today for professional consultancy services</p>
            <Button variant="hero" size="xl" onClick={handleGetConsultancy} className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Contact Us Now
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
