import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SEO } from "@/components/SEO";
import AnnouncementsSection from "@/components/AnnouncementsSection";
import kathecoLogo from "@/assets/katheco-logo.jpg";
import kathecoTeamHero from "@/assets/katheco-team-hero.jpg";
import { 
  FileText, 
  BookOpen, 
  BarChart3, 
  GraduationCap, 
  Lightbulb, 
  ClipboardList, 
  Users,
  TrendingUp 
} from "lucide-react";

const Index = () => {
  const services = [
    {
      icon: FileText,
      title: "Research Proposal & Dissertation",
      description: "Expert guidance for crafting compelling research proposals and dissertations with academic rigor.",
      serviceName: "Research Proposal & Dissertation Consultation"
    },
    {
      icon: ClipboardList,
      title: "Project Proposal Writing",
      description: "Professional project proposal development for funding applications and organizational approval.",
      serviceName: "Project Proposal Writing"
    },
    {
      icon: TrendingUp,
      title: "Monitoring & Evaluation",
      description: "Comprehensive M&E frameworks to track project performance and measure impact effectively.",
      serviceName: "Monitoring & Evaluation Consultation"
    },
    {
      icon: BarChart3,
      title: "SPSS, STATA & Excel Training",
      description: "Hands-on training in statistical software for robust data analysis and interpretation.",
      serviceName: "SPSS, STATA & Excel Training"
    },
    {
      icon: GraduationCap,
      title: "Microsoft Project Training",
      description: "Master project planning, scheduling, and resource management using MS Project tools.",
      serviceName: "Microsoft Project Training"
    },
    {
      icon: Lightbulb,
      title: "ODK Kobo Training",
      description: "Learn mobile data collection techniques using ODK and Kobo Toolbox platforms.",
      serviceName: "ODK Kobo Training"
    },
    {
      icon: Users,
      title: "Field Work Assistance",
      description: "Professional support for field research, data collection, and reporting activities.",
      serviceName: "Field Work Report Assistance"
    },
    {
      icon: BookOpen,
      title: "Concept Note Writing",
      description: "Strategic concept notes that effectively communicate your project vision to stakeholders.",
      serviceName: "Concept Note Writing"
    },
  ];

  const handleGetConsultancy = () => {
    window.open("https://wa.me/255755521203", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Home - Professional Research & Project Management Consultancy"
        description="Expert consultancy in research, data analysis, project management, monitoring & evaluation, and academic support in Tanzania. Professional training in SPSS, STATA, Excel, Microsoft Project, and ODK."
        keywords="research consultancy Tanzania, data analysis services, project management Dodoma, SPSS training, STATA training, monitoring evaluation, academic consultancy, research proposal writing, dissertation help"
        canonicalUrl="https://katheco.lovable.app/"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative text-primary-foreground py-20 md:py-32"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${kathecoTeamHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
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
              <Button 
                variant="hero" 
                size="xl" 
                onClick={handleGetConsultancy}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Get Consultancy
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive consultancy services tailored to your research and project needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <AnnouncementsSection />

      {/* WhatsApp Group Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-card to-background rounded-2xl shadow-xl p-8 md:p-12 text-center border border-border/50">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join Our WhatsApp Community
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Connect with other researchers, students, and professionals. Get updates on training, tips, and exclusive consultancy offers.
            </p>
            <Button 
              variant="service" 
              size="lg"
              onClick={() => window.open("https://chat.whatsapp.com/Gl4CqWOGNdT7cKXpyoaBR3", "_blank")}
              className="text-lg px-8"
            >
              Join WhatsApp Group
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Contact us today for professional consultancy services
          </p>
          <Button 
            variant="hero" 
            size="xl" 
            onClick={handleGetConsultancy}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Contact Us Now
          </Button>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
