import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Play, TrendingUp, Users, Video } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden border-b border-border">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
          <img 
            src="/images/_MG_1012.jpg" 
            alt="Filming behind the scenes" 
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>

        <div className="container relative z-20 px-4 flex flex-col items-start justify-center h-full pt-20">
          <div className="inline-block mb-4 px-3 py-1 border border-primary/50 bg-primary/10 backdrop-blur-sm">
            <span className="text-primary font-mono text-sm uppercase tracking-widest">Social Media Marketing Agency</span>
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold uppercase leading-[0.85] tracking-tighter text-foreground mb-6 max-w-5xl">
            Dominate <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">The Feed</span>
          </h1>
          
          <p className="font-mono text-muted-foreground text-lg md:text-xl max-w-xl mb-10 border-l-2 border-primary pl-6">
            We craft bold, cinematic content that stops the scroll. Elevate your brand with data-driven social media strategies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-none text-lg px-8 py-6 font-bold uppercase tracking-widest hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 group">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" size="lg" className="rounded-none text-lg px-8 py-6 font-bold uppercase tracking-widest border-2 hover:bg-foreground hover:text-background transition-all duration-300">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-10">
          <div className="h-full w-full grid grid-cols-6 md:grid-cols-12 gap-4 px-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-full border-r border-foreground/50 last:border-r-0"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-24 bg-background border-b border-border relative overflow-hidden">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4">
                Our <span className="text-primary">Expertise</span>
              </h2>
              <div className="h-1 w-24 bg-secondary"></div>
            </div>
            <p className="font-mono text-muted-foreground max-w-md text-right md:text-left">
              Comprehensive solutions for brands ready to make an impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Video className="w-12 h-12 text-primary mb-6" />,
                title: "Content Creation",
                desc: "High-quality reels, tiktoks, and promotional videos filmed with professional gear.",
                image: "/images/_MG_1012.jpg"
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-secondary mb-6" />,
                title: "Social Strategy",
                desc: "Data-backed growth plans designed to increase engagement and convert followers.",
                image: "/images/_MG_0857.jpg"
              },
              {
                icon: <Users className="w-12 h-12 text-primary mb-6" />,
                title: "Management",
                desc: "Full-service account handling so you can focus on running your business.",
                image: "/images/_MG_0905.jpg"
              }
            ].map((service, index) => (
              <div key={index} className="group relative border border-border bg-card hover:border-primary transition-colors duration-300 h-full flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  {service.icon}
                  <h3 className="font-display text-2xl font-bold uppercase mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-mono text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                    {service.desc}
                  </p>
                  <Link href="/services">
                    <span className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-primary transition-colors cursor-pointer">
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-0 bg-card border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[500px] lg:h-auto border-b lg:border-b-0 lg:border-r border-border group overflow-hidden">
            <img 
              src="/images/DSC01013.jpg" 
              alt="Local landmark" 
              className="absolute inset-0 w-full h-full object-cover object-right transition-all duration-700"
            />
          </div>
          <div className="p-12 lg:p-24 flex flex-col justify-center">
            <span className="font-mono text-primary text-sm uppercase tracking-widest mb-4">Who We Are</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">
              Local Roots, <br/>
              <span className="text-secondary">Global Vision</span>
            </h2>
            <p className="font-mono text-muted-foreground text-lg mb-8 leading-relaxed">
              Based in Steinbach, we understand the local market and love helping our community grow by improving the social media playing field. We are a team of creators, strategists, and storytellers obsessed with results.
            </p>
            <Link href="/about#team">
              <Button variant="outline" className="self-start rounded-none border-2 px-8 py-6 font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                Meet The Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container px-4 relative z-10 text-center">
          <h2 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-8">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Level Up?</span>
          </h2>
          <p className="font-mono text-muted-foreground text-xl max-w-2xl mx-auto mb-12">
            Stop blending in. Start standing out. Let's create something extraordinary together.
          </p>
          <Link href="/contact">
            <Button size="lg" className="rounded-none text-xl px-12 py-8 font-bold uppercase tracking-widest bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
              Get A Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
