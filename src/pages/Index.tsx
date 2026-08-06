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
  ClipboardList, Users, TrendingUp, LucideIcon, ArrowRight, ShieldCheck, Clock, Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

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

const STATS = [
  { value: "500+", label: "Clients supported" },
  { value: "8", label: "Core service lines" },
  { value: "5+", label: "Years of practice" },
  { value: "24h", label: "Typical response" },
];

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Methodologically sound",
    description:
      "Research designs, sampling and analysis plans that stand up to academic and donor scrutiny.",
  },
  {
    icon: Sparkles,
    title: "Hands-on training",
    description:
      "Practical SPSS, STATA, Excel, MS Project and ODK/Kobo sessions with real datasets.",
  },
  {
    icon: Clock,
    title: "Delivered on time",
    description:
      "Clear milestones, transparent pricing and consistent communication from brief to handover.",
  },
];

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
      <HeroCarousel className="text-primary-foreground">
        <div className="section-shell py-20 md:py-28">
          <div className="max-w-3xl space-y-7">
            <span className="eyebrow animate-fade-in text-primary-foreground/85">
              <Sparkles className="h-3.5 w-3.5" /> Dodoma · Tanzania
            </span>
            <h1 className="animate-fade-in font-display text-4xl font-bold leading-[1.06] md:text-5xl lg:text-6xl">
              Research, data and project consultancy that moves your work{" "}
              <span className="text-gradient">forward</span>.
            </h1>
            <p className="animate-fade-in max-w-2xl text-lg text-primary-foreground/85 md:text-xl">
              KATHECO supports students, researchers and organisations with proposals, dissertations,
              monitoring &amp; evaluation, statistical analysis and professional training.
            </p>
            <div className="animate-fade-in flex flex-wrap items-center gap-3 pt-2">
              <Button variant="hero" size="xl" onClick={handleGetConsultancy}>
                Get Consultancy <ArrowRight />
              </Button>
              <Link to="/services">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                >
                  Explore services
                </Button>
              </Link>
            </div>

            <div className="animate-fade-in flex items-center gap-4 pt-6">
              <img
                src={kathecoLogo}
                alt="KATHECO Consultancy Company Limited logo"
                className="h-14 w-14 rounded-xl bg-card object-contain p-1.5"
              />
              <p className="text-sm text-primary-foreground/70">
                KATHECO Consultancy Company Limited
                <br />
                Registered professional consultancy practice
              </p>
            </div>
          </div>
        </div>
      </HeroCarousel>

      {/* Stats bar */}
      <section className="relative z-10 bg-background">
        <div className="section-shell -mt-10 md:-mt-14">
          <div className="surface-card grid grid-cols-2 gap-6 p-7 shadow-elevated md:grid-cols-4 md:p-9">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-primary md:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-background py-16 md:py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <AnimatedSection animation="fade-right" className="space-y-5">
            <span className="eyebrow text-secondary">Why KATHECO</span>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              A consultancy partner, not just a service provider
            </h2>
            <p className="text-lg text-muted-foreground">
              We work alongside you — clarifying the question, designing the method, analysing the
              data and presenting findings that hold up in front of any panel or donor.
            </p>
            <Link to="/about">
              <Button variant="outline" size="lg">
                About our team <ArrowRight />
              </Button>
            </Link>
          </AnimatedSection>

          <div className="grid gap-4">
            {PILLARS.map((p, i) => (
              <AnimatedSection key={p.title} animation="fade-left" delay={i * 100}>
                <div className="surface-card hover-lift flex items-start gap-4 p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/12 text-secondary">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">{p.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{p.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="border-y border-border/60 bg-muted/40 py-16 md:py-24">
        <div className="section-shell">
          <AnimatedSection animation="fade-up" className="mx-auto max-w-2xl text-center">
            <span className="eyebrow text-secondary">Our services</span>
            <h2 className="mt-5 font-display text-3xl font-bold text-foreground md:text-4xl">
              Everything you need, from concept note to final report
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive consultancy services tailored to your research and project needs.
            </p>
          </AnimatedSection>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 80}>
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
      <section className="bg-background py-16 md:py-20">
        <div className="section-shell">
          <AnimatedSection animation="scale">
            <div className="surface-card mx-auto max-w-3xl p-8 text-center md:p-12">
              <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Join our WhatsApp community
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Connect with other researchers, students and professionals for tips, updates and
                exclusive training offers.
              </p>
              <Button
                variant="service"
                size="lg"
                onClick={() => window.open("https://chat.whatsapp.com/Gl4CqWOGNdT7cKXpyoaBR3", "_blank")}
                className="mt-8"
              >
                Join WhatsApp Group
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 text-primary-foreground">
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div className="section-shell relative z-10 text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold md:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
              Send us a message and get a clear plan, timeline and quote for your project.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="hero" size="xl" onClick={handleGetConsultancy}>
                Contact us now <ArrowRight />
              </Button>
              <Link to="/training">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                >
                  View training
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
