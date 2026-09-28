import { createFileRoute, Link } from "@tanstack/react-router";
import { authors } from "@/data/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Meridian — our story and editorial values" },
      {
        name: "description",
        content:
          "Meridian is an independent newsroom covering technology, business and culture. Read our mission, values and how to reach us.",
      },
      { property: "og:title", content: "About Meridian — our story and editorial values" },
      {
        property: "og:description",
        content: "An independent newsroom covering technology, business and culture.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { title: "Report first", body: "Every story starts with people and documents, not press releases." },
  { title: "Show the work", body: "We publish our sources and methods whenever it is safe to do so." },
  { title: "Correct in public", body: "Mistakes get a visible correction note, never a quiet edit." },
  { title: "No hidden interests", body: "Sponsored work is labelled, and our writers disclose holdings." },
];

function AboutPage() {
  return (
    <main className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          An independent newsroom for the <span className="text-gradient-brand">next decade</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Meridian covers technology, business and culture through reporting, documentary video and weekly
          podcasts. We publish daily from three time zones.
        </p>
      </div>

      <section className="glass-panel mt-10 rounded-3xl p-6 sm:p-10">
        <h2 className="font-display text-2xl font-bold tracking-tight">Our story</h2>
        <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            Meridian started as a weekly email between four reporters who kept noticing the same thing: the
            stories that mattered most were the ones nobody announced. Infrastructure decisions, quiet
            mergers, the slow reshaping of how work gets done.
          </p>
          <p>
            Three years later we are a full newsroom with a video desk and two podcasts, funded by readers
            rather than page views. That funding model shapes what we publish: fewer stories, reported
            further.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="glass-panel rounded-3xl p-6">
          <h2 className="font-display text-xl font-bold tracking-tight">Mission</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            To explain the systems behind the headlines clearly enough that readers can make their own
            decisions about them.
          </p>
        </div>
        <div className="glass-panel rounded-3xl p-6">
          <h2 className="font-display text-xl font-bold tracking-tight">Vision</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A reader-funded publication that treats technology, business and culture as one story rather than
            three separate beats.
          </p>
        </div>
      </section>

      <section className="pt-12">
        <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">Editorial values</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="glass-panel rounded-3xl p-5">
              <h3 className="font-display text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-12">
        <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">The team</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {authors.map((a) => (
            <Link
              key={a.slug}
              to="/authors/$author"
              params={{ author: a.slug }}
              className="glass-panel rounded-3xl p-5 transition-shadow hover:shadow-glass-lg"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-soft font-display text-xl font-bold text-primary-foreground">
                {a.name.charAt(0)}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold">{a.name}</h3>
              <p className="text-xs text-muted-foreground">{a.role}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-panel mt-12 rounded-3xl p-6 sm:p-8">
        <h2 className="font-display text-2xl font-bold tracking-tight">Contact</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Newsroom: newsroom@meridian.example · Tips (encrypted): tips@meridian.example · Press:
          press@meridian.example
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          These contact details are placeholders — send us the real ones and we'll swap them in.
        </p>
      </section>
      <div className="h-16" />
    </main>
  );
}
