// Design reminder: cinematic monochrome framing, crisp blue accents, compact copy, and premium motion-led portfolio blocks.
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ExternalLink } from "lucide-react";
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
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ShortVideo = {
  title: string;
  category: string;
  embedId: string;
};

type ClientProject = {
  title: string;
  mainVideoTitle: string;
  mainEmbedId: string;
  shorts: ShortVideo[];
};

const YouTubeBadge = ({ active }: { active: boolean }) => (
  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
    <span
      className={cn(
        "relative flex h-[2.7rem] w-[3.95rem] items-center justify-center overflow-hidden rounded-[0.95rem] border border-white/10 bg-[#ff0033] transition-all duration-300",
        active
          ? "shadow-[0_0_18px_rgba(255,0,51,0.3)] group-hover:scale-[1.04] group-hover:shadow-[0_0_24px_rgba(255,0,51,0.42)] group-active:scale-[1.02]"
          : "scale-95 opacity-82 shadow-[0_0_8px_rgba(255,0,51,0.12)]"
      )}
    >
      <span
        className={cn(
          "absolute inset-y-0 left-[-42%] w-[34%] -skew-x-[18deg] bg-white/18 blur-md transition-transform duration-500",
          active ? "group-hover:translate-x-[320%]" : "translate-x-0 opacity-0"
        )}
      />
      <svg viewBox="0 0 36 24" aria-hidden="true" className="relative z-10 h-[1rem] w-[1rem] fill-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.18)]">
        <path d="M13.2 6.2v11.6L23.6 12 13.2 6.2Z" />
      </svg>
    </span>
  </div>
);

const ShortCard = ({
  project,
  isActive,
}: {
  project: ShortVideo;
  isActive: boolean;
}) => {
  const card = (
    <article
      className={cn(
        "overflow-hidden rounded-[1.5rem] border border-border bg-card transition-all duration-500 ease-out",
        isActive
          ? "scale-100 opacity-100 shadow-[0_20px_58px_rgba(0,0,0,0.24)]"
          : "scale-[0.9] opacity-58 blur-[1px]"
      )}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] bg-black">
          <img
            src={`https://img.youtube.com/vi/${project.embedId}/hqdefault.jpg`}
            alt={project.title}
            className={cn(
              "h-full w-full object-cover transition-transform duration-700",
              isActive ? "group-hover:scale-105" : ""
            )}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = `https://img.youtube.com/vi/${project.embedId}/mqdefault.jpg`;
            }}
          />
        <div
          className={cn(
            "absolute inset-0 transition-all duration-300",
            isActive
              ? "bg-gradient-to-b from-black/60 via-black/10 to-black/75"
              : "bg-gradient-to-b from-black/70 via-black/28 to-black/85"
          )}
        />
        <div className="absolute inset-x-0 top-0 p-4">
          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-[0.35em] transition-all duration-300",
              isActive
                ? "text-primary drop-shadow-[0_0_16px_rgba(7,130,255,0.28)]"
                : "text-primary/60"
            )}
          >
            {project.category}
          </span>
          <h4
            className={cn(
              "mt-2 max-w-[9.5rem] font-display text-[1.35rem] font-bold uppercase tracking-tight transition-all duration-300",
              isActive
                ? "text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)]"
                : "text-white/72"
            )}
          >
            {project.title}
          </h4>
        </div>
        <YouTubeBadge active={isActive} />
      </div>
    </article>
  );

  if (!isActive) {
    return <div className="group block w-full cursor-default select-none text-left">{card}</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="group w-full text-left" aria-label={`Open ${project.title}`}>
          {card}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg overflow-hidden border-none bg-black p-0">
        <DialogTitle className="sr-only">{project.title}</DialogTitle>
        <DialogDescription className="sr-only">Short-form client video.</DialogDescription>
            <div className="relative aspect-[9/16] w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${project.embedId}?autoplay=1&rel=0&playsinline=1&modestbranding=1&hd=1&vq=hd1080`}
                title={project.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
      </DialogContent>
    </Dialog>
  );
};

const ShortsCarousel = ({ items }: { items: ShortVideo[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const loopedItems = [...items, ...items, ...items];

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => setCurrent(api.selectedScrollSnap());
    handleSelect();
    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
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
      <CarouselContent className="-ml-4 py-4 md:py-8">
        {loopedItems.map((project, index) => (
          <CarouselItem
            key={`${project.embedId}-${index}`}
            className="pl-4 basis-[78%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/3"
          >
            <ShortCard project={project} isActive={index === current} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-6 border-border bg-background/90 backdrop-blur" />
      <CarouselNext className="hidden md:flex -right-6 border-border bg-background/90 backdrop-blur" />
    </Carousel>
  );
};

const ProjectSection = ({
  project,
  isOpen,
  onToggle,
}: {
  project: ClientProject;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <section className="bg-card py-6 md:py-8">
    <div className="container px-4">
      <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-background/35 shadow-[0_20px_70px_rgba(0,0,0,0.14)] transition-all duration-500">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition-colors hover:bg-white/[0.03] md:px-8 md:py-7"
        >
          <div className="min-w-0">
            <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">
              Client Project
            </span>
            <div className="mt-3 flex flex-wrap items-center gap-3 md:gap-4">
              <h3 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
                {project.title}
              </h3>
            </div>
          </div>

          <div className="flex shrink-0 items-center">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-3 text-white shadow-[0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md transition-all duration-300 md:px-4">
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all duration-300",
                  isOpen ? "bg-primary shadow-[0_0_18px_rgba(7,130,255,0.65)]" : "bg-white/35"
                )}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/88">
                {isOpen ? "Close Portfolio" : "Open Portfolio"}
              </span>
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 transition-all duration-300",
                  isOpen ? "rotate-180 bg-primary/15 text-primary" : "rotate-0 text-white/80"
                )}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </span>
          </div>
        </button>

        <div
          className={cn(
            "grid transition-all duration-500 ease-out",
            isOpen ? "grid-rows-[1fr] border-t border-border/80" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="px-5 pb-5 pt-1 md:px-8 md:pb-8">
              <div className="overflow-hidden rounded-[1.75rem] border border-border/80 bg-black/10 px-3 py-5 md:px-5 md:py-6">
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">
                      Horizontal Video
                    </span>
                  </div>
                </div>
                <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.35rem] border-4 border-border bg-black shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
                  <div className="relative aspect-video w-full">
                      <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${project.mainEmbedId}?rel=0&playsinline=1&modestbranding=1&hd=1&vq=hd1080`}
                        title={project.mainVideoTitle}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-border/80 bg-black/10 px-3 py-5 md:px-5 md:py-6">
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">
                      Shorts
                    </span>
                    <h4 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
                      Short-Form Cuts
                    </h4>
                  </div>
                </div>
                <div className="mx-auto w-full max-w-5xl px-0 md:px-6">
                  <ShortsCarousel items={project.shorts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function Portfolio() {
  const [openProjects, setOpenProjects] = useState<string[]>([]);

  const featuredVideo = {
    title: "Supplement King Promo",
    category: "Viral Short-Form",
    embedId: "7Nj80IS3m5I",
  };

  const projects: ClientProject[] = [
    {
      title: "FIBERSCOPE | MEDITINC",
      mainVideoTitle: "Meditinc Full Overview",
      mainEmbedId: "eH93_kM6ctk",
      shorts: [
        {
          title: "Meditinc Fiberscope",
          category: "Product Demo",
          embedId: "i3YZw8XqglE",
        },
        {
          title: "Meditinc Inspection",
          category: "Workflow Demo",
          embedId: "jK8TG_fmBnE",
        },
        {
          title: "Meditinc Lighting",
          category: "Feature Highlight",
          embedId: "-il1KLepXyM",
        },
      ],
    },
    {
      title: "REPIX HANDYMAN SERVICES",
      mainVideoTitle: "Repix Service Showcase",
      mainEmbedId: "Rq_jiv0Ccrw",
      shorts: [
        {
          title: "Repix Handyman",
          category: "Service Promo",
          embedId: "jDNiwkaOaq4",
        },
        {
          title: "Repix Services",
          category: "Brand Story",
          embedId: "xGfEOCC20Lw",
        },
        {
          title: "Repix Quality",
          category: "Client Testimonial",
          embedId: "EjuobZKe4QQ",
        },
      ],
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <section className="border-b border-border bg-background pb-20 pt-32">
        <div className="container px-4">
          <h1 className="mb-6 font-display text-6xl font-bold uppercase tracking-tighter md:text-8xl">
            Our <span className="text-primary">Work</span>
          </h1>
          <p className="max-w-2xl border-l-4 border-secondary pl-6 font-mono text-base text-muted-foreground md:text-lg">
            Main videos and short-form cuts from real client campaigns.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-card py-24 md:py-28">
        <div className="container max-w-[108rem] px-4">
          <div className="mx-auto rounded-[2.7rem] border border-white/8 bg-background/40 px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.16)] md:px-10 md:py-12 xl:px-16">
            <div className="mx-auto grid min-h-[46rem] w-full max-w-[78rem] items-center gap-10 lg:grid-cols-[minmax(0,388px)_minmax(0,1fr)] lg:gap-16 xl:max-w-[82rem] xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)] xl:gap-18">
              <div className="w-full lg:justify-self-start lg:ml-3 xl:ml-5">
                <div className="relative mx-auto aspect-[9/16] max-w-[25rem] overflow-hidden rounded-3xl border-4 border-border shadow-2xl lg:mx-0">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${featuredVideo.embedId}?rel=0&playsinline=1&modestbranding=1&hd=1&vq=hd1080`}
                    title={featuredVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="w-full max-w-[39rem] pl-0 lg:pl-1 xl:pl-2">
                <span className="mb-4 block font-mono text-xs uppercase tracking-[0.32em] text-primary md:text-sm">
                  {featuredVideo.category}
                </span>
                <h2 className="mb-6 font-display text-[2.7rem] font-bold uppercase tracking-tighter md:text-5xl xl:text-[4.35rem]">
                  {featuredVideo.title}
                </h2>
                <a
                  href={`https://youtube.com/shorts/${featuredVideo.embedId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="rounded-none px-7 text-xs font-bold uppercase tracking-[0.28em] md:h-13 md:text-sm">
                    Watch on YouTube <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-12">
        <div className="container px-4">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
            Client <span className="text-primary">Projects</span>
          </h2>
        </div>
      </section>

      <div className="border-b border-border bg-background py-6 md:py-8">
        {projects.map((project) => (
          <ProjectSection
            key={project.title}
            project={project}
            isOpen={openProjects.includes(project.title)}
            onToggle={() =>
              setOpenProjects((current) =>
                current.includes(project.title)
                  ? current.filter((title) => title !== project.title)
                  : [...current, project.title]
              )
            }
          />
        ))}
      </div>
    </div>
  );
}
