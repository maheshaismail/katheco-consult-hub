import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroBg from "@/assets/hero-bg.jpg";

const Services = () => {
  const services = [
    {
      title: "Project Proposal Write-up",
      description: "Professional project proposal development services for funding applications and organizational approval.",
      benefits: [
        "Comprehensive needs assessment",
        "Clear objectives and methodology",
        "Budget planning and justification",
        "Stakeholder analysis and engagement plan",
        "Monitoring and evaluation framework"
      ]
    },
    {
      title: "Research Proposal & Dissertation Consultation",
      description: "Expert guidance through every stage of your academic research journey.",
      benefits: [
        "Topic selection and refinement",
        "Literature review assistance",
        "Research methodology design",
        "Data collection and analysis support",
        "Academic writing and formatting"
      ]
    },
    {
      title: "Microsoft Project Training",
      description: "Master project planning, scheduling, and resource management using Microsoft Project.",
      benefits: [
        "Project setup and configuration",
        "Task scheduling and dependencies",
        "Resource allocation and management",
        "Progress tracking and reporting",
        "Critical path analysis"
      ]
    },
    {
      title: "ODK/Kobo Tools Training",
      description: "Learn mobile data collection techniques using ODK and Kobo Toolbox platforms.",
      benefits: [
        "Form design and deployment",
        "Mobile data collection setup",
        "Data quality management",
        "Data export and analysis",
        "Server configuration and management"
      ]
    },
    {
      title: "Data Analysis Training",
      description: "Comprehensive training in statistical data analysis techniques and interpretation.",
      benefits: [
        "Descriptive and inferential statistics",
        "Data cleaning and preparation",
        "Statistical test selection",
        "Results interpretation",
        "Report writing and visualization"
      ]
    },
    {
      title: "SPSS, STATA & Excel Training",
      description: "Hands-on training in statistical software for robust data analysis.",
      benefits: [
        "Software navigation and setup",
        "Data entry and management",
        "Statistical analysis techniques",
        "Chart and graph creation",
        "Output interpretation and reporting"
      ]
    },
    {
      title: "Field Work Report Assistance",
      description: "Professional support for field research documentation and reporting.",
      benefits: [
        "Report structure and formatting",
        "Data presentation and analysis",
        "Findings documentation",
        "Recommendations development",
        "Quality assurance and editing"
      ]
    },
    {
      title: "Concept Note Writing",
      description: "Strategic concept notes that effectively communicate your project vision.",
      benefits: [
        "Clear problem statement",
        "Solution approach and strategy",
        "Expected outcomes and impact",
        "Budget summary",
        "Implementation timeline"
      ]
    },
    {
      title: "Monitoring & Evaluation Consultation",
      description: "Comprehensive M&E frameworks to track project performance and measure impact.",
      benefits: [
        "M&E framework development",
        "Indicator selection and definition",
        "Data collection systems",
        "Performance tracking tools",
        "Impact assessment design"
      ]
    },
    {
      title: "Research Write-up Training",
      description: "Learn academic and professional research writing techniques.",
      benefits: [
        "Research structure and organization",
        "Academic writing style",
        "Citation and referencing",
        "Critical analysis skills",
        "Editing and proofreading"
      ]
    }
  ];

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
        canonicalUrl="https://katheco.lovable.app/services"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative text-primary-foreground py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Services</h1>
          <p className="text-xl text-center text-primary-foreground/90 max-w-3xl mx-auto">
            Comprehensive consultancy services tailored to meet your research, academic, and project management needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-border/50 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                  <Button variant="service" size="lg" onClick={() => handleGetService(service.title)} className="w-full md:w-auto">
                    Get Service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Services;
