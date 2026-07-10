import { FeatureShowcase } from "./feature-showcase";

type Feature = { id: string; title: string; description: string; iconName: string };

/**
 * "Why This Workshop Is a Game-Changer" — magazine-style alternating editorial
 * cards with restrained micro-interactions. See feature-showcase.tsx for the
 * motion; this wrapper keeps the public API (and page.tsx) unchanged.
 */
export function FeatureGrid({ features }: { features: Feature[] }) {
  return <FeatureShowcase features={features} />;
}
