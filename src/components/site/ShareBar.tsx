import { useEffect, useState } from "react";
import { Check, Link2, Mail } from "lucide-react";

const targets = [
  { label: "WhatsApp", href: (u: string, t: string) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}` },
  { label: "Facebook", href: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  {
    label: "X",
    href: (u: string, t: string) =>
      `https://x.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
  },
  {
    label: "LinkedIn",
    href: (u: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`,
  },
];

export function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Share</span>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-glass px-3 py-1.5 text-sm hover:text-brand"
      >
        {copied ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
        {copied ? "Link copied" : "Copy link"}
      </button>
      {targets.map((t) => (
        <a
          key={t.label}
          href={t.href(url, title)}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-glass-border bg-glass px-3 py-1.5 text-sm hover:text-brand"
        >
          {t.label}
        </a>
      ))}
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
        className="inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-glass px-3 py-1.5 text-sm hover:text-brand"
      >
        <Mail className="size-3.5" /> Email
      </a>
    </div>
  );
}
