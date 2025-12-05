import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Play } from "lucide-react";

export default function Portfolio() {
  const projects = [
    {
      title: "Supplement King",
      category: "Promotional Video",
      image: "/images/_MG_1012.jpg", // Using filming image as placeholder
      desc: "High-energy promotional content for a leading supplement retailer."
    },
    {
      title: "Meditinc",
      category: "Social Reels",
      image: "/images/_MG_0905.jpg", // Using editing image as placeholder
      desc: "A series of educational and engaging reels for the medical industry."
    },
    {
      title: "Local Eats",
      category: "Brand Story",
      image: "/images/DSC01013.jpg", // Using clock tower/local image
      desc: "Showcasing the vibrant local food scene in Steinbach."
    },
    {
      title: "Tech Review",
      category: "YouTube Content",
      image: "/images/_MG_0014.jpg", // Using monitor image
      desc: "In-depth tech reviews with cinematic b-roll and crisp audio."
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container px-4">
          <h1 className="font-display text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-6">
            Our <span className="text-primary">Work</span>
          </h1>
          <p className="font-mono text-muted-foreground text-xl max-w-3xl border-l-4 border-secondary pl-6">
            Results speak louder than words. Check out some of our recent projects and see the difference quality makes.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 bg-card min-h-screen">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group relative aspect-video overflow-hidden border border-border bg-background cursor-pointer">
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col items-center justify-center text-center p-8">
                  <span className="font-mono text-primary text-sm uppercase tracking-widest mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {project.category}
                  </span>
                  <h3 className="font-display text-4xl font-bold uppercase text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    {project.title}
                  </h3>
                  <p className="font-mono text-gray-300 text-sm max-w-md mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                    {project.desc}
                  </p>
                  <Button variant="outline" className="rounded-full w-16 h-16 p-0 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 translate-y-4 group-hover:translate-y-0 delay-200">
                    <Play className="w-6 h-6 ml-1" />
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

          <div className="mt-24 text-center">
            <h3 className="font-display text-3xl font-bold uppercase mb-6">Want to see more?</h3>
            <p className="font-mono text-muted-foreground mb-8">
              Follow us on social media for our latest drops and behind-the-scenes content.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="rounded-none font-bold uppercase tracking-widest">
                Instagram
              </Button>
              <Button variant="outline" className="rounded-none font-bold uppercase tracking-widest">
                TikTok
              </Button>
              <Button variant="outline" className="rounded-none font-bold uppercase tracking-widest">
                YouTube
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
