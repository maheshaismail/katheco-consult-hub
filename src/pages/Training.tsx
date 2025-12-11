import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SEO } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedSection";
import { TrainingCard } from "@/components/TrainingCard";
import heroBg from "@/assets/hero-bg.jpg";

const Training = () => {
  const trainings = [
    {
      title: "SPSS Training",
      description: "Master statistical analysis using SPSS for research and data analysis projects.",
      duration: "5 days (intensive) or 2 weeks (regular)",
      outline: [
        "Introduction to SPSS interface and data management",
        "Descriptive statistics and data exploration",
        "Hypothesis testing and inferential statistics",
        "Correlation and regression analysis",
        "ANOVA and non-parametric tests",
        "Data visualization and report generation"
      ]
    },
    {
      title: "STATA Training",
      description: "Comprehensive training in STATA for advanced statistical analysis and econometrics.",
      duration: "5 days (intensive) or 2 weeks (regular)",
      outline: [
        "STATA basics and command syntax",
        "Data management and transformation",
        "Statistical analysis and hypothesis testing",
        "Regression models and diagnostics",
        "Panel data analysis",
        "Advanced econometric techniques"
      ]
    },
    {
      title: "Excel for Data Analysis",
      description: "Learn advanced Excel techniques for data analysis, visualization, and reporting.",
      duration: "3-5 days",
      outline: [
        "Advanced Excel functions and formulas",
        "Data cleaning and preparation",
        "PivotTables and PivotCharts",
        "Statistical analysis tools",
        "Data visualization techniques",
        "Dashboard creation and automation"
      ]
    },
    {
      title: "Microsoft Project",
      description: "Project planning and management using Microsoft Project software.",
      duration: "3-5 days",
      outline: [
        "Project setup and configuration",
        "Task creation and scheduling",
        "Resource management and allocation",
        "Budget planning and tracking",
        "Progress monitoring and reporting",
        "Critical path method and optimization"
      ]
    },
    {
      title: "ODK/KoboCollect",
      description: "Mobile data collection using Open Data Kit (ODK) and Kobo Toolbox.",
      duration: "3-4 days",
      outline: [
        "Introduction to mobile data collection",
        "Form design using XLSForm",
        "Server setup and configuration",
        "Data collection on mobile devices",
        "Data quality and validation",
        "Data export and analysis integration"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Training Programs - SPSS, STATA, Excel & Project Management"
        description="Professional training in SPSS, STATA, Excel, Microsoft Project, and ODK Kobo mobile data collection. Hands-on courses for research and project management in Tanzania."
        keywords="SPSS training Tanzania, STATA training, Excel training, Microsoft Project training, ODK Kobo training, data analysis training, project management training Dodoma"
        canonicalUrl="https://katheco.lovable.app/training"
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
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Training Programs</h1>
          <p className="text-xl text-center text-primary-foreground/90 max-w-3xl mx-auto">
            Professional training programs designed to enhance your research and project management skills
          </p>
        </div>
      </section>

      {/* Training Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {trainings.map((training, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <TrainingCard {...training} />
              </AnimatedSection>
            ))}
          </div>

          {/* Additional Info */}
          <AnimatedSection animation="fade-up" delay={500} className="mt-12 max-w-4xl mx-auto bg-muted/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Training Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Training Formats:</strong> We offer both in-person and online training 
                sessions to accommodate different learning preferences and schedules.
              </p>
              <p>
                <strong className="text-foreground">Group Discounts:</strong> Special rates available for organizations 
                and groups of 5 or more participants.
              </p>
              <p>
                <strong className="text-foreground">Customization:</strong> All training programs can be customized to 
                meet your specific needs and skill level.
              </p>
              <p>
                <strong className="text-foreground">Certification:</strong> Participants receive a certificate of 
                completion upon successfully finishing the training program.
              </p>
              <p>
                <strong className="text-foreground">Materials:</strong> All training materials, practice datasets, 
                and reference guides are provided.
              </p>
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
