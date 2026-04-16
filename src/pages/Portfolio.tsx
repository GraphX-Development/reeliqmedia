import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ShortVideo = {
  title: string;
  category: string;
  embedId: string;
  desc: string;
};

type ClientProject = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  mainVideoTitle: string;
  mainVideoDesc: string;
  mainEmbedId: string;
  shorts: ShortVideo[];
};

const YouTubeBadge = () => (
  <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/55 px-4 py-2 shadow-lg backdrop-blur-sm">
    <span className="flex h-8 w-12 items-center justify-center rounded-[0.9rem] bg-[#ff0033] shadow-[0_0_24px_rgba(255,0,51,0.35)]">
      <span
        className="ml-0.5 block h-0 w-0 border-y-[7px] border-y-transparent border-l-[12px] border-l-white"
        aria-hidden="true"
      />
    </span>
    <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/80">
      Watch Short
    </span>
  </div>
);

const ShortsGrid = ({ items }: { items: ShortVideo[] }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((project) => (
        <Dialog key={project.embedId}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="group text-left"
              aria-label={`Open ${project.title}`}
            >
              <article className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/70 hover:shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
                <div className="relative aspect-[9/16] overflow-hidden bg-black">
                  <img
                    src={`https://img.youtube.com/vi/${project.embedId}/maxresdefault.jpg`}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = `https://img.youtube.com/vi/${project.embedId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
                      {project.category}
                    </span>
                    <h4 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-white">
                      {project.title}
                    </h4>
                    <YouTubeBadge />
                  </div>
                </div>
                <div className="border-t border-border px-5 py-5">
                  <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                    {project.desc}
                  </p>
                </div>
              </article>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-lg overflow-hidden border-none bg-black p-0">
            <DialogTitle className="sr-only">{project.title}</DialogTitle>
            <DialogDescription className="sr-only">{project.desc}</DialogDescription>
            <div className="relative aspect-[9/16] w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${project.embedId}?autoplay=1&rel=0&vq=hd1080`}
                title={project.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

const PortfolioBlock = ({
  project,
  isOpen,
  onToggle,
}: {
  project: ClientProject;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[2rem] border transition-all duration-500",
        isOpen
          ? "border-primary/70 bg-card shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
          : "border-border bg-background/70 hover:border-primary/35"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full flex-col gap-8 p-8 text-left md:p-10"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary">
              {project.eyebrow}
            </span>
            <h3 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
              {project.title}
            </h3>
            <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground md:text-base">
              {project.summary}
            </p>
          </div>
          <div className="inline-flex items-center gap-3 self-start rounded-full border border-border bg-black/20 px-5 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              {isOpen ? "Hide Portfolio" : "Open Portfolio"}
            </span>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-primary transition-transform duration-300",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-border px-8 pb-8 pt-8 md:px-10 md:pb-10">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:items-center">
            <div className="overflow-hidden rounded-[1.5rem] border border-border bg-black shadow-[0_16px_50px_rgba(0,0,0,0.26)]">
              <div className="relative aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${project.mainEmbedId}?rel=0&vq=hd1080`}
                  title={project.mainVideoTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-secondary">
                Main Video
              </span>
              <h4 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
                {project.mainVideoTitle}
              </h4>
              <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground md:text-base">
                {project.mainVideoDesc}
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${project.mainEmbedId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block"
              >
                <Button size="lg" className="rounded-none text-sm font-bold uppercase tracking-widest md:text-base">
                  Watch Main Video <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-10">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">
                  Short-Form Cuts
                </span>
                <h5 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
                  Campaign Shorts
                </h5>
              </div>
              <p className="max-w-2xl font-mono text-sm text-muted-foreground">
                Click any short to open the full video in an expanded viewer.
              </p>
            </div>
            <ShortsGrid items={project.shorts} />
          </div>
        </div>
      )}
    </section>
  );
};

export default function Portfolio() {
  const [openProjectId, setOpenProjectId] = useState<string>("fiberscope-meditinc");

  const featuredVideo = {
    title: "Supplement King Promo",
    category: "Viral Short-Form",
    embedId: "7Nj80IS3m5I",
    desc: "A high-energy promotional video designed to stop the scroll and drive engagement.",
  };

  const projects: ClientProject[] = [
    {
      id: "fiberscope-meditinc",
      title: "FIBERSCOPE | MEDITINC",
      eyebrow: "Client Portfolio",
      summary:
        "A technical product showcase built to highlight Meditinc's Fiberscope system through a polished long-form overview and a coordinated set of short-form educational cuts.",
      mainVideoTitle: "Meditinc Full Overview",
      mainVideoDesc: "Comprehensive product overview and demonstration.",
      mainEmbedId: "eH93_kM6ctk",
      shorts: [
        {
          title: "Meditinc Fiberscope",
          category: "Product Demo",
          embedId: "i3YZw8XqglE",
          desc: "Detailed look at the Fiberscope technology.",
        },
        {
          title: "Meditinc Inspection",
          category: "Workflow Demo",
          embedId: "jK8TG_fmBnE",
          desc: "Showcasing the inspection process efficiency.",
        },
        {
          title: "Meditinc Lighting",
          category: "Feature Highlight",
          embedId: "-il1KLepXyM",
          desc: "Demonstrating advanced lighting capabilities.",
        },
      ],
    },
    {
      id: "repix-handyman-services",
      title: "REPIX HANDYMAN SERVICES",
      eyebrow: "Client Portfolio",
      summary:
        "A service-brand case study centered on trust, craftsmanship, and reliable local positioning, combining a hero showcase piece with supporting shorts for sales and awareness.",
      mainVideoTitle: "Repix Service Showcase",
      mainVideoDesc: "Professional showcase highlighting expertise and reliability.",
      mainEmbedId: "Rq_jiv0Ccrw",
      shorts: [
        {
          title: "Repix Handyman",
          category: "Service Promo",
          embedId: "jDNiwkaOaq4",
          desc: "Showcasing professional handyman services.",
        },
        {
          title: "Repix Services",
          category: "Brand Story",
          embedId: "xGfEOCC20Lw",
          desc: "Building trust through authentic service demonstration.",
        },
        {
          title: "Repix Quality",
          category: "Client Testimonial",
          embedId: "EjuobZKe4QQ",
          desc: "Highlighting the quality of work and customer satisfaction.",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <section className="border-b border-border bg-background pt-32 pb-20">
        <div className="container px-4">
          <h1 className="mb-6 font-display text-6xl font-bold uppercase tracking-tighter md:text-8xl">
            Our <span className="text-primary">Work</span>
          </h1>
          <p className="max-w-3xl border-l-4 border-secondary pl-6 font-mono text-xl text-muted-foreground">
            We create content that performs. From viral shorts to cinematic brand films, our work speaks for itself.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-card py-24">
        <div className="container px-4">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="w-full lg:w-1/2">
              <div className="relative mx-auto aspect-[9/16] max-w-sm overflow-hidden rounded-3xl border-4 border-border shadow-2xl lg:mx-0">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${featuredVideo.embedId}?vq=hd1080`}
                  title={featuredVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <span className="mb-2 block font-mono text-sm uppercase tracking-widest text-primary">
                {featuredVideo.category}
              </span>
              <h2 className="mb-6 font-display text-4xl font-bold uppercase tracking-tighter md:text-6xl">
                {featuredVideo.title}
              </h2>
              <p className="mb-8 font-mono text-lg leading-relaxed text-muted-foreground">
                {featuredVideo.desc}
              </p>
              <a href={`https://youtube.com/shorts/${featuredVideo.embedId}`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="rounded-none text-sm font-bold uppercase tracking-widest md:text-base">
                  Watch on YouTube <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24">
        <div className="container px-4">
          <div className="mb-12 max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">
              Client Portfolio Archive
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight md:text-6xl">
              Wrapped Client Blocks
            </h2>
            <p className="mt-4 font-mono text-base leading-relaxed text-muted-foreground">
              Each client lives inside a dedicated portfolio block. Open a block to view the main feature video and the supporting short-form pieces in one place.
            </p>
          </div>

          <div className="space-y-8">
            {projects.map((project) => (
              <PortfolioBlock
                key={project.id}
                project={project}
                isOpen={openProjectId === project.id}
                onToggle={() =>
                  setOpenProjectId((current) =>
                    current === project.id ? "" : project.id
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
