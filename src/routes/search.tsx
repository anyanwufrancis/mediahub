import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { StoryCard } from "@/components/site/StoryCard";
import { searchStories, suggestionsFor, type ContentType } from "@/data/content";

type SearchParams = { q?: string };

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Search — Meridian" },
      { name: "description", content: "Search Meridian stories, videos, podcasts, authors and tags." },
      { property: "og:title", content: "Search — Meridian" },
      { property: "og:description", content: "Search Meridian stories, videos, podcasts, authors and tags." },
    ],
  }),
  component: SearchPage,
});

const types: (ContentType | "All")[] = ["All", "Article", "Video", "Podcast", "Interview", "Opinion"];

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [input, setInput] = useState(q ?? "");
  const [type, setType] = useState<ContentType | "All">("All");
  const [shown, setShown] = useState(6);

  const query = q ?? "";
  const all = searchStories(query);
  const results = type === "All" ? all : all.filter((s) => s.type === type);
  const suggestions = input !== query ? suggestionsFor(input) : [];

  return (
    <main className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Search</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/search", search: { q: input.trim() } });
        }}
        className="glass-panel mt-6 rounded-3xl p-4"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search stories, videos, podcasts, authors, tags"
          aria-label="Search"
          className="w-full rounded-full border border-glass-border bg-background/60 px-5 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-brand"
        />
        {suggestions.length > 0 && (
          <ul className="mt-2 space-y-1">
            {suggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => {
                    setInput(s);
                    navigate({ to: "/search", search: { q: s } });
                  }}
                  className="w-full truncate rounded-lg px-3 py-1.5 text-left text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        )}
      </form>

      {query && (
        <>
          <p className="mt-6 text-sm text-muted-foreground">
            {results.length} result{results.length === 1 ? "" : "s"} for{" "}
            <span className="font-semibold text-foreground">“{query}”</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
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

          {results.length > 0 ? (
            <>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {results.slice(0, shown).map((s) => (
                  <StoryCard key={s.slug} story={s} />
                ))}
              </div>
              {results.length > shown && (
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
            <div className="glass-panel mt-8 rounded-3xl p-8">
              <h2 className="font-display text-xl font-bold">No results</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a broader term, or browse the Technology, Business and Culture sections.
              </p>
            </div>
          )}
        </>
      )}
      <div className="h-16" />
    </main>
  );
}
