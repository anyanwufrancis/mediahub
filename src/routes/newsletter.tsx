import { createFileRoute } from "@tanstack/react-router";
import { Newsletter } from "@/components/site/Newsletter";

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: [
      { title: "The Meridian Brief — our weekly newsletter" },
      {
        name: "description",
        content: "Five stories, one analysis and the number that mattered, delivered every Sunday.",
      },
      { property: "og:title", content: "The Meridian Brief — our weekly newsletter" },
      {
        property: "og:description",
        content: "Five stories, one analysis and the number that mattered, every Sunday.",
      },
    ],
  }),
  component: NewsletterPage,
});

function NewsletterPage() {
  return (
    <main className="relative z-10 pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">The Meridian Brief</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          One email a week. The stories our editors think are worth your Sunday morning, with the reasoning
          attached.
        </p>
      </div>
      <div className="pt-8">
        <Newsletter />
      </div>
    </main>
  );
}
