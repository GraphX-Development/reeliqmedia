import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Play, ExternalLink } from "lucide-react";

export default function Portfolio() {
  const featuredVideo = {
    title: "Supplement King Promo",
    category: "Viral Short-Form",
    embedId: "7Nj80IS3m5I", // Extracted from https://youtube.com/shorts/7Nj80IS3m5I?feature=share
    desc: "A high-energy promotional video designed to stop the scroll and drive engagement."
  };

  const meditincShorts = [
    {
      title: "Meditinc Series",
      category: "Educational Reels",
      video: "/videos/Reel2_comp.mp4",
      desc: "Simplifying complex medical topics through engaging visual storytelling."
    },
    {
      title: "Meditinc Inspection",
      category: "Product Demo",
      video: "/videos/Reel4_comp.mp4",
      desc: "Detailed inspection workflow showcasing product capabilities."
    },
    {
      title: "Meditinc Lighting",
      category: "Feature Highlight",
      video: "/videos/Reel3_comp.mp4",
      desc: "Demonstrating advanced lighting and viewing features."
    }
  ];

  const repixShorts = [
    {
      title: "Repix Handyman",
      category: "Service Promo",
      video: "/videos/Repix2_comp.mp4",
      desc: "Showcasing professional handyman services with dynamic editing."
    },
    {
      title: "Repix Services",
      category: "Brand Story",
      video: "/videos/Repix3_comp.mp4",
      desc: "Building trust through authentic service demonstration."
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
                  src={`https://www.youtube.com/embed/${featuredVideo.embedId}`}
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
          
          {/* Meditinc Shorts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {meditincShorts.map((project, index) => (
              <div key={index} className="group relative aspect-[9/16] overflow-hidden border border-border bg-card cursor-pointer grayscale hover:grayscale-0 transition-all duration-500">
                <div className="absolute inset-0 bg-black/60 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col items-center justify-center text-center p-8">
                  <span className="font-mono text-primary text-xs uppercase tracking-widest mb-2 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {project.category}
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase text-white mb-4 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    {project.title}
                  </h3>
                  <p className="font-mono text-gray-300 text-[10px] max-w-xs mb-6 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 delay-150 hidden sm:block">
                    {project.desc}
                  </p>
                </div>
                <video 
                  src={project.video} 
                  className="w-full h-full object-cover transition-all duration-700"
                  muted
                  loop
                  playsInline
                  onMouseOver={(e) => e.currentTarget.play()}
                  onMouseOut={(e) => e.currentTarget.pause()}
                />
              </div>
            ))}
          </div>

          {/* Meditinc YouTube Video */}
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video w-full border-4 border-border rounded-xl overflow-hidden shadow-xl grayscale hover:grayscale-0 transition-all duration-500">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/eH93_kM6ctk?si=e3HF7LYAIebsAPI2"
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
        </div>
      </section>

      {/* Repix Section */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container px-4">
          <h3 className="font-display text-3xl font-bold uppercase mb-12 border-b border-border pb-4">
            Repix Handyman Services
          </h3>

          {/* Repix Website Video */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative aspect-video w-full border-4 border-border rounded-xl overflow-hidden shadow-xl grayscale hover:grayscale-0 transition-all duration-500">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/Rq_jiv0Ccrw?si=zKPVbMu4ZP3VDUEf"
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

          {/* Repix Shorts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {repixShorts.map((project, index) => (
              <div key={index} className="group relative aspect-[9/16] overflow-hidden border border-border bg-card cursor-pointer grayscale hover:grayscale-0 transition-all duration-500">
                <div className="absolute inset-0 bg-black/60 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col items-center justify-center text-center p-8">
                  <span className="font-mono text-primary text-xs uppercase tracking-widest mb-2 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {project.category}
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase text-white mb-4 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    {project.title}
                  </h3>
                  <p className="font-mono text-gray-300 text-[10px] max-w-xs mb-6 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 delay-150 hidden sm:block">
                    {project.desc}
                  </p>
                </div>
                <video 
                  src={project.video} 
                  className="w-full h-full object-cover transition-all duration-700"
                  muted
                  loop
                  playsInline
                  onMouseOver={(e) => e.currentTarget.play()}
                  onMouseOut={(e) => e.currentTarget.pause()}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="text-center bg-card border border-border p-12">
            <h3 className="font-display text-3xl font-bold uppercase mb-6">See Our Full Feed</h3>
            <p className="font-mono text-muted-foreground mb-8 max-w-xl mx-auto">
              We post weekly. Follow us to see our latest work, behind-the-scenes content, and social media tips.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.instagram.com/reeliqmedia/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-none text-sm md:text-base font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                  Instagram
                </Button>
              </a>
              <a href="https://www.tiktok.com/@reeliqmedia" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-none text-sm md:text-base font-bold uppercase tracking-widest hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-colors">
                  TikTok
                </Button>
              </a>
              <a href="https://www.youtube.com/@ReelIQMedia" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-none text-sm md:text-base font-bold uppercase tracking-widest hover:bg-foreground hover:text-background hover:border-foreground transition-colors">
                  YouTube
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
