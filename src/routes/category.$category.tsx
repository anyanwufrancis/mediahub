import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { StoryCard } from "@/components/site/StoryCard";
import {
  byDateDesc,
  byPopularity,
  getCategory,
  storiesIn,
  type ContentType,
} from "@/data/content";

export const Route = createFileRoute("/category/$category")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category, stories: storiesIn(category.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Section unavailable — Meridian" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.category.name} — Meridian`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.category.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.category.description },
      ],
    };
  },
  component: CategoryPage,
});

const sorts = ["Latest", "Most popular", "Oldest"] as const;
const types: (ContentType | "All")[] = ["All", "Article", "Video", "Podcast", "Interview", "Opinion"];

function CategoryPage() {
  const { category, stories } = Route.useLoaderData();
  const [sort, setSort] = useState<(typeof sorts)[number]>("Latest");
  const [type, setType] = useState<ContentType | "All">("All");
  const [shown, setShown] = useState(6);

  let list = type === "All" ? [...stories] : stories.filter((s) => s.type === type);
  if (sort === "Latest") list = list.sort(byDateDesc);
  if (sort === "Oldest") list = list.sort((a, b) => a.date.localeCompare(b.date));
  if (sort === "Most popular") list = list.sort(byPopularity);

  const featured = list[0];
  const rest = list.slice(1, shown);

  return (
    <main className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{category.name}</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{category.description}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {sorts.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSort(s)}
            className={`rounded-full border border-glass-border px-4 py-1.5 text-sm font-medium ${
              sort === s ? "bg-ink text-primary-foreground" : "bg-glass hover:text-brand"
            }`}
          >
            {s}
          </button>
        ))}
        <span className="mx-1 hidden w-px bg-border sm:block" />
        {types.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`rounded-full border border-glass-border px-4 py-1.5 text-sm font-medium ${
              type === t ? "bg-brand text-primary-foreground" : "bg-glass hover:text-brand"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {featured ? (
        <>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <StoryCard story={featured} />
            {rest[0] && <StoryCard story={rest[0]} />}
          </div>
          {rest.length > 1 && (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {rest.slice(1).map((s) => (
                <StoryCard key={s.slug} story={s} />
              ))}
            </div>
          )}
          {list.length > shown && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShown((n) => n + 6)}
                className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-brand"
              >
                Load more
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="glass-panel mt-8 rounded-3xl p-8 text-sm text-muted-foreground">
          Nothing published in this section with those filters yet.
        </p>
      )}
      <div className="h-16" />
    </main>
  );
}
