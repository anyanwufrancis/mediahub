import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { StoryCard } from "@/components/site/StoryCard";
import { ShareBar } from "@/components/site/ShareBar";
import { Comments } from "@/components/site/Comments";
import { MediaPlayer } from "@/components/site/MediaPlayer";
import { formatDate, getAuthor, getCategory, getStory, relatedTo } from "@/data/content";

export const Route = createFileRoute("/story/$slug")({
  loader: ({ params }) => {
    const story = getStory(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Story unavailable — Meridian" }, { name: "robots", content: "noindex" }] };
    }
    const { story } = loaderData;
    const title = `${story.title} — Meridian`;
    return {
      meta: [
        { title },
        { name: "description", content: story.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: story.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: StoryPage,
});

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-brand to-brand-soft transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function StoryPage() {
  const { story } = Route.useLoaderData();
  const author = getAuthor(story.authorSlug);
  const category = getCategory(story.category);
  const related = relatedTo(story);
  const isMedia = story.type === "Video" || story.type === "Podcast";

  return (
    <main className="relative z-10 mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <ReadingProgress />

      <nav className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-brand">
          Home
        </Link>
        <span>/</span>
        <Link to="/category/$category" params={{ category: story.category }} className="hover:text-brand">
          {category?.name}
        </Link>
        <span>/</span>
        <span className="truncate text-foreground">{story.title}</span>
      </nav>

      <article className="glass-panel mt-6 rounded-3xl p-5 sm:p-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">{category?.name}</span>
            <span className="rounded-full border border-glass-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              {story.type}
            </span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            {story.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{story.deck}</p>

          <div className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-y border-glass-border py-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-soft font-bold text-primary-foreground">
              {author?.name.charAt(0)}
            </span>
            <div className="min-w-0">
              <Link
                to="/authors/$author"
                params={{ author: story.authorSlug }}
                className="truncate text-sm font-semibold hover:text-brand"
              >
                {author?.name}
              </Link>
              <p className="text-xs text-muted-foreground">
                {formatDate(story.date)}
                {story.updated ? ` · Updated ${formatDate(story.updated)}` : ""} · {story.readTime}
              </p>
            </div>
          </div>

          <figure className="mt-8">
            <img
              src={story.image}
              alt={story.imageCaption}
              width={1024}
              height={640}
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-xs text-muted-foreground">{story.imageCaption}</figcaption>
          </figure>

          {isMedia && (
            <div className="mt-6">
              <MediaPlayer duration={story.duration ?? "12:00"} />
            </div>
          )}

          <div className="mt-8 space-y-6 text-[1.0625rem] leading-8 text-foreground/90">
            {story.body.map((block, i) => {
              if (block.kind === "h2")
                return (
                  <h2 key={i} className="pt-2 font-display text-2xl font-bold tracking-tight">
                    {block.text}
                  </h2>
                );
              if (block.kind === "quote")
                return (
                  <blockquote key={i} className="border-l-4 border-brand pl-5">
                    <p className="font-display text-xl font-semibold leading-snug">“{block.text}”</p>
                    {block.cite && <cite className="mt-2 block text-sm not-italic text-muted-foreground">{block.cite}</cite>}
                  </blockquote>
                );
              if (block.kind === "list")
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              if (block.kind === "image")
                return (
                  <figure key={i}>
                    <img src={block.src} alt={block.caption} loading="lazy" className="w-full rounded-2xl" />
                    <figcaption className="mt-2 text-xs text-muted-foreground">{block.caption}</figcaption>
                  </figure>
                );
              return <p key={i}>{block.text}</p>;
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {story.tags.map((t) => (
              <Link
                key={t}
                to="/search"
                search={{ q: t }}
                className="rounded-full border border-glass-border bg-glass px-3 py-1 text-xs font-medium hover:text-brand"
              >
                #{t}
              </Link>
            ))}
          </div>

          <div className="mt-8 border-t border-glass-border pt-6">
            <ShareBar title={story.title} />
          </div>

          <Comments />
        </div>
      </article>

      {related.length > 0 && (
        <section className="pt-14">
          <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">Related stories</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </section>
      )}
      <div className="h-16" />
    </main>
  );
}
