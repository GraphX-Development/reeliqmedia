import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Play, ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Reusable Reel Carousel Component
const ReelCarousel = ({ items }: { items: any[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Duplicate items multiple times to ensure smooth infinite scrolling
  // 5x duplication ensures there's always enough content for the loop to feel seamless
  const loopedItems = [...items, ...items, ...items, ...items, ...items];

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "center",
        loop: true,
        skipSnaps: false,
        dragFree: false,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4 py-12">
        {loopedItems.map((project, index) => {
          // Calculate the effective index relative to the original items
          // This helps with unique keys if needed, though index is fine for static list
          return (
            <CarouselItem key={index} className="pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3 transition-all duration-500">
              <Dialog>
                <DialogTrigger asChild>
                  <div 
                    className={cn(
                      "group relative aspect-[9/16] overflow-hidden border border-border bg-card cursor-pointer rounded-xl transition-all duration-500 ease-out",
                      // Mobile: Always color, normal scale, no blur
                      "grayscale-0 scale-100 blur-none opacity-100",
                      // Desktop: Grayscale default, blur inactive, scale inactive
                      "md:grayscale md:hover:grayscale-0",
                      // Active state (Desktop only effects)
                      index === current 
                        ? "md:scale-110 md:blur-none md:grayscale-0 md:z-10 md:shadow-2xl md:opacity-100" 
                        : "md:scale-90 md:blur-[2px] md:opacity-60"
                    )}
                  >
                    <div className={cn(
                      "absolute inset-0 bg-black/60 transition-opacity duration-300 z-20 flex flex-col items-center justify-center text-center p-4",
                      // Mobile: Always show text
                      "opacity-100",
                      // Desktop: Show text only on hover or active
                      index === current ? "md:opacity-0 md:group-hover:opacity-100" : "md:opacity-0"
                    )}>
                      <span className="font-mono text-primary text-[10px] uppercase tracking-widest mb-2">
                        {project.category}
                      </span>
                      <h3 className="font-display text-lg font-bold uppercase text-white mb-2">
                        {project.title}
                      </h3>
                      <Play className="w-12 h-12 text-white opacity-80 mt-4" />
                      <p className="font-mono text-gray-300 text-[8px] max-w-xs mt-4 hidden sm:block">
                        {project.desc}
                      </p>
                    </div>
                    {/* Static YouTube Thumbnail for Card (High Quality) */}
                    <div className="w-full h-full bg-black">
                      <img 
                        src={`https://img.youtube.com/vi/${project.embedId}/maxresdefault.jpg`}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to hqdefault if maxresdefault is unavailable
                          e.currentTarget.src = `https://img.youtube.com/vi/${project.embedId}/hqdefault.jpg`;
                        }}
                      />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-lg p-0 border-none bg-black overflow-hidden">
                  <DialogTitle className="sr-only">{project.title}</DialogTitle>
                  <DialogDescription className="sr-only">{project.desc}</DialogDescription>
                  <div className="relative aspect-[9/16] w-full">
                    <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${project.embedId}?autoplay=1&rel=0&vq=hd1080`}
                      title={project.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-4" />
      <CarouselNext className="hidden md:flex -right-4" />
    </Carousel>
  );
};

export default function Portfolio() {
  const featuredVideo = {
    title: "Supplement King Promo",
    category: "Viral Short-Form",
    embedId: "7Nj80IS3m5I", // Extracted from https://youtube.com/shorts/7Nj80IS3m5I?feature=share
    desc: "A high-energy promotional video designed to stop the scroll and drive engagement."
  };

  const meditincShorts = [
    {
      title: "Meditinc Fiberscope",
      category: "Product Demo",
      embedId: "i3YZw8XqglE",
      desc: "Detailed look at the Fiberscope technology."
    },
    {
      title: "Meditinc Inspection",
      category: "Workflow Demo",
      embedId: "jK8TG_fmBnE",
      desc: "Showcasing the inspection process efficiency."
    },
    {
      title: "Meditinc Lighting",
      category: "Feature Highlight",
      embedId: "-il1KLepXyM",
      desc: "Demonstrating advanced lighting capabilities."
    }
  ];

  const repixShorts = [
    {
      title: "Repix Handyman",
      category: "Service Promo",
      embedId: "jDNiwkaOaq4",
      desc: "Showcasing professional handyman services."
    },
    {
      title: "Repix Services",
      category: "Brand Story",
      embedId: "xGfEOCC20Lw",
      desc: "Building trust through authentic service demonstration."
    },
    {
      title: "Repix Quality",
      category: "Client Testimonial",
      embedId: "EjuobZKe4QQ",
      desc: "Highlighting the quality of work and customer satisfaction."
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-32 pb-20 bg-background border-b border-border">
        <div className="container px-4">
          <h1 className="font-display text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-6">
            Our <span className="text-primary">Work</span>
          </h1>
          <p className="font-mono text-muted-foreground text-xl max-w-3xl border-l-4 border-secondary pl-6">
            We create content that performs. From viral shorts to cinematic brand films, our work speaks for itself.
          </p>
        </div>
      </section>

      {/* Featured Video Section (Supplement King) */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 w-full">
              <div className="relative aspect-[9/16] max-w-sm mx-auto lg:mx-0 border-4 border-border rounded-3xl overflow-hidden shadow-2xl">
                <iframe 
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${featuredVideo.embedId}?vq=hd1080`}
                  title={featuredVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <span className="font-mono text-primary text-sm uppercase tracking-widest mb-2 block">
                {featuredVideo.category}
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6">
                {featuredVideo.title}
              </h2>
              <p className="font-mono text-muted-foreground text-lg mb-8 leading-relaxed">
                {featuredVideo.desc}
              </p>
              <div className="flex gap-4">
                <a href={`https://youtube.com/shorts/${featuredVideo.embedId}`} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="rounded-none text-sm md:text-base font-bold uppercase tracking-widest">
                    Watch on YouTube <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meditinc Section */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container px-4">
          <h3 className="font-display text-3xl font-bold uppercase mb-12 border-b border-border pb-4">
            Meditinc Series
          </h3>
          
          {/* Meditinc YouTube Video (Main) */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative aspect-video w-full border-4 border-border rounded-xl overflow-hidden shadow-xl grayscale hover:grayscale-0 transition-all duration-500">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/eH93_kM6ctk?si=e3HF7LYAIebsAPI2&vq=hd1080"
                title="Meditinc Full Overview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <h4 className="font-display text-2xl font-bold uppercase mb-2">Meditinc Full Overview</h4>
              <p className="font-mono text-muted-foreground text-sm">Comprehensive product overview and demonstration.</p>
            </div>
          </div>

          {/* Meditinc Shorts Carousel */}
          <div className="max-w-6xl mx-auto px-4 md:px-12">
            <ReelCarousel items={meditincShorts} />
          </div>
        </div>
      </section>

      {/* Repix Section */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container px-4">
          <h3 className="font-display text-3xl font-bold uppercase mb-12 border-b border-border pb-4">
            Repix Handyman Services
          </h3>

          {/* Repix Website Video (Main) */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative aspect-video w-full border-4 border-border rounded-xl overflow-hidden shadow-xl grayscale hover:grayscale-0 transition-all duration-500">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/Rq_jiv0Ccrw?si=zKPVbMu4ZP3VDUEf&vq=hd1080"
                title="Repix Handyman Services"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <h4 className="font-display text-2xl font-bold uppercase mb-2">Repix Service Showcase</h4>
              <p className="font-mono text-muted-foreground text-sm">Professional showcase highlighting expertise and reliability.</p>
            </div>
          </div>

          {/* Repix Shorts Carousel */}
          <div className="max-w-6xl mx-auto px-4 md:px-12">
            <ReelCarousel items={repixShorts} />
          </div>
        </div>
      </section>
    </div>
  );
}
