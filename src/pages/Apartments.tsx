
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApartmentCard, { ApartmentProps } from "@/components/ApartmentCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample AI audit services data
const allServices: ApartmentProps[] = [
  {
    id: "1",
    name: "AI Risk Assessment",
    description: "Comprehensive evaluation of AI systems for potential risks, biases, and compliance issues.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    location: "Remote/On-site",
    features: ["Risk Analysis", "Compliance Check", "Bias Detection", "Security Review", "Documentation", "Report"]
  },
  {
    id: "2",
    name: "ML Model Validation",
    description: "Thorough testing and validation of machine learning models for accuracy and reliability.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    location: "Hybrid",
    features: ["Model Testing", "Performance Analysis", "Data Validation", "Algorithm Review", "Metrics Evaluation", "Optimization"]
  },
  {
    id: "3",
    name: "AI Ethics Consultation",
    description: "Expert guidance on ethical AI implementation and responsible AI development practices.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    location: "Remote",
    features: ["Ethics Framework", "Guidelines", "Best Practices", "Training", "Policy Development", "Consultation"]
  },
  {
    id: "4",
    name: "AI Governance Framework",
    description: "Complete AI governance strategy development for enterprise-level AI implementations.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    location: "Enterprise",
    features: ["Strategy Development", "Policy Framework", "Compliance Guidelines", "Risk Management", "Training Program", "Implementation"]
  },
  {
    id: "5",
    name: "AI Security Audit",
    description: "Comprehensive security assessment of AI systems and data pipelines for vulnerabilities.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    location: "Secure Environment",
    features: ["Security Assessment", "Vulnerability Analysis", "Data Protection", "Access Control", "Monitoring", "Remediation"]
  },
  {
    id: "6",
    name: "AI Performance Optimization",
    description: "Optimize AI system performance, efficiency, and resource utilization for better ROI.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop",
    location: "Cloud/On-premise",
    features: ["Performance Tuning", "Resource Optimization", "Cost Analysis", "Scalability", "Monitoring", "Reporting"]
  },
];

export default function Apartments() {
  const { t } = useLanguage();
  const [filteredServices, setFilteredServices] = useState<ApartmentProps[]>(allServices);
  const [locationFilter, setLocationFilter] = useState<string>("all");
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = allServices;
    
    // Filter by location
    if (locationFilter !== "all") {
      result = result.filter(apt => apt.location === locationFilter);
    }
    
    setFilteredServices(result);
  }, [locationFilter]);
  
  // Get unique locations for filter
  const locations = ["all", ...new Set(allServices.map(service => service.location))];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t.apartments.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                {t.apartments.subtitle}
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-10">
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute top-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Service Type
                </label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Service Types</SelectItem>
                    {locations.filter(loc => loc !== "all").map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setLocationFilter("all");
                  }}
                  className="h-10"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6 animate-fade-in [animation-delay:200ms]">
              <p className="text-muted-foreground">
                Showing {filteredServices.length} of {allServices.length} services
              </p>
            </div>
          </div>
        </section>
        
        {/* Apartments Grid */}
        <section className="section">
          <div className="container">
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service, index) => (
                  <div key={service.id} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                    <ApartmentCard apartment={service} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <h3 className="text-xl font-semibold mb-2">No services match your criteria</h3>
                <p className="text-muted-foreground mb-6">Please adjust your filters to see more services</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setLocationFilter("all");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
