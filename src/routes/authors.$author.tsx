import { createFileRoute, notFound } from "@tanstack/react-router";
import { StoryCard } from "@/components/site/StoryCard";
import { byPopularity, getAuthor, storiesBy } from "@/data/content";

export const Route = createFileRoute("/authors/$author")({
  loader: ({ params }) => {
    const author = getAuthor(params.author);
    if (!author) throw notFound();
    return { author, stories: storiesBy(author.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Author unavailable — Meridian" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.author.name} — Meridian`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.author.bio },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.author.bio },
      ],
    };
  },
  component: AuthorPage,
});

function AuthorPage() {
  const { author, stories } = Route.useLoaderData();
  const popular = [...stories].sort(byPopularity).slice(0, 3);

  return (
    <main className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-5">
          <span className="grid size-20 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-brand to-brand-soft font-display text-3xl font-bold text-primary-foreground">
            {author.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <h1 className="truncate font-display text-3xl font-bold tracking-tight">{author.name}</h1>
            <p className="text-sm text-muted-foreground">{author.role}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stories.length} published stories</p>
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground">{author.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {author.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full border border-glass-border bg-glass px-4 py-1.5 text-sm hover:text-brand"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <section className="pt-12">
        <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">Latest by {author.name}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </section>

      <section className="pt-12">
        <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">Most read</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {popular.map((s) => (
            <StoryCard key={s.slug} story={s} compact />
          ))}
        </div>
      </section>
      <div className="h-16" />
    </main>
  );
}
