import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaPlayer } from "@/components/site/MediaPlayer";
import { byPopularity, formatDate, getAuthor, storiesOfType } from "@/data/content";

export const Route = createFileRoute("/podcasts")({
  head: () => ({
    meta: [
      { title: "Podcasts — Signal & Noise from Meridian" },
      {
        name: "description",
        content: "Signal & Noise and other Meridian podcasts: weekly conversations on technology, business and culture.",
      },
      { property: "og:title", content: "Podcasts — Signal & Noise from Meridian" },
      {
        property: "og:description",
        content: "Weekly conversations on technology, business and culture from the Meridian newsroom.",
      },
    ],
  }),
  component: PodcastsPage,
});

function PodcastsPage() {
  const episodes = storiesOfType("Podcast");
  const latest = episodes[0]!;
  const popular = [...episodes].sort(byPopularity);

  return (
    <main className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Podcasts</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        Signal &amp; Noise, our weekly conversation on the ideas shaping the next decade.
      </p>

      <div className="glass-panel mt-8 rounded-3xl p-5 sm:p-8">
        <div className="grid items-center gap-6 md:grid-cols-[auto_minmax(0,1fr)]">
          <img
            src={latest.image}
            alt="Signal & Noise cover art"
            width={512}
            height={512}
            className="size-40 rounded-3xl object-cover sm:size-48"
          />
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Episode {latest.episode} · {latest.duration}
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold leading-snug sm:text-3xl">{latest.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{latest.deck}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Hosted by {getAuthor(latest.authorSlug)?.name} · {formatDate(latest.date)}
            </p>
            <div className="mt-4">
              <MediaPlayer duration={latest.duration ?? "48:12"} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 font-display text-xl font-bold tracking-tight">Latest episodes</h2>
          <ul className="space-y-3">
            {episodes.map((e) => (
              <li key={e.slug}>
                <Link
                  to="/story/$slug"
                  params={{ slug: e.slug }}
                  className="glass-panel grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl p-4"
                >
                  <img src={e.image} alt="" loading="lazy" width={64} height={64} className="size-14 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-base font-bold">{e.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      Ep. {e.episode} · {formatDate(e.date)}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{e.duration}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-4 font-display text-xl font-bold tracking-tight">Most played</h2>
          <ol className="glass-panel divide-y divide-glass-border rounded-3xl p-2">
            {popular.map((e, i) => (
              <li key={e.slug}>
                <Link
                  to="/story/$slug"
                  params={{ slug: e.slug }}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-2xl p-3 hover:bg-background/50"
                >
                  <span className="w-8 font-display text-xl font-bold text-brand/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-base font-bold">{e.title}</h3>
                    <p className="text-xs text-muted-foreground">{e.views} plays</p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <div className="h-16" />
    </main>
  );
}
