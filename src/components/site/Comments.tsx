import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";

type Comment = { id: number; name: string; time: string; text: string; likes: number; replies: Comment[] };

const seed: Comment[] = [
  {
    id: 1,
    name: "Tobi Adeyemi",
    time: "2 hours ago",
    text: "The point about local inference is underrated. Latency is the whole product once you stop looking at benchmarks.",
    likes: 14,
    replies: [
      {
        id: 2,
        name: "Ruth Kimani",
        time: "1 hour ago",
        text: "Agreed. The moment a response feels instant, people stop treating it as a tool.",
        likes: 5,
        replies: [],
      },
    ],
  },
  {
    id: 3,
    name: "Sam Oyelaran",
    time: "5 hours ago",
    text: "Would love a follow-up on the privacy trade-offs here.",
    likes: 8,
    replies: [],
  },
];

function CommentItem({ comment, onLike }: { comment: Comment; onLike: (id: number) => void }) {
  return (
    <li className="rounded-2xl border border-glass-border bg-background/50 p-4">
      <div className="flex items-center gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-soft text-xs font-bold text-primary-foreground">
          {comment.name.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{comment.name}</p>
          <p className="text-xs text-muted-foreground">{comment.time}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{comment.text}</p>
      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        <button type="button" onClick={() => onLike(comment.id)} className="inline-flex items-center gap-1 hover:text-brand">
          <Heart className="size-3.5" /> {comment.likes}
        </button>
        <button type="button" className="inline-flex items-center gap-1 hover:text-brand">
          <MessageCircle className="size-3.5" /> Reply
        </button>
        <button type="button" className="hover:text-destructive">
          Report
        </button>
      </div>
      {comment.replies.length > 0 && (
        <ul className="mt-3 space-y-3 border-l border-glass-border pl-4">
          {comment.replies.map((r) => (
            <CommentItem key={r.id} comment={r} onLike={onLike} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Comments() {
  const [comments, setComments] = useState(seed);
  const [draft, setDraft] = useState("");

  const like = (id: number) =>
    setComments((list) =>
      list.map((c) => ({
        ...c,
        likes: c.id === id ? c.likes + 1 : c.likes,
        replies: c.replies.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r)),
      })),
    );

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setComments((list) => [
      { id: Date.now(), name: "You", time: "just now", text: draft.trim(), likes: 0, replies: [] },
      ...list,
    ]);
    setDraft("");
  };

  return (
    <section className="mt-12">
      <h2 className="font-display text-xl font-bold tracking-tight">Comments ({comments.length})</h2>
      <form onSubmit={add} className="mt-4">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          placeholder="Add to the discussion"
          className="w-full rounded-2xl border border-glass-border bg-background/60 p-4 text-sm outline-none placeholder:text-muted-foreground focus:border-brand"
        />
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">Comments here are a preview and are not stored yet.</p>
          <button type="submit" className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-primary-foreground">
            Post
          </button>
        </div>
      </form>
      <ul className="mt-6 space-y-4">
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} onLike={like} />
        ))}
      </ul>
    </section>
  );
}
