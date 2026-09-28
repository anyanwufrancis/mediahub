import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { MediaPlayer } from "@/components/site/MediaPlayer";
import { StoryCard } from "@/components/site/StoryCard";
import { formatDate, getCategory, storiesOfType } from "@/data/content";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Video — Meridian Originals" },
      {
        name: "description",
        content: "Documentaries, interviews and explainers from the Meridian video desk.",
      },
      { property: "og:title", content: "Video — Meridian Originals" },
      {
        property: "og:description",
        content: "Documentaries, interviews and explainers from the Meridian video desk.",
      },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  const videos = storiesOfType("Video");
  const featured = videos[0]!;
  const rest = videos.slice(1);

  return (
    <main className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Video</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        Documentaries, interviews and explainers from the Meridian video desk.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="glass-panel rounded-3xl p-5 lg:col-span-8">
          <Link to="/story/$slug" params={{ slug: featured.slug }} className="relative block">
            <img
              src={featured.image}
              alt={featured.title}
              width={1024}
              height={576}
              className="aspect-video w-full rounded-2xl object-cover"
            />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full bg-background/70 text-brand shadow-glass backdrop-blur-md">
                <Play className="size-6" />
              </span>
            </span>
            <span className="absolute bottom-3 right-3 rounded-full bg-ink/80 px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {featured.duration}
            </span>
          </Link>
          <div className="mt-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">
              {getCategory(featured.category)?.name}
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold leading-snug">{featured.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{featured.deck}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {formatDate(featured.date)} · {featured.views} views
            </p>
            <div className="mt-4">
              <MediaPlayer duration={featured.duration ?? "12:04"} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Up next</p>
          <ul className="mt-3 space-y-3">
            {rest.map((v) => (
              <li key={v.slug}>
                <Link
                  to="/story/$slug"
                  params={{ slug: v.slug }}
                  className="glass-panel grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-2xl p-3"
                >
                  <img
                    src={v.image}
                    alt=""
                    loading="lazy"
                    width={160}
                    height={90}
                    className="aspect-video w-24 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-sm font-bold">{v.title}</h3>
                    <p className="text-xs text-muted-foreground">{v.duration}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {rest.length > 0 && (
        <section className="pt-14">
          <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">More video</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {rest.map((v) => (
              <StoryCard key={v.slug} story={v} />
            ))}
          </div>
        </section>
      )}
      <div className="h-16" />
    </main>
  );
}
