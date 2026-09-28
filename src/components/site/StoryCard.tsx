import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { formatDate, getAuthor, getCategory, type Story } from "@/data/content";

export function StoryCard({ story, compact = false }: { story: Story; compact?: boolean }) {
  const author = getAuthor(story.authorSlug);
  const category = getCategory(story.category);
  const isMedia = story.type === "Video" || story.type === "Podcast";

  return (
    <article className="glass-panel group rounded-3xl p-4 transition-shadow hover:shadow-glass-lg">
      <Link to="/story/$slug" params={{ slug: story.slug }} className="block">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={story.image}
            alt={story.title}
            loading="lazy"
            width={1024}
            height={640}
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {isMedia && (
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-12 place-items-center rounded-full bg-background/70 text-brand backdrop-blur-md">
                <Play className="size-5" />
              </span>
            </span>
          )}
          {story.duration && (
            <span className="absolute bottom-3 right-3 rounded-full bg-ink/80 px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {story.duration}
            </span>
          )}
        </div>
        <div className="mt-4 px-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">{category?.name}</span>
            <span className="rounded-full border border-glass-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              {story.type}
            </span>
          </div>
          <h3 className="mt-2 font-display text-lg font-bold leading-snug">{story.title}</h3>
          {!compact && <p className="mt-2 text-sm text-muted-foreground">{story.excerpt}</p>}
          <p className="mt-3 text-sm text-muted-foreground">
            By <span className="font-semibold text-foreground">{author?.name}</span> · {formatDate(story.date)} ·{" "}
            {story.readTime}
          </p>
        </div>
      </Link>
    </article>
  );
}
