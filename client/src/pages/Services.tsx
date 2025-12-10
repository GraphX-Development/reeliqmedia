import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Camera, Clapperboard, PenTool, Smartphone, Check, Zap } from "lucide-react";

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
      price: "$600",
      originalPrice: "$800",
      discount: "$200 OFF First Month",
      description: "Perfect for businesses just starting to build their digital footprint.",
      features: [
        "2 Posts/Carousels Per Week",
        "Total: 8 Posts/Month",
        "Basic Strategy",
        "Format Research"
      ],
      highlight: false
    },
    {
      title: "Growth",
      price: "$1,200",
      originalPrice: "$1,500",
      discount: "$300 OFF First Month",
      description: "Our most popular package. Designed for rapid scaling and maximum engagement.",
      features: [
        "3 Short-Form Videos Per Week",
        "3 Posts/Carousels Per Week",
        "Total: 12 Videos/Month",
        "Total: 12 Posts/Month",
        "Viral Format Research",
        "Cross-Platform Strategy"
      ],
      highlight: true
    },
    {
      title: "Dominance",
      price: "$2,000",
      originalPrice: "$2,600",
      discount: "$600 OFF First Month",
      description: "The ultimate package for brands that want to own their niche completely.",
      features: [
        "5 Short-Form Videos Per Week",
        "3 Posts/Carousels Per Week",
        "Total: 20 Videos/Month",
        "Total: 12 Posts/Month",
        "Dedicated Account Manager",
        "Advanced Analytics & Strategy",
        "Priority Support"
      ],
      highlight: false
    }
  ];

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
                      <span className="font-mono text-muted-foreground line-through text-lg">{pkg.originalPrice}</span>
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

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 border border-border bg-card px-6 py-3">
              <Zap className="w-5 h-5 text-secondary" />
              <span className="font-mono text-sm font-bold uppercase tracking-wider">
                Add-on: Single Video/Reel Content Creation — <span className="text-primary">$150/video</span>
              </span>
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
