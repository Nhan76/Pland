export const footerlabels: { label: string; herf: string }[] = [
  { label: "Overview", herf: "/#main-banner" },
  { label: "Workflow", herf: "/#development" },
  { label: "Guardrails", herf: "/#upgrade" },
  { label: "FAQ", herf: "/#faq" },
];

export const pricedata: {
  title: string;
  short: string;
  icon: string;
  background: string;
  price: string;
  mark: string;
  width: number;
  height: number;
  padding: string;
}[] = [
  {
    title: "Bitcoin",
    short: "BTC/USD",
    icon: "/images/icons/icon-bitcoin.svg",
    background: "bg-chart-5/20",
    price: "$72,947.23",
    mark: "$94,040.99 (-0.9%)",
    width: 18,
    height: 23,
    padding: "px-4 py-3",
  },
  {
    title: "Ethereum",
    short: "ETH/USD",
    icon: "/images/icons/icon-ethereum.svg",
    background: "bg-secondary/15",
    price: "$2,135.91",
    mark: "$4,878.26 (-35.9%)",
    width: 18,
    height: 23,
    padding: "px-4 py-2",
  },
  {
    title: "Polkadot",
    short: "BTC/USD",
    icon: "/images/icons/icon-bitcoin-circle.svg",
    background: "bg-chart-5/20",
    price: "$8.74",
    mark: "$3,785.82 (-88.3%)",
    width: 46,
    height: 46,
    padding: "px-0 py-0",
  },
  {
    title: "Litecoin",
    short: "LTC/USD",
    icon: "/images/icons/icon-litecoin.svg",
    background: "bg-secondary/15",
    price: "$73.52",
    mark: "$410.26 (-79.1%)",
    width: 18,
    height: 23,
    padding: "px-4 py-3",
  },
  {
    title: "Solana",
    short: "SOL/USD",
    icon: "/images/icons/icon-solana.svg",
    background: "bg-secondary/15",
    price: "$142.83",
    mark: "$259.96 (-8.2%)",
    width: 24,
    height: 24,
    padding: "px-4 py-3",
  },
  {
    title: "Dogecoin",
    short: "DOGE/USD",
    icon: "/images/icons/icon-dogecoin.svg",
    background: "bg-secondary/15",
    price: "$0.0968",
    mark: "$0.7316 (-46.2%)",
    width: 46,
    height: 46,
    padding: "px-0 py-0",
  },
];

export const portfolioData: { image: string; title: string }[] = [
  {
    image: "/images/portfolio/portfolio-icon-1.svg",
    title: "Unified portfolio syncing",
  },
  {
    image: "/images/portfolio/portfolio-icon-2.svg",
    title: "Multi-agent market review",
  },
  {
    image: "/images/portfolio/portfolio-icon-3.svg",
    title: "Explainable action trace",
  },
];

export const upgradeData: { title: string }[] = [
  { title: "Cash ratio awareness" },
  { title: "Concentration limits" },
  { title: "Weak trend exposure checks" },
  { title: "Bull and bear regime detection" },
  { title: "Snapshot-based decisions" },
  { title: "Transparent audit trail" },
  { title: "Actionable risk alerts" },
  { title: "Consistent portfolio reviews" },
];

export const perksData: {
  icon: string;
  title: string;
  text: string;
  space: string;
}[] = [
  {
    icon: "/images/perks/peak-icon-1.svg",
    title: "Clear recommendations",
    text: "Every proposed action is paired with rationale, confidence, and portfolio impact.",
    space: "lg:mt-8",
  },
  {
    icon: "/images/perks/peak-icon-2.svg",
    title: "Shared decision language",
    text: "Teams and communities can review the same evidence before acting on a market move.",
    space: "lg:mt-14",
  },
  {
    icon: "/images/perks/peak-icon-3.svg",
    title: "Continuous learning",
    text: "Trace logs turn each review into a repeatable feedback loop for better portfolio discipline.",
    space: "lg:mt-4",
  },
];

export const timelineData: {
  icon: string;
  title: string;
  text: string;
  position: string;
}[] = [
  {
    icon: "/images/timeline/icon-planning.svg",
    title: "Sync and snapshot",
    text: "Lock holdings and price context into one consistent review state.",
    position: "md:top-0 md:left-0",
  },
  {
    icon: "/images/timeline/icon-refinement.svg",
    title: "Analyze context",
    text: "Combine technical, sentiment, and portfolio structure signals.",
    position: "md:top-0 md:right-0",
  },
  {
    icon: "/images/timeline/icon-prototype.svg",
    title: "Debate the trade",
    text: "Bull and bear agents challenge the case before a manager responds.",
    position: "md:bottom-0 md:left-0",
  },
  {
    icon: "/images/timeline/icon-support.svg",
    title: "Apply guardrails",
    text: "Risk rules test exposure, cash, and concentration before any action.",
    position: "md:bottom-0 md:right-0",
  },
];

export const CryptoData: { name: string; price: number }[] = [
  { name: "Bitcoin BTC/USD", price: 67646.84 },
  { name: "Ethereum ETH/USD", price: 2515.93 },
  { name: "Bitcoin Cash BTC/USD", price: 366.96 },
  { name: "Litecoin LTC/USD", price: 61504.54 },
];
