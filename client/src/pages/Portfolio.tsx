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

  const projects = [
    {
      title: "Meditinc Series",
      category: "Educational Reels",
      image: "/images/_MG_0905.jpg", 
      desc: "Simplifying complex medical topics through engaging visual storytelling."
    },
    {
      title: "Local Eats Campaign",
      category: "Brand Storytelling",
      image: "/images/DSC01013.jpg", 
      desc: "Highlighting the best local flavors with cinematic b-roll and sound design."
    },
    {
      title: "Tech Reviews",
      category: "Long-Form Content",
      image: "/images/_MG_0014.jpg", 
      desc: "In-depth product reviews with professional lighting and crisp audio."
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

      {/* Featured Video Section */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 w-full">
              <div className="relative aspect-[9/16] max-w-sm mx-auto lg:mx-0 border-4 border-border rounded-3xl overflow-hidden shadow-2xl">
                <iframe 
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${featuredVideo.embedId}`}
                  title="YouTube video player"
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

      {/* More Projects Grid */}
      <section className="py-24 bg-background min-h-screen">
        <div className="container px-4">
          <h3 className="font-display text-3xl font-bold uppercase mb-12 border-b border-border pb-4">
            More Projects
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group relative aspect-video overflow-hidden border border-border bg-card cursor-pointer">
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col items-center justify-center text-center p-8">
                  <span className="font-mono text-primary text-xs uppercase tracking-widest mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    {project.title}
                  </h3>
                  <p className="font-mono text-gray-300 text-xs max-w-xs mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150 hidden sm:block">
                    {project.desc}
                  </p>
                  <Button variant="outline" className="rounded-full w-12 h-12 p-0 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 translate-y-4 group-hover:translate-y-0 delay-200">
                    <Play className="w-5 h-5 ml-1" />
                  </Button>
                </div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
            ))}
          </div>

          <div className="mt-24 text-center bg-card border border-border p-12">
            <h3 className="font-display text-3xl font-bold uppercase mb-6">See Our Full Feed</h3>
            <p className="font-mono text-muted-foreground mb-8 max-w-xl mx-auto">
              We post daily. Follow us to see our latest work, behind-the-scenes content, and social media tips.
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
