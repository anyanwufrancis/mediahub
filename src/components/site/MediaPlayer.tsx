import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const format = (s: number) =>
  `${Math.floor(s / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(s % 60)
    .toString()
    .padStart(2, "0")}`;

const toSeconds = (duration: string) => {
  const parts = duration.split(":").map(Number);
  return parts.length === 2 ? parts[0]! * 60 + parts[1]! : 0;
};

/**
 * Simulated transport for demo media: play/pause, scrubbing and progress
 * against the published duration. Real files can replace the timer later.
 */
export function MediaPlayer({ duration, dark = false }: { duration: string; dark?: boolean }) {
  const total = toSeconds(duration) || 600;
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setTime((t) => (t + 1 >= total ? (setPlaying(false), total) : t + 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing, total]);

  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);

  return (
    <div
      className={`rounded-2xl border p-4 ${dark ? "border-glass-border bg-background/20" : "border-glass-border bg-background/60"}`}
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-primary-foreground shadow-brand"
        >
          {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
        </button>
        <div className="min-w-0 flex-1">
          <input
            type="range"
            min={0}
            max={total}
            value={time}
            aria-label="Seek"
            onChange={(e) => setTime(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-[var(--brand)]"
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{format(time)}</span>
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
