import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { StoryCard } from "@/components/site/StoryCard";
import { Newsletter } from "@/components/site/Newsletter";
import { MediaPlayer } from "@/components/site/MediaPlayer";
import {
  byDateDesc,
  categories,
  featured,
  formatDate,
  getAuthor,
  getCategory,
  stories,
  storiesOfType,
  trending,
} from "@/data/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian — Technology, business and culture" },
      {
        name: "description",
        content:
          "Reporting, video and podcasts on technology, business and culture from the Meridian newsroom.",
      },
      { property: "og:title", content: "Meridian — Technology, business and culture" },
      {
        property: "og:description",
        content: "Reporting, video and podcasts on technology, business and culture.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const heroAuthor = getAuthor(featured.authorSlug);
  const latest = [...stories].sort(byDateDesc).slice(1, 7);
  const video = storiesOfType("Video")[0]!;
  const podcast = storiesOfType("Podcast")[0]!;

  return (
    <main>
      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-accent" /> Featured story
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              The quiet rise of <span className="text-gradient-brand">ambient computing</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{featured.deck}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                to="/story/$slug"
                params={{ slug: featured.slug }}
                className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-brand"
              >
                Read the story
              </Link>
              <Link
                to="/videos"
                className="rounded-full border border-glass-border bg-glass px-6 py-3 text-sm font-semibold backdrop-blur-md"
              >
                Watch trailer
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-soft text-sm font-bold text-primary-foreground ring-2 ring-background">
                {heroAuthor?.name.charAt(0)}
              </span>
              <p className="text-sm text-muted-foreground">
                By{" "}
                <Link
                  to="/authors/$author"
                  params={{ author: featured.authorSlug }}
                  className="font-semibold text-foreground hover:text-brand"
                >
                  {heroAuthor?.name}
                </Link>{" "}
                · {formatDate(featured.date)} · {featured.readTime}
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-3xl p-3 shadow-glass-lg">
              <img
                src={featured.image}
                alt={featured.imageCaption}
                width={1024}
                height={768}
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-14 sm:px-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$category"
              params={{ category: c.slug }}
              className="glass-panel rounded-full px-5 py-2 text-sm font-semibold transition-colors hover:text-brand"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Latest */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold tracking-tight">Latest</h2>
          <Link to="/category/$category" params={{ category: "technology" }} className="text-sm font-semibold text-brand">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {latest.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">Trending</h2>
        <ol className="glass-panel divide-y divide-glass-border rounded-3xl p-2">
          {trending.map((s, i) => (
            <li key={s.slug}>
              <Link
                to="/story/$slug"
                params={{ slug: s.slug }}
                className="grid grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-background/50"
              >
                <span className="w-8 shrink-0 font-display text-2xl font-bold text-brand/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <img
                  src={s.image}
                  alt=""
                  loading="lazy"
                  width={128}
                  height={80}
                  className="hidden aspect-[16/10] w-20 shrink-0 rounded-xl object-cover sm:block"
                />
                <div className="min-w-0">
                  <h3 className="truncate font-display text-base font-bold sm:text-lg">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {getCategory(s.category)?.name} · {formatDate(s.date)} · {s.views} reads
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Watch + Listen */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-panel rounded-3xl p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="font-display text-xl font-bold tracking-tight">Watch</h2>
              <Link to="/videos" className="text-sm font-semibold text-brand">
                All video
              </Link>
            </div>
            <Link to="/story/$slug" params={{ slug: video.slug }} className="relative block">
              <img
                src={video.image}
                alt={video.title}
                loading="lazy"
                width={1024}
                height={576}
                className="aspect-video w-full rounded-2xl object-cover"
              />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-16 place-items-center rounded-full bg-background/70 text-brand shadow-glass backdrop-blur-md">
                  <Play className="size-6" />
                </span>
              </span>
            </Link>
            <h3 className="mt-4 font-display text-lg font-bold leading-snug">{video.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">Meridian Originals · {video.duration}</p>
          </div>

          <div className="glass-panel rounded-3xl p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="font-display text-xl font-bold tracking-tight">Listen</h2>
              <Link to="/podcasts" className="text-sm font-semibold text-brand">
                All episodes
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={podcast.image}
                alt="Signal & Noise cover art"
                loading="lazy"
                width={512}
                height={512}
                className="size-24 shrink-0 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">Podcast</span>
                <h3 className="mt-1 font-display text-lg font-bold leading-snug">Signal &amp; Noise</h3>
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  Ep. {podcast.episode} · The attention economy, revisited
                </p>
              </div>
            </div>
            <div className="mt-4">
              <MediaPlayer duration={podcast.duration ?? "48:12"} />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-16">
        <Newsletter />
      </div>
    </main>
  );
}
