import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Target, Eye, Award } from "lucide-react";
import kathecoTeam from "@/assets/katheco-team.jpg";
import deptCustomerId from "@/assets/dept-customer-id.jpg";
import deptFinance from "@/assets/dept-finance.jpg";
import deptRegistration from "@/assets/dept-registration.jpg";
import deptMarketing from "@/assets/dept-marketing.jpg";
import deptMedia from "@/assets/dept-media.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold">About KATHECO</h1>
            <div className="max-w-3xl mx-auto">
              <img 
                src={kathecoTeam} 
                alt="KATHECO Team" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Who We Are</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                KATHECO (Kayombo Theophil Consultancy) is a professional consultancy agency specializing in project planning, 
                research support, monitoring & evaluation, data analysis, and academic consultancy. We are committed to 
                delivering excellence in every project we undertake.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide reliable and high-quality consultancy services that empower researchers, students, and organizations 
                  to achieve their goals with confidence and excellence.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Eye className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Our Vision</h3>
                <p className="text-muted-foreground">
                  To be the leading provider of research and project management consultancy in Tanzania, recognized for our 
                  commitment to quality, innovation, and client success.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Our Values</h3>
                <p className="text-muted-foreground">
                  We uphold the highest standards of integrity, professionalism, innovation, and commitment in all our work, 
                  ensuring exceptional service delivery.
                </p>
              </div>
            </div>

            {/* Consultant Section */}
            <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl p-8 mt-12">
              <h2 className="text-3xl font-bold text-foreground text-center mb-8">Meet the Consultant</h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-6xl font-bold text-primary-foreground">KT</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Kayombo Theophil</h3>
                  <p className="text-lg text-primary font-semibold mb-4">Principal Consultant</p>
                  <p className="text-muted-foreground leading-relaxed">
                    With extensive experience in research methodology, data analysis, project management, and academic 
                    consultancy, Kayombo Theophil brings a wealth of knowledge and practical expertise to help clients 
                    achieve their research and project objectives. Specialized in statistical analysis using SPSS, STATA, 
                    and Excel, as well as project planning with Microsoft Project and mobile data collection tools.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-foreground text-center mb-8">Why Choose KATHECO?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Expert guidance from experienced professionals",
                  "Tailored solutions for your specific needs",
                  "Proven track record of successful projects",
                  "Comprehensive training and support",
                  "Timely delivery and professional service",
                  "Competitive pricing and value for money"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-foreground text-sm">✓</span>
                    </div>
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Departments */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-foreground text-center mb-8">Our Departments</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Customer Identification Department",
                    description: "Identify and find new customers, promote the company through short posts and outreach.",
                    phone: "255747324105",
                    image: deptCustomerId
                  },
                  {
                    name: "Department of Finance – CPA Katheco (Mr. Salumu Ally)",
                    description: "Auditing financial statements, preparing tax documents, financial planning advisory.",
                    phone: "255626489782",
                    image: deptFinance
                  },
                  {
                    name: "Registration & Legal Affairs – Fadhiri Ayubu Zumba",
                    description: "Supervising company registration, monitoring registration payments, implementing/amending laws, providing consultation.",
                    phone: "255768512757",
                    image: deptRegistration
                  },
                  {
                    name: "Marketing Department – Maulid Rashid Juma",
                    description: "Customer & staff training, ensuring availability of customers, overseeing marketing strategies for brand growth.",
                    phone: "255612775810",
                    image: deptMarketing
                  },
                  {
                    name: "Media & Advertisement – Costantino Sulle",
                    description: "Content creation, media buying & placement, collaborating with marketing on digital campaigns.",
                    phone: "255786208036",
                    image: deptMedia
                  }
                ].map((dept, index) => (
                  <div key={index} className="bg-gradient-to-br from-card to-muted/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="w-full h-64 overflow-hidden">
                      <img 
                        src={dept.image} 
                        alt={dept.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-bold text-foreground">{dept.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{dept.description}</p>
                      <a 
                        href={`https://wa.me/${dept.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-primary-foreground bg-gradient-to-br from-primary to-secondary rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Contact
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default About;
