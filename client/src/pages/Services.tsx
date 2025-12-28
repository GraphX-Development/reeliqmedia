import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Camera, Clapperboard, PenTool, Smartphone, Check, Zap, Video } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: "Social Media Management",
      description: "We handle everything from posting schedules to community engagement. Consistent, on-brand presence across all platforms.",
      features: ["Content Calendar", "Community Engagement", "Analytics Reporting", "Platform Optimization"]
    },
    {
      icon: <Clapperboard className="w-10 h-10" />,
      title: "Short-Form Video",
      description: "Viral-ready Reels and TikToks designed to grab attention instantly. We handle scripting, filming, and editing.",
      features: ["Scripting & Concept", "Professional Filming", "Dynamic Editing", "Trend Adaptation"]
    },
    {
      icon: <Camera className="w-10 h-10" />,
      title: "Content Production",
      description: "Professional video production and high-end editing. We capture and polish footage that tells your story.",
      features: ["Brand Films", "Professional Editing", "Color Grading", "Sound Design"]
    },
    {
      icon: <PenTool className="w-10 h-10" />,
      title: "Brand Strategy",
      description: "A comprehensive roadmap for your digital growth. We define your voice, audience, and goals.",
      features: ["Brand Identity", "Competitor Analysis", "Growth Roadmap", "Consulting"]
    }
  ];

  const pricingPackages = [
    {
      title: "Starter",
      price: "$249",
      originalPrice: "$249",
      discount: "$199 First Month",
      description: "Perfect for businesses just starting to build their digital footprint.",
      features: [
        "2 Posts Per Week",
        "1 Carousel Per Week",
        "Total: 12 Posts/Month",
        "Basic Strategy",
        "Format Research"
      ],
      highlight: false
    },
    {
      title: "Growth",
      price: "$449",
      originalPrice: "$449",
      discount: "$399 First Month",
      description: "Accelerate your growth with consistent, high-impact video content.",
      features: [
        "1 Reel Per Week",
        "2 Posts Per Week",
        "2 Carousels Per Week",
        "Total: 20 Posts/Month",
        "Viral Format Research",
        "Cross-Platform Strategy"
      ],
      highlight: true
    },
    {
      title: "Dominance",
      price: "$649",
      originalPrice: "$649",
      discount: "Priority Support",
      description: "Complete market domination. Maximum volume, maximum impact.",
      features: [
        "2 Reels Per Week",
        "2 Posts Per Week",
        "2 Carousels Per Week",
        "Total: 24 Posts/Month",
        "Dedicated Account Manager",
        "Priority Support"
      ],
      highlight: false
    }
  ];

  const videoCreationPackage = {
    title: "Video Creation",
    price: "$150",
    originalPrice: "$150",
    discount: "$99 First Video",
    description: "High-quality video production tailored for product promotion, realtors, and social media engagement.",
    features: [
      "Vertical or Horizontal Format",
      "Up to 1 Minute Duration",
      "Professional Editing",
      "Scripting Assistance",
      "Ideal for Product Promos",
      "Perfect for Realtors"
    ]
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-32 pb-20 bg-background border-b border-border">
        <div className="container px-4">
          <h1 className="font-display text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-6">
            Our <span className="text-secondary">Services</span>
          </h1>
          <p className="font-mono text-muted-foreground text-xl max-w-3xl border-l-4 border-primary pl-6">
            We don't just create content; we take full control of the process. From building a custom strategy to ensuring you stand out, we handle everything so you can dominate social media.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
        <div className="container px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="font-mono text-primary text-sm uppercase tracking-widest">Transparent Pricing</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mt-4">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Package</span>
            </h2>
            <p className="font-mono text-muted-foreground mt-4 max-w-2xl mx-auto">
              No hidden fees. No long-term contracts. Just results.
            </p>
          </div>

          {/* Social Media Management Section */}
          <div className="mb-20">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px bg-border w-12 md:w-24"></div>
              <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wider text-foreground">
                Social Media Management
              </h3>
              <div className="h-px bg-border w-12 md:w-24"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPackages.map((pkg, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col border ${pkg.highlight ? 'border-primary bg-card shadow-[0_0_30px_rgba(0,153,255,0.15)] scale-105 z-10' : 'border-border bg-background'} p-8 transition-all duration-300 hover:border-primary`}
                >
                  {pkg.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 font-mono text-xs font-bold uppercase tracking-widest">
                      Best Value
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h3 className="font-display text-3xl font-bold uppercase mb-2">{pkg.title}</h3>
                    <p className="font-mono text-muted-foreground text-sm min-h-[40px]">{pkg.description}</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-display text-5xl font-bold text-foreground">{pkg.price}</span>
                        <span className="font-mono text-muted-foreground text-sm uppercase">/ Month</span>
                      </div>
                      <div className="mt-2 inline-block bg-secondary/10 text-secondary px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wide rounded-md self-start">
                        {pkg.discount}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="font-mono text-sm text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact">
                    <Button 
                      className={`w-full rounded-none font-bold uppercase tracking-widest py-6 ${pkg.highlight ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'}`}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Video Creation Section */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px bg-border w-12 md:w-24"></div>
              <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wider text-foreground">
                Video Creation
              </h3>
              <div className="h-px bg-border w-12 md:w-24"></div>
            </div>

            <div className="relative flex flex-col md:flex-row border border-primary bg-card shadow-[0_0_30px_rgba(0,153,255,0.1)] p-8 md:p-12 transition-all duration-300 hover:border-secondary hover:shadow-[0_0_40px_rgba(255,136,0,0.15)]">
              <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0 border-b md:border-b-0 md:border-r border-border pb-8 md:pb-0">
                <div className="flex items-center gap-3 mb-4">
                  <Video className="w-8 h-8 text-primary" />
                  <h3 className="font-display text-3xl font-bold uppercase">{videoCreationPackage.title}</h3>
                </div>
                <p className="font-mono text-muted-foreground text-sm mb-6 leading-relaxed">
                  {videoCreationPackage.description}
                </p>
                <div className="flex flex-col gap-1 mb-6">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-display text-5xl font-bold text-foreground">{videoCreationPackage.price}</span>
                    <span className="font-mono text-muted-foreground text-sm uppercase">/ Video</span>
                  </div>
                  <div className="mt-2 inline-block bg-secondary/10 text-secondary px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wide rounded-md self-start">
                    {videoCreationPackage.discount}
                  </div>
                </div>
                <Link href="/contact">
                  <Button 
                    className="w-full md:w-auto rounded-none font-bold uppercase tracking-widest py-6 px-8 bg-primary hover:bg-primary/90"
                  >
                    Book Your Video
                  </Button>
                </Link>
              </div>

              <div className="md:w-1/2 md:pl-8 flex flex-col justify-center">
                <h4 className="font-display text-lg font-bold uppercase mb-6 text-foreground/90">Includes:</h4>
                <ul className="grid grid-cols-1 gap-4">
                  {videoCreationPackage.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <span className="font-mono text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container px-4">
          <div className="mb-12">
            <h2 className="font-display text-4xl font-bold uppercase tracking-tighter mb-4">
              Full Service <span className="text-primary">Menu</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group border border-border bg-background p-8 hover:border-primary transition-all duration-300 hover:-translate-y-2 flex flex-col">
                <div className="flex-grow flex flex-col">
                  <div className="mb-6 text-primary group-hover:text-secondary transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase mb-4">{service.title}</h3>
                  <p className="font-mono text-muted-foreground text-sm mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mt-auto">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground/80">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="font-display text-5xl font-bold uppercase tracking-tighter mb-6 sticky top-24">
                How We <br/><span className="text-primary">Work</span>
              </h2>
            </div>
            <div className="md:w-2/3 space-y-12">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  desc: "We dive deep into your brand, goals, and audience. We ask the hard questions to build a solid foundation."
                },
                {
                  step: "02",
                  title: "Strategy",
                  desc: "We build a custom roadmap. No cookie-cutter plans. Every tactic is chosen to move the needle for your specific business."
                },
                {
                  step: "03",
                  title: "Creation",
                  desc: "Lights, camera, action. Our creative team gets to work producing high-end assets that demand attention."
                },
                {
                  step: "04",
                  title: "Execution",
                  desc: "We launch, monitor, and optimize. We watch the data like hawks and pivot instantly to maximize performance."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6 border-b border-border pb-12 last:border-0">
                  <span className="font-display text-6xl font-bold text-border/50">{item.step}</span>
                  <div>
                    <h3 className="font-display text-3xl font-bold uppercase mb-4">{item.title}</h3>
                    <p className="font-mono text-muted-foreground text-lg">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">
            Ready to get started?
          </h2>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="rounded-none text-lg md:text-xl px-8 py-6 md:px-12 md:py-8 font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all">
              Book A Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
