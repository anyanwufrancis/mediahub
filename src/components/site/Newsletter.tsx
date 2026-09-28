import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    setState(valid ? "done" : "error");
  };

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <div className="glass-panel rounded-3xl p-6 sm:p-10">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">The Meridian Brief</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
              Get the stories that matter, delivered to your inbox.
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Five stories, one analysis and the single number that mattered. Every Sunday, no noise.
            </p>
          </div>
          <div>
            {state === "done" ? (
              <div className="rounded-2xl border border-glass-border bg-background/60 p-5">
                <p className="font-display text-lg font-bold">You're on the list.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Check {email} for a confirmation link.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setState("idle");
                  }}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="min-w-0 flex-1 rounded-full border border-glass-border bg-background/60 px-5 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-brand"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-brand"
                >
                  Subscribe
                </button>
              </form>
            )}
            {state === "error" && (
              <p className="mt-2 text-sm text-destructive">Please enter a valid email address.</p>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              We only use your email for the newsletter. Unsubscribe any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
