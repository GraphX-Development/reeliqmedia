import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-24 md:pt-32 pb-20 bg-card border-b border-border">
        <div className="container px-4">
          <h1 className="font-display text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-6">
            About <span className="text-primary">Us</span>
          </h1>
          <p className="font-mono text-muted-foreground text-xl max-w-3xl border-l-4 border-secondary pl-6">
            We are a creative agency dedicated to helping businesses find their voice in the digital noise.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary z-0"></div>
              <img 
                src="/images/_MG_0905.jpg" 
                alt="Editing and Post-Production" 
                className="relative z-10 w-full h-auto grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl"
              />
            </div>
            
            <div>
              <h2 className="font-display text-4xl font-bold uppercase tracking-tighter mb-8">
                Precision & <span className="text-secondary">Passion</span>
              </h2>
              <div className="space-y-6 font-mono text-muted-foreground">
                <p>
                  At Reel IQ Media, we believe that every brand has a story worth telling. But in today's fast-paced digital landscape, telling that story isn't enough—you need to shout it.
                </p>
                <p>
                  Our approach combines cinematic production quality with data-driven marketing strategies. We don't just make things look good; we make sure they perform. From the initial concept to the final cut, we are obsessed with the details.
                </p>
                <p>
                  Whether you're a local startup or an established brand, we bring the same level of intensity and professionalism to every project.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Professional Equipment",
                  "Data-Driven Strategy",
                  "Fast Turnaround",
                  "Local Expertise",
                  "Creative Storytelling",
                  "Results Focused"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5" />
                    <span className="font-bold uppercase text-sm tracking-wider">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-card border-b border-border">
        <div className="container px-4">
          <div className="text-center mb-16">
            <span className="font-mono text-primary text-sm uppercase tracking-widest">The Minds Behind The Lens</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mt-4">
              Meet The <span className="text-secondary">Team</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="group relative border border-border bg-background p-4 hover:border-primary transition-all duration-300">
              <div className="aspect-video overflow-hidden mb-8 relative">
                {/* Placeholder for the "two dudes" pic mentioned by user, assuming it's one of the provided images or will be added later. 
                    Based on file list, I'll use a generic placeholder or one of the provided ones if it fits. 
                    The user mentioned "pic with two dudes in about us its chris and pavel". 
                    I don't see a file clearly named "two dudes", but I'll use _MG_1012.jpg as a placeholder or just a div if not sure.
                    Actually, let's use the filming one as a placeholder for now since I don't have a specific "two dudes" file identified with certainty 
                    other than potentially one of the _MG files. I'll use a generic placeholder approach for the image source if I can't identify it, 
                    but I'll use one of the uploaded ones to be safe. 
                    Wait, looking at the file list: _MG_0014.jpg, _MG_1012.jpg, DSC01013.jpg, _MG_0905.jpg, _MG_0857.jpg.
                    _MG_1012 is filming. _MG_0905 is editing. _MG_0857 is writing. DSC01013 is clock. _MG_0014 is likely the one.
                */}
                <img 
                  src="/images/_MG_0932.jpg" 
                  alt="Chris and Pavel" 
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
              <div className="text-center">
                <h3 className="font-display text-3xl font-bold uppercase mb-2">Chris & Pavel</h3>
                <p className="font-mono text-primary text-sm uppercase tracking-widest mb-6">Co-Founders / Lead Creatives</p>
                <p className="font-mono text-muted-foreground max-w-2xl mx-auto mb-8">
                  The dynamic duo behind Reel IQ Media. With a shared passion for getting results on social media, Chris and Pavel combined their skills to create an agency that delivers more than just views—we deliver value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-0 bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 lg:p-24 flex flex-col justify-center order-2 lg:order-1">
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">
              Proudly <span className="text-primary">Local</span>
            </h2>
            <p className="font-mono text-muted-foreground text-lg mb-8 leading-relaxed">
              Based in Steinbach, we understand the local market and love helping our community grow by improving the social media playing field. We are a team of creators, strategists, and storytellers obsessed with results.
            </p>
            <Link href="/contact">
              <Button className="self-start rounded-none px-6 py-4 md:px-8 md:py-6 font-bold uppercase tracking-widest">
                Work With Us
              </Button>
            </Link>
          </div>
          <div className="relative min-h-[400px] lg:h-auto order-1 lg:order-2 border-l border-border">
            <img 
              src="/images/DSC01013.jpg" 
              alt="Steinbach Clock Tower" 
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 object-right"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
