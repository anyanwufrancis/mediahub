import { Link } from "@tanstack/react-router";
import { authors, categories, siteName, siteTagline } from "@/data/content";

export function Footer() {
  return (
    <footer className="relative z-10 mx-auto max-w-7xl px-4 pb-10 sm:px-6">
      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_1fr_1fr]">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-soft font-display font-bold text-primary-foreground">
                M
              </span>
              <span className="font-display text-lg font-bold tracking-tight">{siteName}</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">{siteTagline}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sections</p>
            <ul className="mt-3 space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to="/category/$category" params={{ category: c.slug }} className="hover:text-brand">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Newsroom</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-brand">
                  About
                </Link>
              </li>
              <li>
                <Link to="/newsletter" className="hover:text-brand">
                  Newsletter
                </Link>
              </li>
              {authors.slice(0, 2).map((a) => (
                <li key={a.slug}>
                  <Link to="/authors/$author" params={{ author: a.slug }} className="hover:text-brand">
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-glass-border pt-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteName} Media. Published daily.
        </p>
      </div>
    </footer>
  );
}
