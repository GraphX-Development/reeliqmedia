// Design reminder: cinematic monochrome framing, crisp blue accents, compact copy, and premium motion-led portfolio blocks.
import { useEffect, useRef, useState, type TouchEvent } from "react";
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
import { cn } from "@/lib/utils";

type ShortVideo = {
  title: string;
  category: string;
  embedId: string;
};

type HorizontalVideo = {
  title: string;
  summary: string;
  embedId: string;
  spineLabel: string;
};

type ClientProject = {
  title: string;
  horizontalVideos: HorizontalVideo[];
  shorts: ShortVideo[];
};

const ShortCard = ({
  project,
  isActive,
  onActivate,
  onSwipePrev,
  onSwipeNext,
}: {
  project: ShortVideo;
  isActive: boolean;
  onActivate: () => void;
  onSwipePrev: () => void;
  onSwipeNext: () => void;
}) => {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const handledSwipeRef = useRef(false);
  const [iframeReady, setIframeReady] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setIframeReady(false);
      return;
    }

    setIframeReady(false);
  }, [isActive, project.embedId]);

  const handleSwipeStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    handledSwipeRef.current = false;
  };

  const handleSwipeMove = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current || handledSwipeRef.current) return;
    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    if (Math.abs(deltaX) > 18 && Math.abs(deltaY) < 28) {
      event.preventDefault();
    }
  };

  const handleSwipeEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current || handledSwipeRef.current) {
      touchStartRef.current = null;
      handledSwipeRef.current = false;
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    if (Math.abs(deltaX) > 52 && Math.abs(deltaX) > Math.abs(deltaY) + 12) {
      handledSwipeRef.current = true;
      if (deltaX < 0) onSwipeNext();
      if (deltaX > 0) onSwipePrev();
    }

    touchStartRef.current = null;
    handledSwipeRef.current = false;
  };

  return (
    <article
      onClick={() => {
        if (!isActive) onActivate();
      }}
      className={cn(
        "overflow-hidden rounded-[1.75rem] border border-border bg-card transition-all duration-500 ease-out",
        isActive
          ? "scale-100 opacity-100 shadow-[0_20px_58px_rgba(0,0,0,0.24)]"
          : "scale-[0.9] cursor-pointer opacity-55 blur-[0.35px] hover:opacity-85"
      )}
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.75rem] bg-black">
        <img
          src={`https://img.youtube.com/vi/${project.embedId}/hqdefault.jpg`}
          alt={project.title}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300",
            isActive && iframeReady ? "opacity-0" : "opacity-100"
          )}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = `https://img.youtube.com/vi/${project.embedId}/mqdefault.jpg`;
          }}
        />

        {isActive ? (
          <iframe
            className={cn(
              "absolute inset-0 h-full w-full transition-opacity duration-300",
              iframeReady ? "opacity-100" : "opacity-0"
            )}
            src={`https://www.youtube.com/embed/${project.embedId}?rel=0&controls=1&fs=1&playsinline=1&enablejsapi=1&modestbranding=1&hd=1&vq=hd1080`}
            title={project.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setIframeReady(true)}
          />
        ) : (
          <div className="pointer-events-none absolute inset-0 bg-black/38" />
        )}
      </div>
    </article>
  );
};

const ShortsCarousel = ({ items }: { items: ShortVideo[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const loopedItems = [...items, ...items, ...items];

  const activateIndex = (index: number) => {
    if (!api) return;
    api.scrollTo(index);
  };

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
      className="w-full overflow-visible px-1 sm:px-0"
    >
      <CarouselContent className="-ml-3 py-4 md:-ml-4 md:py-8 cursor-grab active:cursor-grabbing">
        {loopedItems.map((project, index) => (
          <CarouselItem
            key={`${project.embedId}-${index}`}
            className="pl-3 basis-[74%] select-none sm:pl-4 sm:basis-[56%] lg:basis-[34%] xl:basis-[34%]"
          >
            <ShortCard
              project={project}
              isActive={index === current}
              onActivate={() => activateIndex(index)}
              onSwipePrev={() => api?.scrollPrev()}
              onSwipeNext={() => api?.scrollNext()}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-1 top-1/2 flex h-8 w-8 -translate-y-1/2 border-white/12 bg-black/72 text-white shadow-[0_10px_24px_rgba(0,0,0,0.3)] backdrop-blur sm:left-2 sm:h-9 sm:w-9 md:left-0 md:h-11 md:w-11" />
      <CarouselNext className="right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 border-white/12 bg-black/72 text-white shadow-[0_10px_24px_rgba(0,0,0,0.3)] backdrop-blur sm:right-2 sm:h-9 sm:w-9 md:right-0 md:h-11 md:w-11" />
    </Carousel>
  );
};

const HorizontalVideoShelf = ({ videos }: { videos: HorizontalVideo[] }) => {
  const [orderedVideos, setOrderedVideos] = useState(videos);

  useEffect(() => {
    setOrderedVideos(videos);
  }, [videos]);

  const activeVideo = orderedVideos[0] ?? videos[0];
  const shelfVideos = orderedVideos.slice(1);

  const getFixedVideoNumber = (video: HorizontalVideo) => {
    const fingerprint = `${video.spineLabel} ${video.title}`.toLowerCase();
    if (fingerprint.includes("anaconda")) return "01";
    if (fingerprint.includes("strahl")) return "02";
    if (fingerprint.includes("miniflex")) return "03";

    const originalIndex = videos.findIndex((entry) => entry.embedId === video.embedId);
    return String((originalIndex >= 0 ? originalIndex : 0) + 1).padStart(2, "0");
  };

  const bringToFront = (index: number) => {
    setOrderedVideos((current) => {
      if (index <= 0 || index >= current.length) return current;
      const next = [...current];
      [next[0], next[index]] = [next[index], next[0]];
      return next;
    });
  };

  if (!activeVideo) return null;

  return (
    <div className="space-y-5">
      <div className="space-y-4 md:hidden">
        <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.28)]">
          <div className="relative overflow-hidden">
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${activeVideo.embedId}?rel=0&playsinline=1&modestbranding=1&hd=1&vq=hd1080`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
          <div className="grid min-w-0 gap-4 border-t border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold tracking-[0.28em] text-primary">
                {getFixedVideoNumber(activeVideo)}
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
                {activeVideo.spineLabel}
              </p>
            </div>
            <div className="min-w-0">
              <h5 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                {activeVideo.title}
              </h5>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{activeVideo.summary}</p>
            </div>
          </div>
        </div>
        <div className="px-1 pb-1">
          <div className="flex flex-col gap-1.5 items-stretch">
            {shelfVideos.map((video, shelfIndex) => {
              const swapIndex = orderedVideos.findIndex((entry) => entry.embedId === video.embedId);
              return (
                <button
                  key={video.embedId}
                  type="button"
                  onClick={() => bringToFront(swapIndex)}
                  className="group relative flex h-[3.9rem] w-full cursor-pointer items-stretch overflow-hidden rounded-[1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))] text-left shadow-[0_16px_28px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out hover:z-10 hover:border-primary/45 hover:shadow-[0_20px_36px_rgba(7,130,255,0.14)]"
                  style={{ zIndex: shelfVideos.length - shelfIndex }}
                >
                  <div className="absolute inset-x-[6%] top-[0.38rem] h-[2px] rounded-full bg-white/35 blur-[0.5px]" />
                  <div className="absolute inset-x-[10%] bottom-0 h-[1px] bg-black/30" />
                  <div className="flex h-full w-full items-center gap-1.5 overflow-hidden rounded-[0.9rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015))] px-2.5 py-[0.45rem]">
                    <span className="shrink-0 font-mono text-[0.64rem] font-bold tracking-[0.2em] text-white/38">
                      {getFixedVideoNumber(video)}
                    </span>
                    <div className="min-w-0 overflow-hidden">
                      <div className="flex h-[1.6rem] flex-col justify-center overflow-hidden">
                        <span className="block truncate font-mono text-[0.5rem] uppercase tracking-[0.2em] leading-none text-primary/90">
                          {video.spineLabel}
                        </span>
                        <span className="mt-0.5 block truncate font-mono text-[0.48rem] uppercase tracking-[0.12em] leading-none text-white/46">
                          {video.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hidden md:block [perspective:2400px]">
        <div className="flex min-h-[29rem] items-stretch gap-4 overflow-visible rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4 shadow-[0_22px_64px_rgba(0,0,0,0.2)] [transform-style:preserve-3d] xl:p-5">
          <div className="flex min-w-0 flex-[1.55] flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.28)]">
            <div className="relative overflow-hidden pt-5 pb-6">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-5 bg-[linear-gradient(180deg,rgba(255,255,255,0.52),rgba(255,255,255,0.18)_42%,rgba(120,190,255,0.08))] opacity-95 backdrop-blur-xl" />
              <div className="pointer-events-none absolute left-[12%] top-0 h-10 w-[38%] rounded-full bg-white/35 blur-2xl" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-[linear-gradient(0deg,rgba(255,255,255,0.4),rgba(255,255,255,0.12)_48%,rgba(120,190,255,0.04))] opacity-90 backdrop-blur-xl" />
              <div className="pointer-events-none absolute bottom-0 right-[14%] h-10 w-[34%] rounded-full bg-sky-200/20 blur-2xl" />
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <iframe
                  key={activeVideo.embedId}
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${activeVideo.embedId}?rel=0&playsinline=1&modestbranding=1&hd=1&vq=hd1080`}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="grid min-w-0 gap-4 border-t border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 xl:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)] xl:items-start xl:p-6">
              <div className="flex items-center gap-3 xl:pt-1">
                <span className="font-mono text-sm font-bold tracking-[0.28em] text-primary">
                  {getFixedVideoNumber(activeVideo)}
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-primary">
                  {activeVideo.spineLabel}
                </p>
              </div>
              <div className="min-w-0">
                <h5 className="font-display text-[2rem] font-bold uppercase leading-[0.95] tracking-tight text-white xl:text-[2.35rem]">
                  {activeVideo.title}
                </h5>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/72 xl:text-[0.95rem]">
                  {activeVideo.summary}
                </p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-stretch gap-3 [transform-style:preserve-3d]">
            {shelfVideos.map((video, shelfIndex) => {
              const swapIndex = shelfIndex + 1;
              return (
                <button
                  key={video.embedId}
                  type="button"
                  onClick={() => bringToFront(swapIndex)}
                  className="group relative flex w-[5.6rem] shrink-0 cursor-pointer items-stretch overflow-visible rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))] text-left shadow-[0_22px_45px_rgba(0,0,0,0.22)] transition-all duration-500 ease-out hover:border-primary/45 hover:shadow-[0_24px_55px_rgba(7,130,255,0.18)]"
                  style={{ transform: `rotateY(-28deg) translateZ(${18 - shelfIndex * 8}px)` }}
                >
                  <div className="absolute inset-y-[6%] left-[0.42rem] w-[2px] rounded-full bg-white/35 blur-[0.5px]" />
                  <div className="absolute inset-y-[10%] right-0 w-[1px] bg-black/30" />
                  <div className="flex min-h-full w-full flex-col justify-between rounded-[1.1rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015))] px-3 py-5">
                    <span className="font-mono text-[0.78rem] font-bold tracking-[0.28em] text-white/38 [text-orientation:mixed] [writing-mode:vertical-rl]">
                      {getFixedVideoNumber(video)}
                    </span>
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.34em] text-primary/90 [text-orientation:mixed] [writing-mode:vertical-rl]">
                      {video.spineLabel}
                    </span>
                    <span className="font-mono text-[0.56rem] uppercase tracking-[0.28em] text-white/46 [text-orientation:mixed] [writing-mode:vertical-rl]">
                      {video.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
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
}) => {
  return (
    <section className="bg-card py-6 md:py-8">
      <div className="container px-4">
        <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-background/35 shadow-[0_20px_70px_rgba(0,0,0,0.14)] transition-all duration-500">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            className="flex w-full flex-col items-start gap-5 px-5 py-5 text-left transition-colors hover:bg-white/[0.03] md:flex-row md:items-center md:justify-between md:gap-6 md:px-8 md:py-7"
          >
            <div className="min-w-0 max-w-4xl">
              <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">
                Client Project
              </span>
              <div className="mt-3 flex flex-wrap items-center gap-3 md:gap-4">
                <h3 className="font-display text-[2.35rem] font-bold uppercase leading-[0.95] tracking-tight sm:text-[2.85rem] md:text-5xl">
                  {project.title}
                </h3>
              </div>
            </div>

            <div className="flex w-full shrink-0 items-center md:w-auto">
              <span className="inline-flex w-full items-center justify-between gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-white shadow-[0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md transition-all duration-300 md:w-auto md:px-4">
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-all duration-300",
                      isOpen ? "bg-primary shadow-[0_0_18px_rgba(7,130,255,0.65)]" : "bg-white/35"
                    )}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/88 sm:text-[11px]">
                    {isOpen ? "Close Portfolio" : "Open Portfolio"}
                  </span>
                </span>
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 transition-all duration-300",
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
                <div className="rounded-[1.75rem] bg-black/10 px-3 py-5 md:px-5 md:py-6">
                  <div>
                    <div className="mb-5 flex items-end justify-between gap-4">
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">
                          Horizontal Video
                        </span>
                      </div>
                    </div>
                    <HorizontalVideoShelf videos={project.horizontalVideos} />
                  </div>

                  <div className="mt-8">
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
      </div>
    </section>
  );
};

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
      horizontalVideos: [
        {
          title: "MiniFlex Camera Product Video",
          summary:
            "A focused product reel for the MiniFlex plumbing camera, presenting the compact system as a tight-radius inspection tool for FIBERSCOPE | MEDITINC.",
          embedId: "3vsP-uEjZdU",
          spineLabel: "MiniFlex",
        },
        {
          title: "Downhole Well Camera Product Video",
          summary:
            "A STRAHL HD downhole well camera showcase built around deep-well inspection, positioning the unit as a rugged, high-clarity solution for FIBERSCOPE | MEDITINC.",
          embedId: "HL08TPlCS94",
          spineLabel: "STRAHL HD",
        },
        {
          title: "Anaconda Pipe Camera Product Video",
          summary:
            "A product reel for the Anaconda pipe camera that emphasizes the system as a capable pipe-inspection option for FIBERSCOPE | MEDITINC.",
          embedId: "Ezi1Z0gFEoo",
          spineLabel: "Anaconda",
        },
      ],
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
      horizontalVideos: [
        {
          title: "Repix Service Showcase",
          summary:
            "A broader brand reel presenting REPIX Handyman Services through a polished service-overview format.",
          embedId: "Rq_jiv0Ccrw",
          spineLabel: "Repix",
        },
      ],
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
      <section className="border-b border-border bg-background pb-20 pt-40 md:pt-44">
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
            <div className="mx-auto grid min-h-[42rem] w-full max-w-[76rem] items-center gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-18 xl:max-w-[80rem] xl:grid-cols-[minmax(0,356px)_minmax(0,1fr)] xl:gap-20">
              <div className="w-full lg:justify-self-start lg:ml-2 xl:ml-4">
                <div className="relative mx-auto aspect-[9/16] max-w-[19.75rem] overflow-hidden rounded-3xl border-4 border-border shadow-2xl lg:mx-0 xl:max-w-[21rem]">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${featuredVideo.embedId}?rel=0&controls=1&fs=1&playsinline=1&enablejsapi=1&modestbranding=1&hd=1&vq=hd1080`}
                    title={featuredVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="w-full max-w-[36rem] pl-0 lg:pl-2 xl:pl-3">
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
