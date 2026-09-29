import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { categories, siteName, suggestionsFor } from "@/data/content";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const suggestions = suggestionsFor(query);

  const submit = (value: string) => {
    const q = value.trim();
    if (!q) return;
    setSearchOpen(false);
    setMenuOpen(false);
    setQuery("");
    navigate({ to: "/search", search: { q } });
  };

  return (
    <header className="relative z-40 mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6">
      <nav className="glass-panel sticky top-4 rounded-2xl px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-soft font-display text-lg font-bold text-primary-foreground">
              M
            </span>
            <span className="truncate font-display text-xl font-bold tracking-tight">{siteName}</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground lg:flex">
            {categories.slice(0, 3).map((c) => (
              <Link
                key={c.slug}
                to="/category/$category"
                params={{ category: c.slug }}
                activeProps={{ className: "text-brand" }}
                className="transition-colors hover:text-brand"
              >
                {c.name}
              </Link>
            ))}
            <Link to="/videos" activeProps={{ className: "text-brand" }} className="hover:text-brand">
              Video
            </Link>
            <Link to="/podcasts" activeProps={{ className: "text-brand" }} className="hover:text-brand">
              Podcasts
            </Link>
            <Link to="/about" activeProps={{ className: "text-brand" }} className="hover:text-brand">
              About
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-full border border-glass-border bg-glass text-muted-foreground transition-colors hover:text-brand"
            >
              <Search className="size-4" />
            </button>
            <Link
              to="/newsletter"
              className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brand"
            >
              Subscribe
            </Link>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-full border border-glass-border bg-glass text-muted-foreground lg:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(query);
            }}
            className="mt-3 border-t border-glass-border pt-3"
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stories, videos, podcasts, authors"
              className="w-full rounded-full border border-glass-border bg-background/60 px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-brand"
            />
            {suggestions.length > 0 && (
              <ul className="mt-2 space-y-1">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => submit(s)}
                      className="w-full truncate rounded-lg px-3 py-1.5 text-left text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </form>
        )}

        {menuOpen && (
          <div className="mt-3 grid gap-1 border-t border-glass-border pt-3 lg:hidden">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/category/$category"
                params={{ category: c.slug }}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary"
              >
                {c.name}
              </Link>
            ))}
            <Link to="/videos" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">
              Video
            </Link>
            <Link to="/podcasts" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">
              Podcasts
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">
              About
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
