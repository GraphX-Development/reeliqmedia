import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Camera, Clapperboard, BarChart3, PenTool, Smartphone, Globe } from "lucide-react";

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
      description: "High-quality photography and videography for your website, ads, and marketing materials.",
      features: ["Product Photography", "Brand Films", "Event Coverage", "Drone Footage"]
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: "Paid Advertising",
      description: "Targeted ad campaigns that convert. We manage your ad spend to maximize ROI on Meta and TikTok.",
      features: ["Ad Creative", "Audience Targeting", "A/B Testing", "Performance Tracking"]
    },
    {
      icon: <PenTool className="w-10 h-10" />,
      title: "Brand Strategy",
      description: "A comprehensive roadmap for your digital growth. We define your voice, audience, and goals.",
      features: ["Brand Identity", "Competitor Analysis", "Growth Roadmap", "Consulting"]
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Web Design",
      description: "Modern, high-performance websites that turn visitors into customers. Fast, responsive, and bold.",
      features: ["Custom Design", "SEO Optimization", "Mobile Responsive", "Conversion Focused"]
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container px-4">
          <h1 className="font-display text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-6">
            Our <span className="text-secondary">Services</span>
          </h1>
          <p className="font-mono text-muted-foreground text-xl max-w-3xl border-l-4 border-primary pl-6">
            We don't just post content; we build digital ecosystems. Explore our suite of services designed for growth.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group border border-border bg-background p-8 hover:border-primary transition-all duration-300 hover:-translate-y-2">
                <div className="mb-6 text-primary group-hover:text-secondary transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-display text-2xl font-bold uppercase mb-4">{service.title}</h3>
                <p className="font-mono text-muted-foreground text-sm mb-8 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground/80">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
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
            <Button size="lg" variant="secondary" className="rounded-none text-xl px-12 py-8 font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all">
              Book A Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
