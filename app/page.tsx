import { HeroSection } from "@/components/home/HeroSection";
import { ProductGrid } from "@/components/home/ProductGrid";
import { TrustBanner } from "@/components/home/TrustBanner";

export const metadata = {
  title: "Prime Fresh Oil Mills | Premium Edible Seeds & Oils",
  description:
    "Direct from the source. B2B bulk orders & processing tracking for premium edible seeds, oils, and de-oiled cakes.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductGrid />
      <TrustBanner />
    </>
  );
}
