export const footerlabels: { label: string; herf: string }[] = [
  { label: "Overview", herf: "/#main-banner" },
  { label: "AI Platform", herf: "/#platform" },
  { label: "Guardrails", herf: "/#guardrails" },
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
