export function Orbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -left-24 -top-24 size-[420px] animate-floaty rounded-full bg-orb-1 blur-3xl" />
      <div className="absolute -right-28 top-1/3 size-[380px] animate-floaty2 rounded-full bg-orb-2 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 size-[300px] animate-floaty3 rounded-full bg-orb-3 blur-3xl" />
    </div>
  );
}
