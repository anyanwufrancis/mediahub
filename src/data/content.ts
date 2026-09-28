import heroAmbient from "@/assets/hero-ambient.jpg";
import articleEconomy from "@/assets/article-economy.jpg";
import articleCulture from "@/assets/article-culture.jpg";
import articleAi from "@/assets/article-ai.jpg";
import videoFutureWork from "@/assets/video-future-work.jpg";
import podcastSignal from "@/assets/podcast-signal.jpg";

export type ContentType = "Article" | "Video" | "Podcast" | "Interview" | "Opinion";

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "quote"; text: string; cite?: string }
  | { kind: "list"; items: string[] }
  | { kind: "image"; src: string; caption: string };

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  links: { label: string; href: string }[];
};

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export type Story = {
  slug: string;
  type: ContentType;
  title: string;
  deck: string;
  excerpt: string;
  category: string; // category slug
  authorSlug: string;
  date: string;
  updated?: string;
  readTime: string;
  duration?: string;
  views: string;
  image: string;
  imageCaption: string;
  tags: string[];
  episode?: number;
  body: Block[];
};

export const categories: Category[] = [
  {
    slug: "technology",
    name: "Technology",
    description: "Compute, chips, software and the people quietly rebuilding the stack.",
  },
  {
    slug: "business",
    name: "Business",
    description: "Markets, capital and strategy, reported without the press-release gloss.",
  },
  {
    slug: "culture",
    name: "Culture",
    description: "Ideas, craft and the human side of a world reshaped by software.",
  },
  {
    slug: "science",
    name: "Science",
    description: "Research, climate and the long experiments that outlast news cycles.",
  },
];

export const authors: Author[] = [
  {
    slug: "lena-okafor",
    name: "Lena Okafor",
    role: "Senior technology correspondent",
    bio: "Lena writes about computing infrastructure, interface design and the slow shift from screens to ambient systems. Previously a systems engineer.",
    links: [
      { label: "X", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
  {
    slug: "marcus-reyes",
    name: "Marcus Reyes",
    role: "Business editor",
    bio: "Marcus covers capital markets, mergers and the economics of technology companies. He has reported from Lagos, London and Singapore.",
    links: [{ label: "LinkedIn", href: "#" }],
  },
  {
    slug: "priya-nair",
    name: "Priya Nair",
    role: "Culture writer",
    bio: "Priya reports on digital art, taste and the creative economy, with a particular interest in how tools shape what gets made.",
    links: [{ label: "X", href: "#" }],
  },
  {
    slug: "devon-clarke",
    name: "Devon Clarke",
    role: "AI correspondent",
    bio: "Devon covers machine learning research and the labs building it, from training runs to policy fights.",
    links: [{ label: "X", href: "#" }],
  },
];

const bodyAmbient: Block[] = [
  {
    kind: "p",
    text: "For a decade the industry measured progress in screens: bigger, brighter, more of them. The most interesting work happening now is the opposite. Sensors, microphones and small local models are pushing computing into the background, where it answers before it is asked.",
  },
  { kind: "h2", text: "The interface that disappears" },
  {
    kind: "p",
    text: "Ambient computing is not a product category so much as a design posture. Instead of demanding attention, a system observes context and acts with restraint. The engineering problem is no longer raw capability but knowing when to stay quiet.",
  },
  {
    kind: "quote",
    text: "The best interface is the one nobody has to learn. We spent years adding buttons. Now we are earning the right to remove them.",
    cite: "Ada Mensah, principal designer at Halcyon Systems",
  },
  { kind: "h2", text: "What changed" },
  {
    kind: "list",
    items: [
      "Inference moved to the device, cutting latency to something a person reads as instant.",
      "Battery and thermal budgets finally allow always-on listening without a visible cost.",
      "Privacy expectations hardened, forcing local processing rather than cloud round trips.",
    ],
  },
  {
    kind: "p",
    text: "None of these arrived as a single breakthrough. They compounded, quietly, until an entire class of product became possible at once — which is usually how the interesting shifts happen.",
  },
  { kind: "h2", text: "The next decade" },
  {
    kind: "p",
    text: "Expect the consumer story to lag the infrastructure one by several years. The companies rebuilding the substrate today are not the ones who will be famous for it. That is the quiet part, and it is the part worth watching.",
  },
];

const genericBody = (topic: string): Block[] => [
  {
    kind: "p",
    text: `${topic} arrived slowly, then all at once. This report follows the people making the decisions rather than the announcements that follow them, and asks what has actually changed on the ground.`,
  },
  { kind: "h2", text: "What the numbers show" },
  {
    kind: "p",
    text: "Reporting for this story involved conversations with a dozen operators, investors and engineers, most of whom spoke candidly about the gap between the public narrative and their own forecasts.",
  },
  {
    kind: "quote",
    text: "Everyone is optimising for the story they can tell next quarter. The interesting decisions are the ones nobody announces.",
  },
  { kind: "h2", text: "Where it goes next" },
  {
    kind: "p",
    text: "The short answer is that the current position is unstable. The longer answer, which is the one that matters, depends on decisions being made now in rooms that are not open to the public.",
  },
];

export const stories: Story[] = [
  {
    slug: "the-quiet-rise-of-ambient-computing",
    type: "Article",
    title: "The quiet rise of ambient computing",
    deck: "How invisible interfaces are reshaping the way we work, create and connect — and what it means for the next decade of technology.",
    excerpt:
      "Invisible interfaces are reshaping how we work and create. A field report from the teams removing the screen.",
    category: "technology",
    authorSlug: "lena-okafor",
    date: "2025-10-14",
    updated: "2025-10-16",
    readTime: "12 min read",
    views: "48.2k",
    image: heroAmbient,
    imageCaption: "A prototype ambient workspace at Halcyon Systems' Lisbon studio.",
    tags: ["AI", "Interfaces", "Hardware"],
    body: bodyAmbient,
  },
  {
    slug: "post-scarcity-economy",
    type: "Article",
    title: "Why the post-scarcity economy is closer than we think",
    deck: "Falling marginal costs are colliding with rising expectations. Economists are arguing about what comes next.",
    excerpt: "Falling marginal costs are colliding with rising expectations, and nobody agrees on what comes next.",
    category: "business",
    authorSlug: "marcus-reyes",
    date: "2025-10-12",
    readTime: "8 min read",
    views: "31.4k",
    image: articleEconomy,
    imageCaption: "Global trade flows, visualised from public shipping data.",
    tags: ["Economics", "Markets"],
    body: genericBody("The post-scarcity argument"),
  },
  {
    slug: "digital-artists-redefining-taste",
    type: "Interview",
    title: "The new wave of digital artists redefining taste",
    deck: "A generation raised on generative tools is deciding what looks good now — and galleries are scrambling to keep up.",
    excerpt: "A generation raised on generative tools is deciding what looks good now. Galleries are scrambling.",
    category: "culture",
    authorSlug: "priya-nair",
    date: "2025-10-11",
    readTime: "6 min read",
    views: "22.9k",
    image: articleCulture,
    imageCaption: "Artist Noor Haddad in her studio, working on a commissioned series.",
    tags: ["Art", "Creativity"],
    body: genericBody("The new digital art market"),
  },
  {
    slug: "inside-the-lab-building-next-generation-ai",
    type: "Article",
    title: "Inside the lab building the next generation of AI",
    deck: "Three years, one training cluster and a research culture that refuses to publish. A rare visit.",
    excerpt: "Three years, one training cluster, and a research culture that refuses to publish.",
    category: "technology",
    authorSlug: "devon-clarke",
    date: "2025-10-09",
    readTime: "10 min read",
    views: "57.1k",
    image: articleAi,
    imageCaption: "An accelerator module on the bench during thermal testing.",
    tags: ["AI", "Research", "Chips"],
    body: genericBody("The lab's approach"),
  },
  {
    slug: "the-future-of-work-explained",
    type: "Video",
    title: "The Future of Work, Explained in 12 Minutes",
    deck: "A Meridian Original documentary on distributed teams, four-day weeks and the return of the office.",
    excerpt: "A Meridian Original on distributed teams, four-day weeks and the slow return of the office.",
    category: "business",
    authorSlug: "marcus-reyes",
    date: "2025-10-08",
    readTime: "12 min watch",
    duration: "12:04",
    views: "112k",
    image: videoFutureWork,
    imageCaption: "Filming on location at a distributed-team summit.",
    tags: ["Work", "Video"],
    body: genericBody("The future of work"),
  },
  {
    slug: "signal-and-noise-ep-48",
    type: "Podcast",
    title: "Signal & Noise, Ep. 48: The attention economy, revisited",
    deck: "Ten years after the feed took over, our hosts ask what the attention economy actually paid for.",
    excerpt: "Ten years after the feed took over, we ask what the attention economy actually paid for.",
    category: "culture",
    authorSlug: "priya-nair",
    date: "2025-10-06",
    readTime: "48 min listen",
    duration: "48:12",
    episode: 48,
    views: "19.6k",
    image: podcastSignal,
    imageCaption: "Signal & Noise cover art.",
    tags: ["Media", "Podcast"],
    body: genericBody("The attention economy"),
  },
  {
    slug: "the-chip-that-refused-to-die",
    type: "Article",
    title: "The chip that refused to die",
    deck: "A decade-old architecture is quietly outshipping its replacement. Its engineers are not surprised.",
    excerpt: "A decade-old architecture is quietly outshipping its replacement. Its engineers are not surprised.",
    category: "technology",
    authorSlug: "devon-clarke",
    date: "2025-10-04",
    readTime: "7 min read",
    views: "27.3k",
    image: articleAi,
    imageCaption: "The architecture that outlived its own roadmap.",
    tags: ["Chips", "Hardware"],
    body: genericBody("The long life of an old architecture"),
  },
  {
    slug: "the-analog-comeback",
    type: "Opinion",
    title: "The analog comeback is not nostalgia",
    deck: "Tape, paper and film are back, and the reasons have less to do with the past than with attention.",
    excerpt: "Tape, paper and film are back, for reasons that have little to do with nostalgia.",
    category: "culture",
    authorSlug: "priya-nair",
    date: "2025-10-02",
    readTime: "5 min read",
    views: "16.8k",
    image: articleCulture,
    imageCaption: "A studio that still masters to tape.",
    tags: ["Culture", "Music"],
    body: genericBody("The analog revival"),
  },
  {
    slug: "the-last-analog-studio",
    type: "Video",
    title: "The last analog studio",
    deck: "Inside a recording room that never went digital, and the engineers keeping it running.",
    excerpt: "Inside a recording room that never went digital, and the engineers keeping it running.",
    category: "culture",
    authorSlug: "priya-nair",
    date: "2025-09-30",
    readTime: "8 min watch",
    duration: "08:12",
    views: "44.5k",
    image: articleCulture,
    imageCaption: "The console, still in daily use.",
    tags: ["Music", "Video"],
    body: genericBody("The analog studio"),
  },
  {
    slug: "signal-and-noise-ep-47",
    type: "Podcast",
    title: "Signal & Noise, Ep. 47: The long now",
    deck: "On patience, capital and the slow building of trust with people who bet on the long game.",
    excerpt: "On patience, capital and the slow building of trust with people who bet on the long game.",
    category: "business",
    authorSlug: "marcus-reyes",
    date: "2025-09-28",
    readTime: "42 min listen",
    duration: "42:00",
    episode: 47,
    views: "21.2k",
    image: podcastSignal,
    imageCaption: "Signal & Noise cover art.",
    tags: ["Investing", "Podcast"],
    body: genericBody("The long now"),
  },
  {
    slug: "the-data-centre-that-runs-on-waste-heat",
    type: "Video",
    title: "The data centre that runs on waste heat",
    deck: "A Nordic operator is heating 4,000 homes with servers. The economics are stranger than the engineering.",
    excerpt: "A Nordic operator is heating 4,000 homes with servers. The economics are stranger than the engineering.",
    category: "science",
    authorSlug: "lena-okafor",
    date: "2025-09-26",
    readTime: "14 min watch",
    duration: "14:22",
    views: "68.9k",
    image: heroAmbient,
    imageCaption: "Heat exchangers on the roof of the facility.",
    tags: ["Climate", "Infrastructure", "Video"],
    body: genericBody("Waste-heat data centres"),
  },
  {
    slug: "the-rate-pause-and-founders",
    type: "Article",
    title: "What the rate pause actually means for founders",
    deck: "Cheap money is not coming back. Here is how the smartest operators are planning around that.",
    excerpt: "Cheap money is not coming back. Here is how the smartest operators are planning around that.",
    category: "business",
    authorSlug: "marcus-reyes",
    date: "2025-09-24",
    readTime: "9 min read",
    views: "33.7k",
    image: articleEconomy,
    imageCaption: "Rates, plotted against venture deal volume.",
    tags: ["Markets", "Startups"],
    body: genericBody("The rate pause"),
  },
];

export const siteName = "Meridian";
export const siteTagline = "Technology, business and culture, reported with care.";

export const getAuthor = (slug: string) => authors.find((a) => a.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getStory = (slug: string) => stories.find((s) => s.slug === slug);

export const byDateDesc = (a: Story, b: Story) => b.date.localeCompare(a.date);
const viewNumber = (v: string) => parseFloat(v.replace("k", "")) * (v.includes("k") ? 1000 : 1);
export const byPopularity = (a: Story, b: Story) => viewNumber(b.views) - viewNumber(a.views);

export const featured = stories[0]!;
export const trending = [...stories].sort(byPopularity).slice(0, 5);

export const storiesIn = (categorySlug: string) =>
  stories.filter((s) => s.category === categorySlug).sort(byDateDesc);
export const storiesBy = (authorSlug: string) =>
  stories.filter((s) => s.authorSlug === authorSlug).sort(byDateDesc);
export const storiesOfType = (type: ContentType) =>
  stories.filter((s) => s.type === type).sort(byDateDesc);
export const relatedTo = (story: Story) =>
  stories.filter((s) => s.slug !== story.slug && s.category === story.category).slice(0, 3);

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export const searchStories = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return stories.filter((s) =>
    [s.title, s.deck, s.excerpt, s.category, s.type, ...s.tags, getAuthor(s.authorSlug)?.name ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
};

export const suggestionsFor = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const pool = [
    ...stories.map((s) => s.title),
    ...new Set(stories.flatMap((s) => s.tags)),
    ...categories.map((c) => c.name),
    ...authors.map((a) => a.name),
  ];
  return [...new Set(pool.filter((t) => t.toLowerCase().includes(q)))].slice(0, 6);
};
